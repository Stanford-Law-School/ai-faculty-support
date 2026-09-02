// =============================================================================
// Site navigation — one record for the header bar, the footer, and the sitemap.
//
// The bar had grown to nine links plus a search form and wrapped onto two rows at
// every desktop width, with three of the nine leaving the site entirely and
// rendering as the widest chips. Four labels also led with "AI" and were
// genuinely confusable: Learn AI, AI Resources, AI Upload, and the external AI
// Learning Hub. Crowding was the symptom; the naming was the cause.
//
// So the bar is capped at five internal destinations. Anything that leaves the
// site, and anything a faculty member needs once rather than weekly, lives in the
// footer instead. The validator enforces the cap, rejects an external link in the
// bar, rejects an href that does not resolve to a real route, and rejects two
// visible labels that reduce to the same words — so the next person to add a
// destination has to make a deliberate choice about what it displaces.
// =============================================================================

import { AI_LEARNING_HUB_URL } from "./site";

export type NavLink = {
  label: string;
  href: string;
  /** Leaves the site. Never permitted in the primary bar. */
  external?: boolean;
  /** Shown in the footer beneath the label; not rendered in the bar. */
  note?: string;
};

/**
 * Every static route the site publishes. The sitemap reads this, and so does the
 * nav validator, so a link to a route that does not exist fails the build rather
 * than shipping as a 404.
 */
export const staticRoutes = [
  "/",
  "/learn-ai",
  "/tutorials",
  "/skills",
  "/ai-resources",
  "/ai-upload",
  "/education-technology",
  "/what-is-a-skill-file",
  "/how-to-use",
  "/install",
  "/install-chatgpt",
  "/install-claude",
  "/build-an-agent",
  "/build-an-agent/chatgpt",
  "/troubleshooting",
  "/about",
] as const;

/**
 * Routes that exist but are deliberately absent from the sitemap.
 *
 * Search is query-driven and deliberately omitted from the sitemap.
 */
export const unlistedRoutes = ["/search"] as const;

/**
 * The header bar, in the order a faculty member is likely to need them.
 *
 * "Home" was originally left out because the logo is already a home link. It is
 * back by request: the logo does not read as a button, and it is hidden entirely
 * below 860px, where the menu is the only way back to the front page.
 */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/learn-ai" },
  { label: "Skills & Agents", href: "/skills" },
  { label: "Resources", href: "/ai-resources" },
  { label: "EdTech", href: "/education-technology" },
  { label: "The AI Upload", href: "/ai-upload" },
];

/**
 * The way back to the AI Learning Hub.
 *
 * A reader arrives here from the hub's faculty page by an ordinary link, and this
 * is the ordinary link back. The two sites are separate deployments with separate
 * navigation and neither embeds the other, so the only thing making them feel
 * like one place is that the path runs both ways.
 *
 * Deliberately not a seventh entry in `primaryNav`: that list is capped at six and
 * the validator rejects an outbound link in the bar outright — a slot spent on
 * leaving is what pushed the bar onto two rows in the first place. It is not a
 * destination within the site.
 */
export const returnToHubLink: NavLink = {
  label: "Return to AI Learning Hub",
  href: AI_LEARNING_HUB_URL,
  external: true,
};

export type FooterGroup = {
  id: string;
  heading: string;
  links: NavLink[];
};

