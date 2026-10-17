# Companion Skills

These are optional, high-leverage tools. The course must always work without them. Use them when they clearly improve the result, and record which ones were used in `COURSE_BRIEF.md` so the build is reproducible.

In the `code-to-lab` repository, the companions are **vendored** under `vendor/` with their licenses and upstream snapshot hashes. Run `bash scripts/install-companions.sh` from the repo root to link the single-skill companions into your agent. The academic suite uses its plugin manifest; the script prints the command. If you are using this skill without that repo, install each companion from its upstream README.

Do not vendor their code or copy their instructions into this skill. Link to them, install them separately, and respect their licenses.

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

## academic-research-skills

**Repo:** https://github.com/Imbad0202/academic-research-skills
**Vendored at:** `vendor/academic-research-skills/`
**License:** CC BY-NC 4.0 (non-commercial; check before commercial use)
**What it is:** a suite of academic research skills: deep research, literature review, paper writing, peer review, a 10-stage pipeline, and a systematic-review screener. It emphasizes human-in-the-loop verification and citation checks.

**Use it when:**

- the course is about a research paper, a scientific field, or a literature-backed topic;
- you need a source-backed script, a literature review, or a citation list;
- the learner’s goal is academic or research-oriented.

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
2. **Record usage.** Add a `Companions used:` line to `COURSE_BRIEF.md`.
3. **Respect licenses.** Link to the repos; do not vendor their content.
4. **Verify outputs.** Review video cuts, design findings, and citations.
5. **Keep the course’s direction.** Use companions to improve execution, not to replace the top-down teaching design.
6. **Ask first.** For a Newcomer, do not use a companion that assumes domain knowledge. Use the level test and the course’s own scaffolded path.
