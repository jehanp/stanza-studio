# Suno Style Prompts — Raga × Grunge

Style tags and descriptions for mixing Indian classical raga with grunge/rock in Suno.
These can be used as-is or combined/modified. Each section explores a different angle of the blend.

---

## The Problem: Indian Styles Only Appear in Instrumentals

**Symptom:** You add raga/Indian tags but the actual sung lines sound like a normal Western rock song. The Indian elements only appear in the intro, interludes, and instrumental breaks.

**Why it happens:** Suno's vocal model defaults to Western pop/rock phrasing. Style tags like `raga`, `sitar`, `tabla` are primarily interpreted as *production and arrangement* instructions — they tell Suno what instruments to use and what to play in gaps between vocals. They do not tell Suno *how the singer should sing*.

**The fix:** You must add **vocal performance tags** — words that describe the ornamentation, phrasing technique, and melodic shape of the voice itself.

### Vocal Performance Tags to Add

These specifically target the singing, not just the instruments:

| Tag | What it does |
|-----|-------------|
| `melismatic vocals` | Multiple notes per syllable — the core feature of Indian classical singing |
| `ornamented vocals` | General instruction to add embellishments to the melody |
| `vocal meend` | Sliding/gliding between notes in the voice (the raga slide) |
| `vocal gamak` | Heavy oscillation/shake in the voice |
| `khayal vocal style` | Hindustani classical singing style — expansive, ornamented |
| `thumri vocal style` | Lighter, more emotional/expressive classical style |
| `bhajan vocal style` | Devotional singing — repetitive, yearning, meditative |
| `alap-style phrasing` | Slow, exploratory vocal phrasing, note-by-note revelation |
| `taan-like vocal runs` | Fast cascading melodic runs in the voice |
| `Hindustani vocal technique` | Broad signal to Suno for classical Indian vocal approach |
| `Indian vocal ornaments` | General ornament instruction for the voice |
| `devotional male vocals` | Shifts the vocal character away from rock toward devotional |
| `modal vocal melody` | Pushes the melody away from Western major/minor toward a modal feel |
| `microtonal vocal bends` | Explicit instruction for pitch inflection in the voice |
| `vocal drone harmony` | Voice harmonizes with or over a drone — anchors raga feeling |

### Revised Prompt (from your original)

**Your original:**
```
Indian classical grunge fusion, raga, bittersweet, melancholic, distorted sitar, electric guitar, tabla, heavy drums, drone, male vocal, haunting, dark, raw, emotional, slow grunge, karuna, longing, powerful, cinematic
```

**Revised — with vocal performance integrated:**
```
Indian classical grunge fusion, raga bhairavi, bittersweet, melancholic, distorted sitar, electric guitar, tabla, heavy drums, drone, Hindustani male vocalist, khayal vocal style, melismatic vocals, vocal meend, ornamented vocal melody, modal vocal phrasing, haunting, dark, raw, emotional, slow grunge, karuna, longing, powerful, cinematic
```

Key changes:
- `male vocal` → `Hindustani male vocalist` — anchors the voice in an Indian tradition
- Added `khayal vocal style`, `melismatic vocals`, `vocal meend`, `ornamented vocal melody`, `modal vocal phrasing` — these directly target how the voice performs on the sung lines
- Added `raga bhairavi` — a specific raga name gives the melody a target character

### Additional Strategy: A.R. Rahman Reference

Adding `A.R. Rahman style` or `inspired by A.R. Rahman` signals a known fusion context where Indian and Western elements are genuinely woven together in the vocals, not just in the production. Suno has enough training data here to respond meaningfully.

```
A.R. Rahman fusion, raga bhairavi, Hindustani male vocalist, melismatic vocals, khayal phrasing, ornamented vocal melody, slow grunge, distorted sitar, electric guitar, tabla, drone, dark, aching, cinematic
```

### What "Melismatic" Does vs. Normal Rock Singing

- **Western rock singing:** One note per syllable, sustained vowels, vibrato on held notes
- **Indian classical singing (melismatic):** Many notes across a single syllable — the voice moves through a phrase while still on one word. This is the sound you want.

When Suno sees `melismatic`, it interprets: *the voice should move through multiple pitches on each syllable*, which is the core sonic character of raga-influenced singing.

---

## The Background Arrangement Problem: Indian Instruments Drop Out During Vocals

**Symptom:** The intro and instrumental breaks sound unmistakably Indian — sitar lines, tabla patterns, tanpura humming — but the moment the vocals enter, the backing reverts to a standard Western guitar + kit texture. The Indian elements reappear only in the gaps between sung lines.

**Why it happens:** Suno treats named instruments as *color* — it schedules them as fills and solo features rather than as a persistent rhythmic or harmonic bed. When the vocalist enters, Suno clears space by defaulting to its most reliable backing: a Western drum kit and rhythm guitar. Indian classical elements get pushed to the margins.

