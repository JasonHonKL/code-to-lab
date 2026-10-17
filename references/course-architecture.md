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
        <p>2–3 sentences.</p>
        <!-- diagram, translation block, flow, chat, cards -->
      </section>
      <!-- 2–4 screens per module -->
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

The nav has one dot per **teaching section**, not one per lab. The lab cards live inside the modules and do not get their own dot.

## Content rules

- **2–3 sentences per text block.** If a fourth sentence is needed, replace text with a visual.
- **At least 50% visual per screen.** Diagrams, code blocks, cards, flows, chats, translations.
- **Code↔English translations** are the backbone. Real code on the left, line-by-line plain language on the right.
- **Use exact code** from the repo. Never simplify or rewrite a snippet. Choose naturally short sections instead.
- **Tooltips on every technical term**, first use per module. Use a dashed underline and `cursor: pointer`, not a question-mark cursor.
- **No recycled metaphors.** Pick one that fits the concept. Do not use restaurant/kitchen for everything.
- **Active practice, not a quiz.** Multiple choice is allowed for recognition, recall, or discrimination (with per-option feedback), but not as the default lab format, not as the only evidence for a production skill, and not as “guess the formula.” Use labs, diagrams, traces, and translations for everything else.
- **One idea per screen.** If you need two diagrams, use two screens.
- **Show the thing.** At least one screen per module must display real code, real output, or a real data structure from the project.
- **Errors are a teaching tool.** Map error messages to the layer that produced them.
- **No generic SaaS language.** Use the project’s own terms and claims.

## Diagrams

Use Mermaid for:

- system maps (`flowchart LR/TB`),
- request/sequence traces (`sequenceDiagram`),
- type/relationship maps (`classDiagram`),
- lookup/dispatch flows (`flowchart TD`).

Use custom HTML/CSS for:

- code↔English translations,
- token chips,
- stack/register/table diagrams,
- fast-path vs fallback cards,
- flow animations and group chats.

Theme Mermaid with the same warm palette as the page. Do not leave the default purple/blue theme.

## Glossary tooltips

Tooltip anything a non-specialist might not know: API, SDK, REPL, bytecode, register, hash, GC, opcode, parser, lexer, closure, coroutine, C API, ABI, pointer, stack frame, and acronyms. Keep definitions to 1–2 sentences and make them usable in a sentence to an AI tool.

## Localization

Ask for the course language before writing. Keep code, file names, identifiers, and upstream comments in their original language. Translate the teaching prose, headings, hints, lab missions, and UI strings. If you build two languages, create separate module sets and a shared lab UI with a language switch; do not machine-translate at runtime.

## Level adaptation

| | Newcomer | Explorer | Builder | Deep Diver |
|---|---|---|---|---|
| Module count | 4 | 4 | 5 | 5–6 |
| Opening | “What is this?” + visual phenomenon | Observable behavior | Observable behavior | Observable behavior / internals |
| Analogy density | Highest | High | Medium | Low |
| Code/equation snippet length | 3–8 lines, heavily annotated | 5–10 lines | 8–15 lines | 15–30 lines |
| Tooltips | Every term | Very aggressive | Standard | Only non-obvious |
| Lab tasks | 1 guided task | 1–2 | 2–3 | 3–4 |
| Hints | Step-by-step | 2 up front | 3 progressive | 3, last minimal |
| Video | 75–90 s | 75–90 s | 90 s | 90–120 s |

A Newcomer track is selected by the topic prior-knowledge answer, not by the general score. A strong programmer who is new to the topic still gets the “What is this?” opening and the guided first lab.

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
