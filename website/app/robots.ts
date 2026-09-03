import type { MetadataRoute } from "next";

// This site is for SLS faculty and staff behind Stanford SSO, so it asks not to
// be crawled at all. Paired with the `robots` block in app/layout.tsx, which
// puts noindex/nofollow on every page.
//
// **Neither of these is access control, and nothing private should depend on
// them.** They are requests, honored only by crawlers that choose to. What
// actually keeps this content private is the two layers in front of the app:
// Stanford SSO on ai-faculty.law.stanford.edu, and Amplify Hosting password
// access control on the origin's own *.amplifyapp.com address so it cannot be
// reached around the proxy. If either of those is misconfigured, a disallow line
// stops nothing — a crawler that ignores robots.txt, or anyone typing a URL, is
// through. Treat these as reducing accidental exposure in search results, not as
// a boundary.
//
// The Sitemap line that used to be here is deliberately gone. app/sitemap.ts is
// retained — it is generated from the same route records the navigation uses, so
// it stays an accurate inventory and the lint suite asserts it keeps reading that
// one list — but advertising it in a robots.txt that disallows everything is
// self-contradictory, and the sitemap is the single file that enumerates every
// route on the site. There is nothing to gain by pointing at it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