**The fix:** You must change how instruments are *framed* in your prompt — not just which instruments are listed. Tags need to specify the *arrangement role* of each instrument, not just its name.

### Strategy 1 — Replace, Don't Add

Instead of listing tabla alongside a Western drum kit, eliminate the kit entirely. When Suno has no drum kit to fall back on, it has to use the Indian drum as the rhythmic bed — including under vocals.

| Instead of | Use |
|------------|-----|
| `tabla, drum kit` | `no drum kit, tabla as main drum` |
| `mridanga, drums` | `mridanga groove, no snare or hi-hat` |
| `Indian percussion, percussion` | `tabla rhythm throughout, no Western kit` |

### Strategy 2 — Drone as a Persistent Anchor

`tanpura drone` is inherently continuous — it holds a pitch, not a melodic phrase. It is the easiest Indian element to keep alive under singing because it doesn't imply a solo turn. Pair it with explicit persistence tags:

```
tanpura drone throughout, persistent tanpura, continuous drone
```

This signals that the drone is a *texture layer*, not an intro feature.

### Strategy 3 — Countermelody Framing

A countermelody *runs alongside* the vocals. A named solo instrument *takes turns* with the singer. The framing changes Suno's scheduling:

| Instead of | Use |
|------------|-----|
| `sitar` | `sitar countermelody` or `sitar answering the voice` |
| `sarangi` | `sarangi countermelody` |
| `sitar, vocals` | `call and response sitar` |

`call and response sitar` is especially effective — it frames the instrument as part of the vocal exchange, not a separate solo that plays when the voice stops.

### Strategy 4 — Explicit Texture Density Tags

These tags discourage Suno from stripping back to a sparse backing for vocal sections:

```
dense layered arrangement, full arrangement throughout, continuous texture, no arrangement dropout
```

### Strategy 5 — Rhythmic Bed Framing

Frame Indian drums explicitly as the groove foundation — not just a named instrument:

```
tabla rhythm bed, tabla groove throughout, mridanga groove throughout, continuous tabla groove
```

Framing the drum as a *bed* or *groove* signals it is the floor of the arrangement, not a featured element that can be set aside.

### Revised Prompt — Background-Focused

**Basic (instruments named, no role framing):**
```
raga bhairavi grunge, tabla, sitar, tanpura, distorted electric guitar, Hindustani male vocalist, dark, raw
```

**Revised — with arrangement role framing:**
```
raga bhairavi grunge, no drum kit, tabla as main drum, continuous tabla groove, sitar countermelody, call and response sitar, tanpura drone throughout, persistent tanpura, distorted electric guitar, Hindustani male vocalist, dense layered arrangement, dark, devotional, raw
```

Key differences:
- `no drum kit` — forces Indian drum into the rhythmic bed role
- `tabla as main drum` + `continuous tabla groove` — names the drum and its arrangement role
- `sitar countermelody` + `call and response sitar` — keeps the instrument active *during* vocals, not only in gaps
- `tanpura drone throughout` + `persistent tanpura` — anchors the drone as a continuous texture layer
- `dense layered arrangement` — discourages arrangement dropout when the voice enters

---

## Core Concept

Raga brings: **modal scales, microtonal bends, drone underpinning, slow-building emotional weight, spiritual gravity**
Grunge brings: **heavy distortion, raw dynamics, loud-quiet-loud tension, feedback, angst, earthiness**

The intersection: both are emotionally intense, both use tension-and-release, both have a quality of *suffering that becomes cathartic*.

---

## Style Prompt Sets

### 1. Raga Grunge (General)

```
raga rock, Indian classical grunge, sitar distortion, tabla drums, electric guitar drone, Bhairavi scale, heavy riffs, modal, cinematic, raw, lo-fi
```

---

### 2. Yaman × Shoegaze Grunge

*Yaman is an evening raga — peaceful, longing, slightly elevated. Blends well with atmospheric grunge and shoegaze.*

```
raga yaman, shoegaze, grunge, layered distorted guitars, sitar melody, tabla, heavy drone, slow burn, emotional, reverb-soaked, twilight
```

#### 2b. Yaman × Shoegaze Grunge — Veena-forward, less tabla

*Same raga and atmosphere but anchored in veena rather than tabla. The veena has a darker, more resonant low-end than sitar — it sits naturally under distorted guitars. Drums are kept Western (rock kit) so the groove stays grunge rather than pulling back into classical.*

```
raga yaman, shoegaze grunge, veena melody, distorted electric guitar, Western drum kit, tanpura drone, reverb-soaked, layered guitars, Hindustani male vocalist, melismatic vocals, vocal meend, ornamented vocal melody, modal vocal phrasing, slow burn, longing, bittersweet, twilight, cinematic, emotional, raw
```

Key choices:
- `veena melody` replaces `sitar melody` — deeper, more resonant, less bright
- `Western drum kit` instead of `tabla` — keeps the grunge rhythm feel; tabla would pull it back toward classical
- `tanpura drone` kept — this is what holds the raga identity underneath without needing tabla
- Vocal performance tags included so the Indian character shows in the singing, not just the interludes

