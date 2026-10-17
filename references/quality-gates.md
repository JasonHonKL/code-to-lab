# Quality Gates

Do not deliver until every item passes. If a check fails, fix it before moving on.

## Brief and level

- [ ] The 6-question level test was run, or the learner declined and the Builder default was recorded.
- [ ] `COURSE_BRIEF.md` names the track, language, topic, goal, and length.
- [ ] The course has 3–5 concepts and 2–3 labs, not a tour of every file.

## Course

- [ ] The first module starts with an observable behavior, not a definition.
- [ ] There is one end-to-end trace through the real system.
- [ ] Every module has at least one diagram or interactive visual.
- [ ] Every module has at least one real code↔English translation.
- [ ] Technical terms have glossary tooltips on first use per module.
- [ ] Each lab is **inside** the module that teaches its core.
- [ ] There is no standalone “Labs” module.
- [ ] No multiple-choice questions in the course body.
- [ ] Code snippets are exact copies from the repo.
- [ ] No text walls: 2–3 sentences per block, at least 50% visual per screen.
- [ ] Mermaid uses the course palette, not the default theme.
- [ ] The page works offline except for web fonts; Mermaid, video, and poster are local.

## Labs

- [ ] The real repo files contain the TODO skeletons.
- [ ] `node course/lab.mjs status` reports the expected state.
- [ ] The original files are backed up and `restore` works.
- [ ] The page code preview is read-only; there are no Save/Reset buttons that edit the repo.
- [ ] Each lab has a mission, TODO list, 3 progressive hints, and a reference solution.
- [ ] Each lab has a copy-path button and the exact CLI command.
- [ ] Test cases are checksummed and cannot be edited from the page.
- [ ] At least one case forces the runtime path (not constant-folded).
- [ ] Each lab has at least one integration suite or an equivalent broad test.
- [ ] Error cases are covered.
- [ ] The checker never writes to the repo.
- [ ] `node course/check.mjs --self-test` passes: skeleton fails, solution passes.
- [ ] `node course/check.mjs <lab-id>` fails on the current skeleton and passes after the solution is applied.
- [ ] The three labs can be checked independently because the checker overlays solutions for the other labs.

## Video

- [ ] Duration is 60–90 s (or the agreed length).
- [ ] 16:9, 1920×1080, 30 fps.
- [ ] Narration is intelligible and timed to the scenes.
- [ ] Music is audible but does not compete with the voice.
- [ ] SFX are subtle and useful (typing, tokens, results), not constant.
- [ ] At least one scene shows real code/output/data from the project.
- [ ] The poster is a real frame, not black.
- [ ] No black gap after the end card; the final frame is intentional.
- [ ] The transcript matches the narration and timestamps.
- [ ] `hyperframes check` (or the fallback equivalent) passes with no errors.

## Page verification

- [ ] Video `readyState >= 3` and duration matches.
- [ ] Every lab loads; the preview is read-only.
- [ ] Every Mermaid diagram renders with content (not a blank SVG).
- [ ] No console errors.
- [ ] No duplicate IDs.
- [ ] No missing local asset references.
- [ ] The nav dot count equals the teaching-section count.
- [ ] Mobile: no page-level horizontal overflow; labs stack; nav does not cover the first module.
- [ ] The check button returns per-case results and the build log on failure.

## Newcomer and math/physics checks

- [ ] Newcomer: the first screen is “What is this?”, not a definition.
- [ ] Newcomer: every technical term has a tooltip and a plain-language definition.
- [ ] Newcomer: the first lab is guided (one small TODO), not a blank file.
- [ ] Math/physics: every equation has a plain-language translation.
- [ ] Math/physics: units, assumptions, and limiting cases are visible.
- [ ] Math/physics: the lab checker uses numeric tolerance or symbolic equivalence, not string matching.
- [ ] Math/physics: a known analytic/limiting case is tested.
- [ ] Manim: no missing LaTeX glyphs, clipped labels, or black frames; voice and animation are aligned.
- [ ] The selected direction (top-down / bottom-up) is recorded in `COURSE_BRIEF.md`.

## Optional companion checks

- [ ] If `impeccable` was used: `npx impeccable detect course/ --json` was run and primary findings were reviewed; the course’s own design direction was preserved.
- [ ] If `video-use` was used on footage: the self-eval output was reviewed, captions/timing were checked, and the cut was watched end to end.
- [ ] If `academic-research-skills` was used: every citation and source-backed claim was verified, and the non-commercial license was checked for the intended use.
- [ ] `COURSE_BRIEF.md` records which companions were used.
- [ ] If `mattpocock/skills` was used for grilling: the answers were merged into the brief and did not replace the level test.
- [ ] If `manim_skill` was used: the scenes were rendered and checked, and the mathematical functions are covered by tests.

## Handoff

- [ ] `course/README.md` explains the course, track, edit/check/restore commands, lab IDs, and video rebuild.
- [ ] The final response names the course URL, the video path, the lab commands, and the restore command.
- [ ] The user is told that the repo files were intentionally modified and how to restore them.
- [ ] Any background servers or preview processes are either left running intentionally or stopped.
