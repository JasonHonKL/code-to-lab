# Quality Gates

Do not deliver until every item passes. If a check fails, fix it before moving on.

## Brief and level

- [ ] The 6-question level test was run, or the learner declined and the Builder default was recorded.
- [ ] `COURSE_BRIEF.md` names the track, language, topic, goal, time budget, and target seat time.
- [ ] The track’s recommended seat time matches the learner’s budget, or the downgrade/core-path split is recorded.
- [ ] The course has 3–5 concepts and 2–3 labs, not a tour of every file.

## Course

- [ ] The first module starts with an observable behavior, not a definition.
- [ ] The default canvas is **white** (`#FFFFFF`), not warm paper, beige, off-white, or dark, unless the learner asked for a theme; the choice is recorded in `COURSE_BRIEF.md`.
- [ ] The module/lab count and depth match the track; a Deep Diver course has enough material for 90–150+ minutes and is not padded with repeated text.
- [ ] If the learner asked for “more difficult” or “more detailed,” the time budget and depth increased together.
- [ ] There is one end-to-end trace through the real system.
- [ ] Every conceptual screen leads with a visual; there are no text-only teaching screens.
- [ ] Every teaching section has at least one Mermaid diagram; every module has at least three and at least two diagram types.
- [ ] Every diagram has a one-sentence “what to notice” caption, a source fallback, and ≤12 nodes.
- [ ] Every module has at least one real code↔English translation.
- [ ] Technical terms have glossary tooltips on first use per module.
- [ ] Each lab is **inside** the module that teaches its core.
- [ ] Each section check and short-answer card is inside its section, before the lab, and not in a separate quiz module.
- [ ] There is no standalone “Labs” module and no standalone “Quiz” module.
- [ ] The lab kind matches the learning verb (code, writing, design, performance, experiment, research, or drill).
- [ ] The answer format matches the target performance (code, constructed response, artifact, performance, exam-style MC, or a hybrid).
- [ ] Multiple choice appears only for recognition/recall/discrimination, with per-option feedback; it is not the default and not the only evidence for a production skill.
- [ ] If the course is exam prep (CFA, licensing), MC matches the real item format and timing, includes rationales and per-topic reporting, and is paired with a show-your-work calculation and a written recommendation.
- [ ] Every teaching section has MC → short answer; a section that owns a lab adds the lab third, in that order.
- [ ] Each MC item has per-option rationales, retry, and is unscored/not gated; it includes at least one misconception item and one application item.
- [ ] The section has one short-answer prompt (2–4 sentences) with local autosave, a model answer, and a 3-item self-check; it is unscored and not gated.
- [ ] No lab starts before its MC and short answer, and no short answer appears before the MC.
- [ ] The MC + short answer do not replace the lab. Exam-fidelity MC belongs in the lab, not only in the check.
- [ ] Micro-check cadence holds: no more than two screens or about three minutes without an interaction; one recall opener per section after the first module.
- [ ] No check gates progress or contributes to the lab score.
- [ ] Architecture decision labs use an ADR/trade-off table with repo evidence; MC does not replace the decision.
- [ ] Service/business labs (including learning as a service) use a blueprint, pricing model, experiment plan, or customer synthesis—not generic prose or a definitions quiz.
- [ ] Code snippets are exact copies from the repo.
- [ ] No text walls: graph-first, 2–3 sentences per block; a text-only teaching screen is a defect.
- [ ] Mermaid uses the course palette (white by default, or the requested theme), not the default purple/blue theme.
- [ ] The page works offline except for web fonts; Mermaid, video, and poster are local.

## Labs