---

### 3. Bhairavi × Seattle Grunge

*Bhairavi is devotional and melancholic — one of the most emotionally rich ragas. Strong match for the raw grief in classic Seattle grunge.*

```
raga bhairavi, grunge, sitar leads, dropped-D guitar, heavy distortion, tabla and drum kit, devotional, raw, aching, loud-quiet-loud, Nirvana-esque dynamics
```

#### 3b. Bhairavi × Seattle Grunge — Indian style integrated through sung lines

*The original above puts Indian elements in the production. This version adds tags that embed the raga character directly into the vocal melody and the guitar lines that follow and respond to the voice — so the Indian feel doesn't disappear the moment a line is sung.*

```
raga bhairavi, Seattle grunge, Hindustani male vocalist, khayal vocal style, melismatic vocals, vocal meend, ornamented vocal melody, modal vocal phrasing, call and response guitar, sitar-inflected electric guitar, guitar follows the vocal, veena undertone, tanpura drone, dropped-D guitar, heavy distortion, Western drum kit, loud-quiet-loud, devotional, raw, aching, melancholic, dark, cinematic, karuna rasa
```

Key choices:
- `khayal vocal style` + `melismatic vocals` + `vocal meend` + `ornamented vocal melody` — these four together force the voice to perform Indian classical ornaments on the sung lines, not just between them
- `modal vocal phrasing` — steers the melody away from Western verse-chorus shapes and toward the raga's contour
- `call and response guitar` — tells Suno the guitar should answer the voice; this creates the interlocking texture where the Indian guitar phrases appear *alongside* the singing, not only in gaps
- `sitar-inflected electric guitar` — asks for a guitar tone and technique that mimics sitar bends and meend slides; this keeps the Indian character present while the voice sings
- `guitar follows the vocal` — reinforces that the instrument tracks the voice rather than playing an independent Western riff underneath it
- `veena undertone` — a low, dark resonant Indian string presence under everything
- `tanpura drone` — holds the modal center throughout; the raga identity doesn't waver between sections
- `karuna rasa` — Bhairavi's emotional color (sorrow, compassion, devotion); naming the rasa gives Suno a mood anchor that goes beyond generic "sad"

---

### 4. Darbari Kanhada × Sludge / Heavy Grunge

*Darbari is night, gravity, serious weight. Alice in Chains territory.*

```
raga darbari, sludge rock, heavy grunge, dark modal riffs, slow tempo, palm muted guitar, komal gandhar, drone bass, minor key, heavy, brooding, midnight
```

---

### 5. Bhupali × Grunge Ballad

*Bhupali is pentatonic (5 notes) and peaceful — easier to fuse with Western rock. Good for anthemic or introspective grunge ballads.*

```
raga bhupali, pentatonic rock, grunge ballad, acoustic-electric, sitar overtones, tabla, emotive, open chords, cinematic, quietly powerful
```

---

### 6. Raga Todi × Psychedelic Grunge

*Todi is intense and pensive — complex, uses komal (flat) notes that create tension. Good for psychedelic, dissonant grunge.*

```
raga todi, psychedelic grunge, dissonant, komal notes, feedback, wah guitar, sitar bends, tabla groove, dark, meditative chaos, trance-like
```

---

### 7. General Fusion Tags (Mix and Match)

These are building-block style tags you can combine freely:

**Raga flavor tags:**
```
raga-influenced, Indian modal, sitar melody, tabla percussion, tanpura drone, komal notes, meend glides, alap intro, devotional, Carnatic, Hindustani
```

**Grunge/rock texture tags:**
```
heavy distortion, fuzz guitar, drop tuning, lo-fi, loud-quiet-loud, sludgy, grungy, feedback, angst, raw production, Seattle sound, gritty
```

**Mood/atmosphere tags:**
```
cinematic, dark, brooding, transcendent, spiritual, earthen, aching, cathartic, slow build, epic, introspective
```

---

## Template

Copy and customize:

```
raga [RAGA NAME], [GRUNGE SUBTYPE], [INSTRUMENT 1], [INSTRUMENT 2], [MOOD], [TEXTURE], [DYNAMIC]
```

Example:
```
raga bhairavi, grunge, sitar leads, distorted electric guitar, tabla, drum kit, aching, raw, devotional, loud-quiet-loud, dark cinematic
```

---

## Notes on Suno Behavior with Raga Tags

- Suno recognizes **"sitar"**, **"tabla"**, **"raga"**, **"Indian classical"** as instrument/style cues
- More specific raga names (Yaman, Bhairavi, Darbari) may influence melodic feel but results vary — pair them with mood descriptors to reinforce intent
- Adding **"drone"** or **"tanpura"** helps Suno anchor a static bass undertone
- **"modal"** helps steer away from standard Western chord progressions
- Combine **"meend"** or **"gliding notes"** for more expressive melodic bends
