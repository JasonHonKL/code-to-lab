# Design System

The goal is a clean, distinctive developer notebook — not the default purple-gradient AI course.

## Canvas

**Default: white.** The page and the video use a white background, dark ink, neutral borders, and one accent. Warm paper, cream, beige, off-white, and dark canvases are opt-in: use one only when the learner asks for it or names a theme, and record it in `COURSE_BRIEF.md`.

- Page background `#FFFFFF`; alternate section surface `#F7F7F8` (neutral, not warm).
- Ink `#111318` (18.6:1); secondary `#4B5563` (7.6:1); muted `#5F6673` (5.8:1). Do not use `#9AA0A6` for normal-size text.
- One accent. Vermillion `#B83A1F` (5.7:1 on white), teal `#1F6F8B` (5.7:1), amber `#8A5A00` (5.9:1), or forest `#1F7A4D` (5.3:1). Never a purple gradient. `#D94F30` is fine for a large decorative mark but not for body text (4.1:1).
- Palette source: the `color-themes` companion (158 TOML palettes). The white palette below is the default; if the learner names a theme or asks for a dark page, map that theme’s keys to these variables instead of inventing colors.
- Code ground: GitHub Light High Contrast (`#FFFFFF` / `#010409`) for code panels and GitHub Dark High Contrast (`#0A0C10` / `#F0F3F6`) for terminal/command blocks. A dark code ground (`#1E1E2E` / `#CDD6F4`) is also valid on a dark page; do not use low-contrast gray comments.
- Borders `#E3E5E8`; surfaces white. On a white page, cards need a visible border or a soft neutral shadow; a borderless white card disappears.
- Success `#1F7A4D`; error `#B42318`; info `#1F6F8B`.

```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-soft: #F7F7F8;
  --color-surface: #FFFFFF;
  --color-bg-code: #FFFFFF;
  --color-code-fg: #010409;
  --color-code-comment: #4B535D;
  --color-text: #111318;
  --color-text-secondary: #4B5563;
  --color-text-muted: #5F6673;
  --color-border: #E3E5E8;
  --color-accent: #B83A1F;
  --color-accent-hover: #9E2F18;
  --color-accent-light: #FDF0EC;
  --color-success: #1F7A4D;
  --color-error: #B42318;
  --color-info: #1F6F8B;
}
```

Use neutral shadows (`rgba(17,19,24,…)`), never pure black. Do not reintroduce a warm tint unless the learner asked for a warm theme.

## Typography

- Display: Bricolage Grotesque or another bold geometric face with personality. Not Inter/Roboto/Arial.
- Body: DM Sans or similar.
- Mono: JetBrains Mono, Fira Code, or Consolas.
- Module numbers: huge display, accent at 15–20% opacity.
- Module titles: display, 700–800, tight tracking.
- Screen headings: display, 600–700.
- Labels: mono, uppercase, small, letter-spaced.
- Code: mono, 13–15 px, line-height 1.6.

Load Google Fonts by CDN for the course page, or bundle WOFF2 for an offline/video build.

For Traditional Chinese, use PingFang TC, Noto Sans TC, or Source Han Sans for Chinese text. Never set a Latin-only mono font on Chinese labels, code comments, or captions; it produces missing-glyph boxes. Keep Menlo/Consolas for ASCII code only.

## Layout

- Reading width 760–820 px; wide diagrams up to 1000–1100 px.
- Section padding 4–6 rem; generous whitespace.
- Alternate module backgrounds for rhythm.
- `scroll-snap-type: y proximity`, never `mandatory`.
- Modules `min-height: 100dvh` with a `100vh` fallback.
- Fixed nav 50 px, progress bar, one dot per teaching section.
- On mobile, stack two-column layouts and keep the fixed nav from covering the first module.

## Surface hierarchy and actions

The course should read as one page with sections, not a stack of boxes.

