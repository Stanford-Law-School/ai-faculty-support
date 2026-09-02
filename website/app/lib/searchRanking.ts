// =============================================================================
// Search ranking.
//
// Site search was a plain substring filter in document order, which is fine until
// two pages legitimately answer the same words in opposite spirits. The teaching
// guide and the concern checklist both match "student used AI" — the guide because
// it is about students using AI, the checklist because that is the phrase a
// worried faculty member types. Document order would decide, arbitrarily.
//
// So intent gets a weight. A query about assignments, teaching, or learning ranks
// the teaching guide first; a query about detectors, reporting, OCS, or penalty
// grading ranks the checklist first. Everything else is ordered by ordinary match
// quality: a title hit outranks a summary hit, which outranks a search-term hit.
//
// This is deliberately a small scoring function rather than a search library. It
// runs in the browser over a few dozen records, and its behaviour has to be
// explainable to the person maintaining the guide vocabulary.
// =============================================================================

/** Words that mean "I am designing an activity". */
const TEACHING_INTENT = [
  "assignment",
  "assignments",
  "teach",
  "teaching",
  "learn",
  "learning",
  "class",
  "classroom",
  "course",
  "syllabus",
  "rubric",
  "grade",
  "grading",
  "exercise",
  "activity",
  "activities",
  "brief",
  "seminar",
  "clinic",
  "student learning",
  "literacy",
  "curriculum",
  "pedagog",
  "design",
];

/** Words that mean "something may have gone wrong". */
const CONCERN_INTENT = [
  "detector",
  "detection",
  "detect",
  "cheat",
  "cheating",
  "misconduct",
  "report",
  "reporting",
  "ocs",
  "community standards",
  "honor code",
  "penalty",
  "penalise",
  "penalize",
  "violation",
  "suspect",
  "suspected",
  "suspicion",
  "plagiaris",
  "concern",
  "investigate",
  "investigation",
  "discipline",
];

export type RankableItem = {
  title: string;
  href: string;
  text: string;
  terms?: string;
  /**
   * Which intent this record serves. A record marked "teaching" is promoted for a
   * teaching query and demoted for a concern query, and vice versa — so the two
   * pages that share vocabulary separate cleanly instead of tying.
   */
  intent?: "teaching" | "concern";
};

const hasAny = (needle: string, words: string[]) => words.some((w) => needle.includes(w));

/** Which intent, if either, a query expresses. */
export function queryIntent(query: string): "teaching" | "concern" | null {
  const q = query.toLowerCase();
  const teaching = hasAny(q, TEACHING_INTENT);
  const concern = hasAny(q, CONCERN_INTENT);
  // A query carrying both signals is ambiguous, and an ambiguous query should not
  // be silently resolved toward enforcement.
  if (teaching && concern) return "teaching";
  if (teaching) return "teaching";
  if (concern) return "concern";
  return null;
}

/**
 * Higher is better. Zero means no match at all and the item is dropped.
 *
 * Field weights are coarse on purpose: an exact title match should always beat a
 * search-alias match, and the intent bonus should be able to reorder two records
 * that match equally well but serve opposite purposes.
 */
export function scoreItem(item: RankableItem, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const title = item.title.toLowerCase();
  const text = item.text.toLowerCase();
  const terms = (item.terms ?? "").toLowerCase();

  let score = 0;
  if (title === q) score += 200;
  else if (title.includes(q)) score += 120;
  if (text.includes(q)) score += 40;
  if (terms.includes(q)) score += 25;

  // Partial credit so a multi-word query still finds a record that carries most of
  // it, without letting a single common word outrank a phrase match.
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  if (words.length > 1) {
    const haystack = `${title} ${text} ${terms}`;
    const hits = words.filter((w) => haystack.includes(w)).length;
    if (hits === words.length) score += 30;
    else if (hits > words.length / 2) score += 10;
  }

  if (score === 0) return 0;

  const intent = queryIntent(q);
  if (intent && item.intent) {
    score += item.intent === intent ? 60 : -50;
  }
  return score;
}

/** Matching items, best first, with ties broken by the original order. */
export function rankItems<T extends RankableItem>(items: T[], query: string): T[] {
  return items
    .map((item, index) => ({ item, index, score: scoreItem(item, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.item);
}

// -----------------------------------------------------------------------------
// Validation
//
// The two intent lists must stay disjoint, or a query would score as both and the
// tie-break would be silent. Checked at import so the build fails rather than the
// ranking quietly degrading.
// -----------------------------------------------------------------------------

const overlap = TEACHING_INTENT.filter((w) => CONCERN_INTENT.includes(w));
if (overlap.length) {
  throw new Error(
    `Search intent vocabularies overlap on: ${overlap.join(", ")}. ` +
      `A word must signal teaching or concern, not both.`,
  );
}
