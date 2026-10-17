# Labs and Checkers

A lab is a real learn-by-doing rep with a verifiable deliverable. For a **code lab**, it is the real project file with one core section replaced by a guided TODO; the learner edits it in their editor and runs a checker. For a **non-code lab** (writing, design, performance, experiment, research), it is a real work file or artifact checked against deterministic rules and a rubric; read `references/lab-kinds.md` first.

The course page never hosts the work. It shows a read-only starter or preview and reports results. Do not turn a non-code lab into an in-page text box; the learner writes, designs, plays, or records in their own tool.

## Why this shape

- The learner builds muscle memory in the real project, not a toy file.
- `git diff` shows exactly what they changed.
- The checker cannot be fooled by editing a copy in the page.
- The original code is backed up, so the project can always be restored.
- Each lab can be checked independently even when the other labs are still stubs.

## File layout

```text
project/
  <real source files>              # labs edit these
  course/
    index.html
    lab.mjs                        # start / restore / status
    check.mjs                      # CLI checker
    serve.mjs                      # optional page server + /check API
    lib/
      checker.mjs                  # build/test engine
    exercises/
      exercises.json               # lab metadata
      <lab>/solution/<file>        # reference solution
    .checker/
      skeletons/<lab>/<file>       # hidden TODO skeletons
      cases/<lab>.json             # authoritative test cases
      manifest.json                # checksums of cases + skeletons
      backups/<lab>/<file>         # original files, gitignored
```

Do not commit `backups/` or build artifacts.

For non-code labs, add a work tree and a rubric:

```text
project/
  course/
    exercises/<lab>/
      starter.md
      rubric.json           # criteria + deterministic checks + judge config
      exemplar.md           # strong reference
      weak.md               # calibration exemplar
    work/<lab>/
      submission.md         # learner writes here
```

## `exercises.json`

```json
{
  "course": "…",
  "repo": "…",
  "labs": [
    {
      "id": "01-example",
      "number": 1,
      "title": "Lab 1 — …",
      "kind": "code",
      "file": "src/example.c",
      "difficulty": "medium",
      "minutes": 20,
      "brokenBehavior": "What the learner sees when the skeleton is installed.",
      "mission": "One paragraph.",
      "concepts": ["…"],
      "todos": ["TODO 1 — …", "TODO 2 — …"],
      "hints": ["…", "…", "…"],
      "solutionFile": "solution/example.c"
    },
    {
      "id": "02-writing",
      "number": 2,
      "title": "Lab 2 — Explain the failure",
      "kind": "writing",
      "workFile": "course/work/02-writing/submission.md",
      "starter": "course/exercises/02-writing/starter.md",
      "rubric": "course/exercises/02-writing/rubric.json",
      "exemplar": "course/exercises/02-writing/exemplar.md",
      "weakExemplar": "course/exercises/02-writing/weak.md",
      "verification": ["deterministic", "rubric", "judge"],
      "mission": "One paragraph.",
      "concepts": ["…"],
      "todos": ["Write the cause", "Write the fix"],
      "hints": ["…", "…", "…"]
    }
  ]
}
```

Order the array in course order, even if the IDs are not sequential. `kind` is one of `code`, `writing`, `design`, `performance`, `experiment`, `research`, `ops`, or `drill`. Omit `kind` only for legacy code labs.

## `lab.mjs` commands

```bash
node course/lab.mjs start <lab-id|all> [--force]
node course/lab.mjs restore <lab-id|all>
node course/lab.mjs status
```

Rules for code labs:

- On the first `start`, back up the current repo file to `.checker/backups/<lab>/<file>`.
- If the file has edits and a backup exists, refuse to overwrite unless `--force`.
- `restore` copies the backup back; if there is no backup, fall back to `git checkout -- <file>`.
- `status` compares the current file to the skeleton, the backup, and the solution, and prints one of: `TODO skeleton`, `original`, `reference solution`, `edited`.
- Print a reminder that the repo files are intentionally modified.

Rules for non-code labs:

- `start` copies the starter to `workFile` if it does not exist. Never overwrite a draft.
- `restore` backs up the submission and resets `workFile` to the starter.
- `status` prints `not started`, `draft`, or `reference exemplar`; the checker result records whether the current draft was checked.
- `start all` and `restore all` handle both kinds.

Use `templates/lab.mjs` as the starting point. Adapt the imports to your checker module.

## Checker modes

For code labs, the checker always works on a **temp copy** of the current repo. For non-code labs, it reads the work file in place and never writes to it.

| Mode | Target | Other labs | Use |
|---|---|---|---|
| `repo` / `work` (default) | the learner’s current code/work file | reference solutions | what the learner runs |
| `skeleton` | hidden skeleton | hidden skeletons | `--self-test` (expect failure) |
| `solution` | reference solution | reference solutions | `--self-test` (expect pass) |
| `weak` / `strong` | weak/strong exemplar | rubric only | non-code `--self-test` |
| `manual` | the learner’s work | rubric printed | no judge configured |

In repo mode, overlaying solutions for the other code labs keeps the program/interpreter functional while the learner is working on one lab. Do not overlay a solution for the target lab.

## Checker flow

### Code labs

