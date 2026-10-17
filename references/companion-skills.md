# Companion Skills

These are optional, high-leverage tools. The course must always work without them. Use them when they clearly improve the result, and record which ones were used in `COURSE_BRIEF.md` so the build is reproducible.

In the `code-to-lab` repository, most companions are **vendored** under `vendor/` with their licenses and upstream snapshot hashes. Run `bash scripts/install-companions.sh` from the repo root to link the single-skill companions into your agent. The academic suite uses its plugin manifest; the script prints the command.

Four companions are installed **by reference** rather than vendored:

- `deep-research` (Apache-2.0) and `frontend-slides` (MIT) — `bash scripts/install-research-and-slides.sh` clones shallow copies into a local cache and links them.
- `color-themes` — `bash scripts/install-color-themes.sh` because its upstream declares no license.
- The academic suite is vendored, but installed through its plugin manifest.

If you are using this skill without that repo, install each companion from its upstream README.

Do not vendor their code or copy their instructions into this skill. Link to them, install them separately, and respect their licenses.

## deep-research

**Repo:** https://github.com/sanjay3290/ai-skills/tree/main/skills/deep-research
**Installed at:** by reference (`bash scripts/install-research-and-slides.sh`)
**License:** Apache-2.0
**What it is:** a Gemini Deep Research agent that plans a research strategy, searches and reads sources, iterates, and returns a cited report. It runs for 2–10 minutes and costs roughly $2–5 per task. It requires `GEMINI_API_KEY`.

**Use it when:**

- the learner asks for research, a literature scan, a competitive landscape, or source-backed background;
- the course is research-heavy and needs current, cited sources;
- you need to compare approaches or verify a factual claim before teaching it.

**Do not use it for:**

- codebase analysis or the code trace (use the repo);
- private, authenticated, or sensitive sources;
- a run the learner has not agreed to pay for.

**Install:**

```bash
bash scripts/install-research-and-slides.sh
# or, manually:
git clone --depth 1 https://github.com/sanjay3290/ai-skills ~/.cache/code-to-lab/ai-skills
ln -sfn ~/.cache/code-to-lab/ai-skills/skills/deep-research ~/.claude/skills/deep-research
cd ~/.cache/code-to-lab/ai-skills/skills/deep-research
python3 -m pip install -r requirements.txt
cp .env.example .env   # add GEMINI_API_KEY
```

**Integration:**

- Ask before the first run and state the approximate cost.
- Give it a precise query and a requested output format; do not send confidential data.
- Use the report for domain context, not for the code walkthrough.
- **Verify every citation.** Treat an unverified claim as a hypothesis.
- Do not paste academic prose into the teaching copy; rewrite it in the course’s voice.
- Record the run and its sources in `COURSE_BRIEF.md`.
- If the skill or key is unavailable, do ordinary web research and cite the sources.

## frontend-slides

**Repo:** https://github.com/zarazhangrui/frontend-slides
**Installed at:** by reference (`bash scripts/install-research-and-slides.sh`)
**License:** MIT
**What it is:** a coding-agent skill for building self-contained HTML presentations. It generates visual style previews, lets the learner pick one, then produces a single-file deck with inline CSS/JS. It can also convert PPTX files and includes 16:9, accessible templates.

**Use it when:**

- the learner asks for slides, a deck, a presentation, or a PPTX conversion;
- the video fallback needs an HTML/CSS slide deck;
- a module needs a downloadable presentation version.

**Do not use it for:**

- replacing the course page or the HyperFrames explainer;
- introducing a second, conflicting palette or type system;
- a deck with no content plan.

**Install:**

```bash
bash scripts/install-research-and-slides.sh
```

**Integration:**

- Give it the course brief, the scene/section outline, and the required slide content.
- Reuse the course palette and type choices; do not let style discovery invent a new direction.
- Keep the deck 16:9 and verify it at desktop and mobile sizes.
- If the deck is used for the video, render or record it and mux the same voice/music bed.
- Do not substitute the deck for the course page; the page remains the interactive course.

## video-use

**Repo:** https://github.com/browser-use/video-use
**Vendored at:** `vendor/video-use/`
**License:** MIT
**What it is:** an agent skill for editing raw footage: transcript-first cutting, filler-word removal, color grading, burned-in captions, animation overlays (HyperFrames, Remotion, Manim, PIL), and a self-evaluation pass at cut boundaries.

**Use it when:**

- the course video is built from recorded demo takes, screen recordings, or interviews;
- the user wants a polished edit, auto captions, a montage, or a launch-style cut from existing footage;
- you need to compare takes, remove filler, or sync B-roll.

**Do not use it as the primary explainer generator.** The 60–90 s explainer is generated from a storyboard in HyperFrames (or the ffmpeg fallback). `video-use` is for editing footage you already have.

