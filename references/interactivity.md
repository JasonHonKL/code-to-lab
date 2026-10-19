# Interaction and Anti-Drift

A learner drifts when a section becomes a long passive read. The fix is not more content; it is a predictable rhythm: **see → predict → check → explain → do**. The rhythm is the same in every section, so the learner always knows what comes next.

## The required section rhythm

Each teaching section follows this order:

1. **Hook** — the observable behavior or question the section answers.
2. **Diagram** — one Mermaid map with a “what to notice” caption.
3. **Annotation** — 2–3 sentences that explain the one edge or decision that matters.
4. **Micro-check** — one small interaction after every 2 screens (predict/reveal, one-question MC, order-the-steps, hotspot).
5. **MC check** — 2–4 multiple-choice items with per-option feedback, retry, one misconception item and one application item.
6. **Short answer** — one “explain it back” prompt, 2–4 sentences, model answer revealed after an attempt.
7. **Lab** — only after the MC and the short answer. The lab applies the same idea in the real medium.

The fixed gate before a lab is **MC → short answer → lab**. Not lab → quiz. Not short answer → MC. Not “read five screens → lab.” If a section has no lab, it still ends with MC → short answer.

## Density rules

- **No more than 2 screens or about 3 minutes of passive reading without an interaction.** A “screen” is one viewport of reading, not a module.
- **One MC card and one short-answer card per teaching section.** Both are unscored.
- **One micro-check between screens.** It can be as small as a predict button or a one-question check.
- **One recall question at the start of a section** (after the first module): “Before we open this, what did the previous section say would happen?” This is spaced retrieval, not a gate.
- **No auto-advance.** The learner clicks “Next: check” or “Next: explain,” and can always scroll back.
- **Do not gate progress.** Every check has a “continue anyway” path; the point is awareness, not compliance.

## Micro-check types

| Type | Use it when | Learner action | Implementation |
|---|---|---|---|
| **Predict then reveal** | The result is surprising or easy to guess wrong | Choose/type a prediction, then reveal the real output | Button + hidden result; no scoring |
| **One-question MC** | One distinction unlocks the next screen | Pick one of 3 options | Same item engine as the section check |
| **Order the steps** | The order is the concept (pipeline, request, build) | Click items in order, or drag with a keyboard fallback | Buttons + “move up/down”; check order |
| **Hotspot on a diagram** | The learner must locate a stage in the system | Click a node/region, see its name and role | SVG regions or buttons beside the diagram |
| **Match pairs** | Two vocabularies must be connected (stage ↔ error, term ↔ definition) | Select left, then right | Two columns of buttons; no drag required |
| **Spot the bug** | The error is visible in real code | Click the line that causes the failure | Code block with line buttons |
| **Confidence check** | The learner may overestimate understanding | Rate 1–5 before the reveal | Store locally; compare with the result |
| **Explain-back** | The idea must be produced, not recognized | Write 2–4 sentences, then compare with a model answer | Textarea + reveal + self-check |
| **Diagram step-through** | A trace has several ordered hops | Next/Previous highlights one hop | Toggle classes on rendered SVG nodes |

Use only the types that fit the medium. A writing course does not need “spot the bug”; a code course does not need a pronunciation drill.

## The MC card

The MC card is the first half of the gate. It is recognition-level, fast, and diagnostic.

- 2–4 items: one recall/recognition, one misconception, one application/transfer. For Newcomer, 2 items is enough.
- 3–4 options; one unambiguous correct answer; plausible distractors from real misconceptions.
- **Every option gets a rationale** after submission, including why the distractors are wrong.
- A short “why” line and a link back to the relevant screen.
- Retry always available; no score, no timer, no progress gate.
- Use a `<fieldset>` + `<legend>`, real radio inputs, and a visible “Check” button.
- Never “all of the above” unless the target exam uses it.
- For exam-fidelity courses, the timed item set belongs in the lab; the section card stays formative.

Template: `templates/section-check.json`.

## The short-answer card

The short answer is the second half of the gate. It forces retrieval and explanation before the learner starts producing. It is **not** the lab and is **not** auto-graded.

### Prompt design

One prompt per section, tied to the section’s must-not-miss idea:

- “In 2–4 sentences, explain how the lexer turns `12 + 3` into tokens, and why the parser cannot do that job.”
- “In 2–4 sentences, explain why a clean wrong answer points at the runtime rather than the lexer.”
- “In 2–4 sentences, state the trade-off this design makes and the evidence you would use to challenge it.”

Avoid “What did the section say?” and “Define X.” The prompt should require a mechanism, a consequence, or a decision.

### Behavior

