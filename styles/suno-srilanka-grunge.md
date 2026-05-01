# Suno Style Prompts — Sri Lankan × Grunge

Style tags and descriptions for mixing Sri Lankan musical traditions with grunge/rock in Suno.
These can be used as-is or combined/modified. Each section explores a different angle of the blend.

---

## The Problem: Sri Lankan Elements Only Appear in Instrumentals

**Symptom:** You add Sri Lankan instrument tags but the actual sung lines sound like a normal Western rock song. The Sri Lankan elements only appear in the intro, interludes, and fills.

**Why it happens:** Suno's vocal model defaults to Western pop/rock phrasing. Tags like `gata bera`, `rabana`, `kandyan` are interpreted as *production and arrangement* instructions — they tell Suno what instruments to use and what to play in gaps between vocals. They do not tell Suno *how the singer should sing*.

**The fix:** You must add **vocal performance tags** — words that describe the ornamentation, phrasing technique, and emotional character of the voice itself.

### Vocal Performance Tags to Add

These specifically target the singing, not just the instruments:

| Tag | What it does |
|-----|-------------|
| `melismatic vocals` | Multiple notes per syllable — present in both Sinhala classical and South Asian folk traditions |
| `ornamented vocals` | General instruction to add melodic embellishments |
| `microtonal vocal bends` | Pitch inflection characteristic of Sri Lankan and South Asian singing |
| `devotional male vocals` | Shifts vocal character toward ceremonial, Buddhist-devotional quality |
| `Sinhala folk vocal style` | Signals the earthy, rural, unpolished quality of traditional Sinhala song |
| `carnatic vocal style` | For Tamil Sri Lankan tradition — ornate, precise, South Indian classical |
| `modal vocal melody` | Pushes melody away from Western major/minor toward non-Western modal shapes |
| `call and response vocals` | Common in Sri Lankan folk and drumming ceremony contexts |
| `nasal vocal quality` | Common in South Asian traditional singing — cuts through heavy guitar |
| `vocal drone harmony` | Voice harmonizes with or against a drone — anchors non-Western feel |
| `chant-like vocals` | Repetitive, incantatory — connects to Buddhist pirith chanting |

### Revised Prompt (Example)

**Basic:**
```
Sri Lankan grunge fusion, gata bera drums, distorted electric guitar, rabana, drone, male vocal, dark, raw, heavy
```

**Revised — with vocal performance integrated:**
```
Sri Lankan grunge fusion, kandyan drumming, gata bera, distorted electric guitar, horanewa melody, tanpura drone, Sinhala male vocalist, melismatic vocals, microtonal vocal bends, modal vocal melody, ornamented vocals, raw, dark, heavy, devotional, cinematic
```

Key changes:
- `male vocal` → `Sinhala male vocalist` — anchors the voice in a Sri Lankan tradition
- Added `melismatic vocals`, `microtonal vocal bends`, `modal vocal melody`, `ornamented vocals` — these directly target how the voice performs on the sung lines
- Added `horanewa melody` — the Sri Lankan double-reed instrument gives the lead lines a distinctly Sri Lankan character
- `tanpura drone` — holds a modal center beneath everything

---

## The Background Arrangement Problem: Sri Lankan Instruments Drop Out During Vocals

**Symptom:** The intro and interludes sound unmistakably Sri Lankan, but as soon as the vocals start, the backing reverts to a standard Western guitar + kit texture. Sri Lankan instruments reappear only in the gaps between sung lines.

**Why it happens:** Suno treats named instruments as *color* — it schedules them as fills and solo features rather than as a persistent rhythmic or harmonic bed. When the vocalist enters, Suno clears space by defaulting to its most reliable backing: a Western drum kit and rhythm guitar. Sri Lankan elements get pushed to the margins.

**The fix:** You must change how instruments are *framed* in your prompt — not just which instruments are listed. Tags need to specify the *arrangement role* of each instrument, not just its name.

### Strategy 1 — Replace, Don't Add

Instead of listing Sri Lankan drums alongside a Western kit, eliminate the kit entirely. When Suno has no drum kit to fall back on, it has to use the Sri Lankan drum as the rhythmic bed — including under vocals.

| Instead of | Use |
|------------|-----|
| `gata bera, drum kit` | `no drum kit, gata bera as main drum` |
| `yak bera, drums` | `yak bera groove, no snare or hi-hat` |
| `kandyan drumming, percussion` | `kandyan rhythm throughout, no Western kit` |

### Strategy 2 — Drone as a Persistent Anchor

`tanpura drone` is inherently continuous — it holds a pitch, not a melodic phrase. It is the easiest Sri Lankan element to keep alive under singing because it doesn't imply a solo turn. Pair it with explicit persistence tags:

