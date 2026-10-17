# Level Test

Run this **before** designing the course. It takes about two minutes and prevents the most common failure: explaining too much to an experienced learner, or too little to a beginner.

## How to ask

Say this in chat:

> Before I build, I need a two-minute calibration so I don’t over- or under-explain. There are no wrong answers. Answer roughly, in your own words.

Ask the questions one at a time, or all at once. Do not turn this into a form or a graded quiz. The learner may skip any question; score skipped items as 0 and note it.

## Scored questions (0–2 each, max 12)

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

Adapt the language to the target codebase.

### 5. Debugging scenario
“You change one line and now the app crashes with `cannot read property 'name' of undefined`. Where would you look first?”
- 0 = “I would ask AI to fix it”
- 1 = “at the line that changed” or “where the value is used”
- 2 = traces the value backward to where it should have been set, and checks the boundary

### 6. Data-structure choice
“You need to store 1,000 users and look them up by ID. Would you use a list or a map/dictionary? Why?”
- 0 = no clear choice
- 1 = picks one, weak reason
- 2 = picks a map for key lookup and mentions cost/ordering/implementation

## Unscored questions

Ask these to shape the course, not the score:

1. **Goal:** “What do you want to be able to do after this?”
   - steer AI coding tools better
   - debug when AI gets stuck
   - understand the architecture
   - build on top of the codebase
   - pass an interview / class
2. **Time:** “How much time do you want to spend?”
   - 15 minutes (Explorer)
   - 30 minutes (Builder)
   - 60+ minutes (Deep Diver)
3. **Language:** “Should the course be in English, Traditional Chinese, or another language?”
4. **Video:** “Do you want a narrated video, or are diagrams + labs enough?”

## Scoring and tracks

| Score | Track | What changes |
|---|---|---|
| 0–4 | **Explorer** | 4 modules, 2 labs, more everyday analogies, show 2 hints up front, shorter code snippets, 75–90 s video |
| 5–8 | **Builder** | 5 modules, 3 labs, standard hints, 90 s video |
| 9–12 | **Deep Diver** | 5–6 modules, 3 harder labs, fewer hints, longer real code, 90–120 s video |

If the score is mixed, use the **lowest dimension for support** and the **highest for pace**. For example, a learner with strong vocabulary but weak code reading gets fewer definitions but more code translations.

If the learner declines the test, use **Builder** and state the assumption in `COURSE_BRIEF.md`.

## Calibration examples

- **Explorer:** “It just runs” + “I ask AI” + list for user lookup. Start with `print(1+2)` and trace one line. Define every term. Do not open the VM until module 4.
- **Builder:** knows functions and APIs, reads code sometimes, can trace a reassignment. Use the standard arc, open the runtime in module 3, and keep labs to 2–3 TODOs.
- **Deep Diver:** explains compilation, traces undefined values, chooses a map for lookup. Skip basic definitions, show the real bytecode earlier, and make the lab TODOs harder with fewer hints.

## What the test is not

- It is not a graded exam.
- It is not the course’s exercise format. The labs remain fill-in-the-code.
- It does not decide whether the learner “deserves” the course. It only changes depth, pace, and scaffolding.
