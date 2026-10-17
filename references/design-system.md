# Design System

The goal is a warm, distinctive developer notebook — not the default purple-gradient AI course.

## Canvas

- Warm off-white background `#FAF7F2`; alternate `#F5F0E8`.
- Dark ink `#2C2A28`; secondary `#6B6560`; muted `#9E9790`.
- One accent. Vermillion `#D94F30`, teal `#2A7B9B`, amber `#D4A843`, or forest `#2D8B55`. Never a purple gradient.
- Code ground `#1E1E2E`; code ink `#CDD6F4`.
- Borders `#E5DFD6`; surfaces white or `#FDF9F3`.
- Success `#2D8B55`; error `#C93B3B`; info `#2A7B9B`.

```css
:root {
  --color-bg: #FAF7F2;
  --color-bg-warm: #F5F0E8;
  --color-bg-code: #1E1E2E;
  --color-text: #2C2A28;
  --color-text-secondary: #6B6560;
  --color-text-muted: #9E9790;
  --color-border: #E5DFD6;
  --color-accent: #D94F30;
  --color-accent-hover: #C4432A;
  --color-accent-light: #FDEEE9;
  --color-success: #2D8B55;
  --color-error: #C93B3B;
  --color-info: #2A7B9B;
}
```

Use warm-tinted shadows (`rgba(44,42,40,…)`), never pure black.

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

## Layout

- Reading width 760–820 px; wide diagrams up to 1000–1100 px.
- Section padding 4–6 rem; generous whitespace.
- Alternate module backgrounds for rhythm.
- `scroll-snap-type: y proximity`, never `mandatory`.
- Modules `min-height: 100dvh` with a `100vh` fallback.
- Fixed nav 50 px, progress bar, one dot per teaching section.
- On mobile, stack two-column layouts and keep the fixed nav from covering the first module.

## Code

- Dark IDE-style panels; Catppuccin-inspired colors.
- Code must wrap; no horizontal scrollbar in teaching blocks.
- Choose naturally short snippets (5–10 lines). Never rewrite project code.
- Code↔English translation: two columns, real code left, line-by-line plain English right, accent border.
- For CLI commands, use a dark block with a muted `$`, a copy button, and a short comment.

## Diagrams

Mermaid theme:

```js
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#FDF9F3',
    primaryTextColor: '#2C2A28',
    primaryBorderColor: '#2A7B9B',
    lineColor: '#6B6560',
    secondaryColor: '#E4F2F7',
    tertiaryColor: '#FDEEE9',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '15px',
  },
});
```

- Bundle Mermaid locally. Do not depend on the CDN at runtime.
- Render diagrams with a fixed-size wrapper and `overflow-x: auto` for wide ones.
- Keep labels short; use `<br/>` for two-line labels (escape them in HTML if the source is inside a normal element; use `<script type="text/plain">` for raw Mermaid text).
- Do not reuse the default purple Mermaid theme.

## Equations

For math/physics, use an equation↔English translation block: the equation on the left, what each symbol means and why it is there on the right. Use LaTeX or MathJax for display; keep units and assumptions visible. Use one color consistently for the same quantity across the video, diagrams, and labs.

## Lab UI

- A white card inside the module, not a separate page.
- Header: lab number, difficulty, time, file.
- Broken behavior in one sentence.
- Sidebar: mission, TODOs, concepts, hints.
- Main: read-only code preview, copy path, jump to TODO, check button, results.
- Status line: line/column, file size, read-only state.
- Check results: pass/fail badge, score, per-case rows, build log on failure.
- Reference solution behind a `<details>` reveal.
- No Save/Reset buttons that edit the repo; use the CLI helper.

## Icons and decoration

- Avoid emoji unless the user asks. Use letters, simple geometric marks, or CSS shapes.
- One accent color is enough. Do not rainbow the UI.
- Use warm shadows and subtle dot-grid paper texture.

## Accessibility

- Text contrast at least WCAG AA: 4.5:1 for body, 3:1 for large text.
- Focus styles on inputs and buttons.
- Do not rely on color alone for pass/fail; include a check/cross and text.
- Keep code-readable font sizes; allow zoom.
- Tooltips must be reachable by keyboard/tap and appended to `body` so they are not clipped.

## Optional impeccable audit

If [`impeccable`](https://github.com/pbakaus/impeccable) is installed, use it as a second pass after the page is built:

```bash
npx impeccable detect course/ --json
```

or `/impeccable audit course` / `/impeccable critique course` / `/impeccable polish course`.

Use it to catch deterministic frontend defects (contrast, spacing, overflow, overused fonts, nested cards, purple gradients), not to replace the warm paper direction. A clean detector is evidence, not proof; inspect the rendered page across viewports. See `references/companion-skills.md`.

## Responsive

- Two-column translations stack at 768 px.
- Lab grid stacks at 980 px; the sidebar becomes a normal block.
- Nav title truncates; dots wrap or shrink.
- Video is full width with a 16:9 aspect ratio.
- Code preview scrolls horizontally on small screens; the page itself must not.
