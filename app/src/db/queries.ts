import { getDb } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Song {
  id: number;
  number: number;
  slug: string;
  title: string;
  scripture_ref: string;
  scripture_book: string;
  core_theme: string;
  genre: string;
  suno_tags: string;
  status: "draft" | "complete";
  scheduled_date: string;
  created_at: string;
}

export interface LyricVersion {
  id: number;
  song_id: number;
  version_label: string;
  language: string;
  content_md: string | null;
  content_txt: string | null;
  created_at: string;
}

export interface SunoGeneration {
  id: number;
  song_id: number;
  lyric_version_id: number | null;
  suno_clip_id: string | null;
  audio_url: string | null;
  video_url: string | null;
  status: "pending" | "running" | "complete" | "failed";
  suno_tags: string;
  instrumental: number;
  created_at: string;
}

export interface AISession {
  id: number;
  song_id: number;
  messages: string; // JSON
  model: string;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// ─── Songs ────────────────────────────────────────────────────────────────────

export function getSongs(): Song[] {
  return getDb()
    .prepare("SELECT * FROM songs ORDER BY number ASC")
    .all() as Song[];
}

export function getSongBySlug(slug: string): Song | undefined {
  return getDb()
    .prepare("SELECT * FROM songs WHERE slug = ?")
    .get(slug) as Song | undefined;
}

export function updateSongStatus(
  slug: string,
  status: "draft" | "complete"
): void {
  getDb()
    .prepare("UPDATE songs SET status = ? WHERE slug = ?")
    .run(status, slug);
}

// ─── Lyric Versions ───────────────────────────────────────────────────────────

export function getLyricVersions(songId: number): LyricVersion[] {
  return getDb()
    .prepare(
      "SELECT * FROM lyric_versions WHERE song_id = ? ORDER BY language ASC, version_label ASC"
    )
    .all(songId) as LyricVersion[];
}

export function getLyricVersion(id: number): LyricVersion | undefined {
  return getDb()
    .prepare("SELECT * FROM lyric_versions WHERE id = ?")
    .get(id) as LyricVersion | undefined;
}

export function createLyricVersion(data: {
  song_id: number;
  version_label: string;
  language: string;
  content_md?: string | null;
  content_txt?: string | null;
}): LyricVersion {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO lyric_versions (song_id, version_label, language, content_md, content_txt)
       VALUES (@song_id, @version_label, @language, @content_md, @content_txt)`
    )
    .run({
      song_id: data.song_id,
      version_label: data.version_label,
      language: data.language,
      content_md: data.content_md ?? null,
      content_txt: data.content_txt ?? null,
    });
  return getLyricVersion(result.lastInsertRowid as number)!;
}

export function updateLyricVersion(
  id: number,
  data: {
    version_label?: string;
    language?: string;
    content_md?: string | null;
    content_txt?: string | null;
  }
): LyricVersion | undefined {
  const db = getDb();
  const current = getLyricVersion(id);
  if (!current) return undefined;
  db.prepare(
    `UPDATE lyric_versions
     SET version_label = @version_label,
         language      = @language,
         content_md    = @content_md,
         content_txt   = @content_txt
     WHERE id = @id`
  ).run({
    id,
    version_label: data.version_label ?? current.version_label,
    language: data.language ?? current.language,
    content_md: data.content_md !== undefined ? data.content_md : current.content_md,
    content_txt:
      data.content_txt !== undefined ? data.content_txt : current.content_txt,
  });
  return getLyricVersion(id);
}

export function deleteLyricVersion(id: number): void {
  getDb().prepare("DELETE FROM lyric_versions WHERE id = ?").run(id);
}

// ─── Suno Generations ─────────────────────────────────────────────────────────

export function getSunoGenerations(songId: number): SunoGeneration[] {
  return getDb()
    .prepare(
      "SELECT * FROM suno_generations WHERE song_id = ? ORDER BY created_at DESC"
    )
    .all(songId) as SunoGeneration[];
}

export function getSunoGenerationByClipId(
  clipId: string
): SunoGeneration | undefined {
  return getDb()
    .prepare("SELECT * FROM suno_generations WHERE suno_clip_id = ?")
    .get(clipId) as SunoGeneration | undefined;
}

export function createSunoGeneration(data: {
  song_id: number;
  lyric_version_id?: number | null;
  suno_tags?: string;
  instrumental?: boolean;
}): SunoGeneration {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO suno_generations (song_id, lyric_version_id, suno_tags, instrumental)
       VALUES (@song_id, @lyric_version_id, @suno_tags, @instrumental)`
    )
    .run({
      song_id: data.song_id,
      lyric_version_id: data.lyric_version_id ?? null,
      suno_tags: data.suno_tags ?? "",
      instrumental: data.instrumental ? 1 : 0,
    });
  return getDb()
    .prepare("SELECT * FROM suno_generations WHERE id = ?")
    .get(result.lastInsertRowid as number) as SunoGeneration;
}

export function updateSunoGeneration(
  id: number,
  data: {
    suno_clip_id?: string | null;
    audio_url?: string | null;
    video_url?: string | null;
    status?: "pending" | "running" | "complete" | "failed";
  }
): void {
  const db = getDb();
  const current = db
    .prepare("SELECT * FROM suno_generations WHERE id = ?")
    .get(id) as SunoGeneration | undefined;
  if (!current) return;
  db.prepare(
    `UPDATE suno_generations
     SET suno_clip_id = @suno_clip_id,
         audio_url    = @audio_url,
         video_url    = @video_url,
         status       = @status
     WHERE id = @id`
  ).run({
    id,
    suno_clip_id:
      data.suno_clip_id !== undefined ? data.suno_clip_id : current.suno_clip_id,
    audio_url:
      data.audio_url !== undefined ? data.audio_url : current.audio_url,
    video_url:
      data.video_url !== undefined ? data.video_url : current.video_url,
    status: data.status ?? current.status,
  });
}

// ─── AI Sessions ──────────────────────────────────────────────────────────────

export function getAISession(songId: number): AISession | undefined {
  return getDb()
    .prepare("SELECT * FROM ai_sessions WHERE song_id = ?")
    .get(songId) as AISession | undefined;
}

export function upsertAISession(
  songId: number,
  messages: AIMessage[],
  model: string
): void {
  getDb().prepare(`
    INSERT INTO ai_sessions (song_id, messages, model, updated_at)
    VALUES (@song_id, @messages, @model, datetime('now'))
    ON CONFLICT(song_id) DO UPDATE SET
      messages   = excluded.messages,
      model      = excluded.model,
      updated_at = datetime('now')
  `).run({
    song_id: songId,
    messages: JSON.stringify(messages),
    model,
  });
}
