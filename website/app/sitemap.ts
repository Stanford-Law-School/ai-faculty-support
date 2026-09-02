import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { collections } from "./lib/collections";
import { getSkills } from "./lib/skills";
import { guideHref, publishedGuides } from "./lib/guides";
import { publishedTutorials, tutorialHref } from "./lib/tutorialLibrary";
// The route list is shared with the navigation record, which validates that every
// menu link resolves to one of these.
import { staticRoutes } from "./lib/siteNav";

// Routes are derived from the same data the pages render from, so a planned
// guide or an unreleased collection cannot leak into the sitemap: only records
// with a real route are listed.
//
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...publishedGuides().map((guide) => guideHref(guide.slug)),
    // Only published tutorials have a route; a recorded-but-unready one is not listed.
    ...publishedTutorials().map((tutorial) => tutorialHref(tutorial.slug)),
    ...collections.filter((c) => c.status === "available").map((c) => c.route),
    ...getSkills().map((skill) => `/skills/${skill.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}/`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