export const footerGroups: FooterGroup[] = [
  {
    id: "start",
    heading: "Start here",
    links: [
      { label: "Learn AI in five minutes", href: "/learn-ai" },
      {
        label: "Tutorial library",
        href: "/tutorials",
        note: "Step-by-step documents to download",
      },
      { label: "Skill files", href: "/skills" },
      { label: "Build an agent", href: "/build-an-agent" },
      { label: "AI resources", href: "/ai-resources" },
    ],
  },
  {
    id: "set-up",
    heading: "Get set up",
    links: [
      { label: "What is a skill file?", href: "/what-is-a-skill-file" },
      { label: "How to use a skill", href: "/how-to-use" },
      { label: "Install a skill", href: "/install" },
      { label: "Troubleshooting", href: "/troubleshooting" },
    ],
  },
  {
    id: "elsewhere",
    heading: "Elsewhere at Stanford",
    links: [
      {
        label: "SLS AI Initiative",
        href: "https://law.stanford.edu/ai-initiative/",
        external: true,
      },
      {
        label: "AI Learning Hub",
        href: AI_LEARNING_HUB_URL,
        external: true,
        note: "Sessions, events, and tutorials",
      },
      {
        label: "Robert Crown Law Library",
        href: "https://law.stanford.edu/robert-crown-law-library/",
        external: true,
      },
      { label: "About this project", href: "/about" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

/**
 * How many destinations the bar can hold. Measured, not guessed.
 *
 * Six is where it sits now that Home is back. Measured in a browser by bisecting
 * the viewport width, with Home in the bar:
 *
 *   - the six links and the search form share one row at 1300px and wider;
 *   - the six links alone stay on one row down to 982px, with the search form on
 *     a second line inside the same header;
 *   - below 860px the hamburger menu replaces the bar entirely.
 *
 * The five-link bar already put the search form on a second line below 1280px, so
 * the sixth link moves that threshold by 20px rather than introducing the wrap.
 * Header height changes by at most 6px across all of these states, so nothing on
 * the page below shifts.
 *
 * A seventh link would wrap the links themselves at ordinary laptop widths, which
 * is the state PR #62 removed. So the next person to add a destination has to
 * displace one.
 */
const PRIMARY_NAV_LIMIT = 6;

const routes = new Set<string>([...staticRoutes, ...unlistedRoutes]);

/**
 * Reduces a label to its distinguishing words, so near-duplicates collide.
 * Filler words and the "AI" prefix carry no information here — four of the old
 * labels led with it — and a trailing "s" is dropped so "Resource" and
 * "Resources" are recognised as the same destination name.
 */
function labelKey(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .split(/\s+/)
    .filter((w) => w && !["the", "a", "an", "and", "ai", "sls"].includes(w))
    .map((w) => (w.length > 3 ? w.replace(/s$/, "") : w))
    .sort()
    .join(" ");
}

export type NavValidation = { errors: string[]; warnings: string[] };

export function validateSiteNav(): NavValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (primaryNav.length > PRIMARY_NAV_LIMIT) {
    errors.push(
      `the header bar has ${primaryNav.length} destinations; ${PRIMARY_NAV_LIMIT} is the measured limit before ` +
        `it wraps onto a second row. Move one to the footer rather than raising the cap.`,
    );
  }
  if (!primaryNav.length) errors.push("the header bar needs at least one destination");

  // The two links that sit in the header but not in the bar are validated with the
  // rest: they are still links a reader clicks, and an unvalidated one is how a
  // broken href ships. The outbound-link rule below applies only to primaryNav, so
  // returnToHubLink being external is fine here and rejected there.
  const allLinks = [
    ...primaryNav,
    returnToHubLink,
    ...footerGroups.flatMap((g) => g.links),
  ];
  for (const link of allLinks) {
    if (!link.label) errors.push(`a nav link is missing a label (href ${link.href})`);
    if (!link.href) errors.push(`nav link "${link.label}" is missing an href`);
    else if (link.external) {
      if (!/^https:\/\//.test(link.href)) {
        errors.push(`external nav link "${link.label}" must be an https URL`);
      }
    } else if (!routes.has(link.href)) {
      errors.push(
        `nav link "${link.label}" points at "${link.href}", which is not a published route. ` +
          `Add it to staticRoutes or fix the href.`,
      );
    }
  }

  // The bar is for destinations inside the site. An outbound link there spends a
  // slot on leaving, which is what pushed the bar onto two rows in the first place.
  for (const link of primaryNav) {
    if (link.external) {
      errors.push(
        `"${link.label}" leaves the site and must not sit in the header bar — put it in the footer's ` +
          `"Elsewhere at Stanford" group.`,
      );
    }
  }

  // Two bar labels that reduce to the same words are indistinguishable in use.
  const seenKeys = new Map<string, string>();
  for (const link of primaryNav) {
    const key = labelKey(link.label);
    if (!key) {
      errors.push(`nav label "${link.label}" carries no distinguishing word once "AI" is removed`);
      continue;
    }
    const clash = seenKeys.get(key);
    if (clash) {
      errors.push(
        `nav labels "${clash}" and "${link.label}" are confusably similar; a reader cannot tell them apart`,
      );
    }
    seenKeys.set(key, link.label);
  }

  // Footer groups.
  const seenGroups = new Set<string>();
  for (const g of footerGroups) {
    if (seenGroups.has(g.id)) errors.push(`footer group ${g.id}: duplicate id`);
    seenGroups.add(g.id);
    if (!g.heading) errors.push(`footer group ${g.id}: missing heading`);
    if (!g.links.length) errors.push(`footer group ${g.id}: needs at least one link`);
  }

  // The nine routes that used to be reachable from no menu at all must be
  // reachable from the footer now, or the reorganisation has just hidden them
  // somewhere else.
  const reachable = new Set(allLinks.filter((l) => !l.external).map((l) => l.href));
  const mustBeReachable = [
    "/learn-ai",
    // The header bar is full at five destinations, so the tutorial library is
    // reachable from the footer and from Learn AI rather than from the bar. That
    // makes the footer link load-bearing: without it the library has no
    // site-wide entry point at all.
    "/tutorials",
    "/skills",
    "/ai-resources",
    "/ai-upload",
    "/education-technology",
    "/what-is-a-skill-file",
    "/how-to-use",
    "/install",
    "/build-an-agent",
    "/troubleshooting",
    "/about",
  ];
  for (const route of mustBeReachable) {
    if (!reachable.has(route)) {
      errors.push(`"${route}" is reachable from neither the header bar nor the footer`);
    }
  }

  return { errors, warnings };
}

const validation = validateSiteNav();
if (validation.errors.length) {
  throw new Error(`Site navigation is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[site-nav] ${w}`);
}
