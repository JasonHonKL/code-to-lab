# code-to-lab

A self-contained agent skill that turns any codebase or technical topic into a **top-down interactive course**:

- one short narrated explainer video, voiced with **Supertonic 3**,
- a **white background by default** (themes are opt-in),
- **graph-first Mermaid diagrams** — every section leads with a diagram, and diagrams replace prose for flows, states, sequences, and relationships,
- **every diagram enlarges** — a full-screen zoom/pan dialog with a readable inline fallback, so dense maps are not trapped at thumbnail size,
- hands-on labs placed **inside** the sections that teach them,
- a per-section **MC check → short answer → lab** gate, plus micro-checks between screens so the learner does not drift,
- **per-section time budgets** for reading and answering, with separate lab estimates, so the learner can plan a sitting and the course can be checked against its seat time,
- labs that fit the skill: code, writing, design, performance/practice, experiment, or research,
- TODO stubs in the **real project files** for code labs, and real work files or artifacts for the rest,
- progressive hints and a reference solution or exemplar,
- verification that fits the medium: authoritative tests, deterministic checks, a rubric, and—only when needed—a calibrated LLM judge or expert review,
- a learner-level diagnostic **before** the course is designed.

No dependency on other skills, prompt packs, or hosted course products.

## Why this style

Most code tutorials start at the bottom: variables, data structures, then eventually the thing the learner wanted to understand. This skill starts at the top:

```text
observable behavior
      ↓
one end-to-end trace
      ↓
the system map
      ↓
zoom into the runtime
      ↓
zoom into execution
      ↓
labs inline, in the real medium
```

The learner starts with something they can already see, then opens the boxes that produced it.

## What makes it different

### 1. Level test first

Before building, the agent runs a two-minute diagnostic with **two separate axes**: general technical level and **topic prior knowledge**. The topic question includes an explicit **“I don’t know this topic at all”** option.

| Track | Course shape | Recommended seat time |
|---|---|---|
| **Newcomer** | 4 modules, 2 labs, a “What is this?” opening, every term defined, a guided first lab | 30–45 min |
| **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding | 45–60 min |
| **Builder** | 5 modules, 3 labs, standard hints | 60–90 min |
| **Deep Diver** | 5–6 modules, 3 harder labs, less scaffolding, more real code | 90–150+ min |

The topic answer wins over the general score: a strong programmer can still be new to the topic. The test is not graded. It only changes depth, pace, hint density—and time. A deeper, more detailed course is longer: Deep Diver is 90–150+ minutes, not a 15-minute tour. If the budget is below the track minimum, the course is downgraded or split into a core path plus optional deep-dive modules.

For math/physics, the agent also asks **top-down vs bottom-up** and can use **Manim** for the explainer. See `references/math-physics.md`.

### 2. Labs live between sections

A lab appears immediately after the section that teaches its core:

- lexer lab after the pipeline section,
- table/runtime lab after the data-structure section,
- execution lab after the loop section.

There is no separate “Labs” module at the end.

### 3. Graph-first, white by default

The course page and video use a **white background by default** (`#FFFFFF`), dark ink, and one accent. Warm paper, beige, off-white, and dark themes are opt-in; the agent uses one only when the learner asks for it and records the choice in `COURSE_BRIEF.md`.

Diagrams are the primary explanation, not decoration:

- every conceptual screen leads with a Mermaid diagram or an equally visual block,
- every teaching section has at least one diagram,
- every module has at least three diagrams and at least two diagram types,
- flows, sequences, states, hierarchies, decisions, and relationships become graphs; prose annotates the graph,
- diagrams can be stepped through, clicked, or used as a hotspot check,
- every diagram can be enlarged into a full-screen zoom/pan dialog; inline text never drops below 15 px.

Read `references/diagrams.md` for the type-selection table, patterns, white Mermaid theme, and accessibility rules.

### 4. Labs happen in the real medium

Not every lab is a coding exercise. The lab medium follows the skill being taught:

- **Code** — install TODO stubs into the actual source files, back up the originals, and let the learner edit in their own editor.
- **Writing** — scaffold a real work file (explanation, prompt, review, spec) under `course/work/<lab>/` and check it against a rubric.
- **Design / artifact** — produce a real page, slide, diagram, chart, or UI and verify render/schema plus a rubric.
- **Performance / practice** — record a take or a practice log (guitar, pronunciation, demo) and check format, duration, and a rubric or audio analysis.
- **Experiment / research** — run something or investigate a question, record the observation and sources, and check the conclusion.

