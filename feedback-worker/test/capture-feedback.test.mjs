import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { validateFeedback } from '../src/index.js';

test('accepts capture sequencer votes in all languages with the existing validation rules', () => {
  for (const language of ['ca', 'es', 'en']) {
    const base = { tool: 'capture-sequencer', visitorId: '12345678901234567890', language };
    assert.equal(validateFeedback({ ...base, vote: 'up' }).value.tool, base.tool);
    assert.equal(validateFeedback({ ...base, vote: 'down', reason: 'missing' }).value.language, language);
    assert.equal(validateFeedback({ ...base, vote: 'down' }).error, 'invalid_reason');
  }
});

test('migration preserves existing and withdrawn feedback, indexes and vote uniqueness', () => {
  const db = new DatabaseSync(':memory:');
  try {
    for (const migration of ['0001_create_feedback.sql', '0002_allow_withdrawal.sql', '0003_create_reactions.sql']) {
      db.exec(readFileSync(new URL('../migrations/' + migration, import.meta.url), 'utf8'));
    }
    db.exec(`INSERT INTO feedback
      (visitor_hash, tool, vote, created_at, updated_at, deleted_at)
      VALUES ('original', 'visibility', 'up', '2026-01-01', '2026-01-02', '2026-01-03')`);
    const before = db.prepare('SELECT * FROM feedback').all();
    db.exec(readFileSync(new URL('../migrations/0004_capture_sequencer_feedback.sql', import.meta.url), 'utf8'));
    assert.deepEqual(db.prepare('SELECT * FROM feedback').all(), before);
    db.exec(`INSERT INTO feedback (visitor_hash, tool, vote, created_at, updated_at)
      VALUES ('new', 'capture-sequencer', 'up', '2026-01-01', '2026-01-01')`);
    assert.throws(() => db.exec(`INSERT INTO feedback (visitor_hash, tool, vote, created_at, updated_at)
      VALUES ('new', 'capture-sequencer', 'up', '2026-01-01', '2026-01-01')`), /UNIQUE/);
    assert.throws(() => db.exec(`INSERT INTO feedback (visitor_hash, tool, vote, created_at, updated_at)
      VALUES ('bad', 'unknown', 'up', '2026-01-01', '2026-01-01')`), /CHECK/);
    const indexes = db.prepare("SELECT name FROM sqlite_master WHERE type='index'").all().map(row => row.name);
    for (const name of ['feedback_updated_at_idx', 'feedback_tool_idx', 'feedback_deleted_at_idx']) assert.ok(indexes.includes(name));
  } finally { db.close(); }
});
