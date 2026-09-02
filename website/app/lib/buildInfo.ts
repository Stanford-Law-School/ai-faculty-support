// =============================================================================
// Build provenance.
//
// The site is a static export, so every page is frozen at build time. When a
// deployment fails — Vercel rejects vercel.json before it ever runs the build,
// for instance — the hosting alias keeps serving the last successful build, with
// no error page to signal it. The published HTML then looks like a reverted
// change rather than an undeployed one.
//
// These values are stamped into every page's <head> and into /build.txt so the
// question "which commit is actually live?" is answerable by looking at the
// site instead of inferring it from the dashboard.
// =============================================================================

/** Set by Vercel for every build; empty in a local `next build`. */
const rawCommit =
  process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? "";

/** Short commit for the deployed build, or "local" outside a hosted build. */
export const BUILD_COMMIT = rawCommit ? rawCommit.slice(0, 7) : "local";

/** Branch the build came from, when the host reports it. */
export const BUILD_REF = process.env.VERCEL_GIT_COMMIT_REF ?? "";

/**
 * Build timestamp, to the minute. Seconds are dropped so a rebuild of the same
 * commit is still distinguishable without adding noise to every page.
 */
export const BUILD_TIME = new Date().toISOString().slice(0, 16) + "Z";

/** One line, in the form used by both the meta tag and /build.txt. */
export function buildStamp(): string {
  return BUILD_REF
    ? `${BUILD_COMMIT} ${BUILD_REF} ${BUILD_TIME}`
    : `${BUILD_COMMIT} ${BUILD_TIME}`;
}
