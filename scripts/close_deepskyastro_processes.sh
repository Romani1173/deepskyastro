#!/usr/bin/env bash

set -euo pipefail

readonly PROJECT_ROOT="/Users/juanjoromero/Desktop/Web_deepskyastro"
readonly MODE="${1:---check}"

if [[ "$MODE" != "--check" && "$MODE" != "--close" ]]; then
  echo "Uso: $0 [--check|--close]" >&2
  exit 2
fi

for required_path in AGENTS.md package.json src public .git; do
  if [[ ! -e "$PROJECT_ROOT/$required_path" ]]; then
    echo "Error: falta $PROJECT_ROOT/$required_path; no se cerrará ningún proceso." >&2
    exit 1
  fi
done

if ! command -v lsof >/dev/null 2>&1; then
  echo "Error: lsof es necesario para verificar el directorio de trabajo." >&2
  exit 1
fi

is_astro_dev_or_build() {
  local command_line="$1"

  [[ "$command_line" =~ (^|[[:space:]/])(astro|astro\.mjs)([[:space:]]+)(dev|build)([[:space:]]|$) ]] ||
    [[ "$command_line" =~ (^|[[:space:]])npm([[:space:]]+)(run[[:space:]]+)?(dev|build)([[:space:]]|$) ]]
}

process_cwd() {
  local pid="$1"
  lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1
}

pids=()
commands=()
process_snapshot="$(ps -axo pid=,command=)" || {
  echo "Error: no se ha podido consultar la lista de procesos; no se cerrará ninguno." >&2
  exit 1
}

while IFS= read -r process_line; do
  pid="${process_line%% *}"
  command_line="${process_line#* }"

  [[ "$pid" =~ ^[0-9]+$ ]] || continue
  is_astro_dev_or_build "$command_line" || continue
  [[ "$(process_cwd "$pid")" == "$PROJECT_ROOT" ]] || continue

  pids+=("$pid")
  commands+=("$command_line")
done < <(printf '%s\n' "$process_snapshot" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+/ /')

if (( ${#pids[@]} == 0 )); then
  echo "No hay procesos Astro dev/build activos de DeepSkyAstro."
  exit 0
fi

for index in "${!pids[@]}"; do
  echo "PID ${pids[$index]}: ${commands[$index]}"
done

if [[ "$MODE" == "--check" ]]; then
  echo "Usa --close para cerrar exclusivamente estos procesos."
  exit 0
fi

echo "Cerrando ${#pids[@]} proceso(s) Astro de DeepSkyAstro..."
kill -TERM "${pids[@]}"

for _ in 1 2 3 4 5; do
  remaining=()
  for pid in "${pids[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      remaining+=("$pid")
    fi
  done

  if (( ${#remaining[@]} == 0 )); then
    echo "Procesos cerrados correctamente."
    exit 0
  fi

  sleep 1
done

echo "Los procesos no terminaron tras 5 segundos; forzando solo los PID verificados: ${remaining[*]}" >&2
kill -KILL "${remaining[@]}"
echo "Procesos cerrados correctamente."
