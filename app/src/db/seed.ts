import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const LYRICS_DIR =
  process.env.LYRICS_PATH ?? path.join(process.cwd(), "..", "lyrics");

interface SongMeta {
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
}

const SONG_METADATA: SongMeta[] = [
  {
    number: 0,
    slug: "00-glory-veiled-in-dust",
    title: "Glory Veiled in Dust",
    scripture_ref: "John 1:1-15",
    scripture_book: "John",
    core_theme: "Incarnation",
    genre: "Orchestral Alternative Rock",
    suno_tags: "sentimental, e-violin, dark melodic, orchestrale, alternative rock",
    status: "complete",
    scheduled_date: "2026-03-30",
  },
  {
    number: 1,
    slug: "01-green-pastures",
    title: "Green Pastures",
    scripture_ref: "Psalm 23:1-6",
    scripture_book: "Psalms",
    core_theme: "Peace",
    genre: "Indie Folk / Acoustic",
    suno_tags: "indie folk, acoustic, gentle fingerpicking, warm vocals, intimate",
    status: "draft",
    scheduled_date: "2026-04-13",
  },
  {
    number: 2,
    slug: "02-a-time-for-everything",
    title: "A Time for Everything",
    scripture_ref: "Ecclesiastes 3:1-8",
    scripture_book: "Ecclesiastes",
    core_theme: "Seasons",
    genre: "Soul / R&B Ballad",
    suno_tags: "soul, r&b, ballad, lush piano, strings",
    status: "draft",
    scheduled_date: "2026-04-27",
  },
  {
    number: 3,
    slug: "03-wings",
    title: "Wings",
    scripture_ref: "Isaiah 40:28-31",
    scripture_book: "Isaiah",
    core_theme: "Strength",
    genre: "Cinematic Pop / Anthemic",
    suno_tags: "cinematic pop, anthemic, piano, soaring, layered harmonies",
    status: "draft",
    scheduled_date: "2026-05-11",
  },
  {
    number: 4,
    slug: "04-come-away",
    title: "Come Away",
    scripture_ref: "Song of Solomon 2:10-13",
    scripture_book: "Song of Solomon",
    core_theme: "Love's Arrival",
    genre: "Neo-Soul / Jazzy Pop",
    suno_tags: "neo-soul, jazzy pop, rhodes piano, muted trumpet, groove",
    status: "draft",
    scheduled_date: "2026-05-25",
  },
  {
    number: 5,
    slug: "05-nothing-can",
    title: "Nothing Can",
    scripture_ref: "Romans 8:28-39",
    scripture_book: "Romans",
    core_theme: "Unbreakable",
    genre: "Alternative Rock / Post-Punk Revival",
    suno_tags: "alternative rock, post-punk, driving guitars, pounding drums",
    status: "draft",
    scheduled_date: "2026-06-08",
  },
  {
    number: 6,
    slug: "06-let-there-be",
    title: "Let There Be",
    scripture_ref: "Genesis 1:1-5, 26-31",
    scripture_book: "Genesis",
    core_theme: "Identity",
    genre: "Electronic / Synth-Pop",
    suno_tags: "electronic, synth-pop, pulsing synths, building, creation",
    status: "draft",
    scheduled_date: "2026-06-22",
  },
  {
    number: 7,
    slug: "07-new-every-morning",
    title: "New Every Morning",
    scripture_ref: "Lamentations 3:19-26",
    scripture_book: "Lamentations",
    core_theme: "Morning Mercy",
    genre: "Ambient / Dream Pop",
    suno_tags: "ambient, dream pop, reverb, soft pads, floating vocals",
    status: "draft",
    scheduled_date: "2026-07-06",
  },
  {
    number: 8,
    slug: "08-straight-ahead",
    title: "Straight Ahead",
    scripture_ref: "Proverbs 4:20-27",
    scripture_book: "Proverbs",
    core_theme: "Focus",
    genre: "Hip-Hop / Spoken Word over Lo-Fi Beats",
    suno_tags: "hip-hop, spoken word, lo-fi beats, rhythmic, confessional",
    status: "draft",
    scheduled_date: "2026-07-20",
  },
  {
    number: 9,
    slug: "09-what-remains",
    title: "What Remains",
    scripture_ref: "1 Corinthians 13:4-8, 13",
    scripture_book: "1 Corinthians",
    core_theme: "Enduring Love",
    genre: "Classic Soul / Motown-inspired",
    suno_tags: "classic soul, motown, warm brass, tambourine, timeless",
    status: "draft",
    scheduled_date: "2026-08-03",
  },
  {
    number: 10,
    slug: "10-where-were-you",
    title: "Where Were You",
    scripture_ref: "Job 38:1-11",
    scripture_book: "Job",
    core_theme: "Mystery",
    genre: "Progressive Rock / Art Rock",
    suno_tags: "progressive rock, art rock, dynamic shifts, orchestral swells",
    status: "draft",
    scheduled_date: "2026-08-17",
  },
  {
    number: 11,
    slug: "11-the-lucky-ones",
    title: "The Lucky Ones",
    scripture_ref: "Matthew 5:3-12",
    scripture_book: "Matthew",
    core_theme: "Blessedness",
    genre: "Indie Pop / Folk-Pop",
    suno_tags: "indie pop, folk-pop, upbeat, handclaps, gang vocals",
    status: "draft",
    scheduled_date: "2026-08-31",
  },
  {
    number: 12,
    slug: "12-every-thread",
    title: "Every Thread",
    scripture_ref: "Psalm 139:1-18",
    scripture_book: "Psalms",
    core_theme: "Known",
    genre: "Piano Ballad / Chamber Pop",
    suno_tags: "piano ballad, chamber pop, strings, raw, confessional",
    status: "draft",
    scheduled_date: "2026-09-14",
  },
  {
    number: 13,
    slug: "13-all-things-new",
    title: "All Things New",
    scripture_ref: "Revelation 21:1-5",
    scripture_book: "Revelation",
    core_theme: "Renewal",
    genre: "Gospel-influenced Orchestral Pop",
    suno_tags: "gospel, orchestral pop, choir, strings, brass, triumphant",
    status: "draft",
    scheduled_date: "2026-09-28",
  },
  {
    number: 14,
    slug: "14-the-weight-he-carried",
    title: "The Weight He Carried",
    scripture_ref: "Isaiah 53:3-6",
    scripture_book: "Isaiah",
    core_theme: "Redemptive Suffering",
    genre: "Dark Folk / Blues Americana",
    suno_tags: "dark folk, blues americana, acoustic guitar, slide guitar, haunting",
    status: "draft",
    scheduled_date: "2026-10-12",
  },
];

