#!/usr/bin/env node
/*
 * Generic lab helper for code and non-code labs.
 * Copy to <project>/course/lab.mjs and adjust nothing except the paths if needed.
 *
 *   node course/lab.mjs start <lab-id|all> [--force]
 *   node course/lab.mjs restore <lab-id|all>
 *   node course/lab.mjs status
 *
 * Code labs use `file` + a hidden skeleton. Non-code labs use `workFile` +
 * `starter` and may also define `exemplar` for status reporting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const COURSE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(COURSE_DIR, '..');
const EXERCISES_DIR = path.join(COURSE_DIR, 'exercises');
const CHECKER_DIR = path.join(COURSE_DIR, '.checker');

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];
const force = args.includes('--force');

function meta() {
  return JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'exercises.json'), 'utf8'));
}

function labsFor(value) {
  const all = meta().labs;
  if (!value || value === 'all') return all;
  const lab = all.find((l) => l.id === value);
  if (!lab) {
    console.error(`Unknown lab: ${value}`);
    process.exit(2);
  }
  return [lab];
}

const isCode = (lab) => !lab.kind || lab.kind === 'code';
const targetPath = (lab) => path.join(ROOT_DIR, isCode(lab) ? lab.file : lab.workFile);
const starterFile = (lab) => (lab.starter ? path.join(ROOT_DIR, lab.starter) : null);
const skeletonFile = (lab) => path.join(CHECKER_DIR, 'skeletons', lab.id, lab.file);
const solutionFile = (lab) => (lab.solutionFile ? path.join(EXERCISES_DIR, lab.id, lab.solutionFile) : null);
const exemplarFile = (lab) => (lab.exemplar ? path.join(ROOT_DIR, lab.exemplar) : null);
const backupFile = (lab) => path.join(CHECKER_DIR, 'backups', lab.id, path.basename(targetPath(lab)));
const read = (file) => (file && fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

function ensureBackup(lab) {
  const backup = backupFile(lab);
  if (fs.existsSync(backup)) return backup;
  const current = targetPath(lab);
  if (!fs.existsSync(current)) return null;
  fs.mkdirSync(path.dirname(backup), { recursive: true });
  fs.copyFileSync(current, backup);
  console.log(`  backed up original ${path.relative(ROOT_DIR, current)} → ${path.relative(ROOT_DIR, backup)}`);
  return backup;
}

function startCode(lab) {
  const skeleton = read(skeletonFile(lab));
  if (skeleton == null) {
    console.log(`  ${lab.id}: missing hidden skeleton ${path.relative(ROOT_DIR, skeletonFile(lab))}`);
    return;
  }
  const backup = ensureBackup(lab);
  const current = read(targetPath(lab));
  if (current === skeleton) {
    console.log(`  ${lab.id}: already the TODO skeleton`);
    return;
  }
  if (backup && current !== read(backup) && !force) {
    console.log(`  ${lab.id}: ${lab.file} has edits; refusing to overwrite.`);
    console.log('  Use --force to reinstall the skeleton, or restore first.');
    return;
  }
  write(targetPath(lab), skeleton);
  console.log(`  ${lab.id}: installed TODO skeleton into ${lab.file}`);
}

function startWork(lab) {
  const starter = read(starterFile(lab));
  if (starter == null) {
    console.log(`  ${lab.id}: missing starter ${lab.starter}`);
    return;
  }
  const work = targetPath(lab);
  if (fs.existsSync(work)) {
    console.log(`  ${lab.id}: ${lab.workFile} already exists; leaving the draft alone.`);
    console.log('  Use restore first if you want a fresh starter.');
    return;
  }
  write(work, starter);
  console.log(`  ${lab.id}: created ${lab.workFile} from the starter`);
}

function start(lab) {
  return isCode(lab) ? startCode(lab) : startWork(lab);
}

function restoreCode(lab) {
  const backup = backupFile(lab);
  if (fs.existsSync(backup)) {
    fs.copyFileSync(backup, targetPath(lab));
    console.log(`  ${lab.id}: restored ${lab.file} from backup`);
    return;
  }
  const res = spawnSync('git', ['checkout', '--', lab.file], { cwd: ROOT_DIR, encoding: 'utf8' });
  if (res.status === 0) console.log(`  ${lab.id}: restored ${lab.file} from git`);
  else console.log(`  ${lab.id}: no backup and git checkout failed: ${(res.stderr || '').trim()}`);
}

function restoreWork(lab) {
  const work = targetPath(lab);
  const backup = ensureBackup(lab);
  const starter = read(starterFile(lab));
  if (starter == null) {
    console.log(`  ${lab.id}: missing starter ${lab.starter}`);
    return;
  }
  if (backup) console.log(`  ${lab.id}: saved the current draft to ${path.relative(ROOT_DIR, backup)}`);
  write(work, starter);
  console.log(`  ${lab.id}: reset ${lab.workFile} to the starter`);
}

function restore(lab) {
  return isCode(lab) ? restoreCode(lab) : restoreWork(lab);
}

function statusCode(lab) {
  const current = read(targetPath(lab));
  const skeleton = read(skeletonFile(lab));
  const backup = read(backupFile(lab));
  const solution = read(solutionFile(lab));
  let state = 'edited';
  if (current === skeleton) state = 'TODO skeleton';
  else if (current === backup) state = 'original';
  else if (current === solution) state = 'reference solution';
  return state;
}

function statusWork(lab) {
  const current = read(targetPath(lab));
  const starter = read(starterFile(lab));
  const exemplar = read(exemplarFile(lab));
  if (current == null || current === starter) return 'not started';
  if (exemplar != null && current === exemplar) return 'reference exemplar';
  return 'draft';
}

function status(lab) {
  const file = isCode(lab) ? lab.file : lab.workFile;
  const state = isCode(lab) ? statusCode(lab) : statusWork(lab);
  console.log(`  ${lab.id.padEnd(22)} ${file.padEnd(40)} ${state}`);
}

if (!command || !['start', 'restore', 'status'].includes(command)) {
  console.log(`
Usage:
  node course/lab.mjs start <lab-id|all> [--force]
  node course/lab.mjs restore <lab-id|all>
  node course/lab.mjs status
`);
  process.exit(command ? 2 : 0);
}

if (command === 'status') {
  console.log('\nLab files in the repo:');
  for (const lab of meta().labs) status(lab);
  console.log('\nRepo files and work files are intentionally modified. Use restore to undo.');
  console.log('');
  process.exit(0);
}

const labs = labsFor(target);
console.log(`\n${command === 'start' ? 'Installing' : 'Restoring'} ${labs.length} lab(s):`);
for (const lab of labs) {
  if (command === 'start') start(lab);
  else restore(lab);
}
console.log('\nRun `node course/lab.mjs status` to see the state. Repo/work files are intentionally modified.\n');
