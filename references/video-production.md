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

## Language and voice

- Produce the requested video language/variant. Do not generate an English duplicate unless the learner explicitly asks for one. If the learner asks for an additional Chinese variant (Cantonese alongside Mandarin), ship a separate MP4 and keep the existing one.
- **Traditional Chinese (Taiwan):** use `zh-TW-HsiaoChenNeural` via `edge-tts`. Other zh-TW voices: `zh-TW-HsiaoYuNeural` (female), `zh-TW-YunJheNeural` (male). Use `zh-TW-HsiaoChenNeural` unless the learner asks for a different voice.
- **Cantonese (Hong Kong):** use `zh-HK-HiuMaanNeural` (female) via `edge-tts`; alternatives are `zh-HK-WanLungNeural` (male) and `zh-HK-HiuGaaiNeural` (female). Write the narration in colloquial written Cantonese (唔, 嘅, 咗, 喺, 佢, 啲, 嚟, 呢, 嗰, 冇, 睇, 搵). On-screen titles can stay in standard written Chinese if that is the course's written language. If a Mandarin video already exists and the learner asks for Cantonese as well, keep the Mandarin MP4 and produce a separate Cantonese MP4 + VTT; reuse the same scene images when only the voice changes.
- `edge-tts` is a lightweight fallback when Kokoro does not cover the language:

```bash
python3 -m pip install --user edge-tts
edge-tts --voice zh-TW-HsiaoChenNeural --rate=+8%   --text "…" --write-media assets/audio/zh/scene01.mp3
ffmpeg -y -i assets/audio/zh/scene01.mp3 -ar 48000 -ac 1 -c:a pcm_s16le assets/audio/zh/scene01.wav
```

- **Chinese pacing:** at the default rate, `zh-TW-HsiaoChenNeural` speaks roughly 4.2–4.5 Chinese characters per second; English identifiers are slower. A 75–95 s script is about **320–400 Chinese characters** plus a few identifiers. Generate one clip per scene, measure with `ffprobe`, and adjust `--rate` by ±5–10% rather than guessing. The worked example uses `+8%` for a 95.4 s, six-scene video.
- **CJK rendering:** use a CJK font (PingFang TC, Noto Sans TC, or Source Han Sans) for every Chinese label, code comment, and caption. A Latin-only mono font produces missing-glyph boxes. Keep Menlo/Consolas for ASCII code and identifiers.
- **Captions:** write a `.vtt` in the video language and add a transcript with timestamps. Split at sentence punctuation; do not break inside English identifiers such as `table_to_grid` or `chart_to_data`.
- If the course is bilingual, put the video in the edition requested by the learner. Do not silently duplicate it in the other language.

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

1. Build the same scenes as an HTML/CSS deck with one timeline (CSS animations or GSAP). When the learner asks for a slide deck, use `frontend-slides` and its 16:9 deck output.
2. Record the deck with a headless browser screenshot sequence or a screen recorder.
3. Generate the same voice/audio bed.
4. Mux with ffmpeg:

```bash
ffmpeg -framerate 30 -i frames/%05d.png -i mix.m4a \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest video.mp4
```

Or record a live walkthrough with titles and a voiceover. The quality bar is the same: specific, readable, audible, and under 90 seconds.

## Math and physics: Manim

For math/physics, use [`manim_skill`](https://github.com/adithya-s-k/manim_skill) and Manim to animate the actual derivation, not decoration.

- Prefer **Manim Community Edition** (`manim`, `from manim import *`) for a production course; use **ManimGL** (`manimgl`) for interactive/3D exploration.
- Keep the mathematical logic in a testable pure function; test the function, not the pixels.
- Render scenes to MP4, then mux the voice and music with ffmpeg, or composite the clips in HyperFrames.
- Show the equation and the visual together; animate the transformation, not just the final formula.
- Label axes, units, assumptions, and limiting cases.
- Check the render for missing LaTeX glyphs, clipped labels, and black frames.

A typical pipeline:

```bash
manim -qh scenes/derivation.py DerivativeScene
# then mux voice + music
ffmpeg -i scenes/derivation.mp4 -i mix.m4a -c:v copy -c:a aac -shortest video.mp4
```

See `references/math-physics.md` and `references/companion-skills.md`.

## If you have raw footage: video-use

[`video-use`](https://github.com/browser-use/video-use) is an optional companion for editing raw footage: cutting filler, color grading, burned-in captions, animation overlays, and a self-evaluation pass. Use it when the course video includes recorded demo takes, screen recordings, or interviews.

- Install it separately (it is not a dependency of this skill).
- Feed it a folder of takes; ask for a short demo segment or a captioned clip.
- Bring the exported `final.mp4` back as a second video or as B-roll.
- It uses an external transcription provider and self-evaluates cuts; review the output and check privacy before uploading confidential footage.
- Do not use it to replace the generated 60–90 s explainer. The storyboard and generated composition remain the spine.

See `references/companion-skills.md` for install notes and license.

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
- If a slide deck was requested, it was built with `frontend-slides`, reuses the course palette, and renders at 16:9 without overflow.
