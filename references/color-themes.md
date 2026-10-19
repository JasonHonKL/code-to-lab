# Color Themes

A companion skill from [`archibate/dotfiles-opencode`](https://github.com/archibate/dotfiles-opencode/blob/main/skills/color-themes/SKILL.md). It ships a catalog of color palettes as TOML files and a short workflow for applying them to a frontend or a desktop configuration.

Use it when the learner names a theme, when the course page needs a palette, or when text/code contrast is in question. Do not invent a palette when a requested theme already exists.

## License and installation

The upstream repository declares **no license**. Do not vendor its files into this repository or copy its text into the skill. Install it by reference:

```bash
bash scripts/install-color-themes.sh
```

The script keeps a sparse checkout in the local cache, then links `color-themes` into `~/.claude/skills`, `~/.config/opencode/skills`, and `~/.agents/skills` (respecting the same environment overrides as `install-companions.sh`). If you already cloned the upstream repo, you can symlink `skills/color-themes` manually. Verify the upstream terms before redistributing anything.

## What is in the catalog

- 158 palettes under `themes/*.toml`, including Tokyo Night, Catppuccin (four variants), GitHub Light/Dark (including high-contrast and colorblind variants), Flexoki, Everforest, Dracula, Nord-like palettes, Alabaster, and many terminal themes.
- Each file uses Alacritty-style keys: `colors.primary.background`, `colors.primary.foreground`, `colors.normal.*`, `colors.bright.*`.
- The skill’s default is the **white canvas** defined in `references/design-system.md`. When the learner asks for a dark theme without naming one, Tokyo Night is a good default.

## When to use it

- The learner asks for a named theme (“make it Tokyo Night”, “use Catppuccin Latte”).
- The course page or code panels have low contrast or are hard to read.
- A design review flags code tokens, muted text, or command blocks.
- You need a coherent palette for diagrams, terminal blocks, and syntax highlighting.

Do **not** use it to replace the course’s design direction. A palette is a constraint, not a redesign. Keep the white canvas, typography hierarchy, and lab card structure.

## Contrast is the gate

A theme name is not proof of readability. Measure the pairs you actually use:

| Surface | Minimum | Target |
|---|---|---|
| Body text on page background | 4.5:1 (WCAG AA) | 7:1 |
| Muted text on page background | 4.5:1 | 6:1 |
| Code foreground on code background | 7:1 | 12:1 |
| Code comments on code background | 4.5:1 | 7:1 |
| Keywords/strings on code background | 4.5:1 | 7:1 |
| Command text on terminal background | 7:1 | 12:1 |

Use a small contrast function (WCAG relative luminance) rather than eyeballing. Record the chosen pairs in `COURSE_BRIEF.md` or the design notes. If a palette fails, pick a darker/lighter variant from the catalog rather than adding opacity.

## Recommended pairings for the white course

The course’s default canvas is white. Two high-contrast palettes from the catalog work well together:

- **Code panels:** `github_light_high_contrast.toml`
  - background `#ffffff`, foreground `#010409`
  - comments `#4b535d`, keywords `#a0111f`, strings `#024c1a`, numbers `#0349b4`, functions `#622cbc`
- **Command/terminal blocks:** `github_dark_high_contrast.toml`
  - background `#0a0c10`, foreground `#f0f3f6`
  - muted `#9ea7b3`

For a dark course page, use `github_dark_high_contrast` for both code and commands, or Tokyo Night with a foreground at `#c0caf5` and comments at `#7aa2f7` (do not use `#444b6a` for small comment text).

## Integration recipe

1. Read the requested `.toml` from the installed `themes/` folder.
2. Map the keys to CSS custom properties; do not hard-code the palette in dozens of rules.
3. Use one syntax mapping: background, foreground, comment, keyword, string, number, function, type, error.
4. Check the rendered page in a browser at the actual font sizes.
5. Verify contrast for body, muted, code foreground, comments, and each syntax token.
6. Keep the palette stable across the course page, diagrams, and command blocks.

Example mapping for the high-contrast light code panel:

```css
:root {
  --code-bg: #ffffff;
  --code-fg: #010409;
  --code-comment: #4b535d;
  --code-keyword: #a0111f;
  --code-string: #024c1a;
  --code-number: #0349b4;
  --code-function: #622cbc;
}
```

## Edge cases

- Theme not in the catalog: search the web for the palette, extract the hex values, and verify contrast. Do not fabricate a “close enough” palette.
- The learner asks for a theme that fails contrast: keep the theme’s identity but adjust the failing token, and say which token changed and why.
- A dark code block on a light page is fine, but the border/separation must be visible. A light code block on a light page needs a border and a clear label.
- Do not use color alone for pass/fail, syntax meaning, or lab status.
- Do not ship a theme without checking mobile and reduced-motion behavior.
