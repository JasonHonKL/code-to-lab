---
name: top-down-course
description: "Build a top-down, interactive course from any codebase or technical topic: a short narrated explainer video, diagrams, hands-on labs placed inline between sections, progressive hints, and verification that fits the skill. Labs are learn-by-doing and may edit real code, write or perform in the real medium, design an artifact, or run an experiment; they can be checked by tests, deterministic validators, rubrics, or a calibrated LLM judge. Use when someone wants to turn code or a skill into a course, teach a codebase, create a video + diagrams + exercises, or design a level-adapted tutorial. Always run a short learner-level diagnostic before building, and never make the in-page editor the lab."
---

# Top-Down Course

Turn a codebase or a technical topic into a course that starts from observable behavior and zooms inward.

The course has three layers:

1. **A short explainer video** — 60–90 seconds, narrated, with music and sound effects.
2. **Diagrams and code↔plain-English translations** — the system map, then each layer.
3. **Hands-on labs inline between sections** — the learner does the real activity: edits code, writes, designs, performs, or runs an experiment. Every lab produces evidence, gives progressive hints, and is checked by the strongest verification the medium allows.

This skill is self-contained. Do **not** require `/brag`, `codebase-to-course`, or any external prompt. Use the references and templates in this skill. HyperFrames is optional; if it is unavailable, use the fallback video pipeline in `references/video-production.md`.

## Non-negotiables

- **Run the level test before building.** It has two axes: general technical level and **topic prior knowledge**. Include the explicit **“I don’t know this topic at all”** option and use the **Newcomer** track when it is chosen. If the learner declines, default to **Builder** and say so.
- **Top-down arc.** Never start with “what is a pointer” or “what is a hash table.” Start with the behavior the learner can see, then open the box that produced it.
- **Labs live inside the course**, after the section that teaches their core. Never collect all labs into one “Labs” module at the end.
- **Labs happen in the real medium.** For code, install TODO stubs into the actual source files, back up the originals, and provide `start` / `restore` commands. For writing, design, practice, or experiments, scaffold a real work file or artifact and check that. The course page is a read-only preview and a check button, not an editor.
- **Choose the lab kind from the learning verb.** Debug → code; explain → writing; design → artifact; play or speak → performance; recognize → drill. Read `references/lab-kinds.md` before choosing. Do not force a code lab onto a non-code skill.
- **Labs are active practice, not a quiz.** Multiple choice is allowed when the objective is recognition, recall, or discrimination (ear training, vocabulary, error triage), with per-option feedback. It is not allowed as the only evidence for a production skill, as the default format, or as “guess the formula.” The level diagnostic remains separate and is for placement, not grading.
- **Every lab needs verification that fits the medium.** Code labs build a temp copy and run authoritative tests. Non-code labs combine deterministic checks, an explicit rubric, and—only when needed—a calibrated LLM judge or expert review. The checker must never modify the learner's work.
- **Every lab needs 3 progressive hints and a reference solution or exemplar.**
- **Verify before delivery:** `--self-test` (skeleton/weak exemplar fails, solution/strong exemplar passes), page loads with no console errors, video has audio, mobile layout works.
- **Use the research and slides companions when asked.** For research, use `sanjay3290/ai-skills` → `skills/deep-research` (Gemini Deep Research) first; get consent for its paid API. For a slide deck, use `zarazhangrui/frontend-slides`. Both are optional to install but are the default choice when the learner asks for that artifact. See `references/companion-skills.md`.
- **Write in the learner's language.** Ask; do not assume English. Keep code, identifiers, and upstream comments in their original language.
- **Contrast is a quality gate.** Body text ≥ 4.5:1 and code tokens ≥ 7:1 against their actual backgrounds. Use a palette from the `color-themes` companion when a theme is requested or contrast is in question; measure it, do not eyeball it.

## Workflow

| Phase | Goal | Gate |
|---|---|---|
| 0 | Learner-level diagnostic + brief | `COURSE_BRIEF.md` exists with a track |
| 1 | Analyze the codebase/topic; choose concepts and lab sites | 3–5 concepts, 2–3 labs, one end-to-end trace |
| 2 | Design the top-down arc and inline lab placement | Module outline reviewed |
| 3 | Build the course site | Page loads, diagrams render, labs are inline |
| 4 | Build the labs and their verification | `--self-test` passes (both directions) |
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

