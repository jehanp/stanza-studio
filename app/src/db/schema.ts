import Database from "better-sqlite3";

export function applySchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS songs (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      number        INTEGER NOT NULL UNIQUE,
      slug          TEXT    NOT NULL UNIQUE,
      title         TEXT    NOT NULL,
      scripture_ref TEXT    NOT NULL DEFAULT '',
      scripture_book TEXT   NOT NULL DEFAULT '',
      core_theme    TEXT    NOT NULL DEFAULT '',
      genre         TEXT    NOT NULL DEFAULT '',
      suno_tags     TEXT    NOT NULL DEFAULT '',
      status        TEXT    NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','complete')),
      scheduled_date TEXT   NOT NULL DEFAULT '',
      created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS lyric_versions (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      song_id       INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
      version_label TEXT    NOT NULL,
      language      TEXT    NOT NULL DEFAULT 'en',
      content_md    TEXT,
      content_txt   TEXT,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      UNIQUE(song_id, version_label, language)
    );

    CREATE TABLE IF NOT EXISTS suno_generations (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      song_id           INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
      lyric_version_id  INTEGER REFERENCES lyric_versions(id) ON DELETE SET NULL,
      suno_clip_id      TEXT,
      audio_url         TEXT,
      video_url         TEXT,
      status            TEXT NOT NULL DEFAULT 'pending'
                            CHECK(status IN ('pending','running','complete','failed')),
      suno_tags         TEXT NOT NULL DEFAULT '',
      instrumental      INTEGER NOT NULL DEFAULT 0,
      created_at        TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ai_sessions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      song_id    INTEGER NOT NULL UNIQUE REFERENCES songs(id) ON DELETE CASCADE,
      messages   TEXT    NOT NULL DEFAULT '[]',
      model      TEXT    NOT NULL DEFAULT 'gpt-4o',
      created_at TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);
}
