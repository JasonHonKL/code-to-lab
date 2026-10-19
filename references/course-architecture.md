# Course Architecture

## The top-down rule

Every module answers one question the learner can already ask from the behavior they have seen. Never start with a definition. Start with the thing that happens, then open the box that produced it.

Bad opening:

> A hash table is a data structure that maps keys to values using a hash function…

Good opening:

> You type `t.name`. It prints `"lua"`. How did the interpreter find that value so fast? Under the box is an array and a hash table.

## The arc

| Position | Module | Purpose |
|---|---|---|
| 1 | **The whole machine** | The product, the one-sentence model, the 60–90 s video, the system map, the cast of files |
| 2 | **Follow one line / one action** | Trace one concrete action through every stage |
| 3 | **Zoom into the runtime** | The core data structures and why they are shaped that way |
| 4 | **Zoom into execution** | The loop, dispatch, fast paths, fallbacks |
| 5 | **Read the rest** | Reading order, full test suite, next topics |

This is a menu, not a checklist. A 4-module Explorer course can merge 3 and 4. A Deep Diver course can split the front end into lexer and parser/codegen modules.

For a math/physics topic, replace the code trace with a concrete phenomenon and a derivation. Read `references/math-physics.md`. The arc becomes phenomenon → model → derivation/computation → lab → limits, and the learner may choose bottom-up (definitions → results) instead of top-down.

## Module template

```html
<section class="module" id="module-N">
  <div class="module-content">
    <header class="module-header">
      <span class="module-number">0N</span>
      <h1 class="module-title">…</h1>
      <p class="module-subtitle">One line about what this module teaches.</p>
    </header>
    <div class="module-body">
      <section class="screen">
        <h2 class="screen-heading">…</h2>
        <figure class="diagram">
          <pre class="mermaid">flowchart LR …</pre>
          <figcaption>What to notice: …</figcaption>
        </figure>
        <p>2–3 sentences that annotate the diagram.</p>
        <div class="micro-check" data-check="predict-N-1"><!-- predict/reveal or 1 MC --></div>
      </section>
      <!-- 2–4 screens per module; one interaction every 2 screens -->
      <div class="section-check" data-check-id="module-N-section-M">
        <p class="gate-label">1 · Check</p>
        <h3>Check your understanding</h3>
        <!-- 2–4 MC items: recall, misconception, application; per-option feedback; retry -->
      </div>
      <div class="short-answer" data-sa-id="module-N-section-M">
        <p class="gate-label">2 · Explain it back</p>
        <h3>In your own words</h3>
        <label for="sa-N-M">2–4 sentences: …</label>
        <textarea id="sa-N-M" rows="4"></textarea>
        <p class="counter">0 / 120 words · Saved locally</p>
        <button class="reveal-model">Reveal model answer</button>
        <!-- model answer + 3-item self-check after reveal -->
      </div>
      <p class="gate-label">3 · Lab</p>
      <!-- lab card here if this module owns a lab -->
    </div>
  </div>
</section>
```

## Inline lab placement

A lab belongs immediately after the section that teaches its core. Do not collect labs into a final module.

| Lab target | Place it after | Example |
|---|---|---|
| Lexer / tokenizer | The pipeline module, after the lexer screen | Numerals, strings, keywords |
| Parser / codegen | After the tree → instructions screen | Constant folding, precedence, opcode emission |
| Runtime data structure | After the data-structure screen | Hash lookup, array growth, interning |
| Execution loop | After the dispatch/fast-path screen | Arithmetic opcode, method call, error handling |
| Boundary (API, DB, GC) | After the boundary screen | Serialization, allocation, reference counting |
| Writing / explanation | After the concept screen | Explain why the value changed; write a review |
| Design / artifact | After the design-pattern screen | Redesign a screen; draw the flow |
| Performance / practice | After the technique screen | Play the progression; record the phrase |
| Experiment / research | After the mechanism screen | Change one variable; evaluate the sources |

Read `references/lab-kinds.md` for the full catalog and verification contract. The lab kind must match the learning verb: do not force a code lab onto a writing or performance skill.

The nav has one dot per **teaching section**, not one per lab. The lab cards live inside the modules and do not get their own dot. Section checks and short answers do not get a nav dot either; they are steps inside the section.

## Content rules

- **Graph-first.** Every conceptual screen leads with a Mermaid diagram or an equally visual block (code↔English, annotated code, table). Every teaching section has at least one Mermaid diagram; every module has at least three diagrams and at least two types. If a fourth sentence describes a flow, sequence, state, hierarchy, decision, or relationship, replace it with a diagram. Read `references/diagrams.md`.
- **2–3 sentences per text block.** The text annotates the diagram; it does not restate it.
- **Micro-check cadence.** No more than two screens or about three minutes of passive reading without an interaction. Put a predict/reveal, one-question MC, order-the-steps, hotspot, or match-pairs check between screens.
- **Code↔English translations** are the backbone. Real code on the left, line-by-line plain language on the right.
- **Use exact code** from the repo. Never simplify or rewrite a snippet. Choose naturally short sections instead.
- **Tooltips on every technical term**, first use per module. Use a dashed underline and `cursor: pointer`, not a question-mark cursor.
- **No recycled metaphors.** Pick one that fits the concept. Do not use restaurant/kitchen for everything.
- **Every section gets a three-beat gate: MC → short answer → lab.** After the screens, add 2–4 MC items (one recall/recognition, one misconception, one application) with per-option feedback, retry, and a “why.” Then one short-answer prompt (2–4 sentences) with autosave, a model answer, and a 3-item self-check. Then the lab. Both checks are unscored and do not gate progress; neither replaces the lab.
- **Recall opener.** After the first module, each section opens with one question about the previous section: “Before we open this, what did we say would happen?” It is spacing, not a gate.
- **Active practice, not a quiz.** Multiple choice is allowed for section checks, micro-checks, recognition, recall, or discrimination (with per-option feedback), but not as the default lab format, not as the only evidence for a production skill, and not as “guess the formula.” Use labs, diagrams, traces, and translations for everything else.
- **Match the answer format to the target performance.** Codebase work → code; architecture → ADR/trade-off artifact; CFA-style exam → item sets plus show-your-work; service design → blueprint/model/plan. Read `references/assessment-design.md`.
- **One idea per screen.** If you need two diagrams, use two screens.
- **Show the thing.** At least one screen per module must display real code, real output, or a real data structure from the project.
- **Errors are a teaching tool.** Map error messages to the layer that produced them.
- **No generic SaaS language.** Use the project’s own terms and claims.

