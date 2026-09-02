// The canonical origin for this site, used for metadataBase (canonical + Open
// Graph URLs) and the generated sitemap. One constant so a custom domain is a
// single edit rather than a search across templates.
export const SITE_URL = "https://sls-faculty-ai-skills.vercel.app";

/** The Law Library's weekly AI news digest, hosted as a separate application. */
export const AI_UPLOAD_URL = "https://ai-upload-stanford-law.vercel.app/";

// The AI Learning Hub, open to the whole SLS community. Several pages point at
// it — the header's return link, the homepage cross-promotion, the AI Resources
// directory, and the faculty guide on responding to suspected student AI use — so
// the base and its sections live here once. A moved hub is one edit rather than a
// search across templates.
//
// This is the hub's own custom domain rather than the underlying
// sites.google.com address. Both resolve, but the custom domain is what the hub
// treats as canonical (its SITE_ORIGIN), it is the address that survives a move
// off Google Sites, and it is the one worth showing a reader.
//
// The hub is a separate repository and a separate deployment, reached by an
// ordinary link in both directions: the hub's faculty page links here, and
// `returnToHubLink` in app/lib/siteNav.ts links back. Neither site embeds the
// other, and nothing but these links joins them.
const AI_LEARNING_HUB = "https://ailearninghub.law.stanford.edu";

/** The hub's front door. */
export const AI_LEARNING_HUB_URL = `${AI_LEARNING_HUB}/`;
/** The student skills collection — the right referral for a student, not a faculty member. */
export const STUDENT_AI_LEARNING_HUB_URL = `${AI_LEARNING_HUB}/skills`;
/** The hub's events listing. */
export const AI_LEARNING_HUB_EVENTS_URL = `${AI_LEARNING_HUB}/events`;
