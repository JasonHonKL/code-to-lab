# Level Test

Run this **before** designing the course. It takes about two minutes and prevents the most common failure: explaining too much to an experienced learner, or too little to someone who is new to the topic.

There are two separate axes:

1. **General technical level** — 6 scored questions (0–12).
2. **Topic prior knowledge** — an explicit “I don’t know this topic at all” option, not a guess.

A strong programmer can still know nothing about the topic. Use both axes.

## How to ask

Say this in chat:

> Before I build, I need a two-minute calibration so I don’t over- or under-explain. There are no wrong answers. Answer roughly, in your own words.

Ask the questions one at a time, or all at once. Do not turn this into a form or a graded quiz. The learner may skip any question; score skipped items as 0 and note it.

## General technical level (0–2 each, max 12)

### 1. Vocabulary self-rating
“How comfortable are you with terms like variable, function, API, and memory?”
- 0 = not sure what most of them mean
- 1 = I know roughly what they mean
- 2 = I can use them confidently

### 2. Code-reading self-rating
“How often do you read unfamiliar source code?”
- 0 = almost never
- 1 = sometimes, with help
- 2 = often, on my own

### 3. What happens when a program runs?
“In your own words, what happens between writing a line of code and seeing a result?”
- 0 = “It just runs” / no model
- 1 = mentions compiling or interpreting, but vaguely
- 2 = mentions source → compiler/interpreter → execution, or an equivalent model

### 4. Tiny code trace
Show:

```js
let total = 1;
total = total + 2;
console.log(total);
```

“What is printed, and why?”
- 0 = wrong answer or no explanation
- 1 = right answer, weak explanation
- 2 = right answer and explains reassignment / evaluation order

Adapt the language to the target codebase. For a math/physics course with no code, replace this with a one-step symbolic or numerical trace, e.g. “Given `f(x) = x²`, what is `f'(3)` and why?”

### 5. Debugging scenario
“You change one line and now the app crashes with `cannot read property 'name' of undefined`. Where would you look first?”
- 0 = “I would ask AI to fix it”
- 1 = “at the line that changed” or “where the value is used”
- 2 = traces the value backward to where it should have been set, and checks the boundary

For math/physics: “Your numeric result has the wrong sign. What do you check first?”
- 0 = no idea
- 1 = rechecks the calculation
- 2 = checks assumptions, units, boundary conditions, and the sign convention

### 6. Data-structure / model choice
“You need to store 1,000 users and look them up by ID. Would you use a list or a map/dictionary? Why?”
- 0 = no clear choice
- 1 = picks one, weak reason
- 2 = picks a map for key lookup and mentions cost/ordering/implementation

For math/physics: “Would you model a falling object with a discrete simulation or a closed-form equation? Why?”
- 0 = no clear choice
- 1 = picks one, weak reason
- 2 = mentions assumptions, accuracy, and when each model is appropriate

## Topic prior knowledge (required)

Ask:

> How much do you already know about **<topic>**?

- **A. I don’t know this topic at all.**
- **B. I’ve heard some terms / read a little.**
- **C. I can use it, but I want the internals.**
- **D. I can teach it.**

This is not added to the 12-point score. It selects the **Newcomer** track and whether the course needs a topic primer.

- **A → Newcomer**, even if the general score is high.
- **B →** use the general track, but add a one-screen topic primer before the first deep module.
- **C →** use the general track and skip the primer.
- **D →** use the general track, skip the primer, and allow the Deep Diver pace.

## Domain and direction

Ask:

> Is this a software codebase, a math topic, a physics topic, or something else?

Then:

> Do you want **top-down** (start from a phenomenon/result, then derive the principles) or **bottom-up** (start from definitions/axioms, then build up)?

- **Software:** top-down is the default. Do not ask unless the learner volunteers a preference.
- **Math / physics:** ask. Both are valid; they produce different courses.
- **Newcomer:** do not force the choice before the primer. Start with a concrete visual phenomenon, then introduce the choice after the first module.
- **No preference:** choose top-down for software; for math/physics, choose top-down for a first course and bottom-up for a reference-style course.
- **Bottom-up:** still put a concrete example on screen 1. “Axioms first” does not mean “no motivation first.”

## Unscored questions

Ask these to shape the course, not the score:

1. **Goal:** “What do you want to be able to do after this?”
   - steer AI coding tools better
   - debug when AI gets stuck
   - understand the architecture
   - build on top of the codebase
   - solve problems / pass an exam
   - teach it to someone else
