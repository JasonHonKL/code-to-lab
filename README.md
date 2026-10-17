# code-to-lab

A self-contained agent skill that turns any codebase or technical topic into a **top-down interactive course**:

- one short narrated explainer video,
- diagrams and code-to-plain-English translations,
- hands-on labs placed **inside** the sections that teach them,
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

| Track | Course shape |
|---|---|
| **Newcomer** | 4 modules, 2 labs, a “What is this?” opening, every term defined, a guided first lab |
| **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding |
| **Builder** | 5 modules, 3 labs, standard hints |
| **Deep Diver** | 5–6 modules, 3 harder labs, less scaffolding, more real code |

The topic answer wins over the general score: a strong programmer can still be new to the topic. The test is not graded. It only changes depth, pace, and hint density.

For math/physics, the agent also asks **top-down vs bottom-up** and can use **Manim** for the explainer. See `references/math-physics.md`.

### 2. Labs live between sections

A lab appears immediately after the section that teaches its core:

- lexer lab after the pipeline section,
- table/runtime lab after the data-structure section,
- execution lab after the loop section.

There is no separate “Labs” module at the end.

### 3. Labs happen in the real medium

Not every lab is a coding exercise. The lab medium follows the skill being taught:

- **Code** — install TODO stubs into the actual source files, back up the originals, and let the learner edit in their own editor.
- **Writing** — scaffold a real work file (explanation, prompt, review, spec) under `course/work/<lab>/` and check it against a rubric.
- **Design / artifact** — produce a real page, slide, diagram, chart, or UI and verify render/schema plus a rubric.
- **Performance / practice** — record a take or a practice log (guitar, pronunciation, demo) and check format, duration, and a rubric or audio analysis.
- **Experiment / research** — run something or investigate a question, record the observation and sources, and check the conclusion.

The learner works in the real file or medium. There is no in-page editor that only edits a copy.

### 4. Verification fits the medium

`node course/check.mjs <lab-id>`:

1. verifies the checksummed tests, rubric, and exemplars,
2. reads the learner’s current work,
3. runs deterministic checks first (build/tests for code; format, length, sections, links, duration, or render state for non-code),
4. applies a rubric, and optionally a calibrated LLM judge with quoted evidence,
5. reports per-case or per-criterion results.

For code labs, the checker copies the repo to a temp directory, keeps the learner’s target file, fills the other labs with reference solutions, and runs the authoritative cases. It never modifies the learner’s work.

### 5. Active practice, not a quiz

The pre-course level diagnostic is the only placement quiz. In the course body, multiple choice is allowed when the objective is recognition, recall, or discrimination (ear training, vocabulary, error triage) with per-option feedback. It is never the default lab format and never the only evidence for a production skill. Most labs ask the learner to produce something.

### 6. One video, not a lecture

A 60–90 second explainer with a local voice model, a music bed, and UI sound effects. It gives the mental model; the course zooms into it. A fallback pipeline is included if HyperFrames is unavailable.

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
2. write `COURSE_BRIEF.md`,
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
  lab-kinds.md             # code/writing/design/performance labs, MC rules, LLM judge
  lab-checker.md           # repo-mode labs, checker modes, test design
  video-production.md      # script, storyboard, voice, sound, render
  design-system.md         # palette, type, diagrams, lab UI
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

Default: a 60–90 second HyperFrames composition.

- Kokoro-82M or another local TTS for the voice.
- A soft music bed and subtle UI SFX, pre-mixed with ffmpeg.
- Local fonts, local GSAP, local audio.
- One paused timeline, deterministic scenes.
- Poster frame extracted from the final render.

If HyperFrames is unavailable, the skill uses a fallback: HTML/CSS slides + TTS + ffmpeg, or a screen-recorded walkthrough. When a slide deck is requested, it uses `frontend-slides` to build the deck.

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
- Optional: Python 3.10+ with `kokoro-onnx` and `soundfile` for local narration.
- Optional: `GEMINI_API_KEY` for the `deep-research` companion (paid, opt-in).
- Optional: a judge model/API for non-code lab rubrics; every lab also has a `--manual` fallback.

The skill itself has no runtime dependencies.

## Design principles

- Start with behavior, not definitions.
- Show, don’t tell: diagrams, translations, real output.
- Exact code from the repo, never simplified snippets.
- 2–3 sentences per text block; at least 50% visual per screen.
- Tooltips for every technical term on first use.
- No recycled metaphors.
- Choose the lab kind from the learning verb; multiple choice only for recognition/recall/discrimination, with feedback.
- The project’s own tests are the specification for code; explicit rubrics are the specification for non-code work.
- Verify the checker in both directions before delivery.

## Quality gates

- Level test completed or Builder default recorded.
- Labs inline, not collected at the end, and the lab kind matches the learning verb.
- Code labs modify real repo files with TODO skeletons; non-code labs have a real work file or artifact.
- `lab.mjs restore` works for both.
- `check.mjs --self-test` passes: skeleton/weak exemplar fails, solution/strong exemplar passes.
- Every lab checks independently, and every non-code lab has deterministic checks plus a `--manual` fallback.
- Video has voice, music, SFX, a poster, and no black tail.
- Page loads with no console errors, diagrams render, labs are read-only, mobile works.
- README explains edit / check / restore.

## Notes

- The skill is self-contained. It does not download or depend on `/brag` or `codebase-to-course`.
- The companion tools are optional integrations, not dependencies. The course must work without them.
- The color-themes companion is installed by reference, not vendored, because its upstream has no declared license. Do not copy its files into this repository.
- The repo vendors the companions as snapshots (~23 MB) so they are available offline. Their licenses apply to `vendor/`, not to the rest of the repo.
- It was extracted from a real course built on a Lua interpreter, but it is not Lua-specific.
- The worked example used a C build, `make`, a repo-mode checker, and a 90-second HyperFrames video; the references describe how to adapt the same shape to other languages and toolchains.
