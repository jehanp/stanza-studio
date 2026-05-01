# Suno Style Prompts — Chord Progressions by Song Section

How to prompt Suno with specific chord progressions across verses, choruses, bridges, intros, and outros.

---

## The Problem: Suno Ignores Chord Progressions in Style Tags

**Symptom:** You include chord names like `Am–F–C–G` in your style prompt or lyrics but Suno either ignores them entirely or interprets them inconsistently across sections.

**Why it happens:** Suno's generation model is primarily conditioned on genre, mood, and texture tags. Raw chord notation placed in the style field is treated as low-priority or unknown text. Chord specificity lives in the *lyrics structure and section framing* — not the style tag alone.

**The fix:** A three-layer approach:
1. Name the progression using established shorthand in the style tag
2. Frame each section in the lyrics using Suno's section markers and embed harmonic cues inside them
3. Use mood and genre tags that statistically correlate with your target progression

---

## How Suno Actually Uses Chord Information

| Input type | How Suno responds |
|------------|-------------------|
| Raw chord names in style field (`Am F C G`) | Mostly ignored — treated as unknown tags |
| Named progressions (`i–VI–III–VII`, `50s progression`) | Partially interpreted — recognized if genre context supports it |
| Section markers with harmonic mood tags inside them | More reliable — mood/feel inside a section shapes the harmony within that section |
| Genre tags that statistically imply a progression | Most reliable — genre encodes harmonic expectation |
| Artist reference tags | Reliable — artist style implies characteristic chord language |

---

## Layer 1 — Style Tag: Name the Progression

Instead of raw chord notation, use named progression types or Roman numeral shorthand that Suno can pattern-match against genre context.

### Common Named Progressions

| Name | Chords (key of C) | Roman numerals | Genre associations |
|------|--------------------|----------------|--------------------|
| **50s progression** | C–Am–F–G | I–vi–IV–V | doo-wop, classic rock, pop ballad |
| **Andalusian cadence** | Am–G–F–E | i–VII–VI–V | flamenco, folk, cinematic, dark |
| **Pachelbel / Canon** | D–A–Bm–F#m–G–D–G–A | I–V–vi–iii–IV–I–IV–V | pop, cinematic, anthemic |
| **12-bar blues** | I–I–I–I–IV–IV–I–I–V–IV–I–I | — | blues, rock, soul, gospel |
| **Minor i–VI–III–VII** | Am–F–C–G | i–VI–III–VII | pop, emo, indie, anthemic |
| **i–VII–VI–VII** | Am–G–F–G | i–VII–VI–VII | rock, grunge, folk-rock |
| **iv–I vamp** | Fm–C / Dm–A | iv–I | soul, R&B, gospel, film score |
| **ii–V–I** | Dm–G–C | ii–V–I | jazz, bossa nova, sophisticated pop |
| **I–V–vi–IV** | C–G–Am–F | I–V–vi–IV | modern pop (Axis of Awesome) |
| **sus4 vamp** | Dsus4–D / Asus4–A | Isus4–I | atmospheric, cinematic, post-rock |
| **Dorian vamp** | Am–G / Dm–C | i–VII (Dorian) | modal rock, folk-rock, Santana |
| **Modal / drone** | Am drone / Im | pedal point | Indian classical, ambient, drone rock |

### Style Tag Usage

Place the progression name as a descriptor alongside genre and mood tags:

```
50s chord progression, doo-wop, classic rock, nostalgic, warm, major key
```

```
Andalusian cadence, flamenco-influenced, dark, descending bassline, minor, cinematic
```

```
i–VI–III–VII progression, emo, indie rock, anthemic, minor, emotionally open
```

```
12-bar blues structure, blues rock, electric guitar, soulful, gritty
```

```
dorian modal vamp, folk rock, modal melody, Am–G groove, earthy, hypnotic
```

---

## Layer 2 — Lyrics Structure: Section Markers with Harmonic Cues

Suno reads section markers in your lyrics. You can embed harmonic and mood information inside each section to steer the chord language for that part of the song.

