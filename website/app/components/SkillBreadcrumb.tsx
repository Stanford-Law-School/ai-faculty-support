import Link from "next/link";
import { collections } from "../lib/collections";

// Server-rendered breadcrumb for individual skill pages: it links back to the full
// catalog and to the parent collection, so a detail page reached directly is not a
// dead end.
//
// The original reason given here was that the site was "headerless (for the Google
// Sites embed)". Neither half is true now — there is a header on every page, and
// nothing embeds the site — but the breadcrumb earns its place regardless: the bar
// links to /skills, not to the collection a particular skill belongs to.
export function SkillBreadcrumb({ slug }: { slug: string }) {
  const collection = collections.find((c) => c.slugs.includes(slug));
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <Link href="/skills">All skills</Link>
      {collection && (
        <>
          {" "}&middot; <Link href={collection.route}>{collection.name}</Link>
        </>
      )}
    </nav>
  );
}
