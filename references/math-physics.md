# Math and Physics Courses

The same top-down method works for math and physics, but the artifacts change:

- the “codebase” may be a model, a derivation, or a simulation;
- the “line of code” is a concrete phenomenon, quantity, or equation;
- the “lab” is usually a Python/SymPy computation with a numeric or symbolic checker, or a written derivation checked by a rubric;
- the video is often Manim, not HTML.

## When to use this mode

Use it when the learner’s domain is math, physics, or another quantitative field, even if there is a code repository involved. Do not force a codebase trace onto a topic whose core is a derivation.

## Direction: top-down vs bottom-up

Ask the learner after the topic prior-knowledge question.

### Top-down (default for a first course)

1. A concrete phenomenon, experiment, graph, or surprising result.
2. The quantities and relationships that explain it.
3. The formal model and assumptions.
4. The derivation/computation.
5. Limits, edge cases, and applications.

### Bottom-up (reference-style, or an experienced learner’s request)

1. Definitions, axioms, and notation.
2. Immediate consequences.
3. The central theorem/derivation.
4. Worked examples.
5. Applications and connections.

Bottom-up still opens with a concrete example on screen 1. “Axioms first” does not mean “no motivation first.” For a Newcomer, start top-down for the first module even if they later want bottom-up.

## Course arc

| Module | Top-down | Bottom-up |
|---|---|---|
| 1 | The phenomenon / visual / result | A motivating example, then definitions |
| 2 | The quantities and model | Axioms, notation, immediate consequences |
| 3 | The derivation / computation | The central derivation |
| 4 | The lab / simulation | Worked examples and the lab |
| 5 | Limits, applications, next steps | Connections and next steps |

Place the lab after the derivation/computation module. Do not put all labs at the end.

## Labs

Use a real computational repo, even for a math/physics course:

- a Python package with TODO functions,
- a SymPy module,
- a numerical simulation,
- a Manim scene codebase with a TODO animation step (harder to test; prefer a numeric function).

The repo-mode checker still applies to computational labs:

- `lab.mjs start/restore/status` on the real file,
- `check.mjs` builds a temp copy and runs authoritative tests,
- the learner edits the real file and runs the checker.

A derivation or explanation lab is also valid when the core skill is reasoning rather than computation. In that case, scaffold a work file with the derivation steps or a claim table, and verify it with a rubric: units, assumptions, sign conventions, limiting cases, and a correct final relation. Use a calibrated judge only for qualities the rubric cannot check deterministically, and keep a `--manual` fallback.

### Checker patterns

**Numeric:** compare with a tolerance.

```python
assert abs(result - expected) < 1e-9
```

**Symbolic:** compare with SymPy.

```python
assert sympy.simplify(result - expected) == 0
```

**Physics:** check conservation laws, units, boundary conditions, and a known analytic case.

**Manim:** keep the mathematical logic in a pure function that can be tested; test the function, not the pixels. A separate visual check reviews the rendered scene.

Do not use multiple choice for the main lab, and never use “guess the formula.” Fill in the function, the derivation step, or the simulation. A short recognition drill (for example, matching a graph to a derivative) is acceptable as a warm-up, with an explanation for every option.

## Video with Manim

Use [`manim_skill`](https://github.com/adithya-s-k/manim_skill) for 3Blue1Brown-style mathematical animation.

- **Manim Community Edition (`manim`)** — stable, production-friendly, `from manim import *`. Prefer this for a course.
- **ManimGL (`manimgl`)** — Grant Sanderson’s OpenGL version, `from manimlib import *`; better for interactive/3D work, less stable for production.

Install the best-practice skills:

```bash
npx skills add adithya-s-k/manim_skill
```

Prerequisites: Python, FFmpeg, and a LaTeX distribution (MacTeX/TeX Live/MiKTeX).

A Manim course video can be:

1. a single `Scene` rendered to MP4, with a separate TTS voice and music bed;
2. several short Manim scenes assembled with ffmpeg;
3. Manim clips composited into a HyperFrames composition.

Quality rules:

- one idea per scene;
- show the equation and the visual together;
- animate the transformation, not just the final formula;
- keep the pacing aligned with the narration;
- label axes, units, and assumptions;
- avoid a wall of LaTeX.

## Diagrams and equations

- Use Manim stills or Mermaid for the model map.
- **White background by default:** set `config.background_color = WHITE` and use dark ink for Manim renders unless the learner asked for a dark theme. Keep the same white canvas as the course page and the Mermaid diagrams.
- Use a code↔English-style translation for equations: left = the equation, right = “what each term means and why it is there.”
- Always state assumptions and units.
- Use a consistent color for the same quantity across the video, diagrams, and labs.

## Newcomer adaptation

- Start with a visual phenomenon, not notation.
- Define every symbol the first time it appears.
- Use a guided first lab: one missing line in a working computation.
- Do not ask the learner to choose top-down vs bottom-up before the first module.
- Show a numeric example before the general formula.

## Quality gates

- Every equation has a plain-language translation.
- Units and assumptions are visible.
- The lab checker uses a numeric tolerance or symbolic equivalence, not string matching.
- The Manim render has no missing LaTeX glyphs, clipped labels, or black frames.
- The video’s voice and the animation are aligned.
- A known analytic or limiting case is tested.
- Citations for external results are verified.

## Example shapes

**Calculus / derivatives**
- Top-down: a moving object’s speed → the derivative → the limit definition → the lab (implement a numerical derivative and compare with SymPy).
- Bottom-up: limits → continuity → the derivative → worked examples → the lab.

**Classical mechanics**
- Top-down: a falling object / pendulum → forces and energy → the equation of motion → the simulation lab.
- Bottom-up: Newton’s laws → energy → the equation of motion → the simulation lab.

**Linear algebra**
- Top-down: a transformation you can see → matrices → eigenvectors → the lab (implement a transform and check with NumPy).
- Bottom-up: vector spaces → linear maps → matrices → the lab.
