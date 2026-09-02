// =============================================================================
// Current Stanford guidance on AI and plagiarism detection tools.
//
// Separate and dated because two of these claims are institutional facts that
// can change without notice: whether Stanford supports a campus-wide tool, and
// what advance notice is required before using one. Once the record is stale
// those two are withheld — the durable position (do not rely solely on a
// detector) and the links to OCS and Teaching Commons stay.
//
// Deliberately absent: any vendor name, accuracy percentage, ranking, or
// purchasing recommendation. The validator rejects all of them, and it also
// rejects the two opposite overstatements — that every detector is always wrong,
// or that every flagged text is a false positive. The equity note cites
// peer-reviewed research and is qualified to the detectors that study evaluated.
// =============================================================================

export type AiDetectionGuidance = {
  id: string;
  displayTitle: string;
  verifiedOn: string;
  reviewBy: string;
  reviewCadence: string;
  currentStanfordPosition: string;
  advanceNoticeRule: string;
  campusSupportStatus: string;
  equityNote: string;
  sourceUrls: string[];
  staleBehavior: string;
  staleLabel: string;
  status: "published" | "draft";
};

export const aiDetectionGuidance: AiDetectionGuidance = {
  id: "stanford-ai-detection-guidance",
  displayTitle: "Current Stanford guidance on AI and plagiarism detection tools",
  verifiedOn: "2026-08-04",
  reviewBy: "2026-11-04",
  reviewCadence: "Quarterly and before any detector-specific reuse",
  currentStanfordPosition:
    "Do not rely solely on plagiarism or AI-detection tools to determine whether a student failed to comply with an AI-related course policy.",
  advanceNoticeRule:
    "Current OCS guidance recommends clear advance notice when instructors plan to use detection software to review submitted work.",
  campusSupportStatus:
    "Stanford currently does not support a single campus-wide plagiarism-detection tool for general use. Schools, departments, or programs considering a tool should consult OCS and appropriate unit leadership.",
  equityNote:
    "Published research has found that AI-text detectors may misclassify writing by non-native English writers. Treat stylistic and detector-based judgments with particular caution and preserve meaningful human review.",
  sourceUrls: [
    "https://teachingcommons.stanford.edu/news/guidance-technology-tools-academic-integrity",
    "https://communitystandards.stanford.edu/resources/faculty-tas",
    "https://www.sciencedirect.com/science/article/pii/S2666389923001307",
    "https://pubmed.ncbi.nlm.nih.gov/37521038/",
  ],
  staleBehavior:
    "Hide campus-support and advance-notice claims, show “Current detection guidance due for review,” and retain links to OCS and Teaching Commons.",
  staleLabel: "Current detection guidance due for review",
  status: "published",
};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function detectionGuidanceIsStale(today = todayIso()): boolean {
  return today > aiDetectionGuidance.reviewBy;
}

/**
 * The two institutional claims, or `null` once the record is overdue. The
 * durable position and the equity note are not gated: neither is a procedural
 * detail that expires.
 */