If the learner asks for research, or the topic is research-heavy (a paper, a scientific field, a literature-backed topic), use `sanjay3290/ai-skills` → `skills/deep-research` first. It is a Gemini Deep Research agent that plans, searches, reads, and returns a cited report. It needs `GEMINI_API_KEY`, takes 2–10 minutes, and costs roughly $2–5 per run, so ask before the first run. Use the report for domain context, never for the code trace, and verify every citation. If it is unavailable, do ordinary web research with sources. `academic-research-skills` remains an optional academic-suite alternative, not the default. If your agent has `impeccable` installed, keep it in mind for the post-build design audit.

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
- Every lab is a white card with: the incomplete/weak behavior, mission, deliverable, evidence path, 3 hints, a read-only starter or preview (code or artifact), copy-path, check command, check button, rubric, and a reference solution/exemplar.
- Multiple choice is allowed only for recognition, recall, or discrimination, with per-option feedback; never as the only evidence for a production skill and never as the default lab format.

If the learner asks for slides, a deck, or a presentation version, read `references/companion-skills.md` and use `frontend-slides`. Do not build a second competing design system; reuse the course's palette, type, and content.

The page must work offline except for web fonts; bundle Mermaid, the video, and the poster locally.

If `impeccable` is installed, run its audit after the page is built:

```bash
npx impeccable detect course/ --json
```

or `/impeccable audit course`. Treat the findings as a second pass, not as a replacement for the course’s design direction.

## Phase 4 — Build the labs and verification

Read `references/lab-kinds.md`, then `references/lab-checker.md`. Copy and adapt `templates/lab.mjs` and `templates/lab-rubric.json` if useful.

The contract for code labs:

1. The real repo file is the lab file. A `lab.mjs start` command backs up the original and installs the TODO skeleton; `restore` puts the original back; `status` reports skeleton/original/edited.
2. The checker builds a **temp copy** of the current repo:
   - **repo mode** (default): keep the learner’s target file; overlay reference solutions for the other labs so the interpreter/program still runs.
   - **skeleton mode** (self-test): overlay all hidden skeletons; expect failure.
   - **solution mode** (self-test): overlay all solutions; expect pass.
3. Authoritative test cases live in a hidden checker directory and are checksummed in a manifest. The page copy is display-only.
4. The checker CLI returns per-case results and exits non-zero on failure.
5. The server exposes `/api/health`, `/api/labs`, `/api/lab/:id` (read-only content), `/api/lab/:id/check`, and `/api/lab/:id/solution`.

The contract for non-code labs:

1. The lab has a real deliverable: a work file, recording, design, or observation. `lab.mjs start` scaffolds it from a starter; `restore` backs it up and resets; `status` reports not started/draft/reference exemplar, and the checker records whether the draft was checked.
2. The checker reads the deliverable and runs deterministic checks first (format, length, required sections, links, schema, duration, render state).
3. A rubric defines 3–6 observable criteria. If an LLM judge is configured, it returns per-criterion verdicts with quoted evidence, at `temperature: 0`, with a fixed model and prompt version.
4. The judge is calibrated against a known-weak and a known-strong exemplar. `--manual` prints the rubric and accepts a self-check or expert verdict when no judge is available.
5. The checker never modifies the submission and never sends secrets or the whole repo to a model.

Test design:

- Force runtime behavior. If the compiler constant-folds an expression, use variables in the test.
- Include at least one integration suite from the project’s existing tests per lab.
- Include error cases (division by zero, malformed input, missing key).
- Test the boundary the lab is about, not unrelated behavior.
- Add `name_zh` (or the target language) only if the course is localized.
- For non-code labs, test deterministic requirements (format, length, required sections, links, duration) and keep the rubric criteria observable. Calibrate the judge with weak and strong exemplars.
- Self-test both directions: skeleton/weak exemplar fails, solution/strong exemplar passes.
- Do not let the learner edit the tests, rubric, or exemplars. Hash them.

## Phase 5 — Produce the video

Read `references/video-production.md`.

Produce the requested video language/variant. For Traditional Chinese, use `zh-TW-HsiaoChenNeural` via `edge-tts`; for Cantonese, use `zh-HK-HiuMaanNeural` and colloquial Cantonese. Do not generate an English duplicate unless the learner asks for one. If both Mandarin and Cantonese are requested, keep both as separate MP4s with separate captions. See the language-and-voice section in the reference.

Target 60–90 seconds (up to 120 for Deep Diver), 16:9, 1920×1080, 30 fps.

- 5–7 scenes: hook → the machine → 2–3 stage highlights → values/data → outro.
- 150–220 words of narration, or about 320–400 Chinese characters for a 75–95 s Chinese video. Measure the rendered voice; do not guess. Write for the ear, not the page.
- Voice: a local TTS. Kokoro-82M (`am_michael`) for English; `zh-TW-HsiaoChenNeural` via `edge-tts` for Traditional Chinese, unless the learner requests another voice. Do not require a paid provider.
- Music and SFX: a soft bed under the voice, keyboard/click/whoosh cues, a small result chime. Pre-mix with ffmpeg and normalize to about −16 LUFS.
- Render with HyperFrames when available: one paused GSAP timeline, local fonts, local audio, no network at render time, root `data-duration`.
- If HyperFrames is unavailable, use the fallback: HTML/CSS slides + TTS + ffmpeg, or a screen-recorded walkthrough with burned-in titles. When a slide deck is requested, use `frontend-slides` (`zarazhangrui/frontend-slides`) to build the HTML deck, then record or render it with the same storyboard and audio bed.
- Extract a poster frame and embed the MP4 at the top of the course.