interface VersionInfo {
  versionLabel: string;
  language: string;
}

function parseVersionInfo(
  filename: string,
  slug: string
): VersionInfo | null {
  const ext = path.extname(filename);
  if (ext !== ".md" && ext !== ".txt") return null;

  const base = filename.slice(0, -ext.length);
  if (!base.startsWith(slug)) return null;

  const suffix = base.slice(slug.length).replace(/^-/, "");

  if (suffix === "") {
    return { versionLabel: "v1", language: "en" };
  }
  if (suffix === "si") {
    return { versionLabel: "v1", language: "si" };
  }
  const vMatch = suffix.match(/^v(\d+)$/);
  if (vMatch) {
    return { versionLabel: `v${vMatch[1]}`, language: "en" };
  }
  const siVMatch = suffix.match(/^si-v(\d+)$/);
  if (siVMatch) {
    return { versionLabel: `v${siVMatch[1]}`, language: "si" };
  }

  return null;
}

interface CountRow {
  c: number;
}

export function seed(db: Database.Database): void {
  const count = (db.prepare("SELECT COUNT(*) as c FROM songs").get() as CountRow).c;
  if (count > 0) return;

  const insertSong = db.prepare(`
    INSERT OR IGNORE INTO songs
      (number, slug, title, scripture_ref, scripture_book, core_theme, genre, suno_tags, status, scheduled_date)
    VALUES
      (@number, @slug, @title, @scripture_ref, @scripture_book, @core_theme, @genre, @suno_tags, @status, @scheduled_date)
  `);

  const insertVersion = db.prepare(`
    INSERT OR IGNORE INTO lyric_versions
      (song_id, version_label, language, content_md, content_txt)
    VALUES
      (@song_id, @version_label, @language, @content_md, @content_txt)
  `);

  const updateMd = db.prepare(`
    UPDATE lyric_versions
    SET content_md = @content_md
    WHERE song_id = @song_id AND version_label = 'v1' AND language = 'en'
  `);

  const getSongId = db.prepare(
    "SELECT id FROM songs WHERE slug = ?"
  ).pluck();

  const runSeed = db.transaction(() => {
    for (const meta of SONG_METADATA) {
      insertSong.run(meta);
      const songId = getSongId.get(meta.slug) as number;

      const songDir = path.join(LYRICS_DIR, meta.slug);
      if (!fs.existsSync(songDir)) continue;

      const files = fs.readdirSync(songDir);

      // Group .txt files by version/language
      for (const file of files) {
        const info = parseVersionInfo(file, meta.slug);
        if (!info) continue;

        const filePath = path.join(songDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const ext = path.extname(file);

        if (ext === ".txt") {
          insertVersion.run({
            song_id: songId,
            version_label: info.versionLabel,
            language: info.language,
            content_md: null,
            content_txt: content,
          });
        } else if (ext === ".md" && info.language === "en" && info.versionLabel === "v1") {
          // Update the v1/en row with md content (row may have been inserted by .txt already)
          insertVersion.run({
            song_id: songId,
            version_label: "v1",
            language: "en",
            content_md: content,
            content_txt: null,
          });
          updateMd.run({ song_id: songId, content_md: content });
        }
      }
    }
  });

  runSeed();
}
