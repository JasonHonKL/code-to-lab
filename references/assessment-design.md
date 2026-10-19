# Assessment Design

The lab format is an assessment decision, not a style preference. Match the **answer format** to the performance the learner needs after the course. The same concept can be taught with a code lab, a written decision, or a multiple-choice item set—and only one of those may be authentic for the learner’s goal.

Templates: `templates/architecture-decision.md` for ADRs, `templates/mc-item-set.json` for exam-fidelity item sets, and `templates/lab-rubric.json` for rubric-based assessment.

## Four questions before choosing an answer format

1. **What will the learner do after the course?** Debug code, defend an architecture decision, pass a CFA-style exam, teach a class, design a service, play a passage, or explain a result.
2. **What would convince an expert?** A working diff, a test result, an ADR with trade-offs, a calculation with units, a recording, a service blueprint, or a set of solved exam items.
3. **What is the cheapest reliable check?** Deterministic check → artifact/render check → rubric → calibrated LLM judge → expert/human review.
4. **Is the answer format part of the skill?** If the target performance is choosing among options under time, multiple choice is authentic. If the target performance is producing or justifying, multiple choice is not.

## Answer formats

| Format | Accept when | Typical evidence | Verification | Examples |
|---|---|---|---|---|
| **Selected response** (MC, multi-select, matching, ordering) | The target is recognition, recall, discrimination, exam fidelity under time pressure, or a quick section check | Chosen option + rationale | Auto-grade, per-option feedback, per-topic report | Section check; CFA item set; ear training; vocabulary; “which layer produced this error?” |
| **Short constructed response** | The learner must show reasoning, a calculation, a trace, or a judgement in a few sentences | Explanation, calculation, decision memo | Required elements + numeric tolerance + rubric | “Why did this fail?”; “Compute the duration”; “Choose A or B and justify” |
| **Artifact** | The target is production in a real medium | Code diff, spreadsheet, model, ADR, design, slide, service blueprint, lesson plan | Tests, schema, render/contrast checks, links, rubric, judge | Fix the parser; build the DCF model; write the ADR; redesign the screen |
| **Performance** | The target is a skilled performance or a live decision | Recording, live demo, presentation, teaching segment | Format/duration checks + audio/video analysis + rubric/expert | Guitar take; pronunciation; sales pitch; teaching demo |
| **Portfolio / reflection** | The target is a habit, process, or metacognition | Practice log, revision history, self-assessment | Rubric + consistency over time | Weekly practice log; design critique journal |
| **Hybrid** | The target includes both recognition and production | MC → short response → artifact | Auto-grade + rubric/judge on the production part | CFA item set, then a written recommendation; vocabulary check, then a conversation |

## Domain matrix

| Domain / goal | Primary answer format | Secondary | Verification | Role of multiple choice |
|---|---|---|---|---|
| **Codebase internals, debugging** | Code diff in the real repo | Short trace or explanation | Build + authoritative tests | Warm-up only: error triage, “which layer owns this?” |
| **Architecture decisions** | ADR / trade-off table / diagram with evidence | Prototype or spike | Deterministic sections + rubric + optional judge | Vocabulary/pattern check only; never “pick the best architecture” |
| **CFA / professional exam** | MC item sets that match the exam | Constructed calculation, spreadsheet model, written recommendation | Auto-grade + numeric tolerance + rubric | Primary for exam fidelity; pair with show-your-work |
| **Math / physics** | Derivation or computation | Short explanation | Symbolic/numeric checks, units, limiting cases | Warm-up only: graph/symbol recognition |
| **Language learning** | Speaking/writing performance | Comprehension items | ASR + rubric + reference take | Vocabulary and grammar recognition |
| **Design / UX** | Artifact + rationale | Critique | Render/contrast/overflow checks + rubric/judge | Heuristic recognition only |
| **Music / guitar** | Performance recording + practice log | Ear training | Format/duration + audio analysis + rubric | Ear training and interval/chord recognition |
| **Service / business** (including learning as a service) | Service blueprint, pricing model, experiment plan, customer synthesis | Written recommendation | Schema + calculations + rubric/judge | Terminology, regulation, or process recall only |
| **Operations / security** | Config change, runbook, dry run | Incident decision memo | Real validator, dry run, scenario rubric | Procedure recall if the certification exam uses it |
| **Research / source evaluation** | Claim table + synthesis | Annotated bibliography | Link/citation checks + rubric/judge | Source-type recognition only |