**Install (from its README):**

```bash
git clone https://github.com/browser-use/video-use ~/Developer/video-use
ln -sfn ~/Developer/video-use ~/.claude/skills/video-use
cd ~/Developer/video-use
uv sync
brew install ffmpeg
# add ELEVENLABS_API_KEY to .env for transcription
```

**Integration:**

- Put raw takes in a folder outside the course.
- Ask `video-use` to cut a short demo segment or a captioned social clip.
- Bring the exported `final.mp4` back as an optional second video or as B-roll in the explainer.
- Verify the self-eval output and watch the final cut; do not trust it blindly.
- Check the API/privacy implications before uploading confidential footage.

## impeccable

**Repo:** https://github.com/pbakaus/impeccable
**Vendored at:** `vendor/impeccable/skill/`
**License:** Apache-2.0
**What it is:** a design language and skill for AI coding agents: `/impeccable init`, `audit`, `critique`, `polish`, `typeset`, `layout`, `animate`, and 59 deterministic detector rules for AI-generated frontend design. It catches overused fonts, purple gradients, nested cards, contrast issues, spacing problems, and more.

**Use it when:**

- the course page is built and you want a second-pass design audit;
- the page feels generic, cramped, or visually inconsistent;
- you want a deterministic CI scan: `npx impeccable detect course/ --json`.

**Do not let it erase the course’s own design system.** The warm paper palette, one accent, real code panels, and hand-built lab cards are deliberate. Use impeccable to find defects, not to replace the direction.

**Install:**

```bash
npx impeccable install
```

Then, in the agent:

```text
/impeccable init
/impeccable audit course
/impeccable critique course
/impeccable polish course
```

Or run the detector without the skill:

```bash
npx impeccable detect course/ --json
```

**Integration:**

- Run `detect` before delivery and review primary findings.
- Use `audit` for a11y, performance, responsive, and text-overflow checks.
- Use `critique` for hierarchy and clarity, not for changing the content.
- Re-check after changes; a clean detector is evidence, not proof.
- Telemetry is on by default; opt out with `npx impeccable telemetry off` or `DO_NOT_TRACK=1` if needed.

## color-themes

**Repo:** https://github.com/archibate/dotfiles-opencode/blob/main/skills/color-themes/SKILL.md
**Vendored at:** not vendored (upstream declares no license)
**License:** none declared
**What it is:** a catalog of 158 color palettes in `themes/*.toml`, plus a short workflow for applying a palette to a frontend or a desktop configuration. Tokyo Night is the default; the catalog also includes Catppuccin, GitHub Light/Dark (including high-contrast variants), Flexoki, Everforest, Dracula, Alabaster, and many terminal themes.

**Use it when:**

- the learner names a theme (“Tokyo Night”, “Catppuccin Latte”, “GitHub Light High Contrast”);
- body text or code is hard to read, or a design review flags contrast;
- you need a coherent palette for the page, code panels, command blocks, and diagrams.

**Do not use it to replace the course’s design direction.** Keep the warm paper canvas, hierarchy, and lab structure. Apply the palette as a constraint, not a redesign.

**Install (by reference):**

```bash
bash scripts/install-color-themes.sh
```

The script keeps a sparse checkout in the local cache and links `color-themes` into `~/.claude/skills`, `~/.config/opencode/skills`, and `~/.agents/skills`. Do not copy the upstream files into this repository without checking the license.

**Integration:**

- Read `references/color-themes.md` for the contrast gate and code/terminal pairings.
- Map the TOML keys to CSS custom properties; do not hard-code the palette in many rules.
- Measure: body text ≥ 4.5:1, code foreground/comments/syntax tokens ≥ 7:1, command blocks ≥ 7:1.
- A dark code panel on a light page is fine; a light code panel needs a visible border. Do not rely on a theme name as proof of readability.
- Record the chosen palette and the measured pairs in `COURSE_BRIEF.md` when a theme was explicitly requested.
- If the requested theme is missing, search the web and extract the palette; do not fabricate one. If it fails contrast, adjust the failing token and say so.

## academic-research-skills

**Repo:** https://github.com/Imbad0202/academic-research-skills
**Vendored at:** `vendor/academic-research-skills/`
**License:** CC BY-NC 4.0 (non-commercial; check before commercial use)
**What it is:** a suite of academic research skills: deep research, literature review, paper writing, peer review, a 10-stage pipeline, and a systematic-review screener. It emphasizes human-in-the-loop verification and citation checks.

**Use it when:**

- the learner wants an academic literature review or paper-style sources;
- the course is about a research paper or a scientific field and `deep-research` is unavailable;
- you need a citation list with an academic-review workflow.