### Suno Section Markers

```
[Intro]
[Verse]
[Pre-Chorus]
[Chorus]
[Bridge]
[Outro]
[Instrumental]
[Solo]
[Break]
```

### Embedding Harmonic Cues Inside Sections

Add parenthetical or bracketed descriptors alongside section names:

```
[Verse - minor, introspective, descending]
[Chorus - major lift, anthemic, open]
[Bridge - suspended tension, unresolved]
[Outro - fading, modal, drone]
```

Suno reads these descriptors and adjusts the emotional and harmonic texture of that section accordingly. The descriptors do not need to be chord names — they need to be *emotional and harmonic characters* that Suno can map to its learned vocabulary.

---

## Layer 3 — Section-by-Section Harmonic Strategy

Each section has a conventional harmonic role. Understanding that role helps you write descriptors that steer Suno toward the chord language you want.

---

### Intro

**Harmonic role:** Establish key, mood, and world. Can be ambiguous or fully resolved. Sets expectations.

**Common approaches:**
- Start on I or i — anchors the key immediately
- Start on IV or VI — creates lift and openness before the verse
- Drone/pedal point — modal, cinematic, ambiguous
- Unresolved sus chord — tension before the song begins

**Descriptor tags for intros:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Rooted, grounded opening | `opening on tonic`, `rooted intro`, `settled, grounded` |
| Ambiguous, cinematic | `suspended intro`, `unresolved opening`, `atmospheric`, `drone intro` |
| Dark, foreboding | `minor intro`, `descending intro`, `brooding`, `low and dark` |
| Bright, anticipatory | `major key opening`, `hopeful intro`, `lifted`, `warm and open` |
| Modal, non-Western | `modal intro`, `drone-based intro`, `pedal point`, `no clear tonic` |

**Example section marker:**
```
[Intro - drone, modal, unresolved, atmospheric]
```

---

### Verse

**Harmonic role:** Narrative. Tells the story. Usually more restrained than the chorus — harmonically simpler or more circular.

**Common verse progressions:**
- `i–VI–III–VII` — circular, continuous forward motion, never fully resolves (very common in modern pop/rock)
- `I–V–vi–IV` — similar circular motion in major
- `I–IV–V–I` — classic resolved motion, folk and blues feel
- `i–VII–VI–VII` — rocking back and forth, grunge and folk-rock
- `Dorian vamp (i–VII)` — two-chord oscillation, hypnotic, modal

**Descriptor tags for verses:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Circular, never-resolving | `circular chord progression`, `unresolved loop`, `continuous minor motion` |
| Grounded, storytelling | `simple verse chords`, `rooted, folk-like`, `one chord per bar` |
| Dark, descending | `descending bass verse`, `falling progression`, `minor descent` |
| Rocking two-chord feel | `two-chord verse vamp`, `back-and-forth minor chords`, `hypnotic groove` |
| Modal, non-Western | `modal verse`, `dorian verse`, `drone-based verse` |

**Example section marker:**
```
[Verse - minor, circular, unresolved, introspective]
```

---

### Pre-Chorus

**Harmonic role:** Builds tension and momentum into the chorus. Often moves away from the verse's home chord — pulling toward the chorus arrival.

**Common pre-chorus approaches:**
- Sit on IV or iv — creates the "pull" toward the tonic in the chorus
- Move to V or VII — classic dominant build
- Stay on ii or II — subtle lift before the drop
- Chromatic rise or descent — tension through motion

**Descriptor tags for pre-choruses:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Classic dominant build | `building tension`, `pre-chorus rise`, `dominant build`, `V pedal` |
| Subdominant hold | `IV hold`, `sustained subdominant`, `unresolved lift` |
| Chromatic tension | `chromatic build`, `rising tension`, `ascending bass` |
| Energy ramp | `intensifying`, `compressed energy`, `momentum building` |

**Example section marker:**
```
[Pre-Chorus - building, rising tension, dominant hold]
```

---

### Chorus

