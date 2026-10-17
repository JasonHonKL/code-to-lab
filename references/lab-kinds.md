# Lab Kinds and Verification

A lab is a **learn-by-doing rep**, not necessarily a coding exercise. The medium follows the skill being taught: debugging is code, explaining is writing, designing is an artifact, playing is a performance, and recognizing is a drill. The invariant is that the learner **produces evidence** and the course **verifies it against explicit criteria**.

## Choose the kind from the learning verb

| Kind | Learner produces | Examples | Default verification | Code required |
|---|---|---|---|---|
| **Code** | A change to a real source file | Fix a parser, add a runtime opcode, write a failing test | Build + authoritative tests, per-case results | Yes |
| **Writing** | A prompt, explanation, spec, review, postmortem, or teaching note | “Explain why `x = x + 1` changes the value”; write a PR review | Required-element checks + rubric or calibrated LLM judge | No |
| **Design / artifact** | An HTML page, slide, diagram, UI, chord chart, or data table | Redesign the chord screen; draw the request flow | Render/schema checks + rubric or multimodal judge | No |
| **Performance / practice** | A recording, take, live demo, or practice log | Play 8 bars, pronounce a phrase, give a 2-minute demo | File/format/duration checks + audio or video analysis + rubric | No |
| **Experiment / observation** | A recorded observation and a conclusion | Change one config value, run the app, explain what changed | Expected-observation diff + conclusion rubric | No |
| **Research / source evaluation** | A question, claim table, sources, and a short synthesis | Compare two approaches; fact-check a claim | Link/source checks + citation rubric + judge | No |
| **Ops / config** | A real config or deployment change | Fix a broken build flag; repair CI | Real validator, linter, or dry run | Not source code |
| **Drill / quiz** | Answers to recognition, recall, or discrimination items | Identify major vs minor by ear; name the token type | Auto-graded with per-option feedback | No |

Pick the kind that matches the objective. Do not force a code lab onto a non-code skill, and do not replace a production skill with a quiz.

## Multiple choice is allowed, with limits

Multiple choice is a legitimate lab format when the objective is **recognition, recall, discrimination, or misconception-checking**.

**Allowed:**

- ear training, vocabulary, symbol recognition, “which error came from which layer”;
- a warm-up or exit ticket before/after a production lab;
- a quick check that the learner can distinguish two similar concepts.

**Not allowed:**

- as the only evidence for a production skill (writing, coding, designing, playing, speaking, solving);
- as the default lab format for the whole course;
- “guess the formula” or “guess the output” when the learner could compute it;
- a quiz that replaces the level diagnostic’s placement role or the lab’s practice role.

**If you use it:**

- every option gets a short explanation after submission, not just “correct/incorrect”;
- include plausible distractors drawn from real misconceptions;
- follow it with a production task whenever the objective includes production;
- keep it short (3–6 items), and do not call it a lab if it is only a check.

The pre-course level diagnostic stays separate and is still the only placement quiz.

## Verification ladder

Prefer the highest rung that can actually judge the evidence. Do not use an LLM for something a deterministic check can prove.

1. **Deterministic check** — build, tests, schema, linter, numeric tolerance, file type, duration, required sections, valid links. Authoritative and reproducible.
2. **Artifact check** — render the page/slide/audio, validate dimensions, contrast, load state, or audio properties.
3. **Explicit rubric** — criteria with observable evidence; learner self-check or peer check. Good for drafts and reflection.
4. **Calibrated LLM judge** — only for qualities deterministic checks cannot capture (clarity, reasoning, tone, design coherence, musicality). Must use a rubric and structured output.
5. **Expert / human review** — for high-stakes, subjective, or safety-critical work; provide an appeal path.

Every lab card states which rungs it uses. A lab with no evidence path is not a lab; it is a reading.

## LLM judge contract

Use an LLM judge as a **calibrated rubric runner**, not as an oracle.