- **One card level.** A panel may contain text, a form, a table, or a diagram; it must not contain another bordered card. Use a section heading, a rule, or spacing for the next level. If a screenshot shows two borders around the same content, remove one.
- **Inline row actions.** Edit, rename, delete, and similar row actions are text buttons on one line, right-aligned, with one emphasised action. Do not stack three bordered buttons in a table cell.
- **One primary action per surface.** A filled or accent button is the main action; everything else is a text action. Destructive actions use the error color and a two-step confirm in place.
- **Filters are a toolbar, not a card.** Lay status/priority/assignee filters in a borderless row above the list they filter, not in their own panel.
- **Hide secondary work.** Import, advanced settings, and long optional forms live behind a disclosure (`<details>`) and stay collapsed until used.
- **Tables have a column budget.** Use `table-layout: fixed`, explicit percentage widths, and 10–18 px cell padding. Date, status, and action labels must not collide. Test at 1440, 1024, and 390 px; let text wrap by choice, never by overflow.
- **Screenshot before delivery.** Capture every screen at 1440×900 and 390×844. Look for nested cards, clipped buttons, overlapping labels, and page-level horizontal overflow. A clean DOM is not evidence; the rendered frame is.

## Code

- Use a palette from `color-themes`. For the default white course: GitHub Light High Contrast for code (`#FFFFFF` background, `#010409` foreground, `#4B535D` comments, `#A0111F` keywords, `#024C1A` strings, `#0349B4` numbers, `#622CBC` functions) and GitHub Dark High Contrast for commands (`#0A0C10` / `#F0F3F6`). Dark IDE panels are fine on a dark page; Catppuccin-inspired colors are optional, not mandatory.
- Code foreground, comments, and each syntax token must reach **7:1** on the code background. A theme name is not proof; measure the rendered pairs.
- Code must wrap; no horizontal scrollbar in teaching blocks.
- Choose naturally short snippets (5–10 lines). Never rewrite project code.
- Code↔English translation: two columns, real code left, line-by-line plain English right, accent border.
- For CLI commands, use a dark block with a muted `$`, a copy button, and a short comment.

## Diagrams

Graph-first: every conceptual screen leads with a Mermaid diagram or an equally visual block. Every teaching section has at least one Mermaid diagram; every module has at least three and at least two types. Read `references/diagrams.md` for the type table, patterns, and accessibility rules.

Mermaid theme for the white page:

```js
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#FFFFFF',
    primaryTextColor: '#111318',
    primaryBorderColor: '#B83A1F',
    lineColor: '#5F6673',
    secondaryColor: '#F3F4F6',
    tertiaryColor: '#FDF0EC',
    clusterBkg: '#F7F7F8',
    clusterBorder: '#D7DADF',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '15px',
  },
});
```

- Bundle Mermaid locally. Do not depend on the CDN at runtime.
- If the learner requested a theme, map these Mermaid variables to that palette; keep the white values above only for the default course.
- Render diagrams with a fixed-size wrapper and `overflow-x: auto` for wide ones.
- Keep labels short; use `<br/>` for two-line labels (escape them in HTML if the source is inside a normal element; use `<script type="text/plain">` for raw Mermaid text).
- Every diagram has a one-sentence “what to notice” caption, an `aria-label`, and a source fallback in `<details>`.
- Keep diagrams to 12 nodes or fewer; split a larger map across screens.
- Do not reuse the default purple Mermaid theme, rainbow nodes, or emoji.

## Equations

For math/physics, use an equation↔English translation block: the equation on the left, what each symbol means and why it is there on the right. Use LaTeX or MathJax for display; keep units and assumptions visible. Use one color consistently for the same quantity across the video, diagrams, and labs.

## Section gate UI: MC → short answer → lab

The three beats are visually distinct and always in this order. Label them 1, 2, 3 so the learner knows where they are.

### 1. MC card

- A compact bordered card inside the section; lighter than a lab card. No file path, checker command, or check button.
- 2–4 items; show one at a time or all at once, but keep it under two minutes.
- After an answer, mark the chosen option, mark the correct one, and show a one-sentence rationale for **every** option.
- Include a short “why” and a link back to the relevant screen.
- Retry is always available. Do not score, gate progress, or add a timer.
- Use the success/error colors plus a check/cross and text, never color alone.
- On mobile, stack options and keep the rationale under the chosen option.