**Harmonic role:** Emotional peak. Maximum harmonic clarity and resolution. This is where the song pays off what the verse built.

**Common chorus progressions:**
- `I–V–vi–IV` — anthemic, universally recognized, open and lifted
- `I–IV–V–I` — fully resolved, triumphant
- `i–VI–III–VII` — same loop as verse but with bigger arrangement; resolution comes from dynamics not harmony
- `IV–I` repeated — gospel lift; IV landing on I feels like release
- `VI–VII–i` — anthemic minor; dark but powerful

**Descriptor tags for choruses:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Anthemic, lifted, major | `anthemic chorus`, `major lift`, `open major chords`, `triumphant` |
| Powerful, dark minor | `anthemic minor`, `powerful minor chorus`, `dark and anthemic` |
| Gospel lift | `gospel lift chorus`, `IV–I resolution`, `uplifting release` |
| Explosive, unresolved | `explosive chorus`, `sustained tension`, `wall of sound`, `no full resolution` |
| Emotional release | `emotional peak`, `open vowels`, `cathartic`, `wide and full` |

**Example section marker:**
```
[Chorus - major lift, anthemic, open, full arrangement, cathartic]
```

---

### Bridge

**Harmonic role:** Contrast. Breaks the verse–chorus cycle. Often goes somewhere harmonically unexpected — a new key area, an unusual chord, or a pause in the progression.

**Common bridge approaches:**
- Relative major/minor shift — if the verse is minor, bridge goes to major (or vice versa)
- Subdominant region — IV or IV/IV (flat VII) — creates a "stepping outside" feeling
- Suspended harmony — sit on a sus2 or sus4 chord; tension without resolution
- Modal interchange — borrow a chord from the parallel minor or major
- Single chord / drone — strip back to one chord or a drone; creates stillness or menace

**Descriptor tags for bridges:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Relative key shift | `bridge shifts to relative major`, `bridge lifts to major`, `key change bridge` |
| Unexpected, surprising | `unexpected harmony`, `borrowed chord`, `modal interchange`, `outside the key` |
| Suspended, unresolved | `suspended bridge`, `sus chord bridge`, `unresolved tension`, `held breath` |
| Stripped back, still | `single chord bridge`, `drone bridge`, `stripped arrangement`, `quiet tension` |
| Dark turn | `minor bridge`, `dark turn`, `dissonant bridge`, `descending chromatic` |
| Recapitulation build | `bridge builds back`, `rising to final chorus`, `momentum build` |

**Example section marker:**
```
[Bridge - key shift, unexpected, suspended, stripped back, quiet tension]
```

---

### Outro

**Harmonic role:** Closure or deliberate refusal of closure. Either resolves everything or drifts away unresolved.

**Common outro approaches:**
- Stay on I or i and fade — harmonic rest; the song has said everything it needs to
- Repeat chorus loop and fade — keeps the energy alive as it fades
- Return to intro's drone/vamp — circular structure, the song ends where it began
- End on IV — "unfinished" feeling, the ear wants more resolution
- End on V — maximum unresolved tension; rare but powerful
- Chromatic descent to final I — cinematic closure

**Descriptor tags for outros:**

| Target sound | Descriptor to use |
|--------------|-------------------|
| Resolved, settled | `resolved outro`, `resting on tonic`, `final resolution`, `settled close` |
| Fading loop | `fading outro`, `chorus outro`, `repeating and fading`, `loop to close` |
| Circular return | `outro mirrors intro`, `returns to opening vamp`, `full circle` |
| Unresolved, open | `unresolved outro`, `ends on IV`, `open ending`, `incomplete resolution` |
| Maximum tension close | `ends unresolved`, `hanging on V`, `unsettled close`, `unfinished` |
| Cinematic descent | `descending outro`, `chromatic close`, `orchestral resolution`, `cinematic ending` |

**Example section marker:**
```
[Outro - fading, returns to opening drone, modal, unresolved]
```

---

## Full Song Examples

### Example 1 — Minor Anthemic Rock (i–VI–III–VII throughout)

