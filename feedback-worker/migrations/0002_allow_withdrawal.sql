ALTER TABLE feedback ADD COLUMN deleted_at TEXT;

CREATE INDEX IF NOT EXISTS feedback_deleted_at_idx ON feedback(deleted_at);
