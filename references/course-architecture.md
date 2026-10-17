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

The nav has one dot per **teaching section**, not one per lab. The lab cards live inside the modules and do not get their own dot.

## Content rules

- **2–3 sentences per text block.** If a fourth sentence is needed, replace text with a visual.
- **At least 50% visual per screen.** Diagrams, code blocks, cards, flows, chats, translations.
- **Code↔English translations** are the backbone. Real code on the left, line-by-line plain language on the right.
- **Use exact code** from the repo. Never simplify or rewrite a snippet. Choose naturally short sections instead.
- **Tooltips on every technical term**, first use per module. Use a dashed underline and `cursor: pointer`, not a question-mark cursor.
- **No recycled metaphors.** Pick one that fits the concept. Do not use restaurant/kitchen for everything.
- **No multiple-choice in the course body.** Use labs, diagrams, traces, and translations. The only quiz is the pre-course level test.
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

| | Explorer | Builder | Deep Diver |
|---|---|---|---|
| Module count | 4 | 5 | 5–6 |
| Analogy density | High | Medium | Low |
| Code snippet length | 5–10 lines | 8–15 lines | 15–30 lines |
| Tooltips | Very aggressive | Standard | Only non-obvious |
| Lab TODOs | 1–2 | 2–3 | 3–4 |
| Hints | 2 up front | 3 progressive | 3, last minimal |
| Video | 75–90 s | 90 s | 90–120 s |

## The final module

End with a reading order that follows the pipeline, not the alphabet. Include:

- the order to open files,
- the commands to build and run the full test suite,
- 3–6 next topics (GC, coroutines, C API, performance, parser details),
- a one-screen cheat sheet of the whole course.