### 2. Short-answer card

- Sits immediately after the MC card and before the lab. Same width as the section body, not a modal.
- One prompt, 2–4 sentences; a labelled `<textarea>` with 3–4 visible rows and a live word counter.
- Autosave to `localStorage` with a “Saved locally” indicator and a “Clear” button. No server call.
- **Reveal model answer** becomes available after one sentence or an “I’m stuck” click. Never lock it permanently.
- The model answer is 3–5 sentences, in a soft surface with an accent border, followed by a 3-item self-check checklist (mechanism / evidence / consequence).
- The checklist is comparison, not grading: yes/no boxes, no score, no red “wrong” state.
- Offer “Copy my answer” and “Copy model answer.”
- On mobile, full width; keep the counter visible above the keyboard.

### 3. Lab card

- A white card with a visible border on the white page, not a separate page.
- Header: lab number, difficulty, time, file.
- Broken behavior in one sentence.
- Sidebar: mission, deliverable, task list, concepts, hints.
- Main: read-only code preview or artifact starter, copy path, jump to the work file, check button, results.
- Status line: line/column or word count/duration, file size, read-only state.
- Check results: pass/fail badge, score, per-case or per-criterion rows, build log or rubric evidence on failure.
- Rubric visible for non-code labs; reference solution/exemplar behind a `<details>` reveal.
- No Save/Reset buttons that edit the work; use the CLI helper.
- For a practice/performance lab, show the recording checklist and where to put the take; do not build a fake recorder in the page.

## Icons and decoration

- Avoid emoji unless the user asks. Use letters, simple geometric marks, or CSS shapes.
- One accent color is enough. Do not rainbow the UI.
- Use neutral shadows and a subtle neutral dot-grid texture. No warm paper tint unless requested.

## Accessibility

- Text contrast at least WCAG AA: 4.5:1 for body, 3:1 for large text. Code tokens and command text should reach 7:1.
- Verify the actual foreground/background pairs after rendering, including muted text, code comments, keywords, strings, and disabled states. Use a WCAG relative-luminance function, not an eyedropper guess.
- Focus styles on inputs and buttons.
- Do not rely on color alone for pass/fail; include a check/cross and text.
- Keep code-readable font sizes; allow zoom.
- Tooltips must be reachable by keyboard/tap and appended to `body` so they are not clipped.
- Label every textarea; connect the word counter, save status, and model-answer reveal to `aria-live="polite"`.
- Ordering and hotspot interactions must work with buttons/keyboard, not drag or hover only.

## Optional impeccable audit

If the `color-themes` companion is installed, read the requested palette from its `themes/` folder and map it to CSS variables. If `impeccable` is installed, use it as a second pass after the page is built:

```bash
npx impeccable detect course/ --json
```

or `/impeccable audit course` / `/impeccable critique course` / `/impeccable polish course`.

Use it to catch deterministic frontend defects (contrast, spacing, overflow, overused fonts, nested cards, purple gradients), not to replace the white course direction or the graph-first hierarchy. A clean detector is evidence, not proof; inspect the rendered page across viewports. See `references/companion-skills.md`.

## Responsive

- Two-column translations stack at 768 px.
- Lab grid stacks at 980 px; the sidebar becomes a normal block.
- Nav title truncates; dots wrap or shrink.
- Video is full width with a 16:9 aspect ratio.
- Code preview scrolls horizontally on small screens; the page itself must not.
- Non-code lab cards stack the rubric above the results; long criteria wrap instead of truncating.
- Section-check options stack at 640 px; rationale text stays at body size, not tiny caption size.
- The short-answer textarea is full width at 640 px; the counter and reveal button stack above it.
- Micro-checks (order-the-steps, hotspots, match pairs) become vertical button lists at 640 px; no horizontal drag target.
