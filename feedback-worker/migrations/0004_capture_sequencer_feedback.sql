-- Preserve all responses, including withdrawn ones, while extending the tool constraint.
CREATE TABLE feedback_next (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_hash TEXT NOT NULL,
  tool TEXT NOT NULL CHECK (tool IN ('visibility', 'planning', 'analyser', 'my-night', 'capture-sequencer')),
  vote TEXT NOT NULL CHECK (vote IN ('up', 'down')),
  reason TEXT CHECK (reason IS NULL OR reason IN ('confusing', 'missing', 'broken', 'other')),
  comment TEXT NOT NULL DEFAULT '' CHECK (length(comment) <= 500),
  language TEXT NOT NULL DEFAULT 'es' CHECK (language IN ('ca', 'es', 'en')),
  page_path TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  UNIQUE(visitor_hash, tool)
);

INSERT INTO feedback_next
  (id, visitor_hash, tool, vote, reason, comment, language, page_path, created_at, updated_at, deleted_at)
SELECT id, visitor_hash, tool, vote, reason, comment, language, page_path, created_at, updated_at, deleted_at
FROM feedback;

DROP TABLE feedback;
ALTER TABLE feedback_next RENAME TO feedback;
CREATE INDEX feedback_updated_at_idx ON feedback(updated_at);
CREATE INDEX feedback_tool_idx ON feedback(tool);
CREATE INDEX feedback_deleted_at_idx ON feedback(deleted_at);