```
tanpura drone throughout, persistent tanpura, continuous drone
```

This signals that the drone is a *texture layer*, not an intro feature.

### Strategy 3 — Countermelody Framing

A countermelody *runs alongside* the vocals. A named solo instrument *takes turns* with the singer. The framing changes Suno's scheduling:

| Instead of | Use |
|------------|-----|
| `horanewa` | `horanewa countermelody` or `horanewa answering the voice` |
| `dotara` | `dotara countermelody` |
| `horanewa, vocals` | `call and response horanewa` |

`call and response horanewa` is especially effective — it frames the instrument as part of the vocal exchange, not a separate solo that plays when the voice stops.

### Strategy 4 — Explicit Texture Density Tags

These tags discourage Suno from stripping back to a sparse backing for vocal sections:

```
dense layered arrangement, full arrangement throughout, continuous texture, no arrangement dropout
```

### Strategy 5 — Rhythmic Bed Framing

Frame Sri Lankan drums explicitly as the groove foundation — not just a named instrument:

```
gata bera rhythm bed, yak bera groove throughout, kandyan rhythm throughout, continuous gata bera groove
```

Framing the drum as a *bed* or *groove* signals it is the floor of the arrangement, not a featured element that can be set aside.

### Revised Prompt — Background-Focused

**Basic (instruments named, no role framing):**
```
Sri Lankan grunge, gata bera, horanewa, tanpura, distorted electric guitar, Sinhala male vocalist, dark, raw
```

**Revised — with arrangement role framing:**
```
Sri Lankan grunge, no drum kit, gata bera as main drum, continuous gata bera groove, horanewa countermelody, call and response horanewa, tanpura drone throughout, persistent tanpura, distorted electric guitar, Sinhala male vocalist, dense layered arrangement, dark, ceremonial, raw
```

Key differences:
- `no drum kit` — forces Sri Lankan drum into the rhythmic bed role
- `gata bera as main drum` + `continuous gata bera groove` — names the drum and its arrangement role
- `horanewa countermelody` + `call and response horanewa` — keeps the instrument active *during* vocals, not only in gaps
- `tanpura drone throughout` + `persistent tanpura` — anchors the drone as a continuous texture layer
- `dense layered arrangement` — discourages arrangement dropout when the voice enters

---

## Sri Lankan Musical Traditions: A Reference

### Key Instruments

| Instrument | Description |
|------------|-------------|
| **Gata Bera** | Kandyan two-headed barrel drum — the signature drum of up-country Sri Lanka. Ceremonial, powerful, complex rhythmic patterns. |
| **Yak Bera** | Low-country drum — deeper, faster, more aggressive than Gata Bera. Often used in tovil (exorcism) rituals. |
| **Rabana** | Frame drum (like a large tambourine) — used in folk and festive contexts, played by groups. |
| **Horanewa** | Sri Lankan double-reed instrument similar to shehnai — used in Kandyan ceremonies, piercing and nasal. |
| **Dotara** | Traditional plucked string instrument, rustic and folk in character. |
| **Miridangaya** | Barrel drum used in Carnatic/classical contexts in Sri Lanka. |
| **Thalampataa** | Small pair of cymbals — rhythmic punctuation in Kandyan ceremonies. |
| **Tanpura** | Drone instrument — holds a continuous harmonic foundation (shared with South Asian tradition). |

### Musical Traditions

| Tradition | Character |
|-----------|-----------|
| **Kandyan** | Up-country ceremonial music — majestic, structured, tied to Buddhist ritual and Kandyan dance. Gata Bera is central. |
| **Low-country drumming** | Faster, more intense than Kandyan. Associated with yak bera, tovil ritual, trance states. |
| **Baila** | Portuguese-influenced folk genre — lively, communal, festive. Can carry melancholy under the surface. |
| **Kaffrinha** | Related to Baila — African-Portuguese-Sri Lankan hybrid, rhythmically syncopated. |
| **Sinhala folk** | Earthy, rural songs — often pentatonic or modal, tied to seasons, farming, and Buddhist life. |
| **Pirith chanting** | Buddhist protective chanting — modal, repetitive, hypnotic. Not sung so much as intoned. |
| **Carnatic (Tamil Sri Lankan)** | South Indian classical music tradition — highly ornamented, precise, modal. |

---

## Style Prompt Sets

### 1. Kandyan × Heavy Grunge

*The Gata Bera drum is already an instrument of ceremony and controlled power — it pairs naturally with the loud-quiet-loud dynamics of heavy grunge.*

```
Sri Lankan grunge, kandyan drumming, gata bera, distorted electric guitar, heavy riffs, drone bass, modal, ceremonial, dark, raw, cinematic, powerful
```