It is an alternative to `deep-research`, not the default when the learner simply asks for research.

**Do not use it for codebase analysis.** Use it for the domain context, sources, and claims; use the repo for the code trace and labs.

**Install (from its README):**

```text
/plugin marketplace add Imbad0202/academic-research-skills
/plugin install academic-research-skills
```

or follow its symlink/global-skill instructions. It has a Traditional Chinese README and supports multiple languages.

**Integration:**

- Use `deep-research` / `lit-review` for the topic background, not for the code walkthrough.
- Use the paper-writing/reviewer skills only if the learner is producing a paper; the course itself is still a course.
- **Verify every citation.** The repo itself documents hallucinated-reference risks; do not put a citation in the course or video without checking the source.
- Keep the course’s own voice; do not paste academic prose into the teaching copy.
- Confirm the non-commercial license before using its output in a paid product.

## mattpocock/skills

**Repo:** https://github.com/mattpocock/skills
**Vendored at:** `vendor/mattpocock-skills/`
**License:** MIT
**What it is:** a composable set of engineering and productivity skills. The most useful ones here are `/grill-me` (relentless interview to resolve a plan), `/grill-with-docs` (same, plus a shared glossary), `/ask-matt` (router), `/teach` (stateful multi-session teaching), and `/writing-for-agents` (writing skill docs).

**Use it when:**

- the learner’s goal is ambiguous (“I want to understand X” can mean five courses);
- you need to ask “what do you actually want?” before designing;
- the learner wants a multi-session teaching relationship instead of a one-shot course;
- you are writing or revising the course skill itself.

**Do not let it replace the level test.** The level test is the required minimum. Grilling is optional and should be capped (about 10 questions) and written into `COURSE_BRIEF.md`. Do not grill a novice on domain facts they cannot know.

**Install (from its README, pick one):**

```bash
npx skills@latest add mattpocock/skills -a opencode
# or the Claude Code / Codex plugin commands from the repo README
```

**Integration:**

- If the goal is vague, run `/grill-me` before the level test or alongside it.
- Use `/grill-with-docs` if the project needs a shared glossary; keep the glossary separate from the course copy.
- Use `/teach` only when the learner explicitly wants ongoing sessions; the course is still the deliverable.
- Record the resolved answers in `COURSE_BRIEF.md`.
- Do not add a second, conflicting interview process on top of the level test; merge the answers.

## manim_skill

**Repo:** https://github.com/adithya-s-k/manim_skill
**Vendored at:** `vendor/manim_skill/`
**License:** MIT
**What it is:** agent skills for Manim, with best practices and tested examples for **Manim Community Edition** (`manim`, `from manim import *`) and **ManimGL** (`manimgl`, `from manimlib import *`).

**Use it when:**

- the course is math, physics, or another quantitative topic;
- the explainer needs animated equations, graphs, transformations, vectors, fields, or 3D geometry;
- the learner asked for a “3Blue1Brown-style” visual.

**Do not use it for:**

- software architecture or codebase internals where Manim would add no explanatory value;
- a generic UI explainer;
- decoration that does not animate the actual derivation.

**Install:**

```bash
npx skills add adithya-s-k/manim_skill
```

Prerequisites: Python 3.7+, FFmpeg, and a LaTeX distribution (MacTeX/TeX Live/MiKTeX). ManimCE is the safer default for a course; ManimGL is better for interactive/3D exploration but less production-stable.

**Integration:**

- Read `references/math-physics.md`.
- Keep the mathematical logic in a testable pure function; test that function, not the pixels.
- Render Manim scenes to MP4, then mux the voice/music with ffmpeg or composite in HyperFrames.
- Check LaTeX glyphs, labels, axes, units, and the final frame.
- A known analytic/limiting case must be tested.

## Rules for all companions

1. **Optional, not required.** A course must be buildable with this skill alone.
2. **Record usage.** Add a `Companions used:` line to `COURSE_BRIEF.md`, including the verification rungs for each lab.
3. **Respect licenses.** Link to the repos; do not vendor their content. If an upstream has no license, install it by reference and do not copy it into the repository.
4. **Verify outputs.** Review video cuts, design findings, slide decks, rubric verdicts, and citations.
5. **Keep the course’s direction.** Use companions to improve execution, not to replace the top-down teaching design.
6. **Ask first.** For a Newcomer, do not use a companion that assumes domain knowledge. Use the level test and the course’s own scaffolded path.
7. **Paid APIs need consent.** `deep-research` costs money per run and an LLM judge may cost money per submission. State the cost and get consent before the first call.
8. **No hidden uploads.** Do not send a learner’s submission, recording, or repo to a model without telling them and redacting private data.
