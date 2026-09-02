import { getSkills } from "./skills";
import { collections } from "./collections";

// Single derivation of the two numbers the site quotes in several places. Both
// come from the underlying data, so adding a skill file or a collection updates
// every page that mentions a count.

export function skillFileCount(): number {
  return getSkills().length;
}

export function collectionCount(): number {
  return collections.length;
}

/** The site's preferred phrasing: "38 skill files · 4 collections". */
export function countLabel(): string {
  return `${skillFileCount()} skill files · ${collectionCount()} collections`;
}