The learner works in the real file or medium. There is no in-page editor that only edits a copy.

### 5. Verification fits the medium

`node course/check.mjs <lab-id>`:

1. verifies the checksummed tests, rubric, and exemplars,
2. reads the learner’s current work,
3. runs deterministic checks first (build/tests for code; format, length, sections, links, duration, or render state for non-code),
4. applies a rubric, and optionally a calibrated LLM judge with quoted evidence,
5. reports per-case or per-criterion results.

For code labs, the checker copies the repo to a temp directory, keeps the learner’s target file, fills the other labs with reference solutions, and runs the authoritative cases. It never modifies the learner’s work.

### 6. Active practice plus the MC → short answer → lab gate

Every teaching section has a three-beat gate before its lab:

1. **MC check** — 2–4 items (recall, misconception, application), per-option feedback, retry, unscored.
2. **Short answer** — one “explain it back” prompt, 2–4 sentences, autosaved locally, with a model answer and a 3-item self-check. Unscored and not auto-graded.
3. **Lab** — the learner produces the real artifact.

The gate catches the learner who nodded along but missed the section’s core idea, and the short answer forces retrieval before practice. Neither check gates progress or replaces the lab.

Between screens, the course adds **micro-checkpoints** every 1–2 screens: predict/reveal, one-question MC, order-the-steps, a diagram hotspot, or match pairs. No more than two screens or about three minutes pass without an interaction, so the learner does not drift into passive reading.

Each section also shows a **time budget** for reading and answering, and each lab shows its own estimate:

| Track | Section read + check | Lab (if owned) |
|---|---|---|
| Newcomer | 5.5–7 min | 8–12 min |
| Explorer | 7–8.5 min | 10–15 min |
| Builder | 7.5–10.5 min | 12–18 min |
| Deep Diver | 9.5–13 min | 15–25 min |

The lab time is additional, not folded into reading. The course intro states the total, and the agent reconciles `Σ sections + Σ labs + 5–10 min` against the track’s seat time. Read `references/pacing.md` for the estimation formula and the worked example.

The pre-course level diagnostic remains the only placement quiz. Multiple choice is otherwise allowed for section checks, micro-checks, recognition/recall/discrimination drills, and exam-fidelity item sets (CFA-style), with per-option feedback. It is never the default lab format and never the only evidence for a production skill. Most labs ask the learner to produce something.

### 7. The answer format matches the target performance

A lab should look like the performance the learner is preparing for—not like the easiest thing to grade.

| Learner goal | Lab answer format | Multiple choice? |
|---|---|---|
| Debug or extend a codebase | Code diff in the real repo + tests | Warm-up only |
| Make architecture decisions | ADR / trade-off table with repo evidence | Vocabulary only; not the decision |
| Pass a CFA-style exam | Exam-style item sets + show-your-work calculation | Yes—primary for exam fidelity, with rationales |
| Design or run a service (incl. learning as a service) | Blueprint, pricing model, experiment plan, customer synthesis | Terminology/regulation only |
| Learn math/physics | Derivation or computation | Warm-up only |
| Learn a language or instrument | Recorded performance + practice log | Recognition drills only |

Read `references/assessment-design.md` for the full matrix and worked examples.

### 8. One video, not a lecture

A 60–90 second explainer on a white canvas with a local voice model, a music bed, and UI sound effects. Narration uses **Supertonic 3** (default voice `M1`) for every language it supports; Chinese uses `edge-tts` because Supertonic 3 does not cover it. It gives the mental model; the course zooms into it. A fallback pipeline is included if HyperFrames is unavailable.

## Install

```bash
git clone https://github.com/JasonHonKL/code-to-lab.git

mkdir -p ~/.claude/skills/top-down-course
cp -R code-to-lab/SKILL.md code-to-lab/references code-to-lab/templates \
  ~/.claude/skills/top-down-course/

# Optional: link the vendored companion skills
cd code-to-lab
bash scripts/install-companions.sh

# Optional: install the research and slide companions by reference
bash scripts/install-research-and-slides.sh
```

For opencode:

```bash
mkdir -p ~/.config/opencode/skills
ln -s ~/.claude/skills/top-down-course ~/.config/opencode/skills/top-down-course
```

For other agents that read `.agents/skills/`:

```bash
mkdir -p ~/.agents/skills
ln -s ~/.claude/skills/top-down-course ~/.agents/skills/top-down-course
```

Restart the agent so it discovers the skill.

## Use

```text
Use the top-down-course skill to build a course for <repo or topic>.
Start with the level test.
```

Or just:

```text
Turn this codebase into a course.
```

The skill will:

1. run the level test,
2. write `COURSE_BRIEF.md` with the track and the section/lab time plan,
3. analyze the codebase and choose 3–5 concepts and 2–3 lab sites,
4. design the top-down arc,
5. build the course page,
6. install the lab work files/exemplars and verification,
7. produce the video,
8. verify and hand off.

## What is in this repo

```text
SKILL.md
references/
  level-test.md            # 6-question diagnostic + tracks
  course-architecture.md   # top-down arc, module templates, inline labs
  diagrams.md              # graph-first rules, Mermaid types, enlarge/zoom, white theme
  interactivity.md         # section rhythm, MC → short answer → lab, micro-checks
  pacing.md                # per-section read/check budgets, lab budgets, course total
  assessment-design.md     # answer formats by domain: code, ADR, CFA, service, language
  lab-kinds.md             # code/writing/design/performance labs, MC rules, LLM judge
  lab-checker.md           # repo-mode labs, checker modes, test design
  video-production.md      # script, storyboard, voice, sound, render
  voice.md                 # Supertonic 3 install, voices, languages, per-scene narration
  design-system.md         # white canvas, type, diagrams, check/lab UI
  color-themes.md          # palette catalog, contrast gate, install-by-reference
  quality-gates.md         # pre-delivery checklist
  math-physics.md          # top-down/bottom-up math/physics courses + Manim
  companion-skills.md      # optional companions
templates/
  course-brief.md
  storyboard.md
  lab.mjs                  # generic start/restore/status helper
  lab-cases.json           # authoritative case format (code labs)
  lab-rubric.json          # rubric + deterministic checks + judge (non-code labs)
  architecture-decision.md # ADR-style deliverable for architecture labs
  mc-item-set.json         # exam-fidelity MC item set with rationales + show-your-work
  section-check.json       # micro-checks + 2–4 MC items + short answer, model answer, self-check
scripts/
  install-companions.sh    # link the vendored skills into your agent
  install-color-themes.sh  # fetch the color-themes companion by reference
  install-research-and-slides.sh  # fetch deep-research + frontend-slides by reference
vendor/
  mattpocock-skills/       # MIT
  manim_skill/             # MIT
  video-use/               # MIT
  impeccable/              # Apache-2.0
  academic-research-skills/ # CC BY-NC 4.0
  README.md                # upstream snapshots, licenses, update notes
```

## Lab workflow

After the skill builds a course, the learner works in the real code or work files:

```bash
node course/lab.mjs status
node course/lab.mjs start all
node course/lab.mjs restore all

node course/check.mjs <lab-id>
node course/check.mjs --self-test
node course/check.mjs <lab-id> --solution   # code labs
node course/check.mjs <lab-id> --manual     # non-code labs without a judge

node course/serve.mjs
```

The page is a read-only preview plus a **Check my work** button. Edit the real code or work file directly.

## Video pipeline

Default: a 60–90 second HyperFrames composition on a white canvas.

- **Supertonic 3** for narration (default `M1`; 31 languages; 44.1 kHz local ONNX); `edge-tts` only for Chinese, which Supertonic 3 does not cover.
- One clip per scene, measured with `ffprobe`; pre-mixed into `mix.m4a`.
- A soft music bed and subtle UI SFX, pre-mixed with ffmpeg.
- Local fonts, local GSAP, local audio.
- One paused timeline, deterministic scenes.
- A locked camera: no shake, wobble, drift, parallax, or continuous zoom; animate content inside a fixed 1920×1080 frame.
- Frame-exact capture at a constant 30 fps; static holds are stable.
- Poster frame extracted from the final render.

If HyperFrames is unavailable, the skill uses a fallback: a paused HTML/CSS timeline captured frame-by-frame, plus Supertonic 3 and ffmpeg. It does not screen-record the explainer. When a slide deck is requested, it uses `frontend-slides` to build the deck.

