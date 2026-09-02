#!/usr/bin/env node
// Writes website/public/build.txt so the deployed site can be asked which commit
// it was built from. Run from the website workspace as part of `prebuild`.
//
// Why this exists: the site is a static export behind a CDN alias. When a
// deployment fails — Vercel rejects vercel.json before running the build, for
// example — the alias keeps serving the previous successful build and nothing on
// the page says so. A published change then looks reverted rather than
// undeployed. Opening /build.txt settles it in one request.

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const publicDir = join(process.cwd(), "public");
const outFile = join(publicDir, "build.txt");

function localCommit() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: dirname(process.cwd()),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

const commit =
  process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || localCommit();
const ref = process.env.VERCEL_GIT_COMMIT_REF || "";
const env = process.env.VERCEL_ENV || "local";
const builtAt = new Date().toISOString();

const lines = [
  `commit: ${commit ? commit.slice(0, 7) : "unknown"}`,
  `full-commit: ${commit || "unknown"}`,
  `branch: ${ref || "unknown"}`,
  `environment: ${env}`,
  `built: ${builtAt}`,
  "",
  "This file is generated at build time. If the commit here is not the one you",
  "expect, the deployment that should have published it did not run or did not",
  "succeed, and the alias is still serving an earlier build.",
  "",
];

mkdirSync(publicDir, { recursive: true });
writeFileSync(outFile, lines.join("\n"));
console.log(`Wrote build stamp: ${lines[0]}, ${lines[3]}, ${lines[4]}`);