- Write a rubric with 3–6 criteria. Each criterion has an observable definition and a fail example.
- Ask for structured JSON: per-criterion `verdict` (`pass` / `partial` / `fail`), a quoted evidence snippet from the submission, and one sentence of feedback.
- Use a fixed model and prompt version, `temperature: 0`, and a recorded prompt hash. Log the model, rubric version, and submission hash with the result.
- Calibrate before shipping: a known-weak exemplar must fail and a known-strong exemplar must pass. Re-run the judge on the same input and check stability.
- Require the judge to answer `insufficient evidence` rather than guessing. A confident-sounding hallucination is a failed check.
- For audio, video, or visual design, only use a judge that can actually inspect that medium. Otherwise use deterministic analysis plus a human rubric, and say so in the lab card.
- Redact private data before sending a submission. Do not send the whole repo, secrets, or third-party content without consent.
- Show the API cost/privacy note before the first judge run. A paid API must be opt-in.
- Always provide a `--manual` fallback that prints the rubric and accepts a self-check or human verdict. The judge is advisory when a deterministic check already exists.

## Non-code lab layout

```text
project/
  course/
    exercises/
      exercises.json
      <lab>/
        starter.md          # scaffold copied into the work file
        rubric.json         # criteria, weights, evidence rules
        exemplar.md         # strong reference answer or take
        judge.md            # prompt/version, optional
    work/
      <lab>/
        submission.md       # the learner writes here
```

For a performance lab, the submission can be `submission.wav`, `submission.mp4`, or a link recorded in `submission.md` plus the file. For a design lab, it can be `submission.html` or a screenshot plus a written rationale.

`lab.mjs start <lab>` creates the work file from the starter without overwriting an existing submission. `lab.mjs restore <lab>` backs up the submission and resets the work file. `status` reports `not started`, `draft`, or `reference exemplar`; the checker result records whether the current draft has been checked.

## Non-code checker flow

1. Verify the rubric and exemplar checksums.
2. Read the submission; fail clearly if it is missing, empty, or the wrong type.
3. Run deterministic checks: length, required sections, valid links, file type, duration, schema, or render state.
4. If a judge is configured, send only the submission and rubric; return per-criterion results with quoted evidence.
5. If no judge is configured, print the rubric and accept a `--manual` self-check or expert verdict.
6. Never modify the submission. Never execute arbitrary shell from the page.

Return the same result shape as the code checker: `{ ok, lab, phase, checks, criteria, passed, total, ms }`.

## Lab card for a non-code lab

A white card inside the module, with:

- the incomplete or weak behavior;
- the mission and the deliverable (file type, length, format);
- the evidence path (`course/work/<lab>/submission.md`);
- three progressive hints;
- a read-only starter/structure preview (not an editor);
- a copy-path button and the exact check command;
- a **Check my work** button;
- the rubric;
- a reference exemplar behind a disclosure.

No Save/Reset buttons that write from the page. The learner edits the work file in their own editor, DAW, design tool, or camera.

## Self-test for non-code labs

`node course/check.mjs --self-test` must prove both directions:

- a weak exemplar fails;
- a strong exemplar passes;
- deterministic checks can fail independently of the judge;
- the judge returns the same verdict on a repeated run (or the agreed tolerance);
- with `--manual`, the rubric is printed and both exemplars are present.

If no judge key is available, the self-test still runs the deterministic checks and validates the exemplars; it reports that the judge path was skipped.

## Worked examples

**Guitar app**

- Code lab: fix the chord-transposition function so `C → D` works in every key.
- Practice lab: record 8 bars of a I–V–vi–IV progression. Deterministic checks (format, duration, sample rate) plus onset/tempo analysis, a rubric (timing, clean changes, muting), and a reference take. The learner also writes a three-sentence reflection; a judge checks the reflection against the rubric.
- Writing lab: explain why a barre chord buzzes. A judge checks four criteria: cause, diagnosis, fix, and a concrete practice step.
- Drill: identify major vs minor by ear. Multiple choice is appropriate here; play the clip, accept an answer, explain both options, then ask for one produced example.

**Language learning**

- Record a phrase; use ASR for a rough transcript and a rubric for pronunciation; do not grade with multiple choice alone.

**Design**

- Redesign a screen; render it, check contrast and overflow deterministically, then use a rubric or multimodal judge for hierarchy and clarity.

## Safety and consent

- No hidden recording, upload, or paid API call. Ask before the first one.
- Keep submissions local by default; redact private data before any remote judge.
- Do not let a judge be the only grade for high-stakes or safety-critical work.
- Keep a human review and appeal path for subjective work.
- Record which verification rungs were used in `COURSE_BRIEF.md`.