## Diagrams

Mermaid is the default. Choose the type from the question the learner is asking:

| Learner’s question | Type |
|---|---|
| What are the stages and boundaries? | `flowchart LR` |
| Who calls whom, in what order? | `sequenceDiagram` |
| What states can this be in? | `stateDiagram-v2` |
| What is the data shaped like? | `erDiagram` or `classDiagram` |
| Which branch do I take? | `flowchart TD` with labelled edges |
| What is the hierarchy? | `flowchart TB` or `mindmap` |
| When did this happen? | `timeline` |
| What is the trade-off? | `quadrantChart` |

Use custom HTML/CSS for:

- code↔English translations,
- token chips,
- stack/register/table diagrams,
- fast-path vs fallback cards,
- flow animations and group chats.

Every diagram gets a one-sentence “what to notice” caption and a source fallback. Keep it to 12 nodes or fewer. Theme Mermaid with the white course palette (see `references/design-system.md`); do not leave the default purple/blue theme.

## Glossary tooltips

Tooltip anything a non-specialist might not know: API, SDK, REPL, bytecode, register, hash, GC, opcode, parser, lexer, closure, coroutine, C API, ABI, pointer, stack frame, and acronyms. Keep definitions to 1–2 sentences and make them usable in a sentence to an AI tool.

## Localization

Ask for the course language before writing. Keep code, file names, identifiers, and upstream comments in their original language. Translate the teaching prose, headings, hints, lab missions, and UI strings. If you build two languages, create separate module sets and a shared lab UI with a language switch; do not machine-translate at runtime.

## Level adaptation

| | Newcomer | Explorer | Builder | Deep Diver |
|---|---|---|---|---|
| Module count | 4 | 4 | 5 | 5–6 |
| Seat time | 30–45 min | 45–60 min | 60–90 min | 90–150+ min |
| Opening | “What is this?” + visual phenomenon | Observable behavior | Observable behavior | Observable behavior / internals |
| Analogy density | Highest | High | Medium | Low |
| Code/equation snippet length | 3–8 lines, heavily annotated | 5–10 lines | 8–15 lines | 15–30 lines |
| Tooltips | Every term | Very aggressive | Standard | Only non-obvious |
| Lab tasks | 1 guided task | 1–2 | 2–3 | 3–4 |
| Hints | Step-by-step | 2 up front | 3 progressive | 3, last minimal |
| Diagrams | 3 per module, simplest | 3 per module | 3+ per module | 3–4 per module, denser |
| Micro-checks | Every 1–2 screens | Every 2 screens | Every 2 screens | Every 2–3 screens |
| MC / short answer | 2 items / 1–2 sentences | 2–3 items / 2–3 sentences | 3 items / 2–4 sentences | 3–4 items / 3–4 sentences |
| Video | 75–90 s | 75–90 s | 90 s | 90–120 s |

A Newcomer track is selected by the topic prior-knowledge answer, not by the general score. A strong programmer who is new to the topic still gets the “What is this?” opening and the guided first lab.

Depth and seat time scale together. A Deep Diver course is 90–150+ minutes with 5–6 modules and harder labs; do not deliver the same content in 15 minutes. If the learner’s budget is below the track minimum, downgrade the track or split it into a core path plus optional deep-dive modules, and say which you did.

## Newcomer rules

- Open with “What is this thing?” — a concrete output, phenomenon, or visual. Do not open with a definition.
- Define every term on first use; assume no domain vocabulary.
- The first lab is guided: a near-complete skeleton with one small TODO.
- Do not ask the learner to choose top-down vs bottom-up before the first module.
- Show the result before the mechanism.

## Math and physics

- Ask top-down vs bottom-up; both are valid.
- Start with a phenomenon, experiment, graph, or simulation, even in bottom-up mode.
- Use Manim for the video; see `references/math-physics.md`.
- Labs are computational or derivational: Python/SymPy, numeric tolerance, symbolic equivalence, conservation laws, a known analytic case, or a written derivation checked against a rubric.
- Keep the mathematical logic in a testable function; test the function, not the pixels.

## The final module

End with a reading order that follows the pipeline, not the alphabet. Include:

- the order to open files,
- the commands to build and run the full test suite,
- 3–6 next topics (GC, coroutines, C API, performance, parser details),
- a one-screen cheat sheet of the whole course.