## Formative section checks (every section)

In addition to the lab, every teaching section ends with a two-part gate: **MC → short answer**. This is how the course catches a learner who is following the screens but missing the one idea the rest of the section depends on.

- **MC card: 2–4 items**, answerable in under two minutes.
- **Item mix:** one recall/recognition item, one misconception item, and one application/transfer item.
- **Immediate feedback:** every option gets a rationale, and the correct answer links back to the screen.
- **Retryable and unscored.** It does not gate progress and is not part of the lab result.
- **Short answer:** one prompt after the MC, 2–4 sentences, with local autosave, a model answer, and a 3-item self-check (mechanism / evidence / consequence). It is unscored and not auto-graded.
- **Placement:** after the teaching screens and before the lab, so the learner catches the gap before practicing.
- **Scope:** test the section’s “must-not-miss” idea, not trivia. If the learner could look it up in the section without understanding it, the item is too shallow.
- **No timer** except in an exam-fidelity lab. A section check is low-pressure.
- **Not a substitute for the lab.** If a section has a lab, the check and short answer come first. If the skill is purely recognition, the check can be the practice—but say so explicitly. The short answer is not a second lab.

Examples of section-check items by domain:

| Domain | Recall / recognition | Misconception | Application |
|---|---|---|---|
| **Codebase** | Which stage emits this error? | “The parser runs the program.” | What happens if this check is removed? |
| **Architecture** | Which option is a boundary? | “More layers always mean better separation.” | Which force does this option ignore? |
| **CFA** | Which factor increases duration? | “A higher coupon always lowers price risk.” | Compute the price change for a 50 bp move. |
| **Service / learning as a service** | Which actor owns this step? | “The learner experiences every backstage step.” | Which step is the most likely drop-off point? |
| **Language** | Which phrase is formal? | “Fluency means no mistakes.” | Which reply fits this situation? |
| **Music / guitar** | Which chord is minor? | “Faster always means better.” | Which fingering fixes the buzz? |

Short-answer prompts should ask for a mechanism, a consequence, or a decision, not a definition:

| Domain | Prompt |
|---|---|
| **Codebase** | “In 2–4 sentences, explain why a clean wrong answer points at the runtime rather than the lexer.” |
| **Architecture** | “In 2–4 sentences, name the trade-off this decision makes and the evidence you would use to challenge it.” |
| **CFA** | “In 2–4 sentences, show the direction of the price change and the two inputs that drive it.” |
| **Service** | “In 2–4 sentences, name the drop-off point and the backstage step that causes it.” |
| **Language** | “In 2–4 sentences, use the formal form in a new sentence and explain why it fits.” |
| **Music** | “In 2–4 sentences, explain which fingering fixes the buzz and why.” |

A section check and short answer are not labs, and a lab is not a section check. Do both when the section teaches a production skill.

## Case: CFA-style professional exam

If the learner’s goal is to pass a multiple-choice certification exam, multiple choice is not a shortcut—it is **assessment fidelity**.

- Use **item sets**: a short vignette plus 4–6 questions, with a time limit and the same calculator/tool rules as the exam.
- Use **three-option or four-option items** as the real exam does; make distractors reflect real misconceptions, not jokes.
- Give **rationales for every option** after submission, including why the distractors are wrong.
- Report **per-topic mastery**, not only a total score.
- Add at least one **show-your-work** task per module: a calculation with units, a spreadsheet model, or a short written recommendation. The learner must be able to explain the number, not only select it.
- Do not make the entire course a quiz. Even exam-prep courses need worked examples, spaced practice, and a production task that exposes reasoning.

**Good CFA lab:** a timed 5-question item set on bond duration, then one constructed response asking the learner to show the duration calculation and explain the sign of the price change.

**Bad CFA lab:** 50 isolated definition questions with no vignette, no rationale, and no calculation.