- A labelled `<textarea>` with a 2–4 sentence / 30–120 word target and a live word counter.
- Autosave to `localStorage` under a namespaced key (`tdc:<course>:<section>:short-answer`). Show “Saved locally.” Provide “Clear.”
- The **Reveal model answer** button becomes available after the learner has written at least one sentence (about 15–20 words) or clicks “I’m stuck.” It is never blocked forever.
- Reveal a 3–5 sentence model answer plus a 3-item self-check checklist:
  - Did you name the mechanism?
  - Did you name the input/output or the evidence?
  - Did you state the consequence or the trade-off?
- The learner marks each item yes/no. The checklist is a comparison tool, not a grade.
- Offer “Copy my answer” and “Copy model answer” for notes.
- Do not send the answer to a server, do not call an LLM from the page, and do not include it in the lab score.
- On mobile, the textarea is full width and the counter stays visible.

### What a good model answer looks like

- 3–5 sentences, not a paragraph.
- Names the mechanism and the boundary.
- Uses the section’s exact terms and one concrete example.
- Says what would change if one part were removed.
- For code: names the stage, function, or data structure.
- For math/physics: includes the equation, units, and the limiting case.
- For design/architecture: names the trade-off and the evidence.
- For language: includes one example sentence in the target language.

### What the short answer is not

- Not a second lab.
- Not a graded essay.
- Not a place for a 500-word response.
- Not a substitute for the lab’s production evidence.
- Not auto-graded by an in-page model; the lab checker handles production.

## Anti-drift layout

- **Sticky section rail:** “Section 2 of 5 · 2 checks · 1 lab,” with a thin progress line. It orients without gating.
- **Next-action label:** after each block, the button says what happens next (“Next: check your understanding,” “Next: explain it back,” “Next: lab”).
- **Mini-map:** one dot per teaching section; the current dot is filled; checks and labs are small marks, not separate dots.
- **Section recap card:** 3 bullets + the section diagram + “what you can now do.” This is the landing point after the lab.
- **Lab anchor:** a “Jump to lab” link is fine after the MC and short answer; do not hide the lab behind a gate.
- **No infinite scroll without landmarks.** Each section has a visible heading and a stable anchor.
- **Return to the diagram:** after the lab, link back to the diagram and ask “which edge did your change touch?”

## Density by track

| | Newcomer | Explorer | Builder | Deep Diver |
|---|---|---|---|---|
| Micro-check cadence | Every 1–2 screens | Every 2 screens | Every 2 screens | Every 2–3 screens |
| MC items / section | 2 | 2–3 | 3 | 3–4 |
| Short answer length | 1–2 sentences, sentence starters | 2–3 sentences | 2–4 sentences | 3–4 sentences + evidence |
| Short-answer support | Frame + word bank | Frame | Prompt + checklist | Prompt + checklist + counterexample |
| Recall opener | Optional | Yes | Yes | Yes |

A Newcomer short answer can be “Finish this sentence: The lexer turns ___ into ___ because ___.” A Deep Diver short answer should require a trade-off and a piece of evidence.

## Accessibility and implementation

- Use real form controls: `<fieldset>`, `<legend>`, `<input type="radio">`, `<textarea>`, `<button>`.
- Label every textarea; connect the counter and save status with `aria-live="polite"`.
- Ordering interactions must work with buttons and keyboard, not drag only.
- Do not rely on color alone for correct/incorrect; add a check/cross and text.
- Respect `prefers-reduced-motion` for reveals and step-through highlights.
- Store answers locally; never transmit them. Namespaced keys prevent collisions between courses.
- No timer, no streak pressure, no “you must answer to continue.”
- Keep the interaction code in `main.js` or `section-check.js`, not inline in every module.

## Quality checklist

- [ ] Every teaching section has MC → short answer; if the section owns a lab, the lab comes third and last.
- [ ] Every MC item has per-option rationales, retry, and a “why.”
- [ ] Every section has exactly one short-answer prompt with a model answer and a 3-item self-check.
- [ ] The short answer autosaves locally, shows a word count, and can be cleared.
- [ ] The model answer reveals after an attempt or “I’m stuck,” never only after a perfect answer.
- [ ] No more than 2 screens or ~3 minutes pass without an interaction.
- [ ] There is at least one recall opener after the first module.
- [ ] No check gates progress or contributes to the lab score.
- [ ] The sticky rail names the section and the next action.
- [ ] All interactions work with keyboard and screen reader.
- [ ] The page works with JavaScript disabled for reading (checks may be inert, but content remains).

## Anti-patterns

- A 10-minute read followed by one giant quiz at the end.
- A lab as the first interaction in a section.
- MC with no rationale, or a “correct/incorrect” toast and nothing else.
- A short answer that is really a second MC item.
- Auto-grading a short answer in the page with an LLM and calling it formative.
- Gating the lab behind a perfect score.
- Ten interactions per screen; the learner spends more time clicking than thinking.
- A progress bar that shames the learner or resets on refresh.
- Hiding the diagram or the lab behind a hover-only control.
- Copying the same short-answer prompt into every section.
