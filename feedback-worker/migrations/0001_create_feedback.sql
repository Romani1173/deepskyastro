CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_hash TEXT NOT NULL,
  tool TEXT NOT NULL CHECK (tool IN ('visibility', 'planning', 'analyser', 'my-night')),
  vote TEXT NOT NULL CHECK (vote IN ('up', 'down')),
  reason TEXT CHECK (reason IS NULL OR reason IN ('confusing', 'missing', 'broken', 'other')),
  comment TEXT NOT NULL DEFAULT '' CHECK (length(comment) <= 500),
  language TEXT NOT NULL DEFAULT 'es' CHECK (language IN ('ca', 'es', 'en')),
  page_path TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(visitor_hash, tool)
);

CREATE INDEX IF NOT EXISTS feedback_updated_at_idx ON feedback(updated_at);
CREATE INDEX IF NOT EXISTS feedback_tool_idx ON feedback(tool);
