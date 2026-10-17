#!/usr/bin/env node
/*
 * Generic repo-mode lab helper.
 * Copy to <project>/course/lab.mjs and adjust nothing except the paths if needed.
 *
 *   node course/lab.mjs start <lab-id|all> [--force]
 *   node course/lab.mjs restore <lab-id|all>
 *   node course/lab.mjs status
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

const repoFile = (lab) => path.join(ROOT_DIR, lab.file);
const skeletonFile = (lab) => path.join(CHECKER_DIR, 'skeletons', lab.id, lab.file);
const solutionFile = (lab) => path.join(EXERCISES_DIR, lab.id, lab.solutionFile);
const backupFile = (lab) => path.join(CHECKER_DIR, 'backups', lab.id, lab.file);
const read = (file) => (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);

function ensureBackup(lab) {
  const backup = backupFile(lab);
  if (fs.existsSync(backup)) return backup;
  fs.mkdirSync(path.dirname(backup), { recursive: true });
  fs.copyFileSync(repoFile(lab), backup);
  console.log(`  backed up original ${lab.file} → ${path.relative(ROOT_DIR, backup)}`);
  return backup;
}

function start(lab) {
  const skeleton = read(skeletonFile(lab));
  if (skeleton == null) {
    console.log(`  ${lab.id}: missing hidden skeleton ${path.relative(ROOT_DIR, skeletonFile(lab))}`);
    return;
  }
  const backup = ensureBackup(lab);
  const current = read(repoFile(lab));
  if (current === skeleton) {
    console.log(`  ${lab.id}: already the TODO skeleton`);
    return;
  }
  if (current !== read(backup) && !force) {
    console.log(`  ${lab.id}: ${lab.file} has edits; refusing to overwrite.`);
    console.log('  Use --force to reinstall the skeleton, or restore first.');
    return;
  }
  fs.mkdirSync(path.dirname(repoFile(lab)), { recursive: true });
  fs.writeFileSync(repoFile(lab), skeleton);
  console.log(`  ${lab.id}: installed TODO skeleton into ${lab.file}`);
}

function restore(lab) {
  const backup = backupFile(lab);
  if (fs.existsSync(backup)) {
    fs.copyFileSync(backup, repoFile(lab));
    console.log(`  ${lab.id}: restored ${lab.file} from backup`);
    return;
  }
  const res = spawnSync('git', ['checkout', '--', lab.file], { cwd: ROOT_DIR, encoding: 'utf8' });
  if (res.status === 0) console.log(`  ${lab.id}: restored ${lab.file} from git`);
  else console.log(`  ${lab.id}: no backup and git checkout failed: ${(res.stderr || '').trim()}`);
}

function status(lab) {
  const current = read(repoFile(lab));
  const skeleton = read(skeletonFile(lab));
  const backup = read(backupFile(lab));
  const solution = read(solutionFile(lab));
  let state = 'edited';
  if (current === skeleton) state = 'TODO skeleton';
  else if (current === backup) state = 'original';
  else if (current === solution) state = 'reference solution';
  console.log(`  ${lab.id.padEnd(22)} ${lab.file.padEnd(24)} ${state}`);
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
  console.log('');
  process.exit(0);
}

const labs = labsFor(target);
console.log(`\n${command === 'start' ? 'Installing' : 'Restoring'} ${labs.length} lab file(s):`);
for (const lab of labs) {
  if (command === 'start') start(lab);
  else restore(lab);
}
console.log('');
