---
name: top-down-course
description: "Build a top-down, interactive course from any codebase or technical topic: a short narrated explainer video, diagrams, hands-on labs placed inline between sections, progressive hints, and an automated checker. Use when someone wants to turn code into a course, teach a codebase, create a video + diagrams + exercises, or design a level-adapted tutorial. Always run a short learner-level diagnostic before building, and make labs edit the real project files rather than an in-page editor."
---

# Top-Down Course

Turn a codebase or a technical topic into a course that starts from observable behavior and zooms inward.

The course has three layers:

1. **A short explainer video** — 60–90 seconds, narrated, with music and sound effects.
2. **Diagrams and code↔plain-English translations** — the system map, then each layer.
3. **Hands-on labs inline between sections** — the learner edits the real project files, fills in TODO stubs, uses progressive hints, and runs an automated checker.

This skill is self-contained. Do **not** require `/brag`, `codebase-to-course`, or any external prompt. Use the references and templates in this skill. HyperFrames is optional; if it is unavailable, use the fallback video pipeline in `references/video-production.md`.

## Non-negotiables

- **Run the level test before building.** It has two axes: general technical level and **topic prior knowledge**. Include the explicit **“I don’t know this topic at all”** option and use the **Newcomer** track when it is chosen. If the learner declines, default to **Builder** and say so.
- **Top-down arc.** Never start with “what is a pointer” or “what is a hash table.” Start with the behavior the learner can see, then open the box that produced it.
- **Labs live inside the course**, after the section that teaches their core. Never collect all labs into one “Labs” module at the end.
- **Labs modify the real repo.** Install TODO stubs into the actual source files, back up the originals, and provide `start` / `restore` commands. The course page is a read-only preview and a check button, not an editor.
- **No multiple-choice lab exercises.** Labs are fill-in-the-code. The only quiz allowed is the **level diagnostic** before the course, and it is for placement, not grading.
- **Every lab needs a checker** that builds a temp copy of the current repo, runs authoritative tests, and reports per-case results. The checker must never modify the repo.
- **Every lab needs 3 progressive hints and a reference solution.**
- **Verify before delivery:** `--self-test` (skeleton fails, solution passes), page loads with no console errors, video has audio, mobile layout works.
- **Write in the learner's language.** Ask; do not assume English. Keep code, identifiers, and upstream comments in their original language.
- **Contrast is a quality gate.** Body text ≥ 4.5:1 and code tokens ≥ 7:1 against their actual backgrounds. Use a palette from the `color-themes` companion when a theme is requested or contrast is in question; measure it, do not eyeball it.

## Workflow

| Phase | Goal | Gate |
|---|---|---|
| 0 | Learner-level diagnostic + brief | `COURSE_BRIEF.md` exists with a track |
| 1 | Analyze the codebase/topic; choose concepts and lab sites | 3–5 concepts, 2–3 labs, one end-to-end trace |
| 2 | Design the top-down arc and inline lab placement | Module outline reviewed |
| 3 | Build the course site | Page loads, diagrams render, labs are inline |
| 4 | Build the labs and checker | `--self-test` passes |
| 5 | Produce the video | 60–90 s MP4 with voice + sound + poster |
| 6 | Verify and hand off | All quality gates pass; README has commands |

Read the relevant reference only when you reach that phase.

## Phase 0 — Level test first

Read `references/level-test.md`. Run the diagnostic in chat, not as a form.

Ask **6 scored questions** (self-rating, scenarios, one code snippet/symbolic trace) for general technical level, then the required topic questions:

- **Topic prior knowledge:** “I don’t know this topic at all” / “I’ve heard some terms” / “I can use it” / “I can teach it”.
- **Domain:** software / math / physics / other.
- **Direction:** top-down (phenomenon → principles) or bottom-up (definitions → results). Ask for math/physics; default to top-down for software. If the learner is a Newcomer, do not force this choice before the first module.
- **Goal:** steer AI / debug / understand architecture / build / solve problems / teach.
- **Time:** 15 / 30 / 60+ minutes.
- **Language** and whether a video is required.

Select the track:

| Condition | Track | Course shape |
|---|---|---|
| Topic “I don’t know this topic at all” | **Newcomer** | 4 modules, 2 labs, a “What is this?” opening, every term defined, a guided first lab, 75–90 s video |
| General score 0–4 | **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding, 75–90 s video |
| General score 5–8 | **Builder** | 5 modules, 3 labs, standard hints, 90 s video |
| General score 9–12 | **Deep Diver** | 5–6 modules, 3 harder labs, fewer hints, more real code, 90–120 s video |

Topic “I’ve heard some terms” adds a one-screen primer; “I can use it / teach it” skips the primer. The Newcomer track wins over the general score: a strong programmer can still be new to the topic.

If the learner declines, use **Builder**. Write the result to `COURSE_BRIEF.md` using `templates/course-brief.md`.

If `mattpocock/skills` is installed and the goal is ambiguous, optionally run `/grill-me` or `/grill-with-docs` to ask what they actually want. Cap it at about 10 questions, record the answers in the brief, and do not grill a novice on domain facts. The level test is mandatory; grilling is optional.

Do not start building before the brief exists.

## Phase 1 — Analyze and choose

Read `references/course-architecture.md`.

Extract:

- **The one-sentence model:** what the system does in one sentence a non-specialist understands.
- **The end-to-end trace:** one concrete action (a command, a click, a request, a line of code) and every stage it touches.
- **The cast:** 3–6 components with one-line responsibilities.
- **The zoom layers:** runtime data structures, the execution loop, external boundaries, failure modes.
- **Lab candidates:** 2–3 core sections that are self-contained, testable from the command line, and essential to the system. Prefer code that is stable, small, and has an existing test suite.

Choose 3–5 concepts. Fewer, deeper modules beat many thin ones.

For a math/physics topic, read `references/math-physics.md` and use the same arc with a derivation and a computational lab. Use Manim for the video when the topic is mathematical or physical.

If the topic is research-heavy (a paper, a scientific field, a literature-backed topic), optionally use `academic-research-skills` for sources and background. Use it for the domain, not for the code trace, and verify every citation. If your agent has `impeccable` installed, keep it in mind for the post-build design audit.

## Phase 2 — Design the top-down arc

Use this shape, adapted to the codebase:

1. **The whole machine** — what it does, the one-line model, the 60–90 s video, the system map.
2. **Follow one line / one action** — trace the end-to-end path through the stages.
3. **Zoom into the runtime** — the core data structures and why they are shaped that way.
4. **Zoom into execution** — the loop, dispatch, fast paths, fallbacks.
5. **Labs inline** — after the section that teaches each lab’s core.
6. **Read the rest** — a reading order, the full test suite, next topics.

Place the labs like this:

- Lab on the front end → after the pipeline/compiler section.
- Lab on the runtime/data structure → after the runtime section.
- Lab on the execution loop → after the execution section.

Do not create a separate “Labs” module. The nav should have one dot per teaching section; the labs are cards inside those sections.

## Phase 3 — Build the course site

Read `references/design-system.md`.

If the learner names a theme, or if code/body text is hard to read, read `references/color-themes.md` and use the `color-themes` companion. Pick a palette from its `themes/*.toml` catalog (Tokyo Night is the default; GitHub Light/Dark High Contrast are good for code panels), map it to CSS custom properties, and verify contrast after rendering. Do not invent a palette when the requested one exists.

Build a directory course site with:

- `index.html` assembled from `_base.html`, `modules/*.html`, `_footer.html`.
- `styles.css` and `main.js` for course-wide layout, progress, tooltips, chat, and flow animations.
- `lab.css` and `lab.js` for the read-only lab preview, hints, check button, and results.
- `assets/` for the poster, video, and a local Mermaid build.
- `build.sh` that concatenates the modules.

Content rules:

- 2–3 sentences per text block; every screen at least 50% visual.
- Every technical term gets a glossary tooltip on first use per module.
- Every module has at least one real code↔English translation.
- Every module has a diagram or interactive visual (Mermaid, flow animation, group chat, architecture map).
- Every lab is a white card with: broken behavior, mission, TODOs, 3 hints, read-only code preview, copy-path, checker command, check button, reference solution.
- No multiple-choice quizzes in the course body.

The page must work offline except for web fonts; bundle Mermaid, the video, and the poster locally.

If `impeccable` is installed, run its audit after the page is built:

```bash
npx impeccable detect course/ --json
```

or `/impeccable audit course`. Treat the findings as a second pass, not as a replacement for the course’s design direction.

## Phase 4 — Build the labs and checker

Read `references/lab-checker.md`. Copy and adapt `templates/lab.mjs` if useful.

The contract:

1. The real repo file is the lab file. A `lab.mjs start` command backs up the original and installs the TODO skeleton; `restore` puts the original back; `status` reports skeleton/original/edited.
2. The checker builds a **temp copy** of the current repo:
   - **repo mode** (default): keep the learner’s target file; overlay reference solutions for the other labs so the interpreter/program still runs.
   - **skeleton mode** (self-test): overlay all hidden skeletons; expect failure.
   - **solution mode** (self-test): overlay all solutions; expect pass.
3. Authoritative test cases live in a hidden checker directory and are checksummed in a manifest. The page copy is display-only.
4. The checker CLI returns per-case results and exits non-zero on failure.
5. The server exposes `/api/health`, `/api/labs`, `/api/lab/:id` (read-only content), `/api/lab/:id/check`, and `/api/lab/:id/solution`.

Test design:

- Force runtime behavior. If the compiler constant-folds an expression, use variables in the test.
- Include at least one integration suite from the project’s existing tests per lab.
- Include error cases (division by zero, malformed input, missing key).
- Test the boundary the lab is about, not unrelated behavior.
- Add `name_zh` (or the target language) only if the course is localized.
- Self-test: skeleton fails, solution passes.
- Do not let the learner edit the tests. Hash them.

## Phase 5 — Produce the video

Read `references/video-production.md`.

Produce one video in the learner's language. For Traditional Chinese, use `zh-TW-HsiaoChenNeural` via `edge-tts`; do not generate an English duplicate unless the learner asks for one. See the language-and-voice section in the reference.

Target 60–90 seconds, 16:9, 1920×1080, 30 fps.

- 5–7 scenes: hook → the machine → 2–3 stage highlights → values/data → outro.
- 150–220 words of narration. Write for the ear, not the page.
- Voice: a local TTS such as Kokoro-82M (`am_michael` or a voice matching the learner’s language/tone). Do not require a paid provider.
- Music and SFX: a soft bed under the voice, keyboard/click/whoosh cues, a small result chime. Pre-mix with ffmpeg and normalize to about −16 LUFS.
- Render with HyperFrames when available: one paused GSAP timeline, local fonts, local audio, no network at render time, root `data-duration`.
- If HyperFrames is unavailable, use the fallback: HTML/CSS slides + TTS + ffmpeg, or a screen-recorded walkthrough with burned-in titles.
- Extract a poster frame and embed the MP4 at the top of the course.

If the video uses recorded footage or demo takes, optionally use `video-use` to cut, caption, and grade that footage. Do not use it as the primary explainer generator; keep the generated 60–90 s storyboard as the spine.

For math/physics, use `manim_skill` and Manim (Community Edition by default) for the animation. Render the Manim scenes, then mux the voice and music bed with ffmpeg, or composite them in HyperFrames. See `references/math-physics.md`.

## Phase 6 — Verify and hand off

Read `references/quality-gates.md`.

Run:

```bash
node course/check.mjs --self-test
node course/check.mjs <lab-id>          # repo mode, should fail until the learner fixes it
node course/check.mjs <lab-id> --solution
node course/lab.mjs status
node course/serve.mjs
```

Check the page:

- video `readyState` and duration;
- every lab loads and is read-only;
- every diagram renders;
- no console errors;
- mobile layout has no horizontal overflow outside code/editor areas;
- body text ≥ 4.5:1, code foreground/comments/syntax tokens ≥ 7:1, and command blocks ≥ 7:1 on their real backgrounds.

Write `course/README.md` with:

- what the course is;
- the level track;
- the exact edit/check/restore commands;
- the lab IDs and files;
- the video and audio rebuild commands;
- the note that the repo files are intentionally modified and how to restore them.

## Reference files

