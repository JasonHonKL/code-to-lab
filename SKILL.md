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

- **Run the level test before building.** If the learner declines, default to the **Builder** track and say so.
- **Top-down arc.** Never start with “what is a pointer” or “what is a hash table.” Start with the behavior the learner can see, then open the box that produced it.
- **Labs live inside the course**, after the section that teaches their core. Never collect all labs into one “Labs” module at the end.
- **Labs modify the real repo.** Install TODO stubs into the actual source files, back up the originals, and provide `start` / `restore` commands. The course page is a read-only preview and a check button, not an editor.
- **No multiple-choice lab exercises.** Labs are fill-in-the-code. The only quiz allowed is the **level diagnostic** before the course, and it is for placement, not grading.
- **Every lab needs a checker** that builds a temp copy of the current repo, runs authoritative tests, and reports per-case results. The checker must never modify the repo.
- **Every lab needs 3 progressive hints and a reference solution.**
- **Verify before delivery:** `--self-test` (skeleton fails, solution passes), page loads with no console errors, video has audio, mobile layout works.
- **Write in the learner's language.** Ask; do not assume English. Keep code, identifiers, and upstream comments in their original language.

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

Ask **6 scored questions** (self-rating, scenarios, one code snippet) plus 2 unscored questions:

- What do you want to be able to do? (steer AI / debug / understand architecture / build)
- How much time do you have? (15 / 30 / 60+ minutes)

Score 0–12 and pick a track:

| Score | Track | Course shape |
|---|---|---|
| 0–4 | **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding, 75–90 s video |
| 5–8 | **Builder** | 5 modules, 3 labs, standard hints, 90 s video |
| 9–12 | **Deep Diver** | 5–6 modules, 3 harder labs, fewer hints, more real code, 90–120 s video |

If the learner declines, use **Builder**. Write the result to `COURSE_BRIEF.md` using `templates/course-brief.md`.

Also ask:

- Which repo or topic?
- Which language should the course be written in?
- Is a video required, or are diagrams + labs enough?

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

Target 60–90 seconds, 16:9, 1920×1080, 30 fps.

- 5–7 scenes: hook → the machine → 2–3 stage highlights → values/data → outro.
- 150–220 words of narration. Write for the ear, not the page.
- Voice: a local TTS such as Kokoro-82M (`am_michael` or a voice matching the learner’s language/tone). Do not require a paid provider.
- Music and SFX: a soft bed under the voice, keyboard/click/whoosh cues, a small result chime. Pre-mix with ffmpeg and normalize to about −16 LUFS.
- Render with HyperFrames when available: one paused GSAP timeline, local fonts, local audio, no network at render time, root `data-duration`.
- If HyperFrames is unavailable, use the fallback: HTML/CSS slides + TTS + ffmpeg, or a screen-recorded walkthrough with burned-in titles.
- Extract a poster frame and embed the MP4 at the top of the course.

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
- mobile layout has no horizontal overflow outside code/editor areas.

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
| `references/quality-gates.md` | Pre-delivery checklist |

## Templates

| File | Use |
|---|---|
| `templates/course-brief.md` | Fill after the level test |
| `templates/storyboard.md` | Scene-by-scene video plan |
| `templates/lab.mjs` | Generic repo-mode start/restore/status helper (adapt imports) |
| `templates/lab-cases.json` | Authoritative case format |

## Track adaptations

| | Explorer | Builder | Deep Diver |
|---|---|---|---|
| Modules | 4 | 5 | 5–6 |
| Labs | 2 | 3 | 3 |
| Hints | Show 2 up front | 3 progressive | 3, last one minimal |
| Code shown | Short, heavily annotated | Real snippets | Longer real snippets |
| Video | 75–90 s, more analogy | 90 s | 90–120 s, denser |
| Tooltips | Aggressive | Standard | Only non-obvious terms |
| Diagrams | More, simpler | Standard | Fewer, denser |

## Anti-patterns

- Starting with a definition instead of an observable behavior.
- A “Labs” section at the end instead of labs after their concept.
- An in-page code editor that edits a copy instead of the real repo.
- Multiple-choice lab exercises.
- A checker that copies the repo but ignores the learner’s edits, or modifies the repo.
- All labs removed at once with no way to restore the originals.
- A video with no voice, no sound, or no poster.
- Text walls, recycled metaphors, or a purple-gradient AI look.
