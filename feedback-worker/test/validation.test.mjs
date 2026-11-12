import assert from 'node:assert/strict';
import test from 'node:test';

import { hashVisitor, validateFeedback, validateReaction } from '../src/index.js';

const valid = {
  tool: 'visibility',
  vote: 'down',
  reason: 'missing',
  comment: 'Me falta una opción.',
  visitorId: '12345678901234567890',
  language: 'es',
  pagePath: '/es/visibilidad/',
};

test('acepta una valoración negativa válida', () => {
  assert.equal(validateFeedback(valid).value.tool, 'visibility');
});

test('exige motivo para una valoración negativa', () => {
  assert.equal(validateFeedback({ ...valid, reason: '' }).error, 'invalid_reason');
});

test('rechaza herramientas desconocidas y comentarios largos', () => {
  assert.equal(validateFeedback({ ...valid, tool: 'unknown' }).error, 'invalid_feedback');
  assert.equal(validateFeedback({ ...valid, comment: 'x'.repeat(501) }).error, 'comment_too_long');
});

test('genera un identificador estable sin guardar el original', async () => {
  const first = await hashVisitor(valid.visitorId, 'secret');
  const second = await hashVisitor(valid.visitorId, 'secret');
  assert.equal(first, second);
  assert.notEqual(first, valid.visitorId);
  assert.equal(first.length, 64);
});

test('acepta corazones para fotografías y artículos', () => {
  assert.equal(validateReaction({ visitorId: valid.visitorId, itemType: 'photo', itemId: 'm31' }).value.itemId, 'm31');
  assert.equal(validateReaction({ visitorId: valid.visitorId, itemType: 'article', itemId: 'pixinsight-fase-lineal' }).value.itemType, 'article');
});

test('rechaza tipos e identificadores de reacción desconocidos', () => {
  assert.equal(validateReaction({ visitorId: valid.visitorId, itemType: 'video', itemId: 'm31' }).error, 'invalid_reaction');
  assert.equal(validateReaction({ visitorId: valid.visitorId, itemType: 'photo', itemId: '../m31' }).error, 'invalid_reaction');
});

test('cuenta más de 50 corazones sin superar el límite de parámetros de D1', async () => {
  const { default: worker } = await import('../src/index.js');
  const calls = [];
  const env = {
    ALLOWED_ORIGINS: 'https://deepskyastro.com',
    FEEDBACK_DB: {
      prepare: () => ({
        bind: (...values) => {
          calls.push(values.length);
          return { all: async () => ({ results: [{ item_type: values[0], item_id: values[1], total: 2 }] }) };
        },
      }),
    },
  };
  const items = Array.from({ length: 120 }, (_, index) => `photo:m${index + 1}`).join(',');
  const response = await worker.fetch(new Request(`https://api.test/v1/reactions?items=${items}`, { headers: { origin: 'https://deepskyastro.com' } }), env);
  const { counts } = await response.json();
  assert.equal(response.status, 200);
  assert.ok(calls.every((count) => count <= 100));
  assert.equal(calls.length, 3);
  assert.equal(counts['photo:m1'], 2);
  assert.equal(counts['photo:m120'], 0);
});

test('responde 429 cuando se supera el límite de escrituras', async () => {
  const { default: worker } = await import('../src/index.js');
  const env = {
    ALLOWED_ORIGINS: 'https://deepskyastro.com',
    FEEDBACK_HASH_SECRET: 'secret',
    WRITE_LIMITER: { limit: async () => ({ success: false }) },
  };
  const request = new Request('https://api.test/v1/reactions', {
    method: 'POST',
    headers: { origin: 'https://deepskyastro.com', 'content-type': 'application/json' },
    body: JSON.stringify({ visitorId: valid.visitorId, itemType: 'photo', itemId: 'm31' }),
  });
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 429);
});