## Companion tools (optional)

These are optional and never required for a course to work. Use them when they clearly improve the result; record usage in `COURSE_BRIEF.md`.

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

- `deep-research` — [Apache-2.0](https://github.com/sanjay3290/ai-skills). Requires a `GEMINI_API_KEY`; each run costs roughly $2–5 and takes 2–10 minutes. Ask before the first run, and verify every citation.
- `frontend-slides` — [MIT](https://github.com/zarazhangrui/frontend-slides). Single-file HTML decks; no npm or build step.
- `video-use` — [MIT](https://github.com/browser-use/video-use). Uses an external transcription provider; review privacy before uploading footage.
- `impeccable` — [Apache-2.0](https://github.com/pbakaus/impeccable). Telemetry is on by default; opt out with `npx impeccable telemetry off` or `DO_NOT_TRACK=1`.
- `academic-research-skills` — [CC BY-NC 4.0](https://github.com/Imbad0202/academic-research-skills). Non-commercial; verify every citation.
- `mattpocock/skills` — [MIT](https://github.com/mattpocock/skills). Optional interview skills; the level test is still required.
- `manim_skill` — [MIT](https://github.com/adithya-s-k/manim_skill). Manim Community Edition is the safer default for a course; ManimGL is better for interactive/3D work.
- `color-themes` — No license declared upstream. Install it by reference with `bash scripts/install-color-themes.sh`; do not vendor it.

### Vendored copies

The five vendored companions are included under `vendor/` with their upstream licenses and snapshot hashes. Link the single-skill companions with:

```bash
cd code-to-lab
bash scripts/install-companions.sh
```

This links `video-use`, `impeccable`, the Matt Pocock engineering/productivity skills, and the Manim skills into `~/.claude/skills`, `~/.config/opencode/skills`, and `~/.agents/skills`. Existing real directories are skipped unless you pass `--force`.

The **Academic Research Skills** suite is multi-skill and uses a plugin manifest. Point its marketplace at the vendored suite:

```text
/plugin marketplace add <repo>/vendor/academic-research-skills
/plugin install academic-research-skills
```

### Research and slides (by reference)

`deep-research` and `frontend-slides` are fetched into a local cache and linked, not vendored:

```bash
cd code-to-lab
bash scripts/install-research-and-slides.sh
```

The script keeps shallow copies in `~/.cache/code-to-lab` (override with `RESEARCH_SLIDES_CACHE`). For `deep-research`, install its Python requirements and add a `GEMINI_API_KEY`; each run costs roughly $2–5, so ask before the first run. `frontend-slides` has no dependencies.

### Color themes (by reference)

The color-themes catalog is not vendored because its upstream repository declares no license. Fetch a sparse checkout into the local cache and link it into your agent:

```bash
cd code-to-lab
bash scripts/install-color-themes.sh
```

The script links `color-themes` into the same three skill directories as the other companions. It keeps the upstream files in `~/.cache/code-to-lab/color-themes-src` (override with `COLOR_THEMES_CACHE`), so updates are a re-run of the same command. See `references/color-themes.md` for the contrast gate and recommended code/terminal pairings.

See `vendor/README.md` for snapshots, licenses, prerequisites, and update instructions. Read `references/companion-skills.md` for integration rules.

## Math and physics

Math/physics courses use the same top-down method with different artifacts:

- ask **top-down** (phenomenon → model → derivation → lab) or **bottom-up** (definitions → derivation → examples);
- use **Manim** for the video via `manim_skill`;
- keep the mathematical logic in a testable function;
- labs check **numeric tolerance** or **symbolic equivalence** (SymPy), not string matching;
- test a known analytic/limiting case.

See `references/math-physics.md`.

## Requirements

- Node.js 22+ for the course tooling.
- A compiler/toolchain for a code repo (make, cargo, npm, go, etc.); non-code labs need only their own medium.
- Optional: HyperFrames for the video.
- Optional: FFmpeg for audio/video assembly.
- Optional: Python 3.10+ with `supertonic` for local narration (first run downloads ~400 MB; no GPU).
- Optional: `edge-tts` for Chinese narration, which Supertonic 3 does not cover.
- Optional: `GEMINI_API_KEY` for the `deep-research` companion (paid, opt-in).
- Optional: a judge model/API for non-code lab rubrics; every lab also has a `--manual` fallback.

The skill itself has no runtime dependencies.

## Design principles

- Start with behavior, not definitions.
- **Graph-first, not text-first:** the diagram is the explanation; the prose annotates it.
- **Every diagram enlarges:** full-screen dialog with zoom, pan, reset, and close; never shrink inline text below 15 px.
- Show, don’t tell: Mermaid maps, translations, real output.
- **White background by default;** themes are opt-in.
- Exact code from the repo, never simplified snippets.
- 2–3 sentences per text block; a text-only teaching screen is a defect.
- Every teaching section has at least one diagram; every module has at least three.
- Tooltips for every technical term on first use.
- No recycled metaphors.
- Choose the lab kind from the learning verb; multiple choice only for section checks, micro-checks, recognition/recall/discrimination, and exam fidelity, with feedback.
- **Every teaching section gates the lab with MC → short answer → lab;** neither check replaces the lab.
- **Time-box every section:** show read + check estimates, keep the lab separate, and reconcile the total with the track’s seat time; no countdown.
- No more than two screens or ~3 minutes without an interaction.
- Match the answer format to the target performance: code for debugging, ADR for architecture, item sets for CFA-style exams, artifacts for service design.
- Depth and time scale together; never compress a Deep Diver course into a 15-minute tour.
- The project’s own tests are the specification for code; explicit rubrics are the specification for non-code work.
- Verify the checker in both directions before delivery.
- **Flatten the page:** one card level, inline row actions, filters as a toolbar, at most one primary button per surface.
- **Lock the camera:** the video frame never shakes, drifts, or zooms continuously; static holds are pixel-stable.

## Quality gates

- Level test completed or Builder default recorded.
- Page and video are white by default; a named theme only when requested.
- Labs inline, not collected at the end, and the lab kind matches the learning verb.
- Every section has a Mermaid diagram; every module has at least three and two diagram types; diagrams have captions and source fallbacks.
- Every diagram has an `Enlarge` dialog with zoom, pan, reset, and close; inline text stays readable and enlarged views are checked at 1440 and 390.
- Every section has MC → short answer; a lab section adds the lab third and last; both checks are unscored and do not gate progress.
- Every section and lab shows a time estimate; section + lab totals fit the track’s seat time; no countdown or timer pressure.
- Every section has micro-checks with no more than two screens or ~3 minutes between interactions.
- The answer format matches the target performance.
- The selected track's recommended seat time matches the learner's time budget; a Deep Diver course is 90–150+ minutes, not a compressed tour.
- If MC is used for exam fidelity, it includes rationales and a show-your-work task.
- Code labs modify real repo files with TODO skeletons; non-code labs have a real work file or artifact.
- `lab.mjs restore` works for both.
- `check.mjs --self-test` passes: skeleton/weak exemplar fails, solution/strong exemplar passes.
- Every lab checks independently, and every non-code lab has deterministic checks plus a `--manual` fallback.
- Video has voice, music, SFX, a poster, and no black tail; narration uses Supertonic 3 (Chinese: `edge-tts`).
- Video camera is locked, frame rate is constant 30 fps, static holds are stable, and the explainer was rendered frame-exact rather than screen-recorded.
- Page loads with no console errors, diagrams render, labs are read-only, short answers autosave locally, mobile works.
- No nested cards; row actions are inline; filters are a toolbar; table labels do not collide at 1024 px.
- Screenshots at 1440×900 and 390×844 were inspected; localized strings do not clip.
- After merging upstream changes, translations and the full check suite were preserved and re-run.
- README explains edit / check / restore.

## Notes

- The skill is self-contained. It does not download or depend on `/brag` or `codebase-to-course`.
- The companion tools are optional integrations, not dependencies. The course must work without them.
- The color-themes companion is installed by reference, not vendored, because its upstream has no declared license. Do not copy its files into this repository.
- The repo vendors the companions as snapshots (~23 MB) so they are available offline. Their licenses apply to `vendor/`, not to the rest of the repo.
- It was extracted from a real course built on a Lua interpreter, but it is not Lua-specific.
- The worked example used a C build, `make`, a repo-mode checker, and a 90-second HyperFrames video; the references describe how to adapt the same shape to other languages and toolchains.