export function displayableInstitutionalClaims(
  today = todayIso(),
): { advanceNoticeRule: string; campusSupportStatus: string } | null {
  if (detectionGuidanceIsStale(today)) return null;
  return {
    advanceNoticeRule: aiDetectionGuidance.advanceNoticeRule,
    campusSupportStatus: aiDetectionGuidance.campusSupportStatus,
  };
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

/** Product names that must never appear: naming one reads as a recommendation. */
const VENDOR_NAMES = /\b(GPTZero|Turnitin|Copyleaks|Originality\.?ai|Winston ?AI|ZeroGPT|Crossplag|Sapling|iThenticate|Grammarly)\b/i;

export type DetectionValidation = { errors: string[]; warnings: string[] };

export function validateDetectionGuidance(
  today = todayIso(),
  { strict = false }: { strict?: boolean } = {},
): DetectionValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const raise = (m: string) => (strict ? errors : warnings).push(m);
  const g = aiDetectionGuidance;

  if (!g.id) errors.push("missing id");
  if (!g.displayTitle) errors.push("missing displayTitle");
  if (!g.reviewCadence) errors.push("missing reviewCadence");
  if (!g.staleLabel) errors.push("missing staleLabel");
  if (!g.staleBehavior) errors.push("missing staleBehavior");
  else if (!/OCS|Teaching Commons/i.test(g.staleBehavior)) {
    errors.push("staleBehavior must retain the links to OCS and Teaching Commons");
  }

  for (const [field, value] of Object.entries({ verifiedOn: g.verifiedOn, reviewBy: g.reviewBy })) {
    if (!isValidIsoDate(value)) errors.push(`${field} is not a valid ISO date`);
  }
  if (isValidIsoDate(g.verifiedOn) && isValidIsoDate(g.reviewBy) && g.reviewBy <= g.verifiedOn) {
    errors.push("reviewBy must fall after verifiedOn");
  }

  const fields = {
    currentStanfordPosition: g.currentStanfordPosition,
    advanceNoticeRule: g.advanceNoticeRule,
    campusSupportStatus: g.campusSupportStatus,
    equityNote: g.equityNote,
  };
  for (const [field, value] of Object.entries(fields)) {
    if (!value) errors.push(`missing ${field}`);
  }
  if (!g.sourceUrls.length) errors.push("missing sourceUrls");
  for (const url of g.sourceUrls) {
    if (!/^https:\/\//.test(url)) errors.push(`source "${url}" must be an https URL`);
  }

  const all = Object.values(fields).join(" ");

  // No product may be named, ranked, recommended, or priced.
  if (VENDOR_NAMES.test(all)) {
    errors.push(
      "detection guidance must not name a detector product — naming one reads as a recommendation",
    );
  }
  if (/\b(best|most accurate|recommended|we recommend|should purchase|license)\b/i.test(all)) {
    errors.push("detection guidance must not recommend or rank a detector");
  }
  if (/\b\d{1,3}(\.\d+)?%\s*(accura|precision|recall|false[- ]positive)/i.test(all)) {
    errors.push("detection guidance must not carry a vendor accuracy percentage");
  }
  // A detector result must never be described as dispositive, or as a
  // prerequisite to consulting OCS.
  if (/\bdetector\b[^.]*\b(prov(es|en)|dispositive|conclusive|establishes)\b/i.test(all)) {
    errors.push("detection guidance must not treat a detector result as dispositive");
  }
  if (/\b(required|must|obtain)\b[^.]*\bdetector\b[^.]*\bbefore\b[^.]*\bOCS\b/i.test(all)) {
    errors.push("detection guidance must not say a detector result is required before consulting OCS");
  }
  if (/\bprobability\b[^.]*\b(misconduct|cheating|violation)\b/i.test(all)) {
    errors.push("detection guidance must not assign a misconduct probability to student work");
  }

  // The durable position has to survive intact.
  if (!/\bsolely\b/i.test(g.currentStanfordPosition)) {
    errors.push('currentStanfordPosition must keep the "solely" qualifier');
  }
  if (!/notice/i.test(g.advanceNoticeRule)) errors.push("advanceNoticeRule must describe advance notice");
  if (!/campus-wide/i.test(g.campusSupportStatus)) {
    errors.push("campusSupportStatus must state the campus-wide position");
  }

  // The equity note is a real finding about specific evaluated detectors, and
  // overstating it in either direction is its own error.
  if (!/\bmay\b/i.test(g.equityNote)) {
    errors.push('equityNote must stay qualified ("may misclassify"), not absolute');
  }
  if (/\b(all|every) (detector|non-native)/i.test(g.equityNote)) {
    errors.push("equityNote must not generalize to every detector or every writer");
  }
  if (/\bevery flagged text is a false positive\b/i.test(all)) {
    errors.push("detection guidance must not claim every flagged text is a false positive");
  }
  if (/\bdetectors? (are|is) always wrong\b/i.test(all)) {
    errors.push("detection guidance must not claim detectors are always wrong");
  }
  if (/\bno (possible )?instructional use\b/i.test(all)) {
    errors.push("detection guidance must not claim detectors have no possible instructional use");
  }

  if (isValidIsoDate(g.reviewBy) && today > g.reviewBy) {
    const days = Math.round((Date.parse(today) - Date.parse(g.reviewBy)) / 86_400_000);
    raise(
      `the detection-guidance record is ${days} day(s) overdue for review (reviewBy ${g.reviewBy}, ` +
        `today ${today}). The campus-support and advance-notice claims are withheld from display ` +
        `until a maintainer re-reads ${g.sourceUrls[0]}.`,
    );
  }

  return { errors, warnings };
}

const validation = validateDetectionGuidance(undefined, {
  strict: process.env.SLS_STRICT_PROCESS === "1",
});
if (validation.errors.length) {
  throw new Error(`AI detection guidance is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[ai-detection-guidance] ${w}`);
}