| File | Read it for |
|---|---|
| `references/level-test.md` | The 6-question diagnostic, scoring, and track adaptations |
| `references/course-architecture.md` | Top-down arc, module templates, inline lab placement, content rules |
| `references/lab-checker.md` | Repo-mode labs, start/restore, checker modes, case format, self-test |
| `references/video-production.md` | Script, storyboard, voice/music/SFX, HyperFrames composition, fallback |
| `references/design-system.md` | Palette, typography, diagrams, lab UI, responsive rules |
| `references/color-themes.md` | Palette catalog, contrast gate, code/terminal pairings, install-by-reference |
| `references/quality-gates.md` | Pre-delivery checklist |
| `references/companion-skills.md` | Optional `video-use`, `impeccable`, `academic-research-skills`, `mattpocock/skills`, and `manim_skill` integrations |
| `references/math-physics.md` | Top-down vs bottom-up math/physics courses, Manim, symbolic/numeric labs |

## Templates

| File | Use |
|---|---|
| `templates/course-brief.md` | Fill after the level test |
| `templates/storyboard.md` | Scene-by-scene video plan |
| `templates/lab.mjs` | Generic repo-mode start/restore/status helper (adapt imports) |
| `templates/lab-cases.json` | Authoritative case format |

## Companion tools

These are optional and never required for a course to work. Use them when they clearly improve the result; record usage in `COURSE_BRIEF.md`. In the `code-to-lab` repo they are vendored under `vendor/`; run `bash scripts/install-companions.sh` to link them. The `color-themes` companion is installed by reference because its upstream declares no license; run `bash scripts/install-color-themes.sh`.

| Tool | Use it for | Do not use it for |
|---|---|---|
| [`video-use`](https://github.com/browser-use/video-use) | Editing raw footage: filler cuts, captions, color grade, montage, self-eval | Generating the core explainer from scratch |
| [`impeccable`](https://github.com/pbakaus/impeccable) | Post-build frontend audit, critique, polish, deterministic `detect` | Replacing the course’s design direction |
| [`academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | Literature review, source-backed research, citations for research-heavy topics | Codebase analysis or the code trace |
| [`mattpocock/skills`](https://github.com/mattpocock/skills) | Optional `/grill-me` interview to clarify ambiguous goals; `/teach` for multi-session teaching | Replacing the required level test |
| [`manim_skill`](https://github.com/adithya-s-k/manim_skill) | Manim animation for math/physics courses | Software architecture videos or generic UI explainers |
| [`color-themes`](https://github.com/archibate/dotfiles-opencode/blob/main/skills/color-themes/SKILL.md) | Palettes and contrast-safe color choices for the course page, code panels, terminals, and diagrams | Inventing a palette when a theme was requested, or shipping low-contrast text |

Read `references/companion-skills.md` for install notes, licenses, and integration rules.

## Track adaptations

| | Newcomer | Explorer | Builder | Deep Diver |
|---|---|---|---|---|
| Modules | 4 | 4 | 5 | 5–6 |
| Labs | 2 (guided first lab) | 2 | 3 | 3 |
| Hints | Very explicit | 2 up front | 3 progressive | 3, last one minimal |
| Code shown | Short, heavily annotated | Short, annotated | Real snippets | Longer real snippets |
| Video | 75–90 s | 75–90 s | 90 s | 90–120 s, denser |
| Tooltips | Every term | Aggressive | Standard | Only non-obvious terms |
| Diagrams | Most, simplest | More, simpler | Standard | Fewer, denser |

## Anti-patterns

- Starting with a definition instead of an observable behavior.
- Forcing a codebase trace onto a math/physics topic whose core is a derivation.
- Asking a Newcomer to choose top-down vs bottom-up before the first module.
- Using generic Manim decoration instead of animating the actual derivation.
- A “Labs” section at the end instead of labs after their concept.
- An in-page code editor that edits a copy instead of the real repo.
- Multiple-choice lab exercises.
- A checker that copies the repo but ignores the learner’s edits, or modifies the repo.
- All labs removed at once with no way to restore the originals.
- A video with no voice, no sound, or no poster.
- Text walls, recycled metaphors, or a purple-gradient AI look.
- Low-contrast body text or code, especially gray comments on a dark panel; a theme name without its actual palette.
- Letting an optional companion override the course’s direction: a launch-style `video-use` cut, generic `impeccable` advice, or academic prose pasted into the teaching copy.
