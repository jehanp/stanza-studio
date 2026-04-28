# Stanza Studio — App

A local personal-use web app for managing the scripture-to-lyrics project. Built with Next.js 15, SQLite, GitHub Models (AI), and Suno.

## Quick Start

```bash
cd app
cp .env.example .env.local
# Edit .env.local and add your GITHUB_TOKEN
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description | Required |
|---|---|---|
| `GITHUB_TOKEN` | GitHub PAT with Copilot Models access | For AI features |
| `SUNO_API_URL` | Self-hosted suno-api URL (e.g. `http://localhost:3000`) | For Suno |
| `SUNO_COOKIE` | Direct Suno session cookie (alternative to `SUNO_API_URL`) | For Suno |
| `DATABASE_PATH` | SQLite file path (default: `./stanza.db`) | Optional |
| `LYRICS_PATH` | Path to lyrics directory (default: `../lyrics`) | Optional |
| `GITHUB_MODELS_MODEL` | AI model name (default: `gpt-4o`) | Optional |

## AI Assistant (GitHub Models)

The AI assistant uses the GitHub Models API endpoint (`https://models.inference.ai.azure.com`), which is free with a GitHub Copilot subscription. It uses `gpt-4o` by default.

Set `GITHUB_TOKEN` to a GitHub PAT that has Copilot Models access.

## Suno Integration

Two options:

**Option A — Self-hosted Docker container (recommended)**
```bash
docker run -d -p 3001:3000 \
  -e SUNO_COOKIE="<your-suno-cookie>" \
  gcui/suno-api
```
Then set `SUNO_API_URL=http://localhost:3001` in `.env.local`.

**Option B — Direct cookie calls**
Set `SUNO_COOKIE=<your-suno-session-cookie>` in `.env.local`.

To find your Suno cookie: log in to [suno.ai](https://suno.ai), open DevTools → Network, find a request to `studio-api.suno.ai`, and copy the `Cookie` request header.

## Database

The app uses SQLite (`stanza.db` in the `app/` directory). On first run, it automatically seeds from the `lyrics/` directory — reading all `.md` and `.txt` files and populating the database.

The `lyrics/` files are the source of truth for seeding; they are never modified by the app.

## Project Structure

```
app/
  src/
    db/
      client.ts     ← SQLite singleton (better-sqlite3)
      schema.ts     ← CREATE TABLE definitions
      seed.ts       ← Seeds DB from lyrics/ on first run
      queries.ts    ← Typed query helpers
    lib/
      ai.ts         ← GitHub Models / OpenAI SDK wrapper
      suno.ts       ← Suno API client (Docker + direct cookie)
    app/
      page.tsx               ← Dashboard (song cards)
      songs/[slug]/
        page.tsx             ← Song detail (server component)
        SongTabs.tsx         ← Tab switcher (client)
        LyricsPanel.tsx      ← Lyric versions + editor (client)
        AIChat.tsx           ← AI chat interface (client)
        SunoPanel.tsx        ← Suno generate + player (client)
      api/
        songs/               ← CRUD API
        songs/[slug]/ai/     ← GitHub Models proxy
        songs/[slug]/suno/   ← Suno generate
        suno/status/[clipId] ← Suno status poll
```
