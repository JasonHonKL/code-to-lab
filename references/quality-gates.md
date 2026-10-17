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

## Handoff

- [ ] `course/README.md` explains the course, track, edit/check/restore commands, lab IDs, and video rebuild.
- [ ] The final response names the course URL, the video path, the lab commands, and the restore command.
- [ ] The user is told that the repo files were intentionally modified and how to restore them.
- [ ] Any background servers or preview processes are either left running intentionally or stopped.
