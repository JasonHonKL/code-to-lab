---
name: top-down-course
description: "Build a top-down, interactive course from any codebase or technical topic: a short narrated explainer voiced with Supertonic 3, a white background by default, graph-first Mermaid diagrams that enlarge into a zoom/pan dialog, hands-on labs placed inline between sections, a per-section MC check then short-answer gate before each lab, micro-checkpoints between screens, progressive hints, and verification that fits the skill. Labs are learn-by-doing and may edit real code, write or perform in the real medium, design an artifact, or run an experiment; they can be checked by tests, deterministic validators, rubrics, or a calibrated LLM judge. Use when someone wants to turn code or a skill into a course, teach a codebase, create a video + diagrams + exercises, or design a level-adapted tutorial. Always run a short learner-level diagnostic before building, and never make the in-page editor the lab."
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
- **Depth and time scale together.** The deeper, more detailed track needs a longer seat time: Newcomer 30–45 min, Explorer 45–60, Builder 60–90, Deep Diver 90–150+ minutes. If the learner asks for “more difficult” or “more detailed,” increase the time budget and depth together; never compress a Deep Diver course into a 15-minute tour.
- **Top-down arc.** Never start with “what is a pointer” or “what is a hash table.” Start with the behavior the learner can see, then open the box that produced it.
- **Labs live inside the course**, after the section that teaches their core. Never collect all labs into one “Labs” module at the end.
- **Labs happen in the real medium.** For code, install TODO stubs into the actual source files, back up the originals, and provide `start` / `restore` commands. For writing, design, practice, or experiments, scaffold a real work file or artifact and check that. The course page is a read-only preview and a check button, not an editor.
- **Choose the lab kind from the learning verb.** Debug → code; explain → writing; design → artifact; play or speak → performance; recognize → drill. Read `references/lab-kinds.md` before choosing. Do not force a code lab onto a non-code skill.
- **Match the answer format to the target performance.** If the learner is preparing for a multiple-choice exam (CFA, licensing), MC item sets are authentic—pair them with show-your-work and a written recommendation. If the target is debugging, use code; if the target is an architecture decision, require an ADR/trade-off table with evidence, not “pick the best option.” Read `references/assessment-design.md` for the domain matrix.
- **Default to a white course.** The page and the video use a white background (`#FFFFFF`), dark ink, and one accent. Warm paper, beige, off-white, and dark themes are opt-in: use one only when the learner asks for it or names a theme, and record it in `COURSE_BRIEF.md`.
- **Graph-first, not text-first.** Every conceptual screen leads with a visual, and every teaching section has at least one Mermaid diagram. Every module has at least three Mermaid diagrams and at least two diagram types. If a sentence describes a flow, sequence, state, hierarchy, decision, or relationship, draw it; the prose annotates the graph. Read `references/diagrams.md`.
- **Diagrams enlarge, never shrink.** Every diagram has a visible `Enlarge` control that opens a full-screen dialog with zoom, pan, reset, and close. Inline diagram text stays at 15 px or larger; a wide diagram scrolls instead of scaling down. Keyboard, focus return, and mobile controls are part of the contract.
- **Prevent drift with a steady rhythm.** No more than two screens or about three minutes of passive reading without an interaction. Put a micro-check (predict/reveal, one-question MC, order-the-steps, hotspot) between screens, and one recall opener at the start of each section after the first module. Read `references/interactivity.md`.
- **Time-box every section.** Each section shows `≈X min read · Y min check`; each lab shows its own estimate. Use the per-track budgets in `references/pacing.md`: reading 3–7 min, MC 1–2 min, short answer 1.5–4 min, gate 2.5–6 min, lab separate. Never hide the lab inside the reading time, never cut the short answer to fit, and never add a countdown timer.
- **Every teaching section gets a three-beat gate before its lab: MC → short answer → lab.** First, 2–4 multiple-choice items with per-option feedback, retry, one misconception item, and one application item. Second, one short-answer prompt (2–4 sentences) with local autosave, a model answer, and a 3-item self-check. Then the lab. It is formative: not scored, not gated, and never a substitute for the lab.
- **Labs are active practice, not a quiz.** Multiple choice is allowed for section checks, micro-checks, recognition/recall/discrimination drills, and exam-fidelity item sets, with per-option feedback. It is not allowed as the only evidence for a production skill, as the default lab format, or as “guess the formula.” The level diagnostic remains separate and is for placement, not grading.
- **Every lab needs verification that fits the medium.** Code labs build a temp copy and run authoritative tests. Non-code labs combine deterministic checks, an explicit rubric, and—only when needed—a calibrated LLM judge or expert review. The checker must never modify the learner's work.
- **Every lab needs 3 progressive hints and a reference solution or exemplar.**
- **Verify before delivery:** `--self-test` (skeleton/weak exemplar fails, solution/strong exemplar passes), page loads with no console errors, video has audio, mobile layout works.
- **Motion stays inside a fixed frame.** The video camera is locked: no shake, wobble, handheld drift, parallax, rotation, breathing zoom, or continuous pan. Animate content inside a 1920×1080 frame; use hard cuts or one simple crossfade. Never screen-record the explainer. Render frame-exact from a paused timeline, and make every static hold pixel-stable.
- **Flatten the surfaces.** One card level only: no card inside a card. Row actions are inline text actions, not a stack of boxed buttons. Filters are a borderless toolbar, secondary forms hide behind a disclosure, and each surface has at most one primary button.
- **Voice is Supertonic 3.** Narration uses Supertone **[Supertonic 3](https://huggingface.co/Supertone/supertonic-3)** (local, 44.1 kHz, default voice `M1`) for every language it supports. Use `edge-tts` only for languages it does not cover, currently Chinese. Do not use Kokoro or `hyperframes tts` for narration. Read `references/voice.md`.
- **Use the research and slides companions when asked.** For research, use `sanjay3290/ai-skills` → `skills/deep-research` (Gemini Deep Research) first; get consent for its paid API. For a slide deck, use `zarazhangrui/frontend-slides`. Both are optional to install but are the default choice when the learner asks for that artifact. See `references/companion-skills.md`.
- **Write in the learner's language.** Ask; do not assume English. Keep code, identifiers, and upstream comments in their original language.
- **Contrast is a quality gate.** Body text ≥ 4.5:1 and code tokens ≥ 7:1 against their actual backgrounds. Use a palette from the `color-themes` companion when a theme is requested or contrast is in question; measure it, do not eyeball it.

## Workflow

| Phase | Goal | Gate |
|---|---|---|
| 0 | Learner-level diagnostic + brief | `COURSE_BRIEF.md` exists with a track |
| 1 | Analyze the codebase/topic; choose concepts and lab sites | 3–5 concepts, 2–3 labs, one end-to-end trace |
| 2 | Design the top-down arc and inline lab placement | Module outline with section count and read/check/lab time plan reviewed |
| 3 | Build the course site | Graph-first page, checks + short answers before labs, diagrams render |
| 4 | Build the labs and their verification | `--self-test` passes (both directions) |
| 5 | Produce the video | 60–90 s MP4 with Supertonic 3 voice + sound + poster |
| 6 | Verify and hand off | All quality gates pass; README has commands |

Read the relevant reference only when you reach that phase.

## Phase 0 — Level test first

Read `references/level-test.md`. Run the diagnostic in chat, not as a form.

Ask **6 scored questions** (self-rating, scenarios, one code snippet/symbolic trace) for general technical level, then the required topic questions:

- **Topic prior knowledge:** “I don’t know this topic at all” / “I’ve heard some terms” / “I can use it” / “I can teach it”.
- **Domain:** software / math / physics / other.
- **Direction:** top-down (phenomenon → principles) or bottom-up (definitions → results). Ask for math/physics; default to top-down for software. If the learner is a Newcomer, do not force this choice before the first module.
- **Goal:** steer AI / debug / understand architecture / build / solve problems / teach.
- **Time:** 20–35 / 35–60 / 60–90 / 90–150+ minutes (scale with the track).
- **Language** and whether a video is required.
- **Do not ask about the background or voice unless the learner raises them.** Default to the white canvas and Supertonic 3 voice `M1`; record any requested theme or voice in the brief.

Select the track:

| Condition | Track | Course shape | Seat time |
|---|---|---|---|
| Topic “I don’t know this topic at all” | **Newcomer** | 4 modules, 2 labs, a “What is this?” opening, every term defined, a guided first lab, 75–90 s video | 30–45 min |
| General score 0–4 | **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding, 75–90 s video | 45–60 min |
| General score 5–8 | **Builder** | 5 modules, 3 labs, standard hints, 90 s video | 60–90 min |
| General score 9–12 | **Deep Diver** | 5–6 modules, 3 harder labs, fewer hints, more real code, 90–120 s video | 90–150+ min |

Topic “I’ve heard some terms” adds a one-screen primer; “I can use it / teach it” skips the primer. The Newcomer track wins over the general score: a strong programmer can still be new to the topic.

If the learner declines, use **Builder** and state the assumption. If their stated time budget is under 45 minutes, use **Explorer** instead and record the downgrade. Write the result to `COURSE_BRIEF.md` using `templates/course-brief.md`.

If the time budget is below the track minimum, downgrade or split into a core path plus optional deep-dive modules. If it is above, add optional extensions, not padding. See `references/level-test.md`.

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

When the answer format is not obvious—exam prep, architecture decisions, service or business courses—read `references/assessment-design.md` before choosing lab sites.

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

Plan the gate with the lab: every lab section gets its MC items and short-answer prompt designed at the same time as the lab mission, not bolted on afterward. Plan at least one diagram per section and the micro-check between its screens.

Budget the arc before building it: count sections, assign each a read/check range from `references/pacing.md`, assign lab ranges, and sum them against the track’s seat time. If the sum is over, cut a section or move detail into an optional extension; do not plan a 110-minute course for a 60-minute budget.

## Phase 3 — Build the course site

Read `references/design-system.md`, `references/diagrams.md`, `references/interactivity.md`, and `references/pacing.md`.

Start with the **white default**: page background `#FFFFFF`, dark ink, one accent, neutral gray borders. Do not use a warm paper, beige, off-white, or dark canvas unless the learner asks for it. If the learner names a theme or asks for a dark page, read `references/color-themes.md`, pick the requested palette (Tokyo Night is a good dark default; GitHub Light/Dark High Contrast are good for code panels), map it to CSS custom properties, and verify contrast after rendering. Do not invent a palette when the requested one exists.

Build a directory course site with:

- `index.html` assembled from `_base.html`, `modules/*.html`, `_footer.html`.
- `styles.css` and `main.js` for course-wide layout, progress, tooltips, chat, flow animations, and the sticky section rail.
- `section-check.js` for the MC cards, micro-checks, and short-answer autosave/reveal.
- `lab.css` and `lab.js` for the read-only lab preview, hints, check button, and results.
- `assets/` for the poster, video, and a local Mermaid build.
- `build.sh` that concatenates the modules.

Content rules:

- **Graph-first.** Every conceptual screen leads with a Mermaid diagram or an equally visual block; every teaching section has at least one Mermaid diagram; every module has at least three Mermaid diagrams and at least two types. A text-only screen is a defect. See `references/diagrams.md`.
- **Every diagram enlarges.** Add a visible `Enlarge` control above the canvas; it opens a full-screen `<dialog>` with `−`, `+`, `Reset`, `Close`, pan, and focus return. Never scale inline diagram text below 15 px. See `references/diagrams.md`.
- 2–3 sentences per text block. If a fourth sentence describes a flow or relationship, replace it with a diagram.
- Every technical term gets a glossary tooltip on first use per module.
- Every module has at least one real code↔English translation.
- **Micro-check cadence.** No more than two screens or about three minutes of passive reading without an interaction. Use predict/reveal, a one-question MC, order-the-steps, a diagram hotspot, or an explain-back prompt. One recall opener per section after the first module.
- **The gate before each lab is MC → short answer → lab.** Every teaching section ends with a 2–4 item **Check your understanding** card (per-option feedback, retry, one misconception item, one application item), then a short-answer card (2–4 sentences, local autosave, model answer, 3-item self-check), then the lab. Neither is scored or gated, and neither replaces the lab. See `references/interactivity.md`.
- **Time chips are part of the layout.** Each section header and the sticky rail show `≈X min read · Y min check`; the course intro states the total; each lab header shows its own estimate. Calculate them from words, diagrams, translations, MC items, and the short answer as described in `references/pacing.md`, then check that the total fits the track’s seat time. Do not add a countdown.
- Every lab is a white card with a visible border on the white page: the incomplete/weak behavior, mission, deliverable, evidence path, 3 hints, a read-only starter or preview (code or artifact), copy-path, check command, check button, rubric, and a reference solution/exemplar.
- Multiple choice is allowed for section checks, micro-checks, recognition drills, and exam-fidelity item sets, with per-option feedback; never as the only evidence for a production skill and never as the default lab format.

If the learner asks for slides, a deck, or a presentation version, read `references/companion-skills.md` and use `frontend-slides`. Do not build a second competing design system; reuse the course's palette, type, and content.

The page must work offline except for web fonts; bundle Mermaid, the video, and the poster locally.

Before the optional audit, take screenshots at 1440×900 and 390×844. Remove nested cards, stacked boxed row actions, and overlapping table labels; the surface rules are in `references/design-system.md`.

If `impeccable` is installed, run its audit after the page is built:

```bash
npx impeccable detect course/ --json
```

or `/impeccable audit course`. Treat the findings as a second pass, not as a replacement for the course’s design direction.

## Phase 4 — Build the labs and verification

Read `references/assessment-design.md`, `references/lab-kinds.md`, then `references/lab-checker.md`. Copy and adapt `templates/lab.mjs`, `templates/lab-rubric.json`, and `templates/architecture-decision.md` if useful.

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

Read `references/video-production.md` and `references/voice.md`.

Produce the requested video language/variant. Narration uses **Supertonic 3** for every language it supports (default voice `M1`); do not use Kokoro or `hyperframes tts` for narration. Traditional Chinese and Cantonese are not supported by Supertonic 3—use `zh-TW-HsiaoChenNeural` or `zh-HK-HiuMaanNeural` via `edge-tts`, with colloquial written Cantonese for the latter. Do not generate an English duplicate unless the learner asks for one. If both Mandarin and Cantonese are requested, keep both as separate MP4s with separate captions. See `references/voice.md` and the language-and-voice section in the video reference.

Target 60–90 seconds (up to 120 for Deep Diver), 16:9, 1920×1080, 30 fps.

- 5–7 scenes: hook → the machine → 2–3 stage highlights → values/data → outro. Every scene shows a graph, real code, or real output; no abstract filler.
- 150–220 words of narration, or about 320–400 Chinese characters for a 75–95 s Chinese video. Measure the rendered voice; do not guess. Write for the ear, not the page.
- **White canvas by default.** The video uses a white background, dark ink, and one accent unless the learner asked for a theme. Do not ship the default warm-paper or purple-gradient look.
- Voice: **Supertonic 3** via the `supertonic` CLI or Python SDK (default `M1`; audition `F1`/`M2`; `--steps 10`; 44.1 kHz WAV). One clip per scene, measure with `ffprobe`. Use `edge-tts` only for Chinese, which Supertonic 3 does not cover. Do not require a paid provider. Listen to the first 10 seconds and re-render if the voice sounds robotic or mispronounces identifiers.
- Music and SFX: a soft bed under the voice, keyboard/click/whoosh cues, a small result chime. Pre-mix with ffmpeg and normalize to about −16 LUFS.
- Render with HyperFrames when available: one paused GSAP timeline, local fonts, local audio, no network at render time, root `data-duration`.
- Keep the camera fixed. The frame does not shake, drift, wobble, rotate, or zoom continuously; animate elements inside it, not the canvas. The stability rules and the render check are in `references/video-production.md`.
- If HyperFrames is unavailable, use the fallback: a paused HTML/CSS timeline captured frame-by-frame, plus Supertonic 3 and ffmpeg. Do not screen-record the explainer: capture introduces dropped frames, cursor motion, scroll jitter, and variable frame rate. When a slide deck is requested, use `frontend-slides` (`zarazhangrui/frontend-slides`) to build the HTML deck, then render it with the same storyboard and audio bed.
- Extract a poster frame and embed the MP4 at the top of the course.

If the video uses recorded footage or demo takes, optionally use `video-use` to cut, caption, and grade that footage. Do not use it as the primary explainer generator; keep the generated 60–90 s storyboard as the spine.

For math/physics, use `manim_skill` and Manim (Community Edition by default) for the animation. Render the Manim scenes, then mux the voice and music bed with ffmpeg, or composite them in HyperFrames. See `references/math-physics.md`.

## Phase 6 — Verify and hand off

Read `references/quality-gates.md` and `references/pacing.md`.

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
- video is constant-frame-rate 30 fps and holds are pixel-stable (see `references/video-production.md`);
- every lab loads and is read-only;
- every diagram renders;
- every diagram has a working `Enlarge` control; the dialog zooms, pans, resets, closes on `Escape`, returns focus, and fills the viewport at 390 px;
- every section and lab shows a time estimate; the course intro states the total, and `Σ sections + Σ labs` fits the track’s seat time;
- no countdown, timer pressure, or auto-advance is present;
- no console errors;
- screenshot every screen at 1440×900 and 390×844; no nested-card stacks, clipped buttons, colliding table labels, or page-level horizontal overflow;
- screenshot each enlarged diagram at 1440×900 and 390×844; controls visible, no clipped close button, no page scroll behind the dialog;
- mobile layout has no horizontal overflow outside code/editor areas;
- body text ≥ 4.5:1, code foreground/comments/syntax tokens ≥ 7:1, and command blocks ≥ 7:1 on their real backgrounds;
- if the course is localized, the i18n coverage check passes and expanded strings do not clip buttons, tabs, or table cells.

Write `course/README.md` with:

- what the course is;
- the level track and target seat time;
- the per-section read/check budget, lab budgets, and the course total;
- the exact edit/check/restore commands;
- the lab IDs and files;
- the video and audio rebuild commands;
- the note that the repo files are intentionally modified and how to restore them.

## Reference files

| File | Read it for |
|---|---|
| `references/level-test.md` | The 6-question diagnostic, scoring, and track adaptations |
| `references/course-architecture.md` | Top-down arc, module templates, inline lab placement, content rules |
| `references/diagrams.md` | Graph-first rule, type selection, Mermaid patterns, enlarge/zoom dialog, white theme, accessibility |
| `references/interactivity.md` | Section rhythm, MC → short answer → lab, micro-check types, anti-drift layout |
| `references/pacing.md` | Per-section read/check budgets, lab budgets, time chips, course-total reconciliation |
| `references/assessment-design.md` | Answer formats by domain: codebase, architecture decisions, CFA-style exams, service/learning-as-a-service, language, design, music |
| `references/lab-kinds.md` | Code/writing/design/performance/experiment/research/drill labs, MC rules, rubric and LLM-judge contract, non-code self-test |
| `references/lab-checker.md` | Code repo-mode labs, start/restore, checker modes, case format, self-test; non-code adapters |
| `references/video-production.md` | Script, storyboard, Supertonic 3 voice integration, music/SFX, HyperFrames composition, fallback |
| `references/voice.md` | Supertonic 3 install, voices, languages, per-scene narration, Chinese fallback, troubleshooting |
| `references/design-system.md` | White canvas, palette, typography, diagrams, check/short-answer/lab UI, responsive rules |
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
| `templates/architecture-decision.md` | ADR-style lab deliverable for architecture decisions |
| `templates/mc-item-set.json` | Exam-fidelity item set with per-option rationales and a show-your-work task |
| `templates/section-check.json` | Micro-checks + 2–4 MC items + the short-answer prompt, model answer, and self-check for one section |

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
| Seat time | 30–45 min | 45–60 min | 60–90 min | 90–150+ min |
| Section read + check | 5.5–7 min | 7–8.5 min | 7.5–10.5 min | 9.5–13 min |
| Lab budget | 8–12 min | 10–15 min | 12–18 min | 15–25 min |
| Hints | Very explicit | 2 up front | 3 progressive | 3, last one minimal |
| Code shown | Short, heavily annotated | Short, annotated | Real snippets | Longer real snippets |
| Video | 75–90 s | 75–90 s | 90 s | 90–120 s, denser |
| Tooltips | Every term | Aggressive | Standard | Only non-obvious terms |
| Diagrams | 3 per module, simplest | 3 per module | 3+ per module | 3–4 per module, denser links |
| Micro-checks | Every 1–2 screens | Every 2 screens | Every 2 screens | Every 2–3 screens |
| MC + short answer | 2 items + 1–2 sentences | 2–3 items + 2–3 sentences | 3 items + 2–4 sentences | 3–4 items + 3–4 sentences with evidence |

## Anti-patterns

- Starting with a definition instead of an observable behavior.
- Forcing a codebase trace onto a math/physics topic whose core is a derivation.
- Asking a Newcomer to choose top-down vs bottom-up before the first module.
- Using generic Manim decoration instead of animating the actual derivation.
- A “Labs” section at the end instead of labs after their concept.
- No per-section checks, or one giant quiz at the end instead.
- A lab as the first interaction in a section: the gate is MC → short answer → lab, in that order.
- A section check that replaces the lab, or a lab with no check for the core idea.
- A long passive stretch (more than two screens or about three minutes) with no interaction.
- A section with no read/check time estimate, or a course whose section + lab totals exceed its stated seat time.
- A lab folded into “reading time,” or a short answer cut to make the budget fit.
- A countdown timer, “you are behind” copy, or any other pressure on a formative check.
- A text wall where a Mermaid graph would be clearer, or a module below its diagram floor.
- A diagram shrunk below readable text with no `Enlarge` control, or an enlarge path that only opens a new tab.
- A default beige, warm-paper, off-white, or dark canvas when the learner did not ask for one.
- An in-page editor that edits a copy instead of the real medium.
- Forcing every lab to be code when the skill is writing, design, performance, or recognition.
- Using one answer format for every domain: code for a CFA course, MC for an architecture decision, or prose for a service design.
- Multiple choice as the default lab format, as the only evidence for a production skill, or as “guess the formula.”
- “Pick the best architecture/design/strategy” with no context, trade-off, or evidence.
- Exam-style MC with no rationale, no per-topic report, and no show-your-work task.
- An LLM judge with no rubric, no quoted evidence, no calibration, or no deterministic checks where they are possible.
- A checker that copies the repo but ignores the learner’s edits, or modifies the learner’s work.
- All labs removed at once with no way to restore the originals.
- A video with no voice, no sound, or no poster.
- A shaking, wobbling, drifting, rotating, or continuously zooming video frame; text that shimmers during a hold; or an explainer captured with a screen recorder.
- A card inside a card inside a card; three boxed buttons stacked in a table row; filters in their own card above the list they filter.
- A table whose date, status, or action labels collide at 1024px, or a localized string that clips its button.
- Merging upstream changes by overwriting translated copy or generated screens instead of merging and re-running the checks.
- Using Kokoro or `edge-tts` for a language Supertonic 3 supports, or forcing Supertonic on Chinese.
- Text walls, recycled metaphors, or a purple-gradient AI look.
- Low-contrast body text or code, especially gray comments on a dark panel; a theme name without its actual palette.
- Letting an optional companion override the course’s direction: a launch-style `video-use` cut, generic `impeccable` advice, or academic prose pasted into the teaching copy.
