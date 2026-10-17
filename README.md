# code-to-lab

A self-contained agent skill that turns any codebase or technical topic into a **top-down interactive course**:

- one short narrated explainer video,
- diagrams and code-to-plain-English translations,
- hands-on labs placed **inside** the sections that teach them,
- TODO stubs in the **real project files**,
- progressive hints and a reference solution,
- an automated checker that builds the current repo and runs authoritative tests,
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
labs inline, in the real repo
```

The learner starts with something they can already see, then opens the boxes that produced it.

## What makes it different

### 1. Level test first

Before building, the agent runs a two-minute diagnostic: self-ratings, a code trace, a debugging scenario, and a data-structure choice. It scores the learner into one of three tracks:

| Track | Course shape |
|---|---|
| **Explorer** | 4 modules, 2 labs, more analogies, more scaffolding |
| **Builder** | 5 modules, 3 labs, standard hints |
| **Deep Diver** | 5–6 modules, 3 harder labs, less scaffolding, more real code |

The test is not graded. It only changes depth, pace, and hint density.

### 2. Labs live between sections

A lab appears immediately after the section that teaches its core:

- lexer lab after the pipeline section,
- table/runtime lab after the data-structure section,
- execution lab after the loop section.

There is no separate “Labs” module at the end.

### 3. Labs edit the real repo

The skill installs TODO stubs into the actual source files, backs up the originals, and gives the learner:

```bash
node course/lab.mjs status
node course/lab.mjs start <lab-id>
node course/lab.mjs restore <lab-id>
```

The learner edits the real file in their editor. There is no in-page code editor and no copy of the file to cheat with.

### 4. The checker uses your current code

`node course/check.mjs <lab-id>`:

1. copies the current repo to a temp directory,
2. keeps the learner’s edited target file,
3. fills the other labs with reference solutions so the program still runs,
4. builds,
5. runs the authoritative cases,
6. reports per-case pass/fail.

The checker never modifies the repo. Tests are checksummed.

### 5. Labs are fill-in-the-code, not multiple choice

The only quiz in the whole system is the pre-course level diagnostic. The labs are real code.

### 6. One video, not a lecture

A 60–90 second explainer with a local voice model, a music bed, and UI sound effects. It gives the mental model; the course zooms into it. A fallback pipeline is included if HyperFrames is unavailable.

## Install

```bash
git clone https://github.com/JasonHonKL/code-to-lab.git

mkdir -p ~/.claude/skills/top-down-course
cp -R code-to-lab/SKILL.md code-to-lab/references code-to-lab/templates \
  ~/.claude/skills/top-down-course/
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
6. install the lab skeletons and checker,
7. produce the video,
8. verify and hand off.

## What is in this repo

```text
SKILL.md
references/
  level-test.md            # 6-question diagnostic + tracks
  course-architecture.md   # top-down arc, module templates, inline labs
  lab-checker.md           # repo-mode labs, checker modes, test design
  video-production.md      # script, storyboard, voice, sound, render
  design-system.md         # palette, type, diagrams, lab UI
  quality-gates.md         # pre-delivery checklist
templates/
  course-brief.md
  storyboard.md
  lab.mjs                  # generic start/restore/status helper
  lab-cases.json           # authoritative case format
```

## Lab workflow

After the skill builds a course, the learner uses the real repo:

```bash
node course/lab.mjs status
node course/lab.mjs start all
node course/lab.mjs restore all

node course/check.mjs <lab-id>
node course/check.mjs --self-test
node course/check.mjs <lab-id> --solution

node course/serve.mjs
```

The page is a read-only preview plus a **Check my code** button. Edit the repo files directly.

## Video pipeline

Default: a 60–90 second HyperFrames composition.

- Kokoro-82M or another local TTS for the voice.
- A soft music bed and subtle UI SFX, pre-mixed with ffmpeg.
- Local fonts, local GSAP, local audio.
- One paused timeline, deterministic scenes.
- Poster frame extracted from the final render.

If HyperFrames is unavailable, the skill describes a fallback: HTML/CSS slides + TTS + ffmpeg, or a screen-recorded walkthrough.

## Requirements

- Node.js 22+ for the course tooling.
- A compiler/toolchain for the target repo (make, cargo, npm, go, etc.).
- Optional: HyperFrames for the video.
- Optional: FFmpeg for audio/video assembly.
- Optional: Python 3.10+ with `kokoro-onnx` and `soundfile` for local narration.

The skill itself has no runtime dependencies.

## Design principles

- Start with behavior, not definitions.
- Show, don’t tell: diagrams, translations, real output.
- Exact code from the repo, never simplified snippets.
- 2–3 sentences per text block; at least 50% visual per screen.
- Tooltips for every technical term on first use.
- No recycled metaphors.
- No multiple-choice labs.
- The project’s own tests are the specification.
- Verify the checker in both directions before delivery.

## Quality gates

- Level test completed or Builder default recorded.
- Labs inline, not collected at the end.
- Real repo files modified with TODO skeletons.
- `lab.mjs restore` works.
- `check.mjs --self-test` passes: skeleton fails, solution passes.
- Every lab checks independently.
- Video has voice, music, SFX, a poster, and no black tail.
- Page loads with no console errors, diagrams render, labs are read-only, mobile works.
- README explains edit / check / restore.

## Notes

- The skill is self-contained. It does not download or depend on `/brag` or `codebase-to-course`.
- It was extracted from a real course built on a Lua interpreter, but it is not Lua-specific.
- The worked example used a C build, `make`, a repo-mode checker, and a 90-second HyperFrames video; the references describe how to adapt the same shape to other languages and toolchains.