## Case: architecture decisions

Architecture is judgement under constraints, so the authentic answer is a **decision artifact**, not a single “correct” option.

Use an ADR-style lab. The learner writes:

```text
# ADR: <decision>
## Context
What forces are at play? What evidence from the repo, metrics, or constraints?
## Options
2–3 real options, each with trade-offs.
## Decision
Which option, and why now?
## Consequences
What gets easier, what gets harder, what becomes hard to reverse?
## Evidence
Links to real files, tests, profiles, or a spike.
## Reversibility
How would we undo or revisit this?
```

Verification:

- deterministic: required sections, links resolve, options ≥ 2, consequences present;
- rubric: uses repo evidence, considers trade-offs, names consequences, states assumptions, makes a reversible decision where possible;
- optional judge: reasoning quality and clarity, with quoted evidence;
- optional code: a spike or test that validates the decision.

**Good architecture lab:** “Where should error recovery live—parser or runtime? Write an ADR using two real call sites and one failing test.”

**Bad architecture lab:** “Which layer is best? A) parser B) runtime C) both D) neither.” There is no context, no trade-off, and no evidence.

Multiple choice can still check **vocabulary** (“which of these is a boundary?”) before the ADR, but it must not replace the decision.

## Case: learning as a service (and other service businesses)

For a service-business course, the target performance is usually **designing, operating, or improving a service**, so the lab should produce a service artifact.

Examples:

- **Service blueprint:** stages, actors, learner actions, frontstage/backstage, evidence, failure points.
- **Pricing and packaging:** tiers, unit economics, margin, willingness-to-pay assumptions.
- **Cohort design:** onboarding sequence, completion metrics, support model, accessibility.
- **Customer discovery:** interview guide, synthesis table, insight → decision.
- **Experiment plan:** hypothesis, metric, sample, guardrail, decision rule.

Verification:

- schema checks for stages, actors, numbers, and required fields;
- arithmetic checks for unit economics;
- rubric for desirability, feasibility, viability, evidence quality, accessibility, and operational load;
- judge for clarity and coherence, with quoted evidence;
- a human review for high-stakes pricing or safeguarding decisions.

**Good learning-as-a-service lab:** design a four-week onboarding service for a cohort. Deliver a one-page blueprint, a unit-economics table, and one experiment with a decision rule.

**Bad learning-as-a-service lab:** 20 multiple-choice questions about “what is a service blueprint?” with no artifact.

If the course is about the **codebase behind** the service, use code labs. If it is about the **service design**, use service artifacts. Do not substitute one for the other.

## Multiple-choice item rules

- One unambiguous correct answer; 3–4 plausible options.
- Map every item to one learning objective and report mastery by objective.
- Avoid trick wording, double negatives, and “all of the above” unless the real exam uses them.
- Write a rationale for every option; the distractor explanation is where learning happens.
- Use item sets and timing when the target exam does.
- For a section check, cover the section’s core idea, one misconception, and one application; keep it unscored and retryable.
- Do not use MC for “best architecture,” “best design,” or “best business strategy” without a scenario and a rubric.
- If the target is production, MC may be a warm-up or section check, never the only evidence.

## Feedback rules

- **MC:** per-option rationale, link back to the section, and a next practice item.
- **Constructed response:** per-criterion feedback plus one concrete next step.
- **Artifact:** failing check, build/render log, and a reference exemplar.
- **Performance:** timestamped notes plus a reference take.
- **Decision artifact:** name the missing evidence or consequence, not just “weak analysis.”

Do not return only a score. The learner should know the next action.

## Anti-patterns

- Multiple choice because it is easy to grade, when the target is production.
- Code only because a repo exists, when the learner is preparing for a service, exam, or performance.
- A quiz as the only evidence in a course that claims a production outcome.
- “Pick the best architecture/design/strategy” with no context or trade-off.
- Rubric criteria that are vibes (“good”, “clear”) with no observable evidence.
- A judge with no rubric, no calibration, or no deterministic checks where they are possible.
- Exam-style MC with no rationale, no per-topic report, and no constructed response.