#### 1b. Kandyan × Heavy Grunge — Vocal Integrated

```
Sri Lankan grunge, kandyan drumming, gata bera, distorted electric guitar, horanewa, Sinhala male vocalist, devotional male vocals, melismatic vocals, microtonal vocal bends, modal vocal melody, call and response guitar, tanpura drone, heavy distortion, loud-quiet-loud, dark, ceremonial, raw, aching, cinematic
```

Key choices:
- `gata bera` — drives the rhythm with ceremonial weight rather than Western kit alone
- `horanewa` — adds the piercing, oboe-like Sri Lankan lead voice in the guitar rests
- `devotional male vocals` + `melismatic vocals` + `microtonal vocal bends` — embeds Sri Lankan vocal character into the sung lines
- `call and response guitar` — guitar answers the voice, keeping the Sri Lankan instrumental dialogue present through the song
- `tanpura drone` — holds the modal center so the Sri Lankan character doesn't disappear between verses

---

### 2. Low-Country Yak Bera × Sludge / Psych Grunge

*Yak Bera drumming is relentless and trance-inducing — close to the hypnotic lock-groove of sludge metal. Tovil ritual energy meets feedback and distortion.*

```
Sri Lankan sludge, yak bera drums, slow grunge, psychedelic, trance, ritual, feedback, fuzz guitar, drone, dark, hypnotic, heavy, primal
```

#### 2b. With Vocal Tags

```
Sri Lankan sludge, low-country drumming, yak bera, fuzz guitar, drone bass, chant-like vocals, repetitive vocal phrases, nasal vocal quality, modal vocal melody, microtonal vocal bends, ritual, hypnotic, trance, dark, heavy, primal, ecstatic
```

Key choices:
- `yak bera` — the low-country drum's energy is relentless and ritual, perfect for sludge tempo
- `chant-like vocals` — connects to the incantatory quality of tovil and pirith
- `repetitive vocal phrases` — the locked, mantra quality of the tradition
- `nasal vocal quality` — cuts through heavy guitar the way traditional South Asian singing does in ceremonies

---

### 3. Baila × Grunge (Tension Version)

*Baila is festive — but it carries colonial history under the surface (Portuguese-origin, community of Afro-Sri Lankan descent). That tension — joy over sorrow — is very grunge.*

```
Sri Lankan baila grunge, baila rhythm, distorted guitar, folk roots, bittersweet, raw, dark humor, communal, rhythmically syncopated, emotional, earthy
```

#### 3b. Baila × Grunge — Vocal Integrated

```
baila grunge, Sri Lankan Portuguese fusion, syncopated rhythm, distorted electric guitar, rabana, Sinhala male vocalist, folk vocal style, Sinhala folk vocal style, call and response vocals, earthy, bittersweet, dark energy, raw, festive grief, lo-fi, gritty, communal
```

Key choices:
- `baila rhythm` signals the syncopated, lively groove underneath even heavy guitar
- `rabana` — frame drum keeps the communal folk energy present
- `folk vocal style` + `Sinhala folk vocal style` — pushes the voice away from rock convention toward something rougher and more grounded
- `call and response vocals` — baila is inherently communal and conversational
- `festive grief` — names the emotional paradox at the heart of this fusion

---

### 4. Pirith Chant × Post-Grunge / Atmospheric

*Buddhist pirith chanting is hypnotic, slow, and modal — a natural match for slow atmospheric post-grunge and drone rock.*

```
Sri Lankan post-grunge, pirith chant, Buddhist, drone guitar, slow build, modal, atmospheric, reverb, sacred, aching, devotional, cinematic, slow burn
```

#### 4b. Pirith × Post-Grunge — Vocal Integrated

```
Sri Lankan atmospheric grunge, pirith-inspired vocals, Buddhist devotional, chant-like vocals, vocal drone harmony, modal vocal melody, drone guitar, slow electric guitar, tanpura, reverb-soaked, layered guitars, Sinhala male vocalist, sacred, aching, slow build, cinematic, devotional, melancholic, transcendent
```

Key choices:
- `pirith-inspired vocals` — signals the incantatory, modal, sacred vocal quality
- `chant-like vocals` + `vocal drone harmony` — the voice hovers over the drone rather than melodically ranging; very different from rock singing
- `Buddhist devotional` — context tag that orients the whole feel toward contemplative rather than aggressive
- `tanpura` — keeps the modal drone anchor throughout

---

### 5. Sinhala Folk × Grunge Ballad

*Sinhala folk music is earthy, often pentatonic, tied to the land and seasons. It pairs well with acoustic-electric grunge ballads — the Neil Young end of the spectrum.*