**Style tag:**
```
i–VI–III–VII progression, minor anthemic rock, emotional, loud-quiet-loud, distorted guitar, powerful, cathartic
```

**Lyrics structure:**
```
[Intro - minor, atmospheric, drone, quiet opening]

[Verse - minor, circular, introspective, restrained arrangement]

[Pre-Chorus - building tension, rising energy, compressed]

[Chorus - anthemic minor, explosive, full arrangement, cathartic release]

[Verse 2 - minor, circular, introspective, slightly more energy than verse 1]

[Pre-Chorus - building tension, rising energy]

[Chorus - anthemic minor, explosive, full arrangement]

[Bridge - unexpected harmony, stripped back, suspended, key shift upward]

[Chorus - final, biggest arrangement, wall of sound, cathartic]

[Outro - fading, returns to intro's minor drone, circular close]
```

---

### Example 2 — Blues-Based Gospel Soul (12-bar + IV–I resolution)

**Style tag:**
```
12-bar blues structure, gospel soul, IV–I resolution in chorus, soulful male vocals, organ, warm, emotional, powerful
```

**Lyrics structure:**
```
[Intro - blues shuffle, organ, warm, rooted on I]

[Verse - 12-bar blues, storytelling, restrained, one chord per bar]

[Chorus - gospel lift, IV landing on I, full harmonies, cathartic, open and wide]

[Verse 2 - 12-bar blues, more ornamented, growing intensity]

[Chorus - gospel lift, fuller arrangement]

[Bridge - stays on IV, suspended subdominant, stripped to voice and organ]

[Chorus - final, biggest arrangement, full choir feel, triumphant resolution]

[Outro - resolves to I, slow fade, peaceful, settled]
```

---

### Example 3 — Cinematic Folk (Andalusian Cadence in verse, I–V–vi–IV in chorus)

**Style tag:**
```
Andalusian cadence verse, descending minor bassline, I–V–vi–IV chorus, cinematic folk, acoustic guitar, strings, emotional, bittersweet
```

**Lyrics structure:**
```
[Intro - descending Andalusian, minor, cinematic, acoustic guitar, strings entering slowly]

[Verse - Andalusian cadence, descending, dark, storytelling, minor feel]

[Pre-Chorus - pauses on V, suspended, breath before the lift]

[Chorus - lifts to major, I–V–vi–IV, open, bittersweet, strings swell]

[Verse 2 - Andalusian descent, same darkness as verse 1]

[Pre-Chorus - suspended V, mounting tension]

[Chorus - major lift, fuller arrangement, emotional peak]

[Bridge - stripped to voice and single guitar, unresolved, modal, still]

[Chorus - final, full arrangement, strings and guitar, bittersweet resolution]

[Outro - Andalusian cadence returns, descending to close, circular, cinematic]
```

---

### Example 4 — Dorian Modal Rock (Two-chord vamp)

**Style tag:**
```
dorian modal vamp, Am–G two-chord groove, folk rock, modal, hypnotic, earthy, acoustic-electric, raw
```

**Lyrics structure:**
```
[Intro - Am–G dorian vamp, modal, hypnotic, two-chord loop]

[Verse - dorian vamp, circular, Am–G groove, storytelling, understated]

[Chorus - still minor but opens up, adds C and D for brief resolution feel, anthemic, slightly bigger]

[Verse 2 - back to Am–G vamp, introspective]

[Bridge - drops to Am drone, single chord, stripped, meditative, modal]

[Chorus - returns with full energy, anthemic]

[Outro - returns to Am–G dorian vamp, fades, circular close]
```

---

## Genre Tags That Imply Specific Chord Languages

Use genre + mood pairs that carry harmonic expectation baked in:

