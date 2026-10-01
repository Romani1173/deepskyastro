import assert from 'node:assert/strict';
import test from 'node:test';

import { hashVisitor, validateFeedback } from '../src/index.js';

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
