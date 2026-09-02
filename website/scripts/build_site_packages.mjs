#!/usr/bin/env node
// Build downloadable Skill ZIPs directly from the repo and place them where the
// website can serve them. This replaces the old manual "zip it, upload to Google
// Drive, paste the link" step: the site now hosts each Skill package itself.
//
// How it decides what to publish:
//   releases/skills.json is the control. A skill is packaged only when its
//   `downloadUrl` points at a same-site path ("/downloads/<slug>.zip").
//   Anything left as "#coming-soon" (or an external URL) is skipped, so you stay
//   in charge of which Development skills are actually downloadable.
//
// Output: website/public/downloads/<slug>.zip (copied into the static export at
// build time). The archives are deterministic (fixed timestamps) so identical
// source produces an identical ZIP.
//
// Run automatically as the website "prebuild" step; also runnable by hand:
//   node scripts/build_site_packages.mjs

import { deflateRawSync } from "node:zlib";
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve, sep } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const skillsRoot = join(repoRoot, "skills");
const manifestPath = join(repoRoot, "releases", "skills.json");
const outDir = join(repoRoot, "website", "public", "downloads");
const localPrefix = "/downloads/";

const EXCLUDE_NAMES = new Set([".DS_Store"]);
const EXCLUDE_SUFFIXES = [".tmp", ".bak", ".swp", ".swo", "~", ".pyc"];

function excluded(relPath, name) {
  const parts = new Set(relPath.split(sep));
  if (parts.has("__MACOSX") || parts.has("__pycache__")) return true;
  if (EXCLUDE_NAMES.has(name)) return true;
  if (name.startsWith("._") || name.startsWith(".git")) return true;
  return EXCLUDE_SUFFIXES.some((suffix) => name.endsWith(suffix));
}

// Collect files under a skill directory, sorted for a stable archive order.
function collectFiles(baseDir) {
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      const rel = relative(baseDir, full);
      if (excluded(rel, entry.name)) continue;
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) found.push(rel);
    }
  };
  walk(baseDir);
  return found.sort((a, b) => a.localeCompare(b));
}

// --- Minimal, dependency-free deterministic ZIP writer -----------------------
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

const DOS_TIME = 0; // fixed timestamp -> 1980-01-01 00:00:00, deterministic
const DOS_DATE = 0x21;

function createZip(entries) {
  const localChunks = [];
  const central = [];
  let offset = 0;

  for (const { archivePath, data } of entries) {
    const nameBytes = Buffer.from(archivePath, "utf8");
    const compressed = deflateRawSync(data, { level: 9 });
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(8, 8); // method: deflate
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28); // extra length
    localChunks.push(local, nameBytes, compressed);

    const cdir = Buffer.alloc(46);
    cdir.writeUInt32LE(0x02014b50, 0);
    cdir.writeUInt16LE(20, 4); // version made by
    cdir.writeUInt16LE(20, 6); // version needed
    cdir.writeUInt16LE(0, 8); // flags
    cdir.writeUInt16LE(8, 10); // method
    cdir.writeUInt16LE(DOS_TIME, 12);
    cdir.writeUInt16LE(DOS_DATE, 14);
    cdir.writeUInt32LE(crc, 16);
    cdir.writeUInt32LE(compressed.length, 20);
    cdir.writeUInt32LE(data.length, 24);
    cdir.writeUInt16LE(nameBytes.length, 28);
    cdir.writeUInt16LE(0, 30); // extra length
    cdir.writeUInt16LE(0, 32); // comment length
    cdir.writeUInt16LE(0, 34); // disk number
    cdir.writeUInt16LE(0, 36); // internal attrs
    cdir.writeUInt32LE(0o644 << 16, 38); // external attrs (rw-r--r--)
    cdir.writeUInt32LE(offset, 42); // local header offset
    central.push(Buffer.concat([cdir, nameBytes]));

    offset += local.length + nameBytes.length + compressed.length;
  }

  const centralBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4); // disk number
  eocd.writeUInt16LE(0, 6); // central dir start disk
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16); // central dir offset
  eocd.writeUInt16LE(0, 20); // comment length

  return Buffer.concat([...localChunks, centralBuf, eocd]);
}
// -----------------------------------------------------------------------------

function main() {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  // Start from a clean output directory so removed/renamed skills don't linger.
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const published = [];
  const skipped = [];

  for (const skill of manifest) {
    const url = skill.downloadUrl ?? "";
    if (!url.startsWith(localPrefix)) {
      skipped.push(`${skill.slug} (downloadUrl="${url}")`);
      continue;
    }

    const expected = `${localPrefix}${skill.slug}.zip`;
    if (url !== expected) {
      throw new Error(
        `Skill "${skill.slug}" has downloadUrl "${url}" but a hosted package must be "${expected}".`
      );
    }

    const skillDir = join(skillsRoot, skill.slug);
    if (!existsSync(skillDir) || !statSync(skillDir).isDirectory()) {
      throw new Error(`Skill "${skill.slug}" is marked for download but skills/${skill.slug}/ does not exist.`);
    }

    const files = collectFiles(skillDir);
    if (files.length === 0) throw new Error(`Skill "${skill.slug}" has no packageable files.`);

    // Archive with a single top-level folder named after the slug, matching the
    // Skill install format for ChatGPT and Claude.
    const entries = files.map((rel) => ({
      archivePath: `${skill.slug}/${rel.split(sep).join("/")}`,
      data: readFileSync(join(skillDir, rel)),
    }));

    const zip = createZip(entries);
    writeFileSync(join(outDir, `${skill.slug}.zip`), zip);
    published.push(`${skill.slug}.zip (${files.length} files, ${zip.length} bytes)`);
  }

  console.log(`Packaged ${published.length} skill(s) into website/public/downloads/`);
  for (const line of published) console.log(`  + ${line}`);
  if (skipped.length) {
    console.log(`Skipped ${skipped.length} skill(s) not marked for hosted download:`);
    for (const line of skipped) console.log(`  - ${line}`);
  }
}

main();