- [ ] Code labs: the real repo files contain the TODO skeletons. Non-code labs: a real work file or artifact exists and is scaffolded from a starter.
- [ ] `node course/lab.mjs status` reports the expected state for both kinds.
- [ ] The original files are backed up and `restore` works.
- [ ] The page preview/starter is read-only; there are no Save/Reset buttons that edit the learner’s work.
- [ ] Each lab has a mission, deliverable/task list, 3 progressive hints, and a reference solution or exemplar.
- [ ] Each lab has a copy-path button and the exact CLI command.
- [ ] Test cases, rubrics, and exemplars are checksummed and cannot be edited from the page.
- [ ] Code labs: at least one case forces the runtime path (not constant-folded).
- [ ] Code labs: at least one integration suite or equivalent broad test.
- [ ] Error cases are covered for code labs; non-code labs include a missing/empty/wrong-format submission case.
- [ ] The checker never writes to the repo or the submission.
- [ ] `node course/check.mjs --self-test` passes: skeleton/weak exemplar fails, solution/strong exemplar passes.
- [ ] `node course/check.mjs <lab-id>` fails on the current skeleton/draft and passes after the solution/strong exemplar is applied.
- [ ] The three labs can be checked independently because the checker overlays solutions for the other code labs.

### Non-code labs

- [ ] Deterministic checks run before the rubric or judge (format, length, required sections, links, duration, render state).
- [ ] The rubric has 3–6 observable criteria and a `--manual` fallback.
- [ ] If a judge is used: fixed model and prompt version, `temperature: 0`, quoted evidence, per-criterion verdicts, weak/strong calibration, and a repeat-run check.
- [ ] The judge is not used for something a deterministic check can prove.
- [ ] Private data is redacted, and no paid API runs without consent.
- [ ] Audio/video/design work is inspected by a tool or judge that can actually evaluate that medium, or it is marked for human review.
- [ ] The learner’s work is not uploaded or modified without consent.

## Video

- [ ] Duration is 60–90 s (or the agreed length).
- [ ] 16:9, 1920×1080, 30 fps.
- [ ] The camera is locked: no shake, wobble, drift, rotation, parallax, breathing zoom, or continuous pan.
- [ ] Static holds are stable: no text shimmer, edge crawl, or 1–2 px drift; `freezedetect` finds the intended holds and `vidstabdetect` shows identity transforms in them.
- [ ] The stream is constant frame rate 30 fps; no dropped or duplicated frames.
- [ ] The explainer was rendered frame-exact from a paused timeline, not screen-recorded.
- [ ] The video canvas is **white by default**; a warm paper or dark theme appears only if the learner asked for it.
- [ ] Narration uses **Supertonic 3** (default voice `M1`, or an auditioned alternative such as `F1`/`M2`), not Kokoro and not `hyperframes tts`.
- [ ] The Supertonic `--lang` matches the narration language; Chinese uses `edge-tts` because Supertonic 3 does not support Chinese.
- [ ] Supertonic clips are 44.1 kHz source; the mix is 48 kHz.
- [ ] Narration is intelligible and timed to the scenes; identifiers and numbers are pronounced correctly.
- [ ] Music is audible but does not compete with the voice.
- [ ] SFX are subtle and useful (typing, tokens, results), not constant.
- [ ] At least one scene shows real code/output/data from the project; every scene has a graph, real code, or real output.
- [ ] The poster is a real frame, not black.
- [ ] No black gap after the end card; the final frame is intentional.
- [ ] The transcript matches the narration and timestamps.
- [ ] `hyperframes check` (or the fallback equivalent) passes with no errors.
- [ ] If the course language is Chinese: the voice is `zh-TW-HsiaoChenNeural` (or the requested voice), CJK glyphs render (no missing-glyph boxes), captions/transcript are Chinese, and no English duplicate was produced unless requested.
- [ ] If a Cantonese variant was requested: the voice is `zh-HK-HiuMaanNeural` (or another zh-HK voice), the narration is colloquial Cantonese, the Cantonese MP4/VTT is separate from the Mandarin one, and the existing Mandarin video was not overwritten.
- [ ] If a slide deck or presentation version was requested: it was built with `frontend-slides`, reuses the course palette, and renders correctly at 16:9 and on mobile.

## Page verification

