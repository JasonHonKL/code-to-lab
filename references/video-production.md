# Video Production

The course opens with one short explainer. It is not a marketing launch video and not a full lecture. It is the mental model the rest of the course zooms into.

## Target

- **60–90 seconds** (up to 120 for Deep Diver)
- **16:9**, 1920×1080, 30 fps
- Narrated, with a soft music bed and a few UI sound effects
- A poster frame
- Embedded at the top of the course, with a transcript

## Story shape

| Time | Scene | Job |
|---|---|---|
| 0–10 s | Hook | Show the one line/action and the surprising result |
| 10–25 s | The whole machine | The system map: 3–5 stages, one sentence each |
| 25–45 s | Stage highlight 1 | The input layer (lexer/parser/request parsing) |
| 45–65 s | Stage highlight 2 | The execution/runtime layer |
| 65–80 s | Data layer | The core data structure, with a real shape |
| 80–90 s | Outro | The top-down habit and the course title |

Adapt the number of highlights, not the arc. Every scene must show something specific to this project; no abstract filler.

## Script

- 150–220 words for 75–90 seconds.
- Write for the ear: short sentences, concrete nouns, one idea per sentence.
- Do not read on-screen labels verbatim; the voice adds the “why.”
- No generic SaaS language. Use the project’s own terms.
- End with the course’s central habit, not a call to action.

Generate speech with a local TTS. Kokoro-82M via `hyperframes tts` is a good default:

```bash
export HYPERFRAMES_PYTHON=~/.cache/hyperframes/venv-kokoro/bin/python
npx hyperframes tts "…" --voice am_michael -o assets/audio/vo/01.wav
```

Generate one clip per scene so you can place and measure it. Measure durations with `ffprobe`.

## Music and sound

- A soft music bed at roughly 8–12% of the voice level. Low-pass it to keep it out of the voice’s way.
- Keyboard clicks for typing, switch/click cues for tokens or steps, a small chime on the result.
- Pre-mix with ffmpeg into a single 90-second audio file. Do not rely on the renderer to mix many tracks.
- Normalize to about −16 LUFS, true peak −1.5 dBTP.
- Fade the music in and out; leave a second of air before the end card.

Minimal mix recipe:

```bash
ffmpeg -i voice.wav -i music.wav -i sfx.wav \
  -filter_complex "[0:a][1:a][2:a]amix=inputs=3:normalize=0:duration=first[m];\
[m]alimiter=limit=0.95,loudnorm=I=-16:TP=-1.5:LRA=11[out]" \
  -map "[out]" -ar 48000 -ac 2 mix.m4a
```

## Visual direction

- Warm paper background, dark ink, one confident accent.
- Display type with personality; body sans; mono for code.
- Code panels are dark; real code and real bytecode/output.
- Motion is seekable and deterministic: opacity, position, scale, clip-path, background-color. No render-time clocks, no unseeded randomness, no network.
- Hard cuts between scenes are fine. Do not add a fancy transition you cannot verify.

## HyperFrames composition

If HyperFrames is installed, build a single composition:

- Root `data-composition-id`, `data-width`, `data-height`, `data-duration`.
- One timed `<section class="clip" data-start data-duration>` per scene.
- One `gsap.timeline({ paused: true })` registered at `window.__timelines["<id>"]` after the timeline is fully built.
- Local fonts, local GSAP, local audio, local Mermaid if used.
- No `.clip` element animation; animate children.
- No CSS transform initial values on GSAP targets; use `fromTo`.
- Audio: one `<audio id="…" src="assets/audio/mix.m4a" data-start="0" data-duration="90">`.

Validate:

```bash
npx hyperframes lint
npx hyperframes check
npx hyperframes snapshot --at 5,20,45,70,88
npx hyperframes render --quality high --output renders/video.mp4
```

Lint warnings about file size or nested structure are acceptable for a monolithic composition; errors and layout/contrast findings are not.

Extract a poster:

```bash
ffmpeg -ss 9 -i renders/video.mp4 -frames:v 1 -q:v 2 assets/poster.jpg
```

## Fallback without HyperFrames

If HyperFrames is unavailable:

1. Build the same scenes as an HTML/CSS deck with one timeline (CSS animations or GSAP).
2. Record the deck with a headless browser screenshot sequence or a screen recorder.
3. Generate the same voice/audio bed.
4. Mux with ffmpeg:

```bash
ffmpeg -framerate 30 -i frames/%05d.png -i mix.m4a \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest video.mp4
```

Or record a live walkthrough with titles and a voiceover. The quality bar is the same: specific, readable, audible, and under 90 seconds.

## Transcript

Add a transcript in the course page, with timestamps that match the scenes. If the video is in a different language from the course, label it as a translation.

## Quality gates

- The first 2 seconds make the viewer want the next 5.
- At least one scene shows real UI/output/code from the project.
- Every line that must be read stays long enough to read.
- Voice is intelligible; music does not compete.
- No black gaps after the end card.
- Duration is 60–90 s (or the agreed length).
- Poster exists and is not a black frame.
