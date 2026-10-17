# Vendored Companions

These are snapshots of the optional companion repositories used by the `top-down-course` skill. They are included so the skills are available offline and so the install script has a stable source.

They are **optional**. The course must work without them.

| Directory | Upstream | Snapshot | License | What is included |
|---|---|---|---|---|
| `mattpocock-skills/` | https://github.com/mattpocock/skills | `49dd158` | MIT | `skills/`, `scripts/`, glossary, scope, README |
| `manim_skill/` | https://github.com/adithya-s-k/manim_skill | `cef0450` | MIT | `skills/`, README |
| `video-use/` | https://github.com/browser-use/video-use | `43cfc56` | MIT | `SKILL.md`, `helpers/`, `skills/`, install notes, README |
| `impeccable/` | https://github.com/pbakaus/impeccable | `6af45ac` | Apache-2.0 | the built skill in `skill/`, README, NOTICE |
| `academic-research-skills/` | https://github.com/Imbad0202/academic-research-skills | `060cb3c` | CC BY-NC 4.0 | the five skills, `shared/`, `scripts/`, plugin metadata, README |

## Install

From the repo root:

```bash
bash scripts/install-companions.sh
```

The script links the single-skill companions into the agent skill directories it finds (`~/.claude/skills`, `~/.config/opencode/skills`, `~/.agents/skills`). It skips existing real directories and replaces existing symlinks. Use `--force` to replace real directories.

It installs:

- `video-use`
- every `engineering/*` and `productivity/*` skill from `mattpocock-skills`
- `manim-composer`, `manimce-best-practices`, `manimgl-best-practices`
- `impeccable`

The academic suite is multi-skill and uses a plugin manifest. The script prints the local marketplace command:

```text
/plugin marketplace add <repo>/vendor/academic-research-skills
/plugin install academic-research-skills
```

Use the upstream README for other agents and installation channels.

## Not vendored: deep-research and frontend-slides

These two companions are installed by reference instead of vendored, to keep the repo small and to follow their upstream install flow:

```bash
bash scripts/install-research-and-slides.sh
```

- `deep-research` ([sanjay3290/ai-skills](https://github.com/sanjay3290/ai-skills/tree/main/skills/deep-research), Apache-2.0) — Gemini Deep Research. Requires `GEMINI_API_KEY`; each run costs roughly $2–5 and takes 2–10 minutes. Ask before the first run and verify citations.
- `frontend-slides` ([zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides), MIT) — self-contained HTML presentations. No npm or build step.

The script keeps shallow checkouts in `~/.cache/code-to-lab` (override with `RESEARCH_SLIDES_CACHE`) and links both into the same agent skill directories.

## Not vendored: color-themes

`color-themes` ([archibate/dotfiles-opencode](https://github.com/archibate/dotfiles-opencode/blob/main/skills/color-themes/SKILL.md)) is an optional palette catalog. Its upstream repository declares no license, so it is **not** vendored here. Install it by reference instead:

```bash
bash scripts/install-color-themes.sh
```

The script keeps a sparse checkout in `~/.cache/code-to-lab/color-themes-src` and links it into the same agent skill directories. See `references/color-themes.md` for the contrast gate.

## Prerequisites

- **video-use:** `cd vendor/video-use && uv sync`, FFmpeg, and an ElevenLabs API key in `.env` for transcription. Review its README before uploading footage.
- **impeccable:** the skill’s launcher downloads the engine binary on first run; no separate install is required. You can also run `npx impeccable install`.
- **manim_skill:** Python 3.7+, FFmpeg, and LaTeX (MacTeX/TeX Live/MiKTeX). ManimCE is the safer default for a course; ManimGL is better for interactive/3D work.
- **academic-research-skills:** follow its plugin/agent installation; the vendored copy includes the suite, shared contracts, scripts, and plugin metadata.
- **mattpocock-skills:** no runtime; the skills are Markdown plus small helper scripts.
- **deep-research:** Python 3, its `requirements.txt`, and a `GEMINI_API_KEY` in `.env`; paid per run.
- **frontend-slides:** no runtime dependencies.

## Updates

These are snapshots, not submodules. To update one:

1. clone or fetch the upstream repo;
2. copy the same paths into the matching `vendor/` directory;
3. update the snapshot hash in this README;
4. run `git diff` and re-test the install script.

Do not edit vendored files in place unless you are intentionally maintaining a fork; keep local changes in the `top-down-course` skill or a separate patch.

## Licenses and attribution

Each vendored directory keeps its upstream `LICENSE` (and `NOTICE` where provided). The licenses apply to the vendored content, not to the rest of this repository.

- MIT: `mattpocock-skills`, `manim_skill`, `video-use`
- Apache-2.0: `impeccable`
- CC BY-NC 4.0: `academic-research-skills` — **non-commercial use only**; check before using its output in a paid product. Verify every citation.

The vendored snapshots exclude upstream tests, docs, examples, and large static assets to keep this repo small. Refer to the upstream repos for the complete projects and their history.
