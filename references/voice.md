# Voice: Supertonic 3

The course video is narrated with **Supertone Supertonic 3**, a local, on-device TTS model. It is the default voice for every language it supports. Do not substitute a cloud voice or `hyperframes tts` (Kokoro) for narration.

- Model: [`Supertone/supertonic-3`](https://huggingface.co/Supertone/supertonic-3)
- Size: about 99M parameters; first run downloads ~400 MB into `~/.cache/supertonic3/`
- Runtime: ONNX Runtime on CPU; no GPU, no cloud call
- Output: 44.1 kHz, 16-bit WAV
- Languages: 31 ISO codes (see below); `na` is a fallback for unknown text
- License: code MIT; model OpenRAIL-M. Check the model license before commercial use.

## Install

```bash
python3 -m pip install --user supertonic
supertonic --help
```

The Python SDK and CLI are the same package. The first synthesis downloads the model; do it once before a timed build.

## Voices

Ten built-in voices: **M1–M5** (male) and **F1–F5** (female). The default is **M1**.

| Voice | Character | Use |
|---|---|---|
| `M1` | Neutral, clear male | Default for technical explainers |
| `M2` | Warmer male | Narrative openings |
| `F1` | Neutral, clear female | Alternative default |
| `F2` | Brighter female | Lighter topics |
| `M3`–`M5`, `F3`–`F5` | Additional timbres | Audition only if the default mispronounces the script |

- Audition **2–3 voices on the first sentence** before generating the full script. Prefer M1, F1, and one contrasting voice.
- Keep **one voice for the whole video**. Do not switch voice per scene unless the script has a deliberate second narrator.
- If the learner asks for a specific voice, use it. Otherwise M1.
- Custom Voice Builder JSON is supported with `--custom-style-path` or `get_voice_style_from_path()`; it is optional and not needed for a course.

## Language codes

`en`, `ko`, `ja`, `ar`, `bg`, `cs`, `da`, `de`, `el`, `es`, `et`, `fi`, `fr`, `hi`, `hr`, `hu`, `id`, `it`, `lt`, `lv`, `nl`, `pl`, `pt`, `ro`, `ru`, `sk`, `sl`, `sv`, `tr`, `uk`, `vi`.

- Set `--lang` to the narration language. Do not leave it at the default if the script is not English.
- Use `na` only for mixed/unknown text that has no correct code. Do not use it as a shortcut for a language that has a code.
- **Chinese is not in the list.** Do not pass `zh`, `zh-TW`, or `na` for Chinese and hope; use `edge-tts` for Traditional Chinese and Cantonese as described in `references/video-production.md`. Supertonic remains the default for the other 31 languages.

## CLI

```bash
supertonic tts "The lexer turns characters into tokens." \
  -o assets/audio/vo/scene01.wav \
  --voice M1 \
  --lang en \
  --steps 10
```

- `--steps` is quality: 5 (low) to 12 (high), default 8. Use **10** for a final render, 8 for drafts.
- `--voice` is one of the built-ins above.
- `--lang` is the ISO code.
- Generate **one clip per scene** so you can place, measure, and re-render a single line without regenerating the whole video.

## Python SDK

Use the SDK when you need speed, chunking, or per-scene control:

```python
from supertonic import TTS

tts = TTS(auto_download=True)
style = tts.get_voice_style(voice_name="M1")

text = "The lexer turns characters into tokens. The parser builds the tree."
wav, duration = tts.synthesize(
    text=text,
    voice_style=style,
    lang="en",
    total_steps=10,
    speed=1.0,
    max_chunk_length=300,
    silence_duration=0.3,
)

tts.save_audio(wav, "assets/audio/vo/scene01.wav")
print(f"{duration:.2f}s")
```

- `speed` is 0.7–2.0. Start at **1.0**; use 1.03–1.08 only if the script runs long.
- `max_chunk_length` defaults to 300 characters; Korean auto-uses 120.
- `silence_duration` is the gap between chunks; keep it at 0.2–0.3 s for narration.
- The SDK returns the duration; log it and compare with `ffprobe`.

## Narration style

- Write for the ear: short sentences, concrete nouns, one idea per sentence.
- Put the **concrete input/output** in the first two sentences of each scene.
- Spell identifiers the way the voice should say them. If `table_to_grid` is mispronounced, rewrite the spoken line as “table to grid” and keep the real identifier on screen.
- Avoid abbreviations the model may read letter-by-letter unless that is intended (`API` is usually fine; `V8` may need “V eight”).
- Expression tags such as `<laugh>`, `<breath>`, and `<sigh>` are supported. Use them sparingly and never put them in on-screen copy.
- Do not use SSML; Supertonic does not need it.

## Per-scene workflow

```bash
# 1. Generate one clip per scene
supertonic tts "…" -o assets/audio/vo/scene01.wav --voice M1 --lang en --steps 10

# 2. Measure it; do not guess
ffprobe -v error -show_entries format=duration -of csv=p=0 assets/audio/vo/scene01.wav

# 3. Convert to the mix format (48 kHz mono PCM)
ffmpeg -y -i assets/audio/vo/scene01.wav -ar 48000 -ac 1 -c:a pcm_s16le assets/audio/vo/scene01.48k.wav
```

- Total narration: 150–220 English words for 75–90 s. Measure the rendered voice.
- Keep 0.3–0.6 s of air at the head and tail of each clip; the video editor can trim it.
- Listen to the first 10 seconds of the first clip before generating the rest.
- Re-render a clip if it is robotic, clips a word, or mispronounces an identifier.
- Do not normalize each clip independently; normalize the final mix to about −16 LUFS.

## Integration with the video

Supertonic produces the WAV; it is not a HyperFrames TTS provider.

1. Generate all scene clips with Supertonic.
2. Build a single narration track by placing each clip at its storyboard start time. `adelay` takes milliseconds; the example starts scenes at 0 s, 12 s, and 30 s:
   ```bash
   ffmpeg -i scene01.48k.wav -i scene02.48k.wav -i scene03.48k.wav \
     -filter_complex "[0:a]adelay=0:all=1[a0];[1:a]adelay=12000:all=1[a1];[2:a]adelay=30000:all=1[a2];[a0][a1][a2]amix=inputs=3:normalize=0:duration=longest[out]" \
     -map "[out]" -ar 48000 -ac 1 assets/audio/vo/narration.wav
   ```
   Keep the starts in sync with the storyboard; do not concatenate clips back-to-back unless the scenes are actually contiguous.
3. Mix the narration with the music bed and SFX (see `references/video-production.md`) into `assets/audio/mix.m4a`.
4. Add `mix.m4a` to the HyperFrames composition as one `<audio>` element, or mux it with ffmpeg.

Do not use `npx hyperframes tts` for the narration. Use it only if the learner explicitly asks for Kokoro or HyperFrames’ built-in voice.

## Quality checks

- [ ] Voice is Supertonic 3 (`M1` by default), one voice for the whole video.
- [ ] `--lang` matches the narration language.
- [ ] First 10 seconds are intelligible; identifiers and numbers are correct.
- [ ] Every clip is 44.1 kHz source; the mix is 48 kHz.
- [ ] No clipping, no clipped words, no long silences.
- [ ] The model was cached; a build does not depend on a network call at render time.
- [ ] Chinese uses `edge-tts`, not Supertonic, because Supertonic 3 has no Chinese voice.
- [ ] OpenRAIL-M terms are acceptable for the intended use; the model license is recorded in the handoff.

## Troubleshooting

| Symptom | Fix |
|---|---|
| First run is slow | It downloads ~400 MB; run one clip before the timed build |
| `supertonic: command not found` | Use `python3 -m supertonic` or add the user bin directory to `PATH` |
| Robotic or flat | Raise `--steps` to 10–12; audition another voice |
| Mispronounced identifier | Rewrite the spoken line; keep the identifier on screen |
| Audio is too fast/slow | Adjust `speed` in the SDK (0.7–2.0) and re-measure |
| Repeated or skipped words | Lower `max_chunk_length` to 200–250; regenerate the clip |
| Chinese sounds wrong | Supertonic 3 does not support Chinese; switch to `edge-tts` |
| Different output on re-run | TTS is not a deterministic render; keep the generated WAVs as assets |

## Why not Kokoro or `edge-tts`

- **Kokoro** was the previous default. It is replaced by Supertonic 3 for supported languages: higher reading stability, 31 languages, 44.1 kHz output, and a smaller on-device footprint.
- **`edge-tts`** is a cloud service. It remains the fallback only for languages Supertonic does not cover, currently Chinese (Traditional and Cantonese). Do not use it for English.
- Do not require a paid TTS provider. Supertonic is local and free to run.