1. Verify the checksums of the authoritative cases and hidden skeletons. If either changed, refuse to run.
2. Copy the current repo to a temp directory, excluding `.git`, the course directory, build artifacts, and the project binary.
3. Apply the mode’s overlays.
4. Build with the project’s build command (make, cargo, npm, go build, etc.).
5. If the build fails, return the compiler log and stop.
6. Run each case in the built program; capture stdout, stderr, exit code, and time.
7. Return `{ ok, lab, phase, build, cases, passed, total, ms }`.

### Non-code labs

1. Verify the checksums of the rubric, starter, and exemplars.
2. Read the submission; fail clearly if it is missing, empty, or the wrong type.
3. Run deterministic checks (length, sections, links, schema, duration, render state).
4. If a judge is configured, send only the submission and rubric and get per-criterion verdicts with quoted evidence.
5. If no judge is configured, print the rubric and accept a `--manual` self-check or expert verdict.
6. Never modify the work file; never execute arbitrary shell from the page.
7. Return `{ ok, lab, phase, checks, criteria, passed, total, ms }`.

Serialize checks so two runs do not race in the same temp directory.

## Case format

```json
{
  "id": "01-example",
  "title": "Lab 1 — …",
  "file": "src/example.c",
  "cases": [
    {
      "name": "integer addition",
      "name_zh": "整數加法",
      "code": "print(1 + 2)",
      "expect": "3"
    },
    {
      "name": "compile error",
      "code": "print(",
      "expectError": true,
      "errorContains": "unexpected"
    },
    {
      "name": "integration: official suite",
      "script": "tests/all.lua",
      "expectContains": "OK",
      "timeout": 120000
    }
  ]
}
```

- `code`: program text passed to the built binary.
- `script`: path to a test file, run by the binary.
- `expect`: exact stdout after trimming.
- `expectContains`: substring expected in stdout.
- `expectError`: expect a non-zero exit.
- `errorContains`: optional substring in stdout+stderr for an error case.
- `timeout`: per-case timeout in ms.

`name_zh` is optional; include it only for a localized course.

## Rubric format for non-code labs

See `templates/lab-rubric.json` for the full shape. The essential parts:

```json
{
  "kind": "writing",
  "submission": "course/work/02-example/submission.md",
  "deterministic": [
    { "type": "sections", "require": ["Cause", "Fix"] },
    { "type": "wordCount", "min": 120, "max": 350 }
  ],
  "rubric": [
    { "id": "cause", "weight": 1, "criterion": "Names the actual cause.", "failExample": "Only says it sounds bad." }
  ],
  "exemplar": "…/exemplar.md",
  "weakExemplar": "…/weak.md",
  "judge": { "enabled": true, "model": "…", "temperature": 0, "promptVersion": "1" }
}
```

The check output adds `checks` (deterministic) and `criteria` (rubric/judge), each with a pass/fail verdict and, for a judge, a quoted evidence snippet.

## Test design

- **Force runtime behavior.** If the language constant-folds `1 + 2`, use variables in the test so the lab’s runtime path actually runs.
- **Test the boundary the lab is about.** Do not retest unrelated features.
- **Include an integration suite** from the project’s own tests when one exists. It catches interactions the small cases miss.
- **Include error cases.** Division by zero, malformed input, missing key, invalid type.
- **Include a case that fails if the learner only implements the happy path.** Example: mixed integer/float, string coercion, a metamethod fallback.
- **Keep each case small.** One behavior per case; the test name is the feedback.
- **Do not let the learner edit the tests.** Hash the cases and the skeletons in a manifest.

For non-code labs:

- Make the deterministic checks strict enough that a blank or keyword-stuffed submission fails.
- Write rubric criteria as observable claims, not vibes. “Names the cause” is testable; “is good” is not.
- Calibrate the judge with a weak and a strong exemplar, and re-run the same submission to check stability.
- Include a missing/empty/wrong-format submission case.
- If the objective is production, do not let a multiple-choice check be the only evidence.

## Hints

Three per lab, progressive:

1. Where to look / the smallest first move.
2. The shape of the implementation (helpers to reuse, the branch structure).
3. The subtle detail that usually causes the last failure.

Put the hints in the lab card as `<details>` elements. Do not put the full solution in the hints. The reference solution is a separate, clearly labelled reveal.

## Page integration

The course page should show:

- the broken or incomplete behavior,
- the mission and the deliverable (file type, length, format),
- the TODO/task list,
- the three hints,
- a **read-only** code preview or artifact starter,
- the file path and a copy-path button,
- the CLI command,
- a **Check my work** button (calls the server API),
- the rubric, and
- a reference-solution/exemplar reveal.

Do not include Save or Reset buttons that edit the work from the page. Use `lab.mjs start/restore` from the terminal.

## Self-test

`node course/check.mjs --self-test` must prove both directions:

- code: skeleton mode fails, solution mode passes;
- non-code: weak exemplar fails, strong exemplar passes, deterministic checks run, and the judge is stable (or the manual path is reported).

Run it after every checker, rubric, or case change. If it fails, fix the checker before touching the course page.

## Safety

- Never write to the repo or the learner’s submission from the checker.
- Back up before installing a skeleton or resetting a work file.
- Refuse to overwrite edited files or drafts without `--force`.
- Ask before the first paid judge or research API call; redact private data.
- Bind the optional server to `127.0.0.1` only.
- Give the server a JSON body size limit and validate paths.
- Do not execute arbitrary shell from the browser; only the fixed checker command.