```
Sinhala folk grunge, pentatonic, acoustic-electric guitar, dotara melody, rabana, folk ballad, rural, earthy, nostalgic, raw, emotionally open, cinematic
```

#### 5b. With Vocal Tags

```
Sinhala folk grunge ballad, pentatonic melody, acoustic guitar, dotara, rabana, Sinhala male vocalist, Sinhala folk vocal style, ornamented vocals, microtonal vocal bends, modal vocal melody, earthy, nostalgic, raw, open, aching, cinematic, quietly powerful
```

---

### 6. Carnatic × Grunge (Tamil Sri Lankan Tradition)

*For Tamil Sri Lankan musical tradition — Carnatic classical music is highly ornamented, precise, and deeply modal. It brings a different character than Kandyan music: less ceremonial percussion-weight, more melodic complexity.*

```
Sri Lankan Tamil grunge, carnatic rock, veena lead, miridangaya, electric guitar, carnatic vocal style, kriti phrasing, South Indian modal, heavy, distorted, devotional, cinematic
```

#### 6b. With Vocal Tags

```
Sri Lankan Tamil grunge, Carnatic fusion, veena melody, miridangaya, distorted electric guitar, tanpura drone, carnatic male vocalist, carnatic vocal style, melismatic vocals, gamak vocal runs, microtonal vocal bends, ornamented vocal melody, modal vocal phrasing, heavy, devotional, dark, raw, cinematic, aching
```

Key choices:
- `carnatic male vocalist` + `carnatic vocal style` — anchors the voice in South Indian classical technique
- `gamak vocal runs` — the rapid oscillation characteristic of Carnatic performance (distinct from Hindustani gamak)
- `veena melody` — the South Indian plucked instrument, darker than sitar
- `miridangaya` — the Carnatic drum (vs. Kandyan gata bera) for a different rhythmic character

---

### 7. General Fusion Tags (Mix and Match)

**Sri Lankan tradition tags:**
```
gata bera, yak bera, rabana, horanewa, dotara, pirith chant, kandyan, baila, tovil, low-country, tanpura drone, modal
```

**Vocal performance tags:**
```
Sinhala male vocalist, melismatic vocals, microtonal vocal bends, modal vocal melody, devotional male vocals, Sinhala folk vocal style, chant-like vocals, call and response vocals, ornamented vocals, nasal vocal quality, vocal drone harmony
```

**Grunge/rock texture tags:**
```
heavy distortion, fuzz guitar, drop tuning, lo-fi, loud-quiet-loud, sludgy, grungy, feedback, raw production, gritty, Seattle sound, shoegaze
```

**Mood/atmosphere tags:**
```
ceremonial, ritual, devotional, trance, primal, dark, brooding, earthy, nostalgic, cinematic, aching, raw, melancholic, transcendent, festive grief, sacred
```

---

## Template

Copy and customize:

```
[SRI LANKAN TRADITION], [GRUNGE SUBTYPE], [DRUM TYPE], [MELODIC INSTRUMENT], [MOOD], [TEXTURE], [DYNAMIC]
```

Example:
```
kandyan grunge, gata bera, horanewa, distorted electric guitar, Sinhala male vocalist, melismatic vocals, modal vocal melody, dark, ceremonial, raw, loud-quiet-loud, cinematic
```

---

## Notes on Suno Behavior with Sri Lankan Tags

- Suno recognizes **"tabla"**, **"sitar"**, **"tanpura"** well — these are safer anchors than more obscure Sri Lankan instrument names
- **"gata bera"** and **"yak bera"** may not be directly recognized; pair with **"kandyan drumming"** or **"Sri Lankan drums"** as a fallback
- **"horanewa"** may map to shehnai or oboe — pair with **"double reed"** or **"shehnai-like melody"** to reinforce the sound character
- **"rabana"** may be interpreted as frame drum or tambourine — add **"frame drum"** alongside it
- **"pirith"** may not be recognized — use **"Buddhist chant"** or **"Theravada chant"** as alternatives
- **"modal"** is reliably understood and helps steer away from standard Western chord progressions
- Combine **"tanpura drone"** with any of these to anchor the Sri Lankan modal center throughout

### A.R. Rahman / MIA Reference Tags

Both have strong Sri Lankan/South Asian crossover presence in Suno's training data:
- `A.R. Rahman style` — for cinematic Indian-influenced fusion with production polish
- `MIA style` — for raw, politically charged Sri Lankan diaspora energy with electronic grunge underpinning

```
MIA-style grunge, Sri Lankan diaspora, raw, political energy, gata bera rhythm, distorted guitar, electronic undertone, defiant, gritty, intense
```
