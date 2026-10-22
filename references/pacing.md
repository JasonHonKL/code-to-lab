# Pacing and Time Budgets

A course without time boxes becomes a scroll. Every teaching section gets a visible budget for **reading** and **answering**, so the learner can decide whether to start a section now or come back, and the builder can tell whether the course actually fits the track.

A time box is a planning estimate, not a deadline. Never show a countdown, never auto-advance, and never make a learner feel behind.

## What counts

| Bucket | Includes | Does not include |
|---|---|---|
| **Read** | Screens, diagrams, captions, code↔English translations, tooltips | The video (watched once, separately) |
| **Check** | MC card + short-answer card + model-answer comparison | Lab work |
| **Lab** | The real task, hints, and one check run | Reading the section that teaches it |
| **Course frame** | Intro, video, syllabus, final reading order | — |

Keep the lab budget separate. A lab is not “reading time,” and a short answer is not the lab.

## The default budget per section

One section = one teaching section that ends with **MC → short answer**, typically 2–4 screens. If a module has two sections, count it twice.

| Track | Read / diagram | MC | Short answer | Check gate | Section total | Lab (if owned) |
|---|---|---|---|---|---|---|
| **Newcomer** | 3–4 min | 1 min | 1.5–2 min | 2.5–3 min | **5.5–7 min** | 8–12 min |
| **Explorer** | 4–5 min | 1–1.5 min | 2 min | 3–3.5 min | **7–8.5 min** | 10–15 min |
| **Builder** | 4–6 min | 1.5 min | 2–3 min | 3.5–4.5 min | **7.5–10.5 min** | 12–18 min |
| **Deep Diver** | 5–7 min | 1.5–2 min | 3–4 min | 4.5–6 min | **9.5–13 min** | 15–25 min |

Rules:

- **Read floor:** never compress a section below 3 minutes; if it is shorter, merge it with the next section.
- **Read ceiling:** a section over 7 minutes of reading is two sections. Split it or cut a screen.
- **Check gate:** 2.5–6 minutes depending on track. The MC is quick; the short answer is where the thinking happens.
- **Short answer never gets cut to save time.** If the budget is tight, cut prose, not retrieval.
- **Lab time is additional.** A Builder section with a lab is 19.5–28.5 minutes, not 7.5–10.5.
- **One section per module is the default.** A module with two sections counts twice toward the course total.

## Estimate, do not guess

Use these rates, then round to the nearest minute and show a range if unsure:

| Item | Estimate |
|---|---|
| Technical prose | 180–220 words per minute (use 200) |
| Mermaid diagram + caption | 30–45 seconds |
| Code↔English translation | 45–60 seconds per block |
| MC item | 20–30 seconds + 15 seconds to read feedback |
| Short answer | 30 seconds to plan + 1–2 minutes to write + 30–60 seconds to compare with the model answer |

Formula:

```text
read_min  = words / 200 + diagrams × 0.6 + translations × 0.8
check_min = items × 0.4 + 2.5        # MC + short answer + comparison
section_min = read_min + check_min
course_min = Σ(section_min) + Σ(lab_min) + 5–10 min course frame
```

The short-answer term dominates the check; do not estimate it as “one more MC item.”

### Worked example

A Builder section has 420 words, 3 diagrams, one code translation, 3 MC items, and one short answer:

```text
read  = 420/200 + 3×0.6 + 1×0.8 = 2.1 + 1.8 + 0.8 = 4.7 → 5 min
check = 3×0.4 + 2.5 = 3.7 → 4 min
section = 9 min
```

Add a 15-minute lab if the section owns one: the learner should plan **24 minutes**, not 9.

## Reconcile with the track

A low-end plan fits every track:

| Track | Sections | Labs | Low-end plan | Target |
|---|---|---|---|---|
| **Newcomer** | 4 | 2 | 4×5.5 + 2×8 = **38 min** | 30–45 min |
| **Explorer** | 4 | 2 | 4×7 + 2×10 = **48 min** | 45–60 min |
| **Builder** | 5 | 3 | 5×7.5 + 3×12 = **73.5 min** | 60–90 min |
| **Deep Diver** | 5–6 | 3 | 6×9.5 + 3×15 = **102 min** | 90–150 min |

- If the plan is **over** the budget: cut a screen or merge two thin sections, shorten the lab task, or move detail into a `<details>` disclosure. Do not cut the short answer or the MC.
- If the plan is **under** the budget: add an optional extension, a second lab, or a deeper “what if” section. Do not pad with repeated prose.
- Recalculate after adding a diagram: diagrams are cheap to read but not free.
- Record the plan in `COURSE_BRIEF.md`; a course that claims 60 minutes and budgets 110 is mis-scoped.

## Show the budget in the UI

- **Section header:** `≈5 min read · 3 min check` in small mono text beside the section label.
- **Sticky rail:** `Section 2/5 · ~8 min · 2 checks` so the learner knows the cost before starting.
- **Lab header:** `Lab 2 · 12–18 min` beside difficulty and file.
- **Course intro:** a one-line total, e.g. “5 sections · 3 labs · about 75–90 minutes.”
- Use a range when the estimate is rough; use one number when it is measured.
- Do not add a countdown, a timer badge, or “you are behind” copy.

Suggested markup:

```html
<section class="module" data-read-min="5" data-check-min="3" data-lab-min="15">
  <header class="module-header">
    <span class="module-number">02</span>
    <p class="section-time">≈5 min read · 3 min check</p>
    <h1 class="module-title">…</h1>
  </header>
  <!-- screens, gate, lab -->
</section>
```

The attributes are optional, but the visible chip is not.

## Adjusting a section that runs long

| Symptom | Fix |
|---|---|
| Read time over 7 min | Split into two sections, or move one screen to a `<details>` |
| A diagram takes too long to parse | Split it, cut nodes to 12 or fewer, move detail to the caption |
| MC takes over 2 min | Cut to 3 items; remove trivia; keep misconception + application |
| Short answer takes over 4 min | Tighten the prompt to one mechanism and one consequence |
| Lab takes over its budget | Narrow the task or reduce the number of files; do not remove hints |
| Whole course over target | Cut an optional section or lab; never compress the read floor |

## Quality checklist

- [ ] Every section has a visible read + check time chip.
- [ ] Every lab has its own time estimate, separate from the section.
- [ ] The section total is 5.5–13 minutes depending on the track.
- [ ] The course total (`Σ sections + Σ labs + 5–10 min`) fits the track’s seat time.
- [ ] The estimate was calculated from words, diagrams, translations, MC items, and the short answer.
- [ ] No countdown, timer pressure, or auto-advance.
- [ ] The sticky rail shows the section number, time, and next action.
- [ ] The course intro states the total time.
- [ ] The plan is recorded in `COURSE_BRIEF.md`.

## Anti-patterns

- A 15-minute section labeled “5 min.”
- A lab folded into the reading estimate.
- A 30-second short answer that is really “click reveal.”
- Cutting the short answer to make the course fit.
- A countdown timer that turns formative checks into an exam.
- Padding a short course with repeated prose instead of an optional extension.
- Estimating by vibes instead of counting words, diagrams, items, and the short answer.
- A course that claims 60 minutes but budgets 110.
