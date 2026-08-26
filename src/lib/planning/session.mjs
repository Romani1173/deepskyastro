import { DEFAULT_LOCATION } from './engine.mjs';

export const PLANNING_SESSION_KEY = 'deepskyastro:planning-session:v1';

const validLocation = (location) => location
  && Number.isFinite(location.latitudeDeg) && location.latitudeDeg >= -90 && location.latitudeDeg <= 90
  && Number.isFinite(location.longitudeDeg) && location.longitudeDeg >= -180 && location.longitudeDeg <= 180;

export function loadPlanningSession(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(PLANNING_SESSION_KEY) ?? 'null');
    if (parsed?.version === 1 && validLocation(parsed.location)) return parsed;
  } catch {}
  return { version: 1, location: { ...DEFAULT_LOCATION } };
}

export function savePlanningSession(storage, state) {
  if (!validLocation(state.location)) throw new RangeError('Invalid planning location');
  storage.setItem(PLANNING_SESSION_KEY, JSON.stringify({ ...state, version: 1 }));
}