| Genre / Mood tag | Implied chord language |
|------------------|------------------------|
| `classic rock anthem` | I–IV–V, power chords, diatonic |
| `doo-wop` | I–vi–IV–V (50s progression) |
| `bossa nova` | ii–V–I, jazz substitutions, major 7ths |
| `flamenco` | Andalusian cadence (i–VII–VI–V), Phrygian |
| `gospel` | IV–I resolution, I–ii–IV–I, rich harmony |
| `blues rock` | 12-bar blues, dominant 7ths |
| `grunge` | i–VII–VI, power chords, drop tuning |
| `emo / pop punk` | i–VI–III–VII or I–V–vi–IV |
| `shoegaze` | Suspended chords, dense layering, pedal tones |
| `post-rock` | Slow build, sus chords, I–IV cycling |
| `modal folk` | Dorian or Mixolydian vamp, two-chord oscillation |
| `cinematic score` | IV–I, I–VI, slow harmonic rhythm, orchestral |
| `soul / R&B` | ii–V–I, IV–I, chromatic passing chords |
| `reggae` | I–IV–V offbeat strum, major, relaxed |
| `jazz` | ii–V–I, tritone substitution, extended chords |

---

## Artist Reference Tags That Carry Harmonic Signatures

These references encode chord tendencies that Suno has learned:

| Artist reference | Harmonic character |
|------------------|--------------------|
| `Neil Young style` | Open guitar chords, I–IV–V, minor modal, raw |
| `Johnny Cash style` | Simple I–IV–V, country-folk, direct |
| `Radiohead style` | Unexpected modal chords, chromatic motion, unresolved |
| `Nick Cave style` | Minor, narrative, Dorian or Aeolian, dark and theatrical |
| `Leonard Cohen style` | Simple minor or major progressions, poetic, sparse |
| `A.R. Rahman style` | Modal, Indian-influenced harmony, unexpected lifts |
| `Beethoven style` | Classical harmonic movement, strong V–I resolution |
| `Bill Withers style` | Soul iv–I, warm major, syncopated rhythm |
| `Jeff Buckley style` | Minor, suspended chords, dramatic dynamic range |
| `Tom Waits style` | Dark, chromatic, cabaret-influenced, unusual chords |

---

## Quick Reference: Descriptor Cheat Sheet

Copy from here when writing section markers:

**Intro:**
```
rooted on tonic | drone, modal | suspended, unresolved | descending minor | atmospheric | brooding
```

**Verse:**
```
circular minor loop | descending bass | two-chord vamp | modal, dorian | storytelling, restrained | one chord per bar
```

**Pre-Chorus:**
```
building tension | dominant hold | rising energy | ascending bass | compressed momentum | suspended lift
```

**Chorus:**
```
major lift, anthemic | anthemic minor, explosive | gospel lift, IV–I | wall of sound | cathartic release | triumphant resolution
```

**Bridge:**
```
key change | borrowed chord | suspended, unresolved | stripped to drone | modal stillness | dark turn | chromatic descent | builds back to final chorus
```

**Outro:**
```
resolved, settled | fading loop | returns to intro vamp | circular close | unresolved, open | hanging on V | descending chromatic, cinematic
```

---

## Notes on Suno Behavior with Chord Information

- **Roman numerals** (`i–VI–III–VII`) in style tags are *sometimes* responded to but results are inconsistent — always pair them with genre tags that encode the same harmonic expectation
- **Named progressions** (`Andalusian cadence`, `50s progression`, `dorian vamp`) are more reliable than raw chord names because they carry genre + mood associations Suno has learned
- **Section marker descriptors** are the most reliable lever — Suno adjusts harmony, dynamics, and arrangement per section based on what it reads inside the brackets
- **Mood words correlate with chord types** in Suno's model: `dark, brooding` → minor chords; `anthemic, lifted` → major; `suspended, unresolved` → sus chords; `hypnotic, modal` → two-chord vamps or drones
- **Artist references** carry harmonic signatures — use them to anchor an overall chord language for the song
- **Genre tags** are the most reliable implicit chord specifiers — Suno has learned that `doo-wop` implies I–vi–IV–V, that `grunge` implies minor power chords with VII, etc.
- Suno will **not reliably maintain a single progression across all sections** unless genre + mood are consistent — plan for some harmonic interpretation variance between sections