If the video uses recorded footage or demo takes, optionally use `video-use` to cut, caption, and grade that footage. Do not use it as the primary explainer generator; keep the generated 60–90 s storyboard as the spine.

For math/physics, use `manim_skill` and Manim (Community Edition by default) for the animation. Render the Manim scenes, then mux the voice and music bed with ffmpeg, or composite them in HyperFrames. See `references/math-physics.md`.

## Phase 6 — Verify and hand off

Read `references/quality-gates.md`.

Run:

```bash
node course/check.mjs --self-test
node course/check.mjs <lab-id>          # repo/work mode, should fail until the learner fixes it
node course/check.mjs <lab-id> --solution   # code labs
node course/check.mjs <lab-id> --manual     # non-code labs without a judge
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
| `references/lab-kinds.md` | Code/writing/design/performance/experiment/research/drill labs, MC rules, rubric and LLM-judge contract, non-code self-test |
| `references/lab-checker.md` | Code repo-mode labs, start/restore, checker modes, case format, self-test; non-code adapters |
| `references/video-production.md` | Script, storyboard, voice/music/SFX, HyperFrames composition, fallback |
| `references/design-system.md` | Palette, typography, diagrams, lab UI, responsive rules |
| `references/color-themes.md` | Palette catalog, contrast gate, code/terminal pairings, install-by-reference |
| `references/quality-gates.md` | Pre-delivery checklist |
| `references/companion-skills.md` | Optional `deep-research`, `frontend-slides`, `video-use`, `impeccable`, `academic-research-skills`, `mattpocock/skills`, and `manim_skill` integrations |
| `references/math-physics.md` | Top-down vs bottom-up math/physics courses, Manim, symbolic/numeric labs |

## Templates

| File | Use |
|---|---|
| `templates/course-brief.md` | Fill after the level test |
| `templates/storyboard.md` | Scene-by-scene video plan |
| `templates/lab.mjs` | Generic start/restore/status helper for code and work-file labs (adapt imports) |
| `templates/lab-cases.json` | Authoritative case format for code labs |
| `templates/lab-rubric.json` | Rubric + deterministic-check + LLM-judge format for non-code labs |

## Companion tools

These are optional and never required for a course to work. Use them when they clearly improve the result; record usage in `COURSE_BRIEF.md`. In the `code-to-lab` repo most are vendored under `vendor/`; run `bash scripts/install-companions.sh` to link them. `deep-research`, `frontend-slides`, and `color-themes` are installed by reference: run `bash scripts/install-research-and-slides.sh` for the first two and `bash scripts/install-color-themes.sh` for the palette catalog.

| Tool | Use it for | Do not use it for |
|---|---|---|
| [`deep-research`](https://github.com/sanjay3290/ai-skills/tree/main/skills/deep-research) | Multi-step cited research when the learner asks for research or the topic is research-heavy | Codebase analysis or the code trace; paid runs without consent |
| [`frontend-slides`](https://github.com/zarazhangrui/frontend-slides) | Building a beautiful HTML slide deck from a brief or PPTX | Replacing the course page or the HyperFrames explainer |
| [`video-use`](https://github.com/browser-use/video-use) | Editing raw footage: filler cuts, captions, color grade, montage, self-eval | Generating the core explainer from scratch |
| [`impeccable`](https://github.com/pbakaus/impeccable) | Post-build frontend audit, critique, polish, deterministic `detect` | Replacing the course’s design direction |
| [`academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | Academic literature review, paper-style sources, citations (alternative to `deep-research`) | Codebase analysis or the code trace |
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
- An in-page editor that edits a copy instead of the real medium.
- Forcing every lab to be code when the skill is writing, design, performance, or recognition.
- Multiple choice as the default lab format, as the only evidence for a production skill, or as “guess the formula.”
- An LLM judge with no rubric, no quoted evidence, no calibration, or no deterministic checks where they are possible.
- A checker that copies the repo but ignores the learner’s edits, or modifies the learner’s work.
- All labs removed at once with no way to restore the originals.
- A video with no voice, no sound, or no poster.
- Text walls, recycled metaphors, or a purple-gradient AI look.
- Low-contrast body text or code, especially gray comments on a dark panel; a theme name without its actual palette.
- Letting an optional companion override the course’s direction: a launch-style `video-use` cut, generic `impeccable` advice, or academic prose pasted into the teaching copy.
