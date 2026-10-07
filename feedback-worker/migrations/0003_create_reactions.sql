CREATE TABLE IF NOT EXISTS reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_hash TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('photo', 'article')),
  item_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  UNIQUE(visitor_hash, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS reactions_updated_at_idx ON reactions(updated_at);
CREATE INDEX IF NOT EXISTS reactions_item_idx ON reactions(item_type, item_id);
