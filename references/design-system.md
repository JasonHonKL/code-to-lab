# Design System

The goal is a warm, distinctive developer notebook — not the default purple-gradient AI course.

## Canvas

- Warm off-white background `#FAF7F2`; alternate `#F5F0E8`.
- Dark ink `#2C2A28`; secondary `#5F5A54` (6.4:1); muted `#6B6560` (5.4:1). Do not use `#9E9790` for normal-size text; it is 2.7:1 on the canvas.
- One accent. Vermillion `#D94F30`, teal `#2A7B9B`, amber `#D4A843`, or forest `#2D8B55`. Never a purple gradient.
- Palette source: the `color-themes` companion (158 TOML palettes). The warm notebook palette below is the default; if the learner names a theme, map that theme's keys to these variables instead of inventing colors.
- Code ground: choose from `color-themes`. For a light paper course, **GitHub Light High Contrast** (`#FFFFFF` / `#010409`) for code panels and **GitHub Dark High Contrast** (`#0A0C10` / `#F0F3F6`) for terminal/command blocks. A dark code ground (`#1E1E2E` / `#CDD6F4`) is also valid on a dark page; do not use low-contrast gray comments.
- Borders `#E5DFD6`; surfaces white or `#FDF9F3`.
- Success `#2D8B55`; error `#C93B3B`; info `#2A7B9B`.

```css
:root {
  --color-bg: #FAF7F2;
  --color-bg-warm: #F5F0E8;
  --color-bg-code: #FFFFFF;
  --color-code-fg: #010409;
  --color-code-comment: #4B535D;
  --color-text: #2C2A28;
  --color-text-secondary: #5F5A54;
  --color-text-muted: #6B6560;
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

For Traditional Chinese, use PingFang TC, Noto Sans TC, or Source Han Sans for Chinese text. Never set a Latin-only mono font on Chinese labels, code comments, or captions; it produces missing-glyph boxes. Keep Menlo/Consolas for ASCII code only.

## Layout

- Reading width 760–820 px; wide diagrams up to 1000–1100 px.
- Section padding 4–6 rem; generous whitespace.
- Alternate module backgrounds for rhythm.
- `scroll-snap-type: y proximity`, never `mandatory`.
- Modules `min-height: 100dvh` with a `100vh` fallback.
- Fixed nav 50 px, progress bar, one dot per teaching section.
- On mobile, stack two-column layouts and keep the fixed nav from covering the first module.

## Code

- Use a palette from `color-themes`. For a light paper course: GitHub Light High Contrast for code (`#FFFFFF` background, `#010409` foreground, `#4B535D` comments, `#A0111F` keywords, `#024C1A` strings, `#0349B4` numbers, `#622CBC` functions) and GitHub Dark High Contrast for commands (`#0A0C10` / `#F0F3F6`). Dark IDE panels are fine on a dark page; Catppuccin-inspired colors are optional, not mandatory.
- Code foreground, comments, and each syntax token must reach **7:1** on the code background. A theme name is not proof; measure the rendered pairs.
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
- Use warm shadows and subtle dot-grid paper texture.

## Accessibility

- Text contrast at least WCAG AA: 4.5:1 for body, 3:1 for large text. Code tokens and command text should reach 7:1.
- Verify the actual foreground/background pairs after rendering, including muted text, code comments, keywords, strings, and disabled states. Use a WCAG relative-luminance function, not an eyedropper guess.
- Focus styles on inputs and buttons.
- Do not rely on color alone for pass/fail; include a check/cross and text.
- Keep code-readable font sizes; allow zoom.
- Tooltips must be reachable by keyboard/tap and appended to `body` so they are not clipped.

## Optional impeccable audit

If the `color-themes` companion is installed, read the requested palette from its `themes/` folder and map it to CSS variables. If `impeccable` is installed, use it as a second pass after the page is built:

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
- Non-code lab cards stack the rubric above the results; long criteria wrap instead of truncating.
