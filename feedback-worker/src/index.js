const TOOLS = new Set(['visibility', 'planning', 'analyser', 'my-night']);
const VOTES = new Set(['up', 'down']);
const REASONS = new Set(['confusing', 'missing', 'broken', 'other']);
const LANGUAGES = new Set(['ca', 'es', 'en']);
const ITEM_TYPES = new Set(['photo', 'article']);

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
});

const allowedOrigins = (env) => new Set(
  String(env.ALLOWED_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean),
);

const corsHeaders = (request, env) => {
  const origin = request.headers.get('origin');
  return origin && allowedOrigins(env).has(origin)
    ? { 'access-control-allow-origin': origin, vary: 'Origin' }
    : {};
};

const isAllowedOrigin = (request, env) => {
  const origin = request.headers.get('origin');
  return Boolean(origin && allowedOrigins(env).has(origin));
};

const secureEqual = async (left, right) => {
  if (!left || !right) return false;
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(left)),
    crypto.subtle.digest('SHA-256', encoder.encode(right)),
  ]);
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
};

const hashVisitor = async (visitorId, secret) => {
  const bytes = new TextEncoder().encode(`${secret}:${visitorId}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, '0')).join('');
};

const readBody = async (request) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4096) throw new Error('payload_too_large');
  return request.json();
};

const validateFeedback = (input) => {
  const tool = String(input?.tool || '');
  const vote = String(input?.vote || '');
  const visitorId = String(input?.visitorId || '');
  const language = LANGUAGES.has(input?.language) ? input.language : 'es';
  const reason = input?.reason ? String(input.reason) : null;
  const comment = String(input?.comment || '').trim();
  const pagePath = String(input?.pagePath || '').slice(0, 200);

  if (!TOOLS.has(tool) || !VOTES.has(vote)) return { error: 'invalid_feedback' };
  if (!/^[a-zA-Z0-9_-]{20,80}$/.test(visitorId)) return { error: 'invalid_visitor' };
  if (vote === 'down' && !REASONS.has(reason)) return { error: 'invalid_reason' };
  if (vote === 'up' && reason) return { error: 'invalid_reason' };
  if (comment.length > 500) return { error: 'comment_too_long' };
  if (input?.website) return { error: 'invalid_feedback' };

  return { value: { tool, vote, visitorId, language, reason, comment, pagePath } };
};

const validateReaction = (input) => {
  const itemType = String(input?.itemType || '');
  const itemId = String(input?.itemId || '').trim();
  const visitorId = String(input?.visitorId || '');
  if (!ITEM_TYPES.has(itemType) || !/^[a-zA-Z0-9][a-zA-Z0-9._()+-]{0,99}$/.test(itemId)) {
    return { error: 'invalid_reaction' };
  }
  if (!/^[a-zA-Z0-9_-]{20,80}$/.test(visitorId)) return { error: 'invalid_visitor' };
  return { value: { itemType, itemId, visitorId } };
};

const saveFeedback = async (request, env) => {
  const cors = corsHeaders(request, env);
  if (!isAllowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403, cors);
  if (!env.FEEDBACK_HASH_SECRET) return json({ error: 'service_not_configured' }, 503, cors);

  let input;
  try {
    input = await readBody(request);
  } catch (error) {
    return json({ error: error.message === 'payload_too_large' ? error.message : 'invalid_json' }, 400, cors);
  }

  const validated = validateFeedback(input);
  if (validated.error) return json({ error: validated.error }, 400, cors);
  const value = validated.value;
  const visitorHash = await hashVisitor(value.visitorId, env.FEEDBACK_HASH_SECRET);
  const now = new Date().toISOString();

  await env.FEEDBACK_DB.prepare(`
    INSERT INTO feedback (
      visitor_hash, tool, vote, reason, comment, language, page_path, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(visitor_hash, tool) DO UPDATE SET
      vote = excluded.vote,
      reason = excluded.reason,
      comment = excluded.comment,
      language = excluded.language,
      page_path = excluded.page_path,
      deleted_at = NULL,
      updated_at = excluded.updated_at
  `).bind(
    visitorHash, value.tool, value.vote, value.reason, value.comment,
    value.language, value.pagePath, now, now,
  ).run();

  return json({ ok: true, updatedAt: now }, 200, cors);
};

const withdrawFeedback = async (request, env) => {
  const cors = corsHeaders(request, env);
  if (!isAllowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403, cors);
  if (!env.FEEDBACK_HASH_SECRET) return json({ error: 'service_not_configured' }, 503, cors);

  let input;
  try {
    input = await readBody(request);
  } catch (error) {
    return json({ error: error.message === 'payload_too_large' ? error.message : 'invalid_json' }, 400, cors);
  }
  const visitorId = String(input?.visitorId || '');
  const tool = String(input?.tool || '');
  if (!TOOLS.has(tool) || !/^[a-zA-Z0-9_-]{20,80}$/.test(visitorId)) {
    return json({ error: 'invalid_feedback' }, 400, cors);
  }
  const visitorHash = await hashVisitor(visitorId, env.FEEDBACK_HASH_SECRET);
  const now = new Date().toISOString();
  await env.FEEDBACK_DB.prepare(`
    UPDATE feedback SET deleted_at = ?, updated_at = ?
    WHERE visitor_hash = ? AND tool = ?
  `).bind(now, now, visitorHash, tool).run();
  return json({ ok: true, updatedAt: now }, 200, cors);
};

const listFeedback = async (request, env) => {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!await secureEqual(token, env.FEEDBACK_ADMIN_TOKEN)) {
    return json({ error: 'unauthorized' }, 401, { 'cache-control': 'no-store' });
  }

  const url = new URL(request.url);
  const after = url.searchParams.get('after') || '';
  const statement = after
    ? env.FEEDBACK_DB.prepare(`
        SELECT id, tool, vote, reason, comment, language, page_path, created_at, updated_at, deleted_at
        FROM feedback WHERE updated_at > ? ORDER BY updated_at ASC LIMIT 5000
      `).bind(after)
    : env.FEEDBACK_DB.prepare(`
        SELECT id, tool, vote, reason, comment, language, page_path, created_at, updated_at, deleted_at
        FROM feedback ORDER BY updated_at ASC LIMIT 5000
      `);
  const { results = [] } = await statement.all();
  return json({ responses: results, fetchedAt: new Date().toISOString() }, 200, {
    'cache-control': 'no-store',
  });
};

const saveReaction = async (request, env) => {
  const cors = corsHeaders(request, env);
  if (!isAllowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403, cors);
  if (!env.FEEDBACK_HASH_SECRET) return json({ error: 'service_not_configured' }, 503, cors);
  let input;
  try { input = await readBody(request); }
  catch (error) { return json({ error: error.message === 'payload_too_large' ? error.message : 'invalid_json' }, 400, cors); }
  const validated = validateReaction(input);
  if (validated.error) return json({ error: validated.error }, 400, cors);
  const value = validated.value;
  const visitorHash = await hashVisitor(value.visitorId, env.FEEDBACK_HASH_SECRET);
  const now = new Date().toISOString();
  await env.FEEDBACK_DB.prepare(`
    INSERT INTO reactions (visitor_hash, item_type, item_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(visitor_hash, item_type, item_id) DO UPDATE SET
      deleted_at = NULL, updated_at = excluded.updated_at
  `).bind(visitorHash, value.itemType, value.itemId, now, now).run();
  return json({ ok: true, updatedAt: now }, 200, cors);
};

const withdrawReaction = async (request, env) => {
  const cors = corsHeaders(request, env);
  if (!isAllowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403, cors);
  if (!env.FEEDBACK_HASH_SECRET) return json({ error: 'service_not_configured' }, 503, cors);
  let input;
  try { input = await readBody(request); }
  catch (error) { return json({ error: error.message === 'payload_too_large' ? error.message : 'invalid_json' }, 400, cors); }
  const validated = validateReaction(input);
  if (validated.error) return json({ error: validated.error }, 400, cors);
  const value = validated.value;
  const visitorHash = await hashVisitor(value.visitorId, env.FEEDBACK_HASH_SECRET);
  const now = new Date().toISOString();
  await env.FEEDBACK_DB.prepare(`
    UPDATE reactions SET deleted_at = ?, updated_at = ?
    WHERE visitor_hash = ? AND item_type = ? AND item_id = ?
  `).bind(now, now, visitorHash, value.itemType, value.itemId).run();
  return json({ ok: true, updatedAt: now }, 200, cors);
};

const reactionCounts = async (request, env) => {
  const cors = corsHeaders(request, env);
  if (!isAllowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403, cors);
  const url = new URL(request.url);
  const rawItems = (url.searchParams.get('items') || '').split(',').filter(Boolean).slice(0, 200);
  const items = rawItems.map((item) => {
    const separator = item.indexOf(':');
    return { itemType: item.slice(0, separator), itemId: item.slice(separator + 1), key: item };
  }).filter(({ itemType, itemId }) => ITEM_TYPES.has(itemType) && /^[a-zA-Z0-9][a-zA-Z0-9._()+-]{0,99}$/.test(itemId));
  if (!items.length) return json({ counts: {} }, 200, { ...cors, 'cache-control': 'public, max-age=30' });
  const where = items.map(() => '(item_type = ? AND item_id = ?)').join(' OR ');
  const bindings = items.flatMap(({ itemType, itemId }) => [itemType, itemId]);
  const { results = [] } = await env.FEEDBACK_DB.prepare(`
    SELECT item_type, item_id, COUNT(*) AS total FROM reactions
    WHERE deleted_at IS NULL AND (${where}) GROUP BY item_type, item_id
  `).bind(...bindings).all();
  const counts = Object.fromEntries(items.map(({ key }) => [key, 0]));
  results.forEach((row) => { counts[`${row.item_type}:${row.item_id}`] = Number(row.total); });
  return json({ counts }, 200, { ...cors, 'cache-control': 'public, max-age=30' });
};

const listReactions = async (request, env) => {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!await secureEqual(token, env.FEEDBACK_ADMIN_TOKEN)) {
    return json({ error: 'unauthorized' }, 401, { 'cache-control': 'no-store' });
  }
  const after = new URL(request.url).searchParams.get('after') || '';
  const statement = after
    ? env.FEEDBACK_DB.prepare('SELECT id, item_type, item_id, created_at, updated_at, deleted_at FROM reactions WHERE updated_at > ? ORDER BY updated_at ASC LIMIT 5000').bind(after)
    : env.FEEDBACK_DB.prepare('SELECT id, item_type, item_id, created_at, updated_at, deleted_at FROM reactions ORDER BY updated_at ASC LIMIT 5000');
  const { results = [] } = await statement.all();
  return json({ reactions: results, fetchedAt: new Date().toISOString() }, 200, { 'cache-control': 'no-store' });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && (url.pathname === '/v1/feedback' || url.pathname === '/v1/reactions')) {
      const cors = corsHeaders(request, env);
      if (!isAllowedOrigin(request, env)) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
          'access-control-allow-headers': 'content-type',
          'access-control-max-age': '86400',
        },
      });
    }
    if (request.method === 'POST' && url.pathname === '/v1/feedback') return saveFeedback(request, env);
    if (request.method === 'DELETE' && url.pathname === '/v1/feedback') return withdrawFeedback(request, env);
    if (request.method === 'GET' && url.pathname === '/v1/feedback') return listFeedback(request, env);
    if (request.method === 'POST' && url.pathname === '/v1/reactions') return saveReaction(request, env);
    if (request.method === 'DELETE' && url.pathname === '/v1/reactions') return withdrawReaction(request, env);
    if (request.method === 'GET' && url.pathname === '/v1/reactions') {
      return request.headers.has('authorization') ? listReactions(request, env) : reactionCounts(request, env);
    }
    if (request.method === 'GET' && url.pathname === '/health') return json({ ok: true });
    return json({ error: 'not_found' }, 404);
  },
};

export { hashVisitor, validateFeedback, validateReaction };