2. **Time:** “How much time do you want to spend on the tutorial?”
   - 20–35 minutes (focused tour; Explorer)
   - 35–60 minutes (standard course; Explorer/Builder)
   - 60–90 minutes (deeper build; Builder)
   - 90–150+ minutes (full deep dive; Deep Diver)

   Time is a constraint, not just a preference. A deeper, more detailed course needs a longer seat time—do not promise a Deep Diver course in 20 minutes. Translate the chosen budget into a section plan (`sections × read/check + labs × lab + 5–10 min frame`) using `references/pacing.md`; if the sum is over, cut a section or downgrade the track.
3. **Language:** “Should the course be in English, Traditional Chinese, or another language?”
4. **Video:** “Do you want a narrated video, or are diagrams + labs enough?”

If `mattpocock/skills` is installed, you may optionally run `/grill-me` to resolve an ambiguous goal or a “what do you actually want?” conversation. Cap it at about 10 questions, write the answers into `COURSE_BRIEF.md`, and do not grill a novice on domain facts they cannot know. The level test is the required minimum; grilling is optional and deeper.

## Tracks

| Condition | Track | What changes | Recommended seat time |
|---|---|---|---|
| Topic A (none) | **Newcomer** | 4 modules, 2 labs, a “What is this?” opening, every term defined, a guided first lab, 75–90 s video, no unglossed jargon | 30–45 min |
| Score 0–4, topic B–D | **Explorer** | 4 modules, 2 labs, more analogies, show 2 hints up front, shorter snippets | 45–60 min |
| Score 5–8 | **Builder** | 5 modules, 3 labs, standard hints, 90 s video | 60–90 min |
| Score 9–12 | **Deep Diver** | 5–6 modules, 3 harder labs, fewer hints, longer real code, 90–120 s video | 90–150+ min |

If the score is mixed, use the **lowest dimension for support** and the **highest for pace**. A strong programmer who is new to the topic gets Newcomer for the topic primer, then the full technical pace after it.

If the learner declines the test, use **Builder** and state the assumption in `COURSE_BRIEF.md`. If their stated time budget is under 45 minutes, use **Explorer** instead and record the downgrade.

## Time and depth must agree

The track sets a recommended seat time. The course length, module count, lab depth, and hint density scale together.

- **Newcomer:** 30–45 minutes, 4 modules, 2 labs, very explicit hints.
- **Explorer:** 45–60 minutes, 4 modules, 2 labs, more analogies.
- **Builder:** 60–90 minutes, 5 modules, 3 labs, standard hints.
- **Deep Diver:** 90–150+ minutes, 5–6 modules, 3 harder labs, less scaffolding, more real code.

Rules:

- If the time budget is **below** the track minimum, either downgrade the track or split the course into a **core path** that fits the budget plus optional deep-dive modules. Say which one you did in `COURSE_BRIEF.md`.
- If the time budget is **above** the track needs, add optional extensions (a harder lab, a real-code walkthrough, a reading path). Do not pad with repeated text.
- If the learner asks for “more difficult”, “more detailed”, or “deeper”, increase the **time budget and depth** together. A more detailed course is not the same content with more words.
- Do not compress a Deep Diver course into 15–20 minutes. Either reduce the scope to Builder/Explorer or tell the learner the full deep dive needs 90+ minutes.

## Newcomer rules

- Start with “What is this thing?” — a concrete phenomenon, output, or visual. Do not start with a definition.
- Define every term on first use; assume no domain vocabulary.
- The first lab is guided: a near-complete skeleton with one small TODO.
- Do not ask the learner to choose top-down vs bottom-up before the first module.
- Use more visuals and fewer code lines; show the result before the mechanism.
- For math/physics, start with a visual phenomenon (a moving object, a graph, a simulation), then introduce the formal definition.

## Calibration examples

- **Newcomer:** “I don’t know this topic at all” + “I ask AI” + no model. Build a 4-module course with a “What is a compiler?” opening, define every term, and give a guided first lab.
- **Explorer:** “heard some terms” + “sometimes read code” + can trace a reassignment. Use the standard arc, but add a topic primer and more analogies.
- **Builder:** knows functions and APIs, reads code sometimes, traces a reassignment. Standard 5-module course, 3 labs.
- **Deep Diver:** explains compilation, traces undefined values, chooses a map. Skip basic definitions, show real internals earlier, and use harder labs.

## What the test is not

- It is not a graded exam.
- It is not the course’s exercise format. The labs are active practice in the medium the skill requires; only recognition/recall drills may use multiple choice, and only with feedback.
- It does not decide whether the learner “deserves” the course. It only changes depth, pace, and scaffolding.