- [ ] Video `readyState >= 3` and duration matches.
- [ ] Every lab loads; the preview is read-only.
- [ ] Every section check loads, marks the chosen and correct options, shows a rationale for every option, and can retry.
- [ ] Section checks are unscored and do not gate progress.
- [ ] Every short-answer card loads, autosaves locally, shows a word count, reveals a model answer after an attempt or “I’m stuck,” and shows the 3-item self-check.
- [ ] Short answers are unscored, not sent to a server, and not part of the lab result.
- [ ] Micro-checks load and can be completed with the keyboard; no check gates progress.
- [ ] Every Mermaid diagram renders with content (not a blank SVG), has a caption, and does not overflow the page at 375 px.
- [ ] The page background is white unless a theme was requested; no warm-paper or beige canvas slipped in.
- [ ] No console errors.
- [ ] No duplicate IDs.
- [ ] No missing local asset references.
- [ ] No nested cards: one bordered surface per level; a panel does not contain another bordered panel.
- [ ] Row actions are inline text actions, not stacked bordered buttons; each surface has at most one primary button.
- [ ] Filters are a borderless toolbar above the list, not their own card.
- [ ] Table date, status, and action labels do not collide at 1024 px or 1440 px.
- [ ] Screenshots were captured at 1440×900 and 390×844 and inspected for clipped buttons, overlapping labels, and nested-card stacks.
- [ ] If the course is localized, the i18n coverage check passes and expanded strings do not clip buttons, tabs, or table cells.
- [ ] The nav dot count equals the teaching-section count.
- [ ] Mobile: no page-level horizontal overflow; labs stack; nav does not cover the first module.
- [ ] Body text and muted text meet 4.5:1 on their rendered backgrounds.
- [ ] Code foreground, comments, keywords, strings, numbers, and functions meet 7:1 on the code background.
- [ ] Command/terminal blocks meet 7:1, including the copy button and muted labels.
- [ ] If a named theme was requested, the rendered page uses that palette (not a lookalike) and the chosen pairs are recorded in `COURSE_BRIEF.md`.
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
- [ ] If `color-themes` was used: the palette came from its `themes/*.toml`, contrast was measured after rendering, and no failing token was left in place.
- [ ] If `video-use` was used on footage: the self-eval output was reviewed, captions/timing were checked, and the cut was watched end to end.
- [ ] If `deep-research` was used: the learner consented to the paid API run, the report’s citations were verified, and the output was used for domain context rather than pasted in as teaching copy.
- [ ] If `frontend-slides` was used: the deck is self-contained, visually consistent with the course, and was not substituted for the course page or the explainer.
- [ ] If `academic-research-skills` was used: every citation and source-backed claim was verified, and the non-commercial license was checked for the intended use.
- [ ] `COURSE_BRIEF.md` records which companions and verification rungs were used.
- [ ] If `mattpocock/skills` was used for grilling: the answers were merged into the brief and did not replace the level test.
- [ ] If `manim_skill` was used: the scenes were rendered and checked, and the mathematical functions are covered by tests.

## Updating an existing course

- Merge upstream changes; do not overwrite the course to “regenerate” it.
- Resolve conflicts in the source modules and styles, never by hand-editing built `index.html`, rendered frames, or a generated video.
- Preserve the localization layer. Re-run the i18n coverage check and inspect expanded strings in buttons, tabs, and table cells.
- Keep one design direction across the merge. If both sides changed a screen, keep the newer interaction model and port the other side’s copy and behavior into it.
- Re-run the full gate after the merge: `--self-test`, screenshots at 1440 and 390, the video stability check, and the page console check. A green pre-merge build is not evidence for the merged tree.

## Handoff

- [ ] `course/README.md` explains the course, track, target seat time, lab kinds, edit/check/restore commands, lab IDs, work-file paths, judge/manual verification, and video rebuild.
- [ ] The handoff records the Supertonic 3 voice and language, and notes the model’s OpenRAIL-M license.
- [ ] The final response names the course URL, the video path, the lab commands, and the restore command.
- [ ] The user is told that the repo files were intentionally modified and how to restore them.
- [ ] Any background servers or preview processes are either left running intentionally or stopped.
