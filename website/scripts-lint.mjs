import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const required = ["app/layout.tsx", "app/page.tsx", "app/lib/skills.ts", "../releases/skills.json"];
const missing = required.filter((file) => !existsSync(join(process.cwd(), file)));
if (missing.length) {
  console.error(`Missing required website files: ${missing.join(", ")}`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(join(process.cwd(), "../releases/skills.json"), "utf8"));
if (!Array.isArray(manifest) || !manifest[0]?.downloadUrl) {
  console.error("Release manifest must include downloadable skill metadata.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Stanford AI service snapshot: maintenance checks.
//
// Structural validation (unknown status, empty risk column, missing source or
// date, a legal-AI row published without a source and owner) lives in
// app/lib/stanfordAiServices.ts and throws at import, so `npm run build` fails
// on bad data. This script cannot import TypeScript, so it covers the two
// checks that are cheap to make against the source text and most useful to a
// maintainer running `npm run lint`: is the snapshot overdue for review, and has
// a Law Library-licensed service been marked published?
// ---------------------------------------------------------------------------
const snapshotPath = join(process.cwd(), "app/lib/stanfordAiServices.ts");
if (!existsSync(snapshotPath)) {
  console.error("Missing the Stanford AI service snapshot: app/lib/stanfordAiServices.ts");
  process.exit(1);
}
const snapshot = readFileSync(snapshotPath, "utf8");

const field = (name) => snapshot.match(new RegExp(`${name}:\\s*"(\\d{4}-\\d{2}-\\d{2})"`))?.[1];
const verifiedOn = field("verifiedOn");
const reviewBy = field("reviewBy");

if (!verifiedOn || !reviewBy) {
  console.error("Service snapshot must declare verifiedOn and reviewBy as ISO dates.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
if (today > reviewBy) {
  const days = Math.round((Date.parse(today) - Date.parse(reviewBy)) / 86_400_000);
  console.warn(
    `WARNING: the Stanford AI service snapshot is ${days} day(s) overdue for review ` +
      `(reviewBy ${reviewBy}, today ${today}).\n` +
      `         Re-verify against https://uit.stanford.edu/ai/services/explore, then update ` +
      `verifiedOn and reviewBy in app/lib/stanfordAiServices.ts.`,
  );
} else {
  console.log(`Service snapshot verified ${verifiedOn}; next review due ${reviewBy}.`);
}

// A library licence is not an approval. These rows stay unpublished until RCLL
// supplies a service-specific classification, source, and owner.
const legalAiIds = ["rcll-harvey", "rcll-legora", "rcll-lextext", "rcll-cicero"];
for (const id of legalAiIds) {
  const record = snapshot.slice(snapshot.indexOf(`id: "${id}"`));
  const status = record.match(/status:\s*"(published|draft)"/)?.[1];
  const hasSource = /sourceUrls:\s*\[\s*"https/.test(record.slice(0, 1200));
  if (status === "published" && !hasSource) {
    console.error(
      `Legal-AI service "${id}" is marked published without a source URL. ` +
        `Library access does not establish an approval level.`,
    );
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// AI tool registry: maintenance checks.
//
// Referential integrity (a mode citing a missing tool, a tool citing a missing
// mode, a Stanford service without a snapshot reference, a licensed platform
// asserting a Stanford risk level) is validated in app/lib/aiTools.ts and throws
// at import, so `npm run build` fails. This script covers what a maintainer most
// wants from `npm run lint`: which records are overdue, and whether any of the
// three confusable service pairs has been collapsed.
// ---------------------------------------------------------------------------
const registryPath = join(process.cwd(), "app/lib/aiTools.ts");
if (!existsSync(registryPath)) {
  console.error("Missing the canonical AI tool registry: app/lib/aiTools.ts");
  process.exit(1);
}
const registry = readFileSync(registryPath, "utf8");

// Each record's id and reviewBy, in source order.
const records = [...registry.matchAll(/id:\s*"([a-z0-9-]+)",[\s\S]*?reviewBy:\s*"(\d{4}-\d{2}-\d{2})"/g)]
  .map(([, id, reviewBy]) => ({ id, reviewBy }));

const overdue = records.filter((r) => today > r.reviewBy);
if (overdue.length) {
  console.warn(
    `WARNING: ${overdue.length} AI tool record(s) overdue for review (today ${today}):\n` +
      overdue.map((r) => `         - ${r.id} (reviewBy ${r.reviewBy})`).join("\n") +
      `\n         Re-verify the official service and vendor pages, then update reviewedOn and reviewBy.`,
  );
} else if (records.length) {
  console.log(`AI tool registry: ${records.length} records, none overdue for review.`);
}

// These pairs are near-identical names with different data boundaries. Merging
// any of them would silently turn a correct classification into a wrong one.
const mustStayDistinct = [
  ["google-gemini-chat", "google-gemini-enterprise"],
  ["google-notebooklm", "notebooklm-enterprise"],
  ["microsoft-copilot-chat", "microsoft-365-copilot"],
];
for (const pair of mustStayDistinct) {
  for (const id of pair) {
    if (!registry.includes(`id: "${id}"`)) {
      console.error(
        `AI tool registry is missing "${id}". ${pair[0]} and ${pair[1]} are separate services ` +
          `with different data boundaries and must both exist as distinct records.`,
      );
      process.exit(1);
    }
  }
}

// A former name must never be promoted to the primary display name.
const formerNameAsDisplay = /displayName:\s*"(Google NotebookLM|NotebookLM|Gemini App|Lexis Protégé|Lexis\+ AI|Harvey AI|Bloomberg Law AI|Bing Chat Enterprise)"/.exec(registry);
if (formerNameAsDisplay) {
  console.error(
    `AI tool registry uses the former name "${formerNameAsDisplay[1]}" as a displayName. ` +
      `Keep former names in formerNames as search aliases instead.`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Legal claim verification content: maintenance checks.
//
// Structural integrity (exactly four audit steps with the required ids, failure
// modes pointing at real steps, the five outcomes, the answer key recording "not
// supported", citators referencing the canonical registry) is validated in
// app/lib/legalClaimAudit.ts and app/lib/legalVerificationTools.ts and throws at
// import, so `npm run build` fails. This script covers the dated material a
// maintainer needs prompting about, plus the editorial claims that would be worst
// to ship.
// ---------------------------------------------------------------------------
const auditPath = join(process.cwd(), "app/lib/legalClaimAudit.ts");
const citatorPath = join(process.cwd(), "app/lib/legalVerificationTools.ts");
for (const p of [auditPath, citatorPath]) {
  if (!existsSync(p)) {
    console.error(`Missing legal verification content: ${p}`);
    process.exit(1);
  }
}
const auditSrc = readFileSync(auditPath, "utf8");
const citatorSrc = readFileSync(citatorPath, "utf8");

const exerciseReviewBy = auditSrc.match(/sourceStatusReviewBy:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
const exerciseCheckedOn = auditSrc.match(/sourceStatusCheckedOn:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
if (!exerciseReviewBy || !exerciseCheckedOn) {
  console.error("The practice exercise must declare sourceStatusCheckedOn and sourceStatusReviewBy.");
  process.exit(1);
}
if (today > exerciseReviewBy) {
  const days = Math.round((Date.parse(today) - Date.parse(exerciseReviewBy)) / 86_400_000);
  console.warn(
    `WARNING: the exercise case status is ${days} day(s) overdue for re-check ` +
      `(reviewBy ${exerciseReviewBy}, today ${today}).\n` +
      `         Confirm current status and subsequent history, then update the dates in ` +
      `app/lib/legalClaimAudit.ts. The page shows a visible maintenance notice while overdue.`,
  );
} else {
  console.log(`Exercise case status checked ${exerciseCheckedOn}; next check due ${exerciseReviewBy}.`);
}

const staleCitators = [...citatorSrc.matchAll(/id:\s*"([a-z]+)",[\s\S]*?reviewBy:\s*"(\d{4}-\d{2}-\d{2})"/g)]
  .map(([, id, reviewBy]) => ({ id, reviewBy }))
  .filter((c) => today > c.reviewBy);
if (staleCitators.length) {
  console.warn(
    `WARNING: ${staleCitators.length} citator record(s) overdue for review: ` +
      staleCitators.map((c) => `${c.id} (${c.reviewBy})`).join(", "),
  );
}

// Editorial claims that must never reach the guide. Each is a statement the
// guide exists to correct, so shipping one would teach the opposite lesson.
const bannedClaims = [
  [/banned\s+(the\s+)?(use of\s+)?(generative\s+)?AI/i, "says a court banned AI use"],
  [/\bgood law\b[^.]{0,40}\bsupports?\b/i, 'treats "good law" as proposition support'],
  [/every court requires/i, "asserts a universal court requirement"],
  [/citator (verifies|proves)/i, "says a citator verifies the quotation or proposition"],
  [/prevents? hallucinat/i, "says a database prevents hallucinations"],
  [/ask the AI to double-?check\b(?![^.]*not)/i, "recommends asking the AI to double-check"],
];
const guidePath = join(process.cwd(), "app/learn-ai/verify-an-ai-legal-claim/page.tsx");
if (existsSync(guidePath)) {
  const guideSrc = readFileSync(guidePath, "utf8");
  for (const [pattern, why] of bannedClaims) {
    const hit = pattern.exec(guideSrc) ?? pattern.exec(auditSrc);
    if (hit) {
      console.error(`The legal verification guide ${why}: ${JSON.stringify(hit[0])}`);
      process.exit(1);
    }
  }
}

// Every source note needs a publisher, URL, source type, and review cadence.
const guidesSrc = readFileSync(join(process.cwd(), "app/lib/guides.ts"), "utf8");
const verifyRecord = guidesSrc.slice(guidesSrc.indexOf('slug: "verify-an-ai-legal-claim"'));
const verifyNotes = [...verifyRecord.slice(0, verifyRecord.indexOf("reviewCadence:")).matchAll(/\{\s*title:/g)];
const missingType = verifyRecord
  .slice(0, verifyRecord.indexOf("reviewCadence:"))
  .split("{ title:")
  .slice(1)
  .filter((n) => !/sourceType:/.test(n) || !/publisher:/.test(n) || !/stability:/.test(n));
if (verifyNotes.length && missingType.length) {
  console.error(
    `${missingType.length} source note(s) on the legal verification guide lack a publisher, ` +
      `sourceType, or stability cadence.`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Citation provenance content: maintenance checks.
//
// Structural integrity (four evidence states with the required ids, notes tied
// to real tool modes, the answer key recording "not supported", the expected
// source being Feist, the fictional strings staying out of every guide's search
// text) is validated in app/lib/citationProvenance.ts and throws at import, so
// `npm run build` fails. Structural integrity of the tracker snapshot lives in
// app/lib/legalHallucinationEvidence.ts and throws the same way.
//
// This script covers what only the page source can tell us: that the fictional
// citation exists in exactly one place, that the moving count never appears in
// durable copy, and that none of the claims the guide exists to correct have
// crept into it. Nothing here fetches the tracker, GovInfo, Cornell, a legal
// database, or an AI service.
// ---------------------------------------------------------------------------
const provenancePath = join(process.cwd(), "app/lib/citationProvenance.ts");
const evidencePath = join(process.cwd(), "app/lib/legalHallucinationEvidence.ts");
for (const p of [provenancePath, evidencePath]) {
  if (!existsSync(p)) {
    console.error(`Missing citation provenance content: ${p}`);
    process.exit(1);
  }
}
const provenanceSrc = readFileSync(provenancePath, "utf8");
const evidenceSrc = readFileSync(evidencePath, "utf8");

// The tracker snapshot expires weekly. Staleness is a warning by default so a
// missed review degrades to "Count due for review" on the page rather than
// breaking the build; SLS_STRICT_EVIDENCE=1 makes CI refuse it.
const evidenceField = (name) =>
  evidenceSrc.match(new RegExp(`\\n  ${name}:\\s*"(\\d{4}-\\d{2}-\\d{2})"`))?.[1];
const evidenceVerifiedOn = evidenceField("verifiedOn");
const evidenceReviewBy = evidenceField("reviewBy");
// sourceLastUpdated is a date or null: this database publishes no update date, and
// null is what keeps the page from claiming one. It still has to be *declared*, so
// a deleted field is caught, but an absent date is a legitimate value.
const evidenceSourceUpdated = evidenceField("sourceLastUpdated");
const evidenceSourceUpdatedDeclared = /\n  sourceLastUpdated:\s*("\d{4}-\d{2}-\d{2}"|null)/.test(
  evidenceSrc,
);
if (!evidenceVerifiedOn || !evidenceReviewBy || !evidenceSourceUpdatedDeclared) {
  console.error(
    "The legal-hallucination evidence snapshot must declare sourceLastUpdated (a date or null), " +
      "verifiedOn, and reviewBy.",
  );
  process.exit(1);
}
// Echoing the read date back as the source's own update date is the specific
// mistake this guards: the component labels the field "Source last updated".
if (evidenceSourceUpdated && evidenceSourceUpdated === evidenceVerifiedOn) {
  console.error(
    `sourceLastUpdated (${evidenceSourceUpdated}) equals verifiedOn in ` +
      `app/lib/legalHallucinationEvidence.ts. The page renders it as "Source last updated", so this ` +
      `asserts an update date the source does not publish. Use null when there is none.`,
  );
  process.exit(1);
}
const strictEvidence = process.env.SLS_STRICT_EVIDENCE === "1";
if (today > evidenceReviewBy) {
  const days = Math.round((Date.parse(today) - Date.parse(evidenceReviewBy)) / 86_400_000);
  const message =
    `the legal-hallucination count is ${days} day(s) overdue for review ` +
    `(reviewBy ${evidenceReviewBy}, today ${today}).\n` +
    `         The page is withholding the number and showing "Count due for review". Re-read ` +
    `https://www.damiencharlotin.com/hallucinations/, then update count, sourceLastUpdated, ` +
    `verifiedOn, reviewBy, and countFingerprint in app/lib/legalHallucinationEvidence.ts.`;
  if (strictEvidence) {
    console.error(`Stale public evidence snapshot (SLS_STRICT_EVIDENCE=1): ${message}`);
    process.exit(1);
  }
  console.warn(`WARNING: ${message}`);
} else {
  console.log(
    `Legal-hallucination count checked ${evidenceVerifiedOn} (source publishes ` +
      `${evidenceSourceUpdated ? `an update date of ${evidenceSourceUpdated}` : "no update date"}); ` +
      `next review due ${evidenceReviewBy}.`,
  );
}

const provenanceReviewBy = provenanceSrc.match(/sourceReviewBy:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
if (!provenanceReviewBy) {
  console.error("The simulated citation exercise must declare sourceReviewBy.");
  process.exit(1);
}
if (today > provenanceReviewBy) {
  console.warn(
    `WARNING: the simulated citation exercise is overdue for review ` +
      `(sourceReviewBy ${provenanceReviewBy}, today ${today}).\n` +
      `         Re-confirm the source at 499 U.S. 340 and the answer key in ` +
      `app/lib/citationProvenance.ts.`,
  );
}

const inventedGuidePath = join(process.cwd(), "app/learn-ai/why-did-it-invent-a-case/page.tsx");
if (existsSync(inventedGuidePath)) {
  const inventedSrc = readFileSync(inventedGuidePath, "utf8");

  // The fictional citation lives in the data record and is rendered only through
  // the component that always prints the simulation label first. A literal copy
  // in the page would be a second copy that could drift out of that guarantee —
  // and could reach a meta description or Open Graph string.
  for (const fiction of ["Arcadia", "Prairie Telephone"]) {
    if (inventedSrc.includes(fiction)) {
      console.error(
        `The citation provenance guide contains the fictional string "${fiction}" as page source. ` +
          `Render it only through the simulated-exercise component so the simulation label, ` +
          `data-nosnippet, and search exclusion always travel with it.`,
      );
      process.exit(1);
    }
  }

  // The moving count belongs to the dated record alone.
  const countInProse = /\b2[,.]?008\b/.exec(inventedSrc);
  if (countInProse) {
    console.error(
      `The citation provenance guide hard-codes the tracker count ${JSON.stringify(countInProse[0])}. ` +
        `Read it from app/lib/legalHallucinationEvidence.ts so it can expire.`,
    );
    process.exit(1);
  }

  // Claims the guide exists to correct. Shipping one would teach the opposite.
  const bannedProvenanceClaims = [
    [/there (is|was) no lookup( step)?/i, "states categorically that no lookup occurred"],
    [/(it|the system) was not looking anything up/i, "states categorically that nothing was looked up"],
    [/never queried anything/i, "states categorically that nothing was queried"],
    [/the tool cannot search/i, "says the tool cannot search"],
    [/every citation is generated only from training/i, "says every citation comes only from training"],
    [/the model (thinks|remembers|lies|lied|knows|believed|chooses to invent|searched)/i, "anthropomorphizes the model"],
    [/cannot distinguish truth from falsehood/i, "claims the machinery cannot distinguish truth from falsehood"],
    [/(different|matching) answers prove/i, "treats output variation or agreement as proof"],
    [/search makes hallucinations impossible/i, "says search makes hallucinations impossible"],
    [/(legal database|database) guarantees real citations/i, "says a database guarantees real citations"],
    [/a real case means the claim is correct/i, "says a real case makes the claim correct"],
    [/a source link verifies the proposition/i, "says a source link verifies the proposition"],
    [/ask the AI to double-?check/i, "recommends asking the AI to double-check itself"],
    [/newest model solves hallucinations/i, "says a newer model solves hallucinations"],
    [/familiar case citation can be trusted/i, "says a familiar citation can be trusted from memory"],
    [/tracker measures every/i, "overstates what the tracker measures"],
    [/verified case count/i, 'says "verified" where the source says "identified"'],
    [/audit guarantees/i, "says the audit guarantees legal accuracy"],
    [/Law Library verifies the legal conclusion/i, "says the Law Library verifies the legal conclusion"],
  ];
  for (const [pattern, why] of bannedProvenanceClaims) {
    const hit = pattern.exec(inventedSrc) ?? pattern.exec(provenanceSrc);
    if (hit) {
      console.error(`The citation provenance guide ${why}: ${JSON.stringify(hit[0])}`);
      process.exit(1);
    }
  }

  // The answer-first block has to stay conditional. Without this the page could
  // drift back into the absolute claim the guide was written to replace.
  if (!/Unless search/.test(guidesSrc)) {
    console.error(
      "The citation provenance guide's answer must open conditionally " +
        '("Unless search, a legal database, or a source you supplied was active…").',
    );
    process.exit(1);
  }

  // Source notes on this guide need a publisher, source type, and cadence.
  const inventedRecord = guidesSrc.slice(guidesSrc.indexOf('slug: "why-did-it-invent-a-case"'));
  const inventedNotes = inventedRecord
    .slice(0, inventedRecord.indexOf("reviewCadence:"))
    .split(/\{\s*\n\s*title:/)
    .slice(1);
  const incomplete = inventedNotes.filter(
    (n) => !/sourceType:/.test(n) || !/publisher:/.test(n) || !/stability:/.test(n),
  );
  if (inventedNotes.length && incomplete.length) {
    console.error(
      `${incomplete.length} source note(s) on the citation provenance guide lack a publisher, ` +
        `sourceType, or stability cadence.`,
    );
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Responding to suspected student AI use: maintenance checks.
//
// Structural integrity is validated at import in app/lib/studentAiConcern.ts,
// app/lib/stanfordStudentAiProcess.ts, app/lib/slsStudentAiPolicy.ts,
// app/lib/aiDetectionGuidance.ts, and app/lib/assignmentAiBoundary.ts, so
// `npm run build` fails on a detector-first workflow, a graded route that skips
// OCS, an evidence category that claims to determine responsibility, a published
// SLS summary without confirmation, or a named detector product.
//
// This script covers the two things only the page source can tell us — that the
// guide never writes a sentence the process forbids, and that no student data or
// detector integration crept in — plus the dated records a maintainer needs
// prompting about. Nothing here fetches OCS, Teaching Commons, the SLS policy
// page, a detector vendor, or any student system.
// ---------------------------------------------------------------------------
const concernPaths = {
  workflow: "app/lib/studentAiConcern.ts",
  process: "app/lib/stanfordStudentAiProcess.ts",
  sls: "app/lib/slsStudentAiPolicy.ts",
  detection: "app/lib/aiDetectionGuidance.ts",
  boundary: "app/lib/assignmentAiBoundary.ts",
};
const concernSrc = {};
for (const [key, rel] of Object.entries(concernPaths)) {
  const full = join(process.cwd(), rel);
  if (!existsSync(full)) {
    console.error(`Missing student-AI concern content: ${rel}`);
    process.exit(1);
  }
  concernSrc[key] = readFileSync(full, "utf8");
}

const strictProcess = process.env.SLS_STRICT_PROCESS === "1";
const datedRecord = (src, label, url) => {
  const verifiedOn = src.match(/\n  verifiedOn:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  const reviewBy = src.match(/\n  reviewBy:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!verifiedOn || !reviewBy) {
    console.error(`${label} must declare verifiedOn and reviewBy as ISO dates.`);
    process.exit(1);
  }
  if (today > reviewBy) {
    const days = Math.round((Date.parse(today) - Date.parse(reviewBy)) / 86_400_000);
    const message =
      `${label} is ${days} day(s) overdue for review (reviewBy ${reviewBy}, today ${today}).\n` +
      `         Time-sensitive claims are withheld from display until re-checked at ${url}.`;
    if (strictProcess) {
      console.error(`Stale process record (SLS_STRICT_PROCESS=1): ${message}`);
      process.exit(1);
    }
    console.warn(`WARNING: ${message}`);
    return false;
  }
  console.log(`${label} checked ${verifiedOn}; next review due ${reviewBy}.`);
  return true;
};

datedRecord(
  concernSrc.process,
  "Stanford student-AI process snapshot",
  "https://communitystandards.stanford.edu/reporting-honor-code-concern-faculty",
);
datedRecord(
  concernSrc.detection,
  "AI detection guidance",
  "https://teachingcommons.stanford.edu/news/guidance-technology-tools-academic-integrity",
);

// The OCS student-contact discrepancy must stay visible to maintainers until OCS
// resolves it. Deleting the record would silently turn an open question into a
// settled fact.
if (!/id:\s*"student-contact-sequence"/.test(concernSrc.process)) {
  console.error(
    "The OCS student-contact source discrepancy record has been removed. Keep it until the Office of " +
      "Community Standards confirms the current sequence, then resolve it with a dated editorial change.",
  );
  process.exit(1);
}
const discrepancyStatus = concernSrc.process
  .slice(concernSrc.process.indexOf('id: "student-contact-sequence"'))
  .match(/status:\s*"(staff-confirmation-required|resolved)"/)?.[1];
if (discrepancyStatus === "staff-confirmation-required") {
  console.log(
    "Open source discrepancy: OCS student-contact sequence awaits Office of Community Standards confirmation.",
  );
}

// The SLS policy stays unpublished until an authorized owner confirms it. This
// mirrors the import-time validator so a maintainer running lint alone still sees it.
const slsStatus = concernSrc.sls.match(/\n  status:\s*"(published|staff-confirmation-required)"/)?.[1];
const slsHasText = /\n  (approvedSummary|exactPolicyText):\s*"/.test(concernSrc.sls);
if (slsHasText && slsStatus !== "published") {
  console.error(
    "The SLS generative-AI policy record contains text but is not marked published. " +
      "Unconfirmed policy wording must not sit in the record — complete the confirmation fields or remove it.",
  );
  process.exit(1);
}
if (slsStatus !== "published") {
  console.log(
    "SLS generative-AI policy: unconfirmed. The guide links the official page and publishes no summary.",
  );
}

// The concern material moved to a companion checklist beneath the teaching guide.
// A path that silently stops matching turns every guard below into a no-op, so the
// file is required rather than optional.
const studentGuidePath = join(process.cwd(), "app/learn-ai/responding-to-student-ai-concern/page.tsx");
if (!existsSync(studentGuidePath)) {
  console.error(
    "Missing the companion concern checklist: app/learn-ai/responding-to-student-ai-concern/page.tsx",
  );
  process.exit(1);
}
if (existsSync(studentGuidePath)) {
  const studentGuideSrc = readFileSync(studentGuidePath, "utf8");
  const componentSrc = readFileSync(
    join(process.cwd(), "app/components/StudentAiConcern.tsx"),
    "utf8",
  );
  const rendered = `${studentGuideSrc}\n${componentSrc}`;
  const studentRecordSrc = guidesSrc.slice(
    guidesSrc.indexOf('slug: "responding-to-student-ai-concern"'),
    guidesSrc.indexOf("export const coreAiDecisions"),
  );

  // Sentences the guide exists to prevent. Shipping any one of them would give a
  // faculty member permission to do the thing the Stanford process forbids.
  const bannedConcernClaims = [
    [/the paper sounds like AI/i, "presents a style impression as a finding"],
    [/the detector proved/i, "says a detector proved something"],
    [/\b86%\b[^.]*\bwritten by AI\b/i, "misreads a detector percentage as a proportion of authorship"],
    [/fabricated citations prove/i, "says fabricated citations prove AI use"],
    [/a polished paper is suspicious/i, "treats polish as suspicion"],
    [/could not explain it,? so they cheated/i, "treats difficulty explaining as proof"],
    [/\bAI use is (an|a) (Honor Code violation|violation)\b/i, "equates AI use with a violation"],
    [/ChatGPT is prohibited at Stanford/i, "misstates Stanford policy"],
    [/must show their (account|chat) history/i, "demands private account history"],
    [/must unlock their device/i, "demands device access"],
    [/\blower the grade and then file\b/i, "recommends penalty grading before the process"],
    [/give a zero while the case is pending/i, "recommends a penalty while responsibility is unresolved"],
    [/no disclosure automatically proves/i, "treats a missing disclosure as proof of deception"],
    [/(this site|the site) determines whether to report/i, "claims the site decides whether to report"],
    [/Law Library determines responsibility/i, "claims the Law Library determines responsibility"],
    [/OCS consultation means a case has been filed/i, "says consultation files a concern"],
    [/every detector is always wrong/i, "overstates detector unreliability"],
    [/every non-native English writer will be falsely flagged/i, "overstates the detector-bias finding"],
    [/students with accommodations may use AI without following/i, "misstates accommodations"],
    [/an accommodation explains the writing/i, "uses an accommodation as an explanation of authorship"],
    [/\bthe SLS policy says\b/i, "paraphrases the unconfirmed SLS policy"],
    [/assignment policy overrides every Stanford requirement/i, "inverts the policy hierarchy"],
    [/Honor Code requires the same AI rule in every course/i, "asserts a uniform course rule"],
    [/\bthe student is (guilty|innocent)\b/i, "reaches a conclusion about a student"],
    [/this workflow proves authorship/i, "claims the workflow proves authorship"],
  ];
  // The workflow's "do not" lists quote several of these phrases in order to
  // forbid them, and so does some page prose ("Do not begin with…"). Strip the
  // doNot arrays, then require that a surviving match not sit in a prohibition.
  const withoutProhibitions = concernSrc.workflow.replace(/doNot:\s*\[[^\]]*\]/gs, "doNot: []");
  const negated = (text, index) => {
    const before = text.slice(Math.max(0, index - 90), index);
    return /\b(do not|don’t|dont|never|avoid|rather than|instead of|not\b)[^.]*$/i.test(before);
  };
  for (const [pattern, why] of bannedConcernClaims) {
    for (const [label, text] of [["page", rendered], ["workflow", withoutProhibitions]]) {
      const hit = pattern.exec(text);
      if (hit && !negated(text, hit.index)) {
        console.error(
          `The student-AI response guide ${why} (${label}): ${JSON.stringify(hit[0])}`,
        );
        process.exit(1);
      }
    }
  }

  // "Ask the student first" must not become the public instruction for graded work
  // while the OCS sequence is unconfirmed. Allowed only in a negated form.
  const contactFirst = /ask the student (first|before contacting OCS)/i.exec(rendered);
  if (contactFirst && !/\b(do not|never|don’t|dont)\b[^.]{0,60}ask the student (first|before)/i.test(rendered)) {
    console.error(
      "The student-AI response guide tells faculty to ask the student before contacting OCS. " +
        "Until OCS confirms that sequence, the public instruction is to consult OCS first for graded work.",
    );
    process.exit(1);
  }

  // Two claims expire and are gated behind the dated records. A literal copy
  // anywhere else keeps asserting them after the record goes stale, which
  // silently defeats the whole gating mechanism — so it is a build failure.
  const gatedClaims = [
    [/two-month|two months/i, "the reporting deadline", "stanfordStudentAiProcess.ts"],
    [/campus-wide plagiarism-detection/i, "the campus-support position", "aiDetectionGuidance.ts"],
    [/clear advance notice/i, "the advance-notice requirement", "aiDetectionGuidance.ts"],
  ];
  for (const [pattern, what, home] of gatedClaims) {
    for (const [label, text] of [
      ["the guide page", studentGuideSrc],
      ["the guide's components", componentSrc],
      ["the guide record", studentRecordSrc],
    ]) {
      const hit = pattern.exec(text);
      if (hit) {
        console.error(
          `${label} hard-codes ${what} (${JSON.stringify(hit[0])}). Read it from ` +
            `app/lib/${home} so the stale state can withhold it.`,
        );
        process.exit(1);
      }
    }
  }

  // The page must never collect anything, call a detector, or grow a form.
  const forbiddenInteractive = [
    [/<(form|input|textarea|select)\b/i, "adds a form control"],
    [/<(iframe|embed)\b/i, "embeds a third-party frame"],
    [/\b(fetch|axios|XMLHttpRequest)\s*\(/i, "makes a network request"],
    [/\bonSubmit\b/i, "handles a form submission"],
    [/\b(studentName|studentEmail|courseNumber|detectorScore|uploadFile)\b/i, "names a student or detector data field"],
  ];
  for (const [pattern, why] of forbiddenInteractive) {
    const hit = pattern.exec(rendered);
    if (hit) {
      console.error(
        `The student-AI response guide ${why}: ${JSON.stringify(hit[0])}. ` +
          `This page must collect nothing, upload nothing, and call no detector or model.`,
      );
      process.exit(1);
    }
  }

  // The companion's answer-first block has to lead with the rule that governed the
  // assignment, not with how the prose sounds or what a detector said.
  const studentRecord = studentRecordSrc;
  const answer = studentRecord.match(/answer:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
  const ruleAt = answer.search(/rule that governed the assignment/i);
  if (ruleAt === -1) {
    console.error(
      "The companion checklist's answer must start with the rule that governed the assignment.",
    );
    process.exit(1);
  }
  const detectorAt = answer.search(/\bdetector\b/i);
  if (detectorAt !== -1 && detectorAt < ruleAt) {
    console.error(
      "The companion checklist's answer names a detector before the governing rule. Lead with the rule.",
    );
    process.exit(1);
  }
  const answerSecond = studentRecord.match(/answerSecond:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
  if (!/Office of Community Standards/i.test(answerSecond) || !/before/i.test(answerSecond)) {
    console.error(
      "The companion checklist's second answer paragraph must route graded work to OCS before student contact.",
    );
    process.exit(1);
  }
  if (!/concern is not a finding/i.test(answerSecond)) {
    console.error('The companion checklist must state that "A concern is not a finding."');
    process.exit(1);
  }

  // Neutral vocabulary. The companion is a process checklist, not an accusation
  // toolkit, and a few words would reframe the whole page.
  const bannedCompanionWords = [
    [/\bAI cheating\b/i, '"AI cheating"'],
    [/\bcatch(ing)? students\b/i, '"catching students"'],
    [/\bprov(e|ing) AI use\b/i, '"proving AI use"'],
    [/\bdetection workflow\b/i, '"detection workflow"'],
    [/\binvestigation toolkit\b/i, '"investigation toolkit"'],
  ];
  for (const [pattern, label] of bannedCompanionWords) {
    if (pattern.exec(rendered)) {
      console.error(
        `The companion checklist uses ${label}. Prefer "possible concern", "observable issue", ` +
          `"automated signal", "faculty inference", and "fair process".`,
      );
      process.exit(1);
    }
  }

  // Source notes on this guide need a publisher, source type, and cadence.
  const studentNotes = studentRecord
    .slice(0, studentRecord.indexOf("reviewCadence:"))
    .split(/\{\s*\n\s*title:/)
    .slice(1);
  const incompleteStudentNotes = studentNotes.filter(
    (n) => !/sourceType:/.test(n) || !/publisher:/.test(n) || !/stability:/.test(n),
  );
  if (studentNotes.length && incompleteStudentNotes.length) {
    console.error(
      `${incompleteStudentNotes.length} source note(s) on the student-AI guide lack a publisher, ` +
        `sourceType, or stability cadence.`,
    );
    process.exit(1);
  }
}

// No detector vendor may be promoted anywhere in the resource directory.
const resourcesSrc = readFileSync(join(process.cwd(), "app/ai-resources/page.tsx"), "utf8");
const detectorVendor = /\b(GPTZero|Turnitin|Copyleaks|Originality\.?ai|Winston ?AI|ZeroGPT|Crossplag)\b/i.exec(
  resourcesSrc,
);
if (detectorVendor) {
  console.error(
    `AI Resources lists the detector vendor "${detectorVendor[1]}". Stanford advises against relying on ` +
      `detector output for an AI-policy decision, so no detector is offered as a recommended resource.`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Navigation and homepage: maintenance checks.
//
// The bar's five-destination cap, the ban on outbound links in it, href
// resolution against the published route list, and footer reachability are all
// validated at import in app/lib/siteNav.ts, so `npm run build` fails on those.
//
// This script covers what only the source text can tell us: that the homepage
// still surfaces every top-level area (it previously omitted the agent guide
// entirely, which is how that page got buried), and that the two counts it
// quotes are still true.
// ---------------------------------------------------------------------------
const navPath = join(process.cwd(), "app/lib/siteNav.ts");
if (!existsSync(navPath)) {
  console.error("Missing the canonical navigation record: app/lib/siteNav.ts");
  process.exit(1);
}
const navSrc = readFileSync(navPath, "utf8");
const homeSrc = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
const headerSrc = readFileSync(join(process.cwd(), "app/components/Header.tsx"), "utf8");

// The header must not grow its own link list again. Everything comes from the record.
if (/href:\s*["'`]/.test(headerSrc)) {
  console.error(
    "app/components/Header.tsx declares its own nav hrefs. The bar reads from primaryNav in " +
      "app/lib/siteNav.ts so the five-destination cap and the no-outbound-links rule stay enforced.",
  );
  process.exit(1);
}

// Every top-level destination has to be reachable from the homepage. The agent
// guide was previously linked only from /skills, which is the burial this fixes.
const homeMustLink = [
  ["/learn-ai", "the guide series"],
  ["/skills", "skill files"],
  ["/build-an-agent", "the agent guide"],
  ["/ai-resources", "AI resources"],
  ["AI_UPLOAD_URL", "the newsletter"],
  ["/education-technology", "EdTech"],
  ["/what-is-a-skill-file", "the skill-file explainer"],
  ["/how-to-use", "the usage guide"],
  ["/install", "the install guide"],
  ["/troubleshooting", "troubleshooting"],
];
for (const [href, what] of homeMustLink) {
  const linked = href === "AI_UPLOAD_URL" ? homeSrc.includes("href={AI_UPLOAD_URL}") : homeSrc.includes(`"${href}"`);
  if (!linked) {
    console.error(
      `The homepage does not link ${what} ("${href}"). Every top-level area must be reachable from ` +
        `the homepage, not only from a sibling page.`,
    );
    process.exit(1);
  }
}

// The homepage says the agent guide has three parts. Keep that honest.
const agentPath = join(process.cwd(), "app/build-an-agent/page.tsx");
if (existsSync(agentPath)) {
  const parts = new Set(
    [...readFileSync(agentPath, "utf8").matchAll(/label="(Part \d+)"/g)].map((m) => m[1]),
  );
  const claimsThreeParts = /meta:\s*"Three parts"/.test(homeSrc);
  if (claimsThreeParts && parts.size !== 3) {
    console.error(
      `The homepage says the agent guide has three parts, but app/build-an-agent/page.tsx has ` +
        `${parts.size}. Update the homepage card or the guide.`,
    );
    process.exit(1);
  }
}

// Counts must be derived, never typed into the homepage.
const hardCodedCount = /\b(\d{2,3})\s+skill files\b/.exec(homeSrc);
if (hardCodedCount) {
  console.error(
    `The homepage hard-codes a skill-file count (${JSON.stringify(hardCodedCount[0])}). ` +
      `Read it from countLabel() or skillFileCount() in app/lib/counts.ts.`,
  );
  process.exit(1);
}

// The route list moved into the nav record so nav links can be validated against
// it. The sitemap must keep reading that list rather than growing a second copy.
const sitemapSrc = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
if (!/from "\.\/lib\/siteNav"/.test(sitemapSrc)) {
  console.error(
    "app/sitemap.ts no longer imports staticRoutes from app/lib/siteNav.ts. Keeping one route list " +
      "is what lets the nav validator reject a link to a route that does not exist.",
  );
  process.exit(1);
}
// Home is in the bar by request. It is the one destination whose absence is
// invisible in testing — every other page is still reachable — so it gets its own
// check, including its position: a "Home" link that is not first reads as a
// section rather than a way back.
const primaryNavBlock = /export const primaryNav: NavLink\[\] = \[([\s\S]*?)\n\];/.exec(navSrc)?.[1];
if (!primaryNavBlock) {
  console.error("app/lib/siteNav.ts no longer declares primaryNav as a literal array.");
  process.exit(1);
}
const primaryNavLabels = [...primaryNavBlock.matchAll(/label: "([^"]+)"/g)].map((m) => m[1]);
if (primaryNavLabels[0] !== "Home") {
  console.error(
    `The header bar's first destination is "${primaryNavLabels[0]}", not "Home". Home belongs first ` +
      "in the bar — the logo is hidden below 860px, where the menu is the only way back.",
  );
  process.exit(1);
}
if (!/\{ label: "Home", href: "\/" \}/.test(primaryNavBlock)) {
  console.error('The header bar\'s Home link must point at "/".');
  process.exit(1);
}
// Home must not use the startsWith test that marks a section current: every path
// begins with "/", so it would report Home as the current page everywhere.
if (!/href === "\/"/.test(headerSrc)) {
  console.error(
    'app/components/Header.tsx no longer special-cases href === "/" for aria-current. Without it, ' +
      "Home is announced as the current page on every page of the site.",
  );
  process.exit(1);
}
// The way back to the AI Learning Hub.
//
// This site is reached by an ordinary link from the hub's faculty page rather than
// being embedded in it, and the return link is the other half of that handoff. It is
// The href is asserted to come from AI_LEARNING_HUB_URL rather than a literal,
// because app/lib/site.ts is where a moved hub is meant to be one edit.
if (!/export const returnToHubLink: NavLink = \{\s*label: "[^"]+",\s*href: AI_LEARNING_HUB_URL,\s*external: true,\s*\}/.test(navSrc)) {
  console.error(
    "app/lib/siteNav.ts no longer exports returnToHubLink built from AI_LEARNING_HUB_URL. It is " +
      "the return half of the hub handoff, and the hub's address belongs in app/lib/site.ts.",
  );
  process.exit(1);
}
if (!/returnToHubLink/.test(headerSrc) || !/headerReturn/.test(headerSrc)) {
  console.error(
    "app/components/Header.tsx no longer renders the returnToHubLink.",
  );
  process.exit(1);
}
// The hub is a separate deployment reached by a link. An iframe pointing back at it,
// or at anything else on this bar, would be the embedding this handoff replaced.
if (/<iframe/i.test(headerSrc)) {
  console.error("app/components/Header.tsx contains an iframe. The header links out; it does not embed.");
  process.exit(1);
}
const navRouteCount = (navSrc.match(/^\s{2}"\/[a-z0-9/-]*",$/gm) ?? []).length;
console.log(
  `Navigation: ${(navSrc.match(/label: "/g) ?? []).length} labelled links across ` +
    `${navRouteCount} published routes; header bar carries ${primaryNavLabels.length} destinations ` +
    `starting with ${primaryNavLabels[0]}, plus a return link to the AI Learning Hub.`,
);

// The numbered list on the homepage is the guide *collection*. Supporting process
// resources are published guides too, so reading from publishedGuides() numbered
// the concern checklist as a seventh lesson — which is the bug this replaced.
// Comments are stripped first: the comment that explains this rule names the
// function it forbids, and a guard that its own rationale trips is a guard people
// learn to work around. Only whole-line // comments and JSX block comments are
// removed, so a "https://" inside a string is untouched.
const homeCode = homeSrc
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^[ \t]*\/\/.*$/gm, "");
if (/\bpublishedGuides\b/.test(homeCode)) {
  console.error(
    "app/page.tsx reads publishedGuides(), which includes supporting process resources. Count the " +
      "collections' primary guides instead, so a process checklist is never counted as a lesson.",
  );
  process.exit(1);
}
// The homepage states how many collections and guides exist. Both numbers must be
// derived: the page listed every guide until the list outgrew the page, and a
// hand-typed replacement count would go stale the next time one is published.
if (!/publishedGuideTotal\(\)/.test(homeCode) || !/collectionCount\(\)/.test(homeCode)) {
  console.error(
    "app/page.tsx no longer derives its lesson counts from the collection records. Read " +
      "collectionCount() and publishedGuideTotal() from app/lib/learnAiCollections.ts.",
  );
  process.exit(1);
}
// Every count on the page comes from a record, so a literal one is a bug waiting
// to happen.
const hardCodedHomeCount =
  /\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(guides|collections|tutorials|skill files|places)\b/i.exec(
    homeCode.replace(/\$\{[^}]*\}/g, ""),
  );
if (hardCodedHomeCount && !/three\s+parts/i.test(hardCodedHomeCount[0])) {
  console.error(
    `app/page.tsx hard-codes a count (${JSON.stringify(hardCodedHomeCount[0])}). Derive it from the ` +
      "guide, skill, or tutorial records.",
  );
  process.exit(1);
}
// The five destinations are the page's whole structure now: losing one silently
// makes an area of the site reachable only from the header.
for (const [href, what] of [
  ["/learn-ai", "the lessons card"],
  ["/skills", "the skill-files card"],
  ["/build-an-agent", "the agents card"],
  ["/tutorials", "the tutorial-library card"],
  ["/education-technology", "the EdTech card"],
]) {
  if (!new RegExp(`href: "${href}"`).test(homeCode)) {
    console.error(
      `app/page.tsx no longer carries ${what} ("${href}") among its destination cards.`,
    );
    process.exit(1);
  }
}
// The concern checklist is not a destination card, and it must not be orphaned
// either: it keeps its own quiet line in the student area.
if (!homeSrc.includes("/learn-ai/responding-to-student-ai-concern")) {
  console.error(
    "app/page.tsx no longer links the concern checklist anywhere. It is not one of the five " +
      "destinations, but it must stay reachable from the homepage.",
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// The teaching guide: learning-first checks.
//
// The first draft of this guide opened from the assumption that a student had
// done something wrong. The correction is not a wording change — it is an
// ordering claim: every assignment-design, activity, rubric, policy, and
// AI-literacy section comes before the concern-response section, and the concern
// section is short and delegates to the companion checklist.
//
// Ordering claims decay silently as a page is edited, so they are checked here by
// character position in the source rather than by eye. Structural integrity of
// the underlying records (five design checks, five modes, six patterns, the
// complete case-brief activity, the boundary template) is validated at import and
// throws, so `npm run build` fails on those.
// ---------------------------------------------------------------------------
const learningGuidePath = join(process.cwd(), "app/learn-ai/students-use-ai-and-learn-law/page.tsx");
if (!existsSync(learningGuidePath)) {
  console.error("Missing the teaching guide: app/learn-ai/students-use-ai-and-learn-law/page.tsx");
  process.exit(1);
}
const learningGuideSrc = readFileSync(learningGuidePath, "utf8");
const learningRecord = guidesSrc.slice(
  guidesSrc.indexOf('slug: "students-use-ai-and-learn-law"'),
  guidesSrc.indexOf('slug: "responding-to-student-ai-concern"'),
);

// The H1, the answer, and the faculty move set the frame. None of them may put a
// student under suspicion.
const learningTitle = learningRecord.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
const learningAnswer = learningRecord.match(/answer:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
const learningMove = learningRecord.match(/facultyMove:\s*"([^"]+)"/)?.[1] ?? "";
const framing = `${learningTitle} ${learningAnswer} ${learningMove}`;
const suspicionWords = /\b(misconduct|cheat|cheating|detector|detection|violation|penalty|report(ing)? a concern)\b/i;
const framingHit = suspicionWords.exec(framing);
if (framingHit) {
  console.error(
    `The teaching guide's title, answer, or faculty move uses "${framingHit[0]}". ` +
      `The frame must be about designing learning, not about suspecting a student.`,
  );
  process.exit(1);
}
if (!/inside the learning task/i.test(learningAnswer)) {
  console.error(
    'The teaching guide\'s answer must say to put AI inside the learning task ("Put AI inside the learning task—not in place of it.").',
  );
  process.exit(1);
}
if (learningMove !== "Name the legal skill. Bound the AI role. Grade the student’s judgment.") {
  console.error(
    `The teaching guide's faculty move is "${learningMove}". It must be ` +
      `"Name the legal skill. Bound the AI role. Grade the student’s judgment."`,
  );
  process.exit(1);
}

// The ordering claim, checked by position. Every design and activity section must
// precede the concern section, and the concern section must precede nothing that
// belongs to assignment design.
const at = (needle) => learningGuideSrc.indexOf(needle);
const concernSectionAt = at('id="boundary-crossed-heading"');
if (concernSectionAt === -1) {
  console.error("The teaching guide is missing the short concern-response section.");
  process.exit(1);
}
const mustPrecedeConcern = [
  ['id="start-with-law-heading"', "the legal-capability section"],
  ['id="design-checks-heading"', "the five design checks"],
  ['id="modes-heading"', "the assignment modes"],
  ['id="activities-heading"', "the activity library"],
  ['id="rubric-heading"', "the sample rubric"],
  ['id="boundary-open-heading"', "the SLS policy section"],
  ['id="boundary-template-heading"', "the assignment boundary template"],
  ['id="literacy-heading"', "the AI literacy section"],
  ['id="launch-heading"', "the pre-launch checklist"],
];
for (const [anchor, what] of mustPrecedeConcern) {
  const pos = at(anchor);
  if (pos === -1) {
    console.error(`The teaching guide is missing ${what} (${anchor}).`);
    process.exit(1);
  }
  if (pos > concernSectionAt) {
    console.error(
      `The teaching guide places ${what} after the concern-response section. ` +
        `Every assignment-design, activity, rubric, policy, and AI-literacy section must come first.`,
    );
    process.exit(1);
  }
}
// The concern section must also sit late in the page's structure, not merely after
// the named design sections. Character position would be the wrong measure here:
// the design checks, modes, and activity patterns render from data records, so
// they occupy little source and a lot of rendered page. Section index is the
// honest structural proxy, and it is deterministic from the source.
const sectionIds = [...learningGuideSrc.matchAll(/aria-labelledby="([a-z-]+)"/g)].map((m) => m[1]);
const concernIndex = sectionIds.indexOf("boundary-crossed-heading");
if (concernIndex === -1) {
  console.error("The teaching guide's concern section has no labelled heading.");
  process.exit(1);
}
const concernFraction = (concernIndex + 1) / sectionIds.length;
if (concernFraction < 0.6) {
  console.error(
    `The teaching guide's concern-response section is section ${concernIndex + 1} of ` +
      `${sectionIds.length} (${Math.round(concernFraction * 100)}%). It must sit in the last 40% of ` +
      `the page's sections, after every assignment-design, activity, rubric, policy, and ` +
      `AI-literacy section.`,
  );
  process.exit(1);
}

// The concern section delegates rather than reproducing the OCS process. If the
// companion's distinctive components appear here, the split has collapsed.
const companionOnly = [
  ["StudentAiConcernWorkflow", "the six-step concern workflow"],
  ["StanfordStudentAiProcessInsert", "the Stanford process snapshot"],
  ["ConcernEvidenceCategories", "the seven evidence categories"],
  ["DetectionGuidance", "the detector-guidance insert"],
  ["GradedUngradedPaths", "the graded/ungraded pathways"],
  ["ConversationGuide", "the OCS-directed conversation questions"],
];
for (const [component, what] of companionOnly) {
  if (learningGuideSrc.includes(component)) {
    console.error(
      `The teaching guide renders ${what} (<${component}>). That belongs on the companion ` +
        `checklist at /learn-ai/responding-to-student-ai-concern/, not on the primary guide.`,
    );
    process.exit(1);
  }
}
if (!learningGuideSrc.includes("/learn-ai/responding-to-student-ai-concern")) {
  console.error("The teaching guide must link the companion concern checklist.");
  process.exit(1);
}

// The SLS policy link must appear near the top, in the policy section, in the
// copyable boundary, and in source notes. Four places, because a faculty member
// arriving at any one of them should not have to hunt for the official page.
const slsPolicyPlaces = [
  [learningGuideSrc, "SlsPolicyLink", "the top of the guide"],
  [learningGuideSrc, "SlsPolicyCard", "the policy section"],
  [
    readFileSync(join(process.cwd(), "app/lib/assignmentAiBoundary.ts"), "utf8"),
    "SLS_STUDENT_AI_POLICY_URL",
    "the copyable assignment boundary",
  ],
  // The record references the shared constant rather than repeating the URL, which
  // is the point of having the constant — accept either form.
  [learningRecord, "SLS_STUDENT_AI_POLICY_URL", "the guide's source notes"],
];
for (const [haystack, needle, where] of slsPolicyPlaces) {
  if (!haystack.includes(needle)) {
    console.error(
      `The official SLS student AI policy link is missing from ${where}. It must appear near the top ` +
        `of the guide, in the policy section, in the copyable boundary, and in source notes.`,
    );
    process.exit(1);
  }
}
// The policy's wording is unconfirmed, so the guide must not characterise it.
const slsParaphrase = /\bthe SLS policy (says|states|requires|prohibits|permits|allows)\b/i.exec(
  `${learningGuideSrc}\n${readFileSync(join(process.cwd(), "app/components/StudentAiLearning.tsx"), "utf8")}`,
);
if (slsParaphrase) {
  console.error(
    `The teaching guide paraphrases the SLS policy ("${slsParaphrase[0]}"). Its wording is ` +
      `unconfirmed: link the official page and say nothing about its contents.`,
  );
  process.exit(1);
}

// No generator, grader, detector, or model call — and nothing collected.
const learningForbidden = [
  [/<(form|input|textarea|select)\b/i, "adds a form control"],
  [/\b(fetch|axios|XMLHttpRequest)\s*\(/i, "makes a network request"],
  [/\bonSubmit\b/i, "handles a form submission"],
  [/\b(generateAssignment|scoreAssignment|generatePolicy|gradeSubmission)\b/i, "names a generator or grader"],
];
for (const [pattern, why] of learningForbidden) {
  const hit = pattern.exec(learningGuideSrc);
  if (hit) {
    console.error(
      `The teaching guide ${why}: ${JSON.stringify(hit[0])}. This page must collect nothing and ` +
        `generate nothing — no assignment generator, policy generator, grading tool, or model call.`,
    );
    process.exit(1);
  }
}

// The homepage must present student AI as a teaching opportunity, with the concern
// link genuinely secondary — which here means: it appears later in the source.
const homeStudentSection = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
const learningLinkAt = homeStudentSection.indexOf("/learn-ai/students-use-ai-and-learn-law");
const concernLinkAt = homeStudentSection.indexOf("/learn-ai/responding-to-student-ai-concern");
if (learningLinkAt === -1) {
  console.error("The homepage student section must link the teaching guide.");
  process.exit(1);
}
if (concernLinkAt !== -1 && concernLinkAt < learningLinkAt) {
  console.error(
    "The homepage links the concern checklist before the teaching guide. The learning-design link " +
      "must come first and stay the primary action.",
  );
  process.exit(1);
}
if (/className="primary"[^>]*\/learn-ai\/responding-to-student-ai-concern/.test(homeStudentSection)) {
  console.error("The homepage concern link must not be a primary action.");
  process.exit(1);
}

// AI Resources must keep the two groups distinct.
const resourcesForGroups = readFileSync(join(process.cwd(), "app/ai-resources/page.tsx"), "utf8");
for (const [needle, what] of [
  ["Teaching with AI", 'the "Teaching with AI" group'],
  ["Academic integrity and possible concerns", 'the "Academic integrity and possible concerns" group'],
]) {
  if (!resourcesForGroups.includes(needle)) {
    console.error(`AI Resources is missing ${what}. The two must stay separate groups.`);
    process.exit(1);
  }
}
const teachingGroupAt = resourcesForGroups.indexOf("<h2>Teaching with AI</h2>");
const integrityGroupAt = resourcesForGroups.indexOf("<h2>Academic integrity and possible concerns</h2>");
if (teachingGroupAt !== -1 && integrityGroupAt !== -1 && integrityGroupAt < teachingGroupAt) {
  console.error(
    'AI Resources renders "Academic integrity and possible concerns" before "Teaching with AI". ' +
      "Teaching comes first and carries the emphasis.",
  );
  process.exit(1);
}

// The old route was published, so the redirect has to exist. Static export cannot
// emit one, which is why it lives in vercel.json. Both the bare and trailing-slash
// forms are listed because the site sets trailingSlash: true.
//
// Vercel validates vercel.json against its own schema and rejects unknown keys
// inside a redirect — including a "comment" field, which is why the reason for
// this redirect is recorded here and in docs/editorial/ rather than in the JSON.
// A rejected schema fails the deployment, not the build, so it has to be checked
// here to be caught before a push.
const VERCEL_REDIRECT_KEYS = new Set([
  "source",
  "destination",
  "permanent",
  "statusCode",
  "has",
  "missing",
]);
const FORBIDDEN_OUTPUT_DIRECTORIES = new Set(["out", "public", ".next", "website/out"]);
function assertVercelFramework(relPath, parsed) {
  if (parsed.framework !== "nextjs") {
    console.error(
      `${relPath} must set framework to "nextjs". Without it Vercel can treat the project as a ` +
        "generic static site and fail after next build with *No Output Directory named \"public\"*.",
    );
    process.exit(1);
  }
}
function assertWebsiteVercelConfig(relPath, parsed) {
  assertVercelFramework(relPath, parsed);
  if ("outputDirectory" in parsed) {
    console.error(
      `${relPath} must not set outputDirectory. With Root Directory website/, next build writes ` +
        ".next beside next.config.ts and the Next.js builder finds it automatically. Setting out, " +
        "public, or .next here misroutes the deploy step.",
    );
    process.exit(1);
  }
  if (FORBIDDEN_OUTPUT_DIRECTORIES.has(parsed.outputDirectory)) {
    console.error(
      `${relPath} outputDirectory is "${parsed.outputDirectory}", which cannot exist after next build.`,
    );
    process.exit(1);
  }
}
function assertRootVercelConfig(relPath, parsed) {
  assertVercelFramework(relPath, parsed);
  if (parsed.outputDirectory !== "website/.next") {
    console.error(
      `${relPath} must set outputDirectory to "website/.next". npm --workspace website run build ` +
        "writes .next inside website/, not at the repository root. Without this, a project whose " +
        "Root Directory is the repository root fails with *The Next.js output directory \".next\" was " +
        "not found at \"/vercel/path0/.next\"*.",
    );
    process.exit(1);
  }
}
function assertVercelRedirects(relPath, parsed) {
  const vercelRedirects = parsed.redirects ?? [];
  for (const [i, redirect] of vercelRedirects.entries()) {
    for (const key of Object.keys(redirect)) {
      if (!VERCEL_REDIRECT_KEYS.has(key)) {
        console.error(
          `${relPath} redirects[${i}] has the unsupported property "${key}". Vercel rejects the ` +
            "whole configuration on an unknown key, so the deployment fails schema validation even " +
            "though the build succeeds. Allowed keys: " +
            `${[...VERCEL_REDIRECT_KEYS].join(", ")}.`,
        );
        process.exit(1);
      }
    }
    if (!redirect.source || !redirect.destination) {
      console.error(`${relPath} redirects[${i}] needs both a source and a destination.`);
      process.exit(1);
    }
  }
  const oldGuideRedirects = vercelRedirects.filter(
    (r) => r.source === "/learn-ai/student-used-ai" || r.source === "/learn-ai/student-used-ai/",
  );
  if (oldGuideRedirects.length !== 2) {
    console.error(
      `${relPath} must redirect both /learn-ai/student-used-ai and /learn-ai/student-used-ai/ to ` +
        "/learn-ai/students-use-ai-and-learn-law/. That route was published, and Next.js cannot emit " +
        "a redirect under output:\"export\".",
    );
    process.exit(1);
  }
  for (const redirect of oldGuideRedirects) {
    if (redirect.destination !== "/learn-ai/students-use-ai-and-learn-law/") {
      console.error(
        `${relPath} redirects ${redirect.source} to ${redirect.destination}; it must point at ` +
          "/learn-ai/students-use-ai-and-learn-law/.",
      );
      process.exit(1);
    }
    if (redirect.permanent !== true) {
      console.error(
        `${relPath} redirect for ${redirect.source} must be permanent so the published route ` +
          "returns a 308.",
      );
      process.exit(1);
    }
  }
}
function readVercelJson(relPath, assertConfig) {
  const fullPath = join(process.cwd(), relPath);
  if (!existsSync(fullPath)) {
    console.error(`${relPath} is missing. Vercel reads it when the project Root Directory is website/.`);
    process.exit(1);
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(fullPath, "utf8"));
  } catch (err) {
    console.error(`${relPath} is not valid JSON: ${err.message}`);
    process.exit(1);
  }
  assertConfig(relPath, parsed);
  assertVercelRedirects(relPath, parsed);
  return parsed;
}
const websiteVercel = readVercelJson("vercel.json", assertWebsiteVercelConfig);
readVercelJson("../vercel.json", assertRootVercelConfig);
const vercelRedirects = websiteVercel.redirects ?? [];
if (existsSync(join(process.cwd(), "app/learn-ai/student-used-ai"))) {
  console.error(
    "app/learn-ai/student-used-ai/ still exists. Two public copies of the same guide must not " +
      "coexist — the old route redirects instead.",
  );
  process.exit(1);
}

// -----------------------------------------------------------------------------
// Internal links have to resolve.
//
// This exists because of a real bug: the Education Technology page carried a card
// pointing at /learn-ai/student-used-ai for two releases after that guide was
// reframed and its route redirected. Nothing failed — the 308 quietly covered it —
// so the stale card survived, still using the enforcement framing the rewrite
// removed. A link that only works because of a redirect is a link nobody has read
// since the route moved.
//
// Only literal hrefs are checked. Anything built from a record (`${...}`) is
// already validated where the record lives.
// -----------------------------------------------------------------------------
function collectPageSources(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectPageSources(full));
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}
const appDir = join(process.cwd(), "app");
const publicDir = join(process.cwd(), "public");
const appSources = collectPageSources(appDir);
const redirectSources = new Set(
  vercelRedirects.flatMap((r) => [r.source, r.source.replace(/\/$/, "")]),
);

for (const file of appSources) {
  const rel = file.replace(`${process.cwd()}/`, "");
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/href="(\/[^"${}]*)"/g)) {
    const href = match[1];
    const path = href.split("#")[0].split("?")[0].replace(/\/$/, "");

    if (redirectSources.has(path) || redirectSources.has(`${path}/`)) {
      const redirect = vercelRedirects.find((r) => r.source.replace(/\/$/, "") === path);
      console.error(
        `${rel} links "${href}", which vercel.json redirects to "${redirect?.destination}". Point ` +
          "the link at the destination: a link that works only through a redirect is one nobody " +
          "has re-read since the route moved.",
      );
      process.exit(1);
    }

    if (path === "") continue; // "/" and "/#anchor" — the home page.
    // A path with a file extension is an asset in public/, not a route.
    const isAsset = /\.[a-z0-9]{2,5}$/i.test(path);
    const target = isAsset
      ? join(publicDir, path)
      : join(appDir, path, "page.tsx");
    if (!existsSync(target)) {
      console.error(
        `${rel} links "${href}", but ${target.replace(`${process.cwd()}/`, "")} does not exist. ` +
          "Fix the link or add the page.",
      );
      process.exit(1);
    }
  }
}
// -----------------------------------------------------------------------------
// Collections. The records validate their own shape at import; these are the
// checks that need the filesystem or the rendered page source.
//
// The one that matters most: a planned guide must have no route. Four of the five
// guides in Collection 2 are recorded but unwritten, and a directory created "to
// reserve the route" would publish an empty page under a real URL.
// -----------------------------------------------------------------------------
const guidesSource = readFileSync(join(process.cwd(), "app/lib/guides.ts"), "utf8");
const collectionsSource = readFileSync(join(process.cwd(), "app/lib/learnAiCollections.ts"), "utf8");

const plannedSlugs = [
  ...guidesSource.matchAll(/slug:\s*"([a-z0-9-]+)",[\s\S]{0,400}?status:\s*"planned"/g),
]
  .map((m) => m[1])
  // The regex above can span past the end of a record; keep only slugs whose own
  // record is the planned one by re-checking the nearest status after the slug.
  .filter((slug) => {
    const at = guidesSource.indexOf(`slug: "${slug}"`);
    const nextStatus = /status:\s*"(published|planned)"/.exec(guidesSource.slice(at));
    return nextStatus?.[1] === "planned";
  });
if (plannedSlugs.length === 0) {
  console.error(
    "app/lib/guides.ts declares no planned guides. Collection 2 records two; if that changed, " +
      "update this check deliberately.",
  );
  process.exit(1);
}
for (const slug of plannedSlugs) {
  const routeDir = join(process.cwd(), "app/learn-ai", slug);
  if (existsSync(routeDir)) {
    console.error(
      `app/learn-ai/${slug}/ exists, but "${slug}" is a planned guide. A planned guide must have no ` +
        "route: an empty page under a real URL is worse than no page.",
    );
    process.exit(1);
  }
}

// Collection 1 is complete at six guides. This is the guard against the whole
// point of the second collection being undone by appending a seventh here.
const coreCollectionOrders = [
  ...guidesSource.matchAll(/collectionId:\s*"core-ai-decisions",\s*\n\s*collectionOrder:\s*(\d+)/g),
].map((m) => Number(m[1]));
if (coreCollectionOrders.length !== 6) {
  console.error(
    `app/lib/guides.ts assigns ${coreCollectionOrders.length} guides to core-ai-decisions. That ` +
      "collection is complete at six — a new guide belongs in another collection.",
  );
  process.exit(1);
}

// The internal guide number must never reach a reader. "Guide 7", "Lesson 7",
// "Module 7" and "7 of 11" are all ways the global position could leak into copy.
const learnAiPages = [
  join(process.cwd(), "app/learn-ai/page.tsx"),
  ...readdirSync(join(process.cwd(), "app/learn-ai"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(process.cwd(), "app/learn-ai", entry.name, "page.tsx"))
    .filter((file) => existsSync(file)),
];
const GLOBAL_NUMBER_LEAKS = [
  /\bGuide\s+(7|8|9|1[01])\b/,
  /\b(Lesson|Module)\s+\d+\b/,
  /\bguide\s+\d+\s+of\s+(11|12)\b/i,
  /\bglobalOrder\s*\}/,
];
for (const file of [...learnAiPages, join(process.cwd(), "app/page.tsx")]) {
  const source = readFileSync(file, "utf8");
  const rel = file.replace(`${process.cwd()}/`, "");
  for (const pattern of GLOBAL_NUMBER_LEAKS) {
    const hit = pattern.exec(source);
    if (hit) {
      console.error(
        `${rel} displays "${hit[0]}". A reader sees a guide's position inside its collection ` +
          '("Guide 1 of 5") and never the internal number across collections.',
      );
      process.exit(1);
    }
  }
}

// The continuation card on guide 6 must stay a separate card that is not labelled
// as the next guide, and must not be nested inside the completion card.
const guideSixSource = readFileSync(
  join(process.cwd(), "app/learn-ai/students-use-ai-and-learn-law/page.tsx"),
  "utf8",
);
if (!/<CollectionContinuationCard/.test(guideSixSource)) {
  console.error(
    "app/learn-ai/students-use-ai-and-learn-law/page.tsx no longer renders the Collection 2 " +
      "continuation card, so a reader who finishes the first collection is told nothing about the second.",
  );
  process.exit(1);
}
if (!/<SeriesCompletion/.test(guideSixSource)) {
  console.error(
    "app/learn-ai/students-use-ai-and-learn-law/page.tsx no longer renders the Collection 1 " +
      "completion card. That card stays intact.",
  );
  process.exit(1);
}
{
  const completionAt = guideSixSource.indexOf("<GuideSeriesStatus");
  const continuationAt = guideSixSource.indexOf("<CollectionContinuationCard");
  if (continuationAt < completionAt) {
    console.error(
      "the Collection 2 continuation card renders before the Collection 1 completion card. The " +
        "completed collection comes first.",
    );
    process.exit(1);
  }
  // Nesting it inside the completion card's `completion` prop would make the new
  // collection read as part of the finished one.
  const completionProp = guideSixSource.slice(completionAt, continuationAt);
  if (/completion=\{[\s\S]*<CollectionContinuationCard/.test(completionProp)) {
    console.error("the continuation card must not be nested inside the completion card");
    process.exit(1);
  }
}
const continuationSource = readFileSync(
  join(process.cwd(), "app/components/GuideCollections.tsx"),
  "utf8",
);
// Comments come out first: the comment above the component explains that it is
// *not* a next-guide link, and a guard its own rationale trips is a guard people
// learn to work around.
const continuationCode = continuationSource
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^[ \t]*\/\/.*$/gm, "");
// Scoped to the continuation card's own body: the navigation component further
// down the same file legitimately says "Next guide" about a published next guide
// inside one collection, which is a different thing entirely.
const continuationStart = continuationCode.indexOf("export function CollectionContinuationCard");
const continuationEnd = continuationCode.indexOf("export function", continuationStart + 1);
const continuationBody = continuationCode.slice(
  continuationStart,
  continuationEnd === -1 ? undefined : continuationEnd,
);
if (/Next guide/i.test(continuationBody)) {
  console.error(
    'the continuation card labels the new collection "Next guide". It is a separate collection, not ' +
      "the next step of a finished one.",
  );
  process.exit(1);
}
// A planned card must never become a link.
if (/plannedGuideCard[\s\S]{0,400}<Link/.test(continuationCode)) {
  console.error(
    "app/components/GuideCollections.tsx renders a planned guide card as a link. A planned guide has " +
      "no route: no href, no \"#\", no disabled button.",
  );
  process.exit(1);
}
if (/href="#"/.test(continuationCode)) {
  console.error('app/components/GuideCollections.tsx uses href="#" — a link to nowhere.');
  process.exit(1);
}

// The critical-review guide: no model call, no detector, no scoring, no upload.
const criticalReviewFiles = [
  "app/components/CriticalReview.tsx",
  "app/learn-ai/why-does-it-agree-with-me/page.tsx",
  "app/lib/aiAgreementTypes.ts",
  "app/lib/criticalReviewFramework.ts",
  "app/lib/criticalReviewPrompts.ts",
  "app/lib/promptComparisonExercise.ts",
];
for (const rel of criticalReviewFiles) {
  const source = readFileSync(join(process.cwd(), rel), "utf8");
  for (const [pattern, why] of [
    [/\bfetch\s*\(/, "a network call"],
    [/api\.(openai|anthropic)\.com/, "a model endpoint"],
    [/<form\b/i, "a form"],
    [/<input\b/i, "an input"],
    [/<textarea\b/i, "a textarea"],
    [/\btype="file"/i, "an upload control"],
    [/\bfunction (score|detect|rate|classify)[A-Z]/, "a scoring or detection function"],
    [/\bsycophancyScore\b|\bdetectSycophancy\b/i, "a sycophancy detector"],
  ]) {
    if (pattern.test(source)) {
      console.error(
        `${rel} contains ${why}. This guide teaches a method: it must not call a model, collect ` +
          "faculty material, or score a response.",
      );
      process.exit(1);
    }
  }
}

// Three copy controls on one page need three distinct accessible names, or a
// reader navigating by button list is offered the same control twice.
{
  const componentSource = readFileSync(join(process.cwd(), "app/components/CriticalReview.tsx"), "utf8");
  const copyLabels = [
    ...componentSource.matchAll(/copyLabel=(?:"([^"]+)"|\{[^}]*copyButtonLabel[^}]*\})/g),
  ].map((m) => m[1] ?? "record-supplied");
  const literalLabels = copyLabels.filter((l) => l !== "record-supplied");
  if (new Set(literalLabels).size !== literalLabels.length) {
    console.error(
      `app/components/CriticalReview.tsx repeats a copy-button label (${literalLabels.join(", ")}). ` +
        "Each copy control needs a unique accessible name.",
    );
    process.exit(1);
  }
  const exerciseSource = readFileSync(
    join(process.cwd(), "app/lib/promptComparisonExercise.ts"),
    "utf8",
  );
  const recordLabels = [...exerciseSource.matchAll(/copyButtonLabel:\s*"([^"]+)"/g)].map((m) => m[1]);
  const allLabels = [...literalLabels, ...recordLabels];
  if (new Set(allLabels).size !== allLabels.length) {
    console.error(
      `two copy controls share an accessible name (${allLabels.join(" / ")}). The exercise's prompts ` +
        "and the reusable prompt must be distinguishable by name alone.",
    );
    process.exit(1);
  }
}

// The framework's public label. "You decide" is who is accountable, so a page that
// renamed the last step would invert the guide.
if (!/You decide/.test(readFileSync(join(process.cwd(), "app/lib/criticalReviewFramework.ts"), "utf8"))) {
  console.error('the critical-review framework no longer ends with "You decide".');
  process.exit(1);
}
for (const banned of [
  "AI decides",
  "the model decides",
  "let the model decide",
  "the AI makes the decision",
]) {
  for (const rel of criticalReviewFiles) {
    const source = readFileSync(join(process.cwd(), rel), "utf8");
    // The banned phrase may appear inside a validator that forbids it, so only
    // count it outside a regex literal or an error message.
    const stripped = source
      .replace(/\/[^\n/]*\\b[^\n]*\/[gimsuy]*/g, "")
      .replace(/errors\.push\([\s\S]*?\);/g, "");
    if (new RegExp(`\\b${banned}\\b`, "i").test(stripped)) {
      console.error(`${rel} says "${banned}". The consequential decision stays with the person.`);
      process.exit(1);
    }
  }
}

// No model or vendor ranking may enter this guide's copy.
const guidePageSource = readFileSync(
  join(process.cwd(), "app/learn-ai/why-does-it-agree-with-me/page.tsx"),
  "utf8",
);
for (const pattern of [
  /\bmost honest model\b/i,
  /\bleast sycophantic\b/i,
  /\bbest model for\b/i,
  /\btruthfulness ranking\b/i,
  /\bwe recommend (using )?(ChatGPT|Claude|Gemini|Copilot)\b/i,
]) {
  if (pattern.test(guidePageSource)) {
    console.error(
      "app/learn-ai/why-does-it-agree-with-me/page.tsx ranks or recommends a product. The sources " +
        "behind this guide are a study and two incident reports, and neither supports a ranking.",
    );
    process.exit(1);
  }
}
// The guide must keep the qualification on both dated vendor sources.
for (const [needle, why] of [
  ["does not establish that every agreeable answer is sycophantic", "the Anthropic study's limit"],
  ["must not be generalized to every OpenAI model", "the OpenAI incident's limit"],
]) {
  if (!guidesSource.includes(needle)) {
    console.error(`app/lib/guides.ts no longer states ${why} in the guide's source notes.`);
    process.exit(1);
  }
}

// Discoverability for the new collection.
for (const [file, needle, message] of [
  ["app/learn-ai/page.tsx", "publicCollections", "the Learn AI page no longer groups guides by collection"],
  // The homepage no longer lists the collections' guides — it states how many
  // there are, on the lessons card, from the collection records.
  ["app/page.tsx", "collectionCount", "the homepage no longer counts the collections"],
  ["app/ai-resources/page.tsx", "why-does-it-agree-with-me", "AI Resources no longer links the critical-review guide"],
  ["app/ai-resources/page.tsx", "uit.stanford.edu/ai/prompt-guide", "AI Resources no longer lists the Stanford GenAI Prompt Guide"],
]) {
  const source = readFileSync(join(process.cwd(), file), "utf8");
  if (!source.includes(needle)) {
    console.error(`${message} (expected "${needle}" in ${file}).`);
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
// The context guide's dated insert. Product behavior is the most perishable
// content on the site, so it is separated from the durable guide, and these checks
// keep it separated: no product sentence in the guide's prose, no scraping at build
// time, and no context-window number anywhere.
// -----------------------------------------------------------------------------
const contextGuidePath = join(process.cwd(), "app/learn-ai/why-did-it-forget/page.tsx");
if (existsSync(contextGuidePath)) {
  const contextGuideSource = readFileSync(contextGuidePath, "utf8");
  const featuresSource = readFileSync(
    join(process.cwd(), "app/lib/currentContextFeatures.ts"),
    "utf8",
  );
  const contextComponentSource = readFileSync(
    join(process.cwd(), "app/components/ContextGuide.tsx"),
    "utf8",
  );

  // Current product behavior must not migrate into the durable page. Naming a
  // product's current menu in the guide's prose is how a page goes stale without
  // any review date noticing.
  const guideProse = contextGuideSource
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  for (const productTerm of [
    "Memories panel",
    "File Search",
    "Temporary Chat",
    "project instructions apply only",
    "deleted daily",
  ]) {
    if (guideProse.includes(productTerm)) {
      console.error(
        `app/learn-ai/why-did-it-forget/page.tsx mentions "${productTerm}" in the durable guide. ` +
          "Current product behavior belongs in app/lib/currentContextFeatures.ts, which carries a " +
          "review date and withholds itself when stale.",
      );
      process.exit(1);
    }
  }

  // No context-window size anywhere in the guide, the insert, or the components:
  // a number like that is stale within weeks and invites a ranking.
  for (const [label, source] of [
    ["app/learn-ai/why-did-it-forget/page.tsx", guideProse],
    ["app/lib/currentContextFeatures.ts", featuresSource],
    ["app/components/ContextGuide.tsx", contextComponentSource],
  ]) {
    const hit = /\b\d[\d,.]*\s*(k|m)?\s*(tokens?|token (window|limit))\b/i.exec(source);
    if (hit) {
      console.error(
        `${label} states a context size ("${hit[0]}"). Describe what to inspect instead — an exact ` +
          "limit dates immediately and turns the section into a comparison.",
      );
      process.exit(1);
    }
  }

  // The insert's freshness fields and stale behavior have to survive.
  for (const [needle, why] of [
    ["reviewBy:", "the insert's review date"],
    ["staleMessage:", "the stale message"],
    ["displayableContextFeatures", "the freshness gate"],
  ]) {
    if (!featuresSource.includes(needle)) {
      console.error(`app/lib/currentContextFeatures.ts no longer defines ${why}.`);
      process.exit(1);
    }
  }
  // The component must read through the gate rather than the raw records, or an
  // expired insert would keep asserting current behavior.
  if (!/displayableContextFeatures\(\)/.test(contextComponentSource)) {
    console.error(
      "app/components/ContextGuide.tsx renders feature records without the freshness gate. Read " +
        "displayableContextFeatures() so a stale insert withholds its summaries.",
    );
    process.exit(1);
  }
  if (/contextFeatureRecords\.map/.test(contextComponentSource)) {
    console.error(
      "app/components/ContextGuide.tsx maps the raw feature records, bypassing the freshness gate.",
    );
    process.exit(1);
  }

  // Nothing in this guide inspects, uploads, counts, or calls.
  for (const rel of [
    "app/components/ContextGuide.tsx",
    "app/learn-ai/why-did-it-forget/page.tsx",
    "app/lib/aiContextLocations.ts",
    "app/lib/contextRecoveryWorkflow.ts",
    "app/lib/contextReceiptExercise.ts",
    "app/lib/contextReceiptPrompts.ts",
    "app/lib/currentContextFeatures.ts",
  ]) {
    const source = readFileSync(join(process.cwd(), rel), "utf8");
    for (const [pattern, why] of [
      [/\bfetch\s*\(/, "a network call"],
      [/api\.(openai|anthropic)\.com/, "a model endpoint"],
      [/<form\b/i, "a form"],
      [/<input\b/i, "an input"],
      [/<textarea\b/i, "a textarea"],
      [/\btype="file"/i, "an upload control"],
      [/\bfunction (countTokens|tokenCount|inspectContext|auditMemory)/i, "a counter or inspector"],
      [/\bcompletenessScore\b|\bcontextScore\b/i, "a context score"],
    ]) {
      if (pattern.test(source)) {
        console.error(
          `${rel} contains ${why}. This guide teaches a method: no context inspector, token counter, ` +
            "memory auditor, upload field, or model call.",
        );
        process.exit(1);
      }
    }
  }

  // Copy controls across both Collection 2 guides must stay distinguishable.
  const contextCopyLabels = [
    ...contextComponentSource.matchAll(/copyLabel=(?:"([^"]+)"|\{[^}]*\})/g),
  ]
    .map((m) => m[1])
    .filter(Boolean);
  const exerciseCopyLabel = /buttonLabel:\s*"([^"]+)"/.exec(
    readFileSync(join(process.cwd(), "app/lib/contextReceiptExercise.ts"), "utf8"),
  )?.[1];
  const allContextLabels = [...contextCopyLabels, exerciseCopyLabel].filter(Boolean);
  if (new Set(allContextLabels).size !== allContextLabels.length) {
    console.error(
      `two copy controls on the context guide share an accessible name (${allContextLabels.join(" / ")}).`,
    );
    process.exit(1);
  }

  // Guide 1 must point forward to guide 2 now that it is published.
  const guideOneSource = readFileSync(
    join(process.cwd(), "app/learn-ai/why-does-it-agree-with-me/page.tsx"),
    "utf8",
  );
  if (!guideOneSource.includes("/learn-ai/why-did-it-forget")) {
    console.error(
      "app/learn-ai/why-does-it-agree-with-me/page.tsx no longer links guide 2. A published next " +
        "guide must be reachable from the guide before it.",
    );
    process.exit(1);
  }
  if (!/nextDescription=/.test(guideOneSource)) {
    console.error(
      "guide 1's forward link has no description. A published next guide should say what it covers.",
    );
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
// The confidence guide (Collection 2, guide 3).
//
// The structural risk here is the simulated response. It is staff-written and
// deliberately false — an exact percentage with no method, a universal claim, an
// overbroad policy inference — so it must stay inside the data record, behind the
// component that always prints the simulation label and data-nosnippet. A literal
// copy in the page could reach a meta description, an Open Graph string, or the
// search index, and the page would become a source of the thing it teaches people
// to catch.
//
// The second risk is subtler: a guide about confidence that acquired a scorer, a
// classifier, or a model call would be teaching the opposite of its own lesson.
// -----------------------------------------------------------------------------
const confidenceGuidePath = join(process.cwd(), "app/learn-ai/why-does-it-sound-so-certain/page.tsx");
if (existsSync(confidenceGuidePath)) {
  const confidenceGuideSource = readFileSync(confidenceGuidePath, "utf8");
  const confidenceComponentSource = readFileSync(
    join(process.cwd(), "app/components/ConfidenceGuide.tsx"),
    "utf8",
  );
  const confidenceExerciseSource = readFileSync(
    join(process.cwd(), "app/lib/confidenceAuditExercise.ts"),
    "utf8",
  );
  const claimStatusSource = readFileSync(join(process.cwd(), "app/lib/aiClaimStatuses.ts"), "utf8");
  const evidenceFrameworkSource = readFileSync(
    join(process.cwd(), "app/lib/evidenceUncertaintyFramework.ts"),
    "utf8",
  );
  const evidencePromptSource = readFileSync(
    join(process.cwd(), "app/lib/evidenceUncertaintyPrompts.ts"),
    "utf8",
  );

  // The simulated claims live in one file. A second copy in the page could not be
  // held to the label, the snippet exclusion, or the search exclusion.
  for (const fiction of [
    "improve students’ critical thinking by 30%",
    "benefit every student",
    "without a pilot",
    "by 30%",
  ]) {
    if (confidenceGuideSource.includes(fiction)) {
      console.error(
        `The confidence guide contains the simulated string "${fiction}" as page source. Render it ` +
          `only through the exercise component so the simulation label, data-nosnippet, and the ` +
          `search and structured-data exclusions always travel with it.`,
      );
      process.exit(1);
    }
  }
  // Nothing deliberately false may reach a description a crawler or a card reads.
  const metadataBlock = /export const metadata[\s\S]*?\n};/.exec(confidenceGuideSource)?.[0] ?? "";
  if (/\d+%/.test(metadataBlock)) {
    console.error(
      "the confidence guide's metadata contains a percentage. The meta description and Open Graph " +
        "strings describe the method, never the simulated response.",
    );
    process.exit(1);
  }
  // The simulated response must never be indexed. The search page reads guide
  // summaries and search terms; importing the exercise record would change that.
  const searchSource = readFileSync(join(process.cwd(), "app/search/page.tsx"), "utf8");
  if (/confidenceAuditExercise|simulatedResponse/.test(searchSource)) {
    console.error(
      "app/search/page.tsx reads the confidence-audit exercise. The simulated response stays out of " +
        "site search: it is deliberately unsupported text.",
    );
    process.exit(1);
  }
  if (/simulatedResponse|by 30%/.test(guidesSource)) {
    console.error(
      "app/lib/guides.ts contains the simulated response. The guide record feeds search, the " +
        "sitemap, and every summary the site quotes.",
    );
    process.exit(1);
  }

  // The label, the snippet exclusion, and the exclusion flags on the record.
  if (!/data-nosnippet/.test(confidenceComponentSource)) {
    console.error(
      "app/components/ConfidenceGuide.tsx no longer wraps the simulated response in data-nosnippet.",
    );
    process.exit(1);
  }
  {
    // The label has to precede the response in the DOM and name it for a screen
    // reader — a label that only looks like a warning is not one.
    const labelAt = confidenceComponentSource.indexOf("simulated-confidence-label");
    const responseAt = confidenceComponentSource.indexOf("ex.simulatedResponse");
    if (labelAt === -1 || responseAt === -1 || labelAt > responseAt) {
      console.error(
        "the simulation label must be rendered, and rendered before the simulated response, with the " +
          "two programmatically associated.",
      );
      process.exit(1);
    }
    if (!/aria-labelledby="simulated-confidence-label"/.test(confidenceComponentSource)) {
      console.error("the simulated response is not programmatically associated with its label.");
      process.exit(1);
    }
  }
  for (const flag of [
    "excludeFromInternalSearch: true",
    "excludeFromStructuredData: true",
    "useDataNoSnippet: true",
    "staffReviewRequired: true",
    "simulated: true",
    "fictional: true",
    "publicLowRisk: true",
  ]) {
    if (!confidenceExerciseSource.includes(flag)) {
      console.error(
        `app/lib/confidenceAuditExercise.ts no longer records "${flag}". The exclusions travel with ` +
          "the simulated response or it stops being safe to publish.",
      );
      process.exit(1);
    }
  }
  // The exercise carries its own review dates, like every other dated record.
  const confidenceReviewedOn = /reviewedOn:\s*"(\d{4}-\d{2}-\d{2})"/.exec(confidenceExerciseSource)?.[1];
  const confidenceReviewBy = /reviewBy:\s*"(\d{4}-\d{2}-\d{2})"/.exec(confidenceExerciseSource)?.[1];
  if (!confidenceReviewedOn || !confidenceReviewBy) {
    console.error("app/lib/confidenceAuditExercise.ts is missing a reviewedOn or reviewBy date.");
    process.exit(1);
  }
  if (today > confidenceReviewBy) {
    console.warn(
      `WARNING: the simulated confidence-audit exercise is overdue for review ` +
        `(reviewBy ${confidenceReviewBy}, today ${today}).\n` +
        `         Re-read the scenario and answer key in app/lib/confidenceAuditExercise.ts.`,
    );
  }

  // Nothing in this guide scores, classifies, measures, uploads, or calls.
  for (const rel of [
    "app/components/ConfidenceGuide.tsx",
    "app/learn-ai/why-does-it-sound-so-certain/page.tsx",
    "app/lib/aiClaimStatuses.ts",
    "app/lib/evidenceUncertaintyFramework.ts",
    "app/lib/confidenceAuditExercise.ts",
    "app/lib/evidenceUncertaintyPrompts.ts",
  ]) {
    const source = readFileSync(join(process.cwd(), rel), "utf8");
    for (const [pattern, why] of [
      [/\bfetch\s*\(/, "a network call"],
      [/api\.(openai|anthropic)\.com/, "a model endpoint"],
      [/<form\b/i, "a form"],
      [/<input\b/i, "an input"],
      [/<textarea\b/i, "a textarea"],
      [/\btype="file"/i, "an upload control"],
      [/\bfunction (score|detect|rate|classify|predict)[A-Z]/, "a scoring or classifying function"],
      [/\bconfidenceScore\b|\bclassifyClaim\b|\bhallucinationScore\b/i, "a confidence scorer or claim classifier"],
    ]) {
      if (pattern.test(source)) {
        console.error(
          `${rel} contains ${why}. This guide teaches a method: no confidence scorer, claim ` +
            "classifier, correctness service, upload field, or model call.",
        );
        process.exit(1);
      }
    }
  }

  // The framework's public label and the closing line. Renaming either would
  // change what a reader carries away from the page.
  if (!/Claim\. Evidence\. Uncertainty\. Next check\./.test(evidenceFrameworkSource)) {
    console.error(
      'the evidence-and-uncertainty framework no longer reads "Claim. Evidence. Uncertainty. Next check."',
    );
    process.exit(1);
  }
  if (!/Confident wording is not evidence\./.test(confidenceGuideSource)) {
    console.error('the confidence guide no longer closes with "Confident wording is not evidence."');
    process.exit(1);
  }

  // The nine ledger sections and the calibration precondition in the prompt.
  for (const section of [
    "1. CLAIM",
    "2. STATUS",
    "3. EVIDENCE",
    "4. EVIDENCE BOUNDARY",
    "5. UNCERTAINTY",
    "6. PRECISION CHECK",
    "7. DISCONFIRMING EVIDENCE",
    "8. NEXT CHECK",
    "9. REVISED WORDING",
  ]) {
    if (!evidencePromptSource.includes(section)) {
      console.error(`the evidence-and-uncertainty prompt is missing its "${section}" section.`);
      process.exit(1);
    }
  }
  for (const [needle, why] of [
    ["SOURCE NEEDED", "the instruction to mark unsupported claims"],
    ["Do not invent a citation or source", "the prohibition on invented citations"],
    ["The calibration method", "the calibration precondition for a numeric percentage"],
    ["Do not present the ledger as independent verification", "the denial that the ledger verifies"],
  ]) {
    if (!evidencePromptSource.includes(needle)) {
      console.error(`the evidence-and-uncertainty prompt no longer states ${why} ("${needle}").`);
      process.exit(1);
    }
  }

  // Claims the guide exists to correct. Shipping one would teach the opposite.
  const confidenceProse = confidenceGuideSource
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  for (const [pattern, why] of [
    [/\bconfident answers are (usually|probably|often) wrong\b/i, "says confident answers are usually wrong"],
    [/\b(hesitant|cautious) answers are more (reliable|accurate|trustworthy)\b/i, "treats hesitancy as accuracy"],
    [/\bconfidence percentages are always (fabricated|meaningless)\b/i, "calls every percentage fabricated"],
    [/\bevery (language )?model is overconfident\b/i, "generalizes overconfidence to every model"],
    [/\bthe (model|system) knows how uncertain it is\b/i, "claims the system knows its own uncertainty"],
    [/\b(a )?(citation|source link) (proves|makes) the (claim|characterization) (certain|true)\b/i, "treats a citation as proof"],
    [/\bexact numbers are always hallucinations\b/i, "calls every exact number a hallucination"],
    [/\bthe ledger verifies\b/i, "presents the ledger as verification"],
    [/\bmost calibrated (model|product|vendor)\b/i, "ranks a vendor by calibration"],
    [/\bleast hallucinating\b/i, "ranks a vendor by hallucination"],
    [/\bwe recommend (using )?(ChatGPT|Claude|Gemini|Copilot)\b/i, "recommends a product"],
    [/\bthe Law Library (certifies|verifies) the (output|answer)\b/i, "has the Law Library certify output"],
  ]) {
    if (pattern.test(confidenceProse)) {
      console.error(
        `app/learn-ai/why-does-it-sound-so-certain/page.tsx ${why}. The sources behind this guide are ` +
          "dated studies of specified models and tasks, and none of them supports that claim.",
      );
      process.exit(1);
    }
  }
  // Calibration has to be defined as a repeated-case relationship, or the word
  // becomes a synonym for "the number sounded reasonable".
  if (!/measured across many comparable cases/i.test(confidenceProse)) {
    console.error(
      "the confidence guide no longer defines calibration as a relationship measured across many " +
        "comparable cases. Without that, the section teaches a word rather than a check.",
    );
    process.exit(1);
  }

  // Copy controls on this page need distinct accessible names.
  const confidenceCopyLabels = [
    ...confidenceComponentSource.matchAll(/copyLabel=(?:"([^"]+)"|\{[^}]*\})/g),
  ]
    .map((m) => m[1])
    .filter(Boolean);
  const ledgerLabel = /buttonLabel:\s*"([^"]+)"/.exec(confidenceExerciseSource)?.[1];
  const allConfidenceLabels = [...confidenceCopyLabels, ledgerLabel].filter(Boolean);
  if (new Set(allConfidenceLabels).size !== allConfidenceLabels.length) {
    console.error(
      `two copy controls on the confidence guide share an accessible name ` +
        `(${allConfidenceLabels.join(" / ")}).`,
    );
    process.exit(1);
  }

  // Guide 2 must point forward to guide 3 now that it is published, and guide 3
  // must point back. A one-way link leaves a reader at a dead end.
  const guideTwoSource = readFileSync(contextGuidePath, "utf8");
  if (!guideTwoSource.includes("/learn-ai/why-does-it-sound-so-certain")) {
    console.error(
      "app/learn-ai/why-did-it-forget/page.tsx no longer links guide 3. A published next guide must " +
        "be reachable from the guide before it.",
    );
    process.exit(1);
  }
  if (!/nextDescription=/.test(guideTwoSource)) {
    console.error(
      "guide 2's forward link has no description. A published next guide should say what it covers.",
    );
    process.exit(1);
  }
  if (!confidenceGuideSource.includes("/learn-ai/why-did-it-forget")) {
    console.error("the confidence guide no longer links back to guide 2.");
    process.exit(1);
  }
  // Guide 2 must not grow a second copy of guide 3's frameworks.
  for (const duplicated of ["Unsupported precision", "claim status", "Directly supported"]) {
    if (guideTwoSource.includes(duplicated)) {
      console.error(
        `app/learn-ai/why-did-it-forget/page.tsx contains "${duplicated}". Guide 3's claim-status and ` +
          "uncertainty frameworks live on guide 3; guide 2 links to them.",
      );
      process.exit(1);
    }
  }
  // The three links the guide is required to offer.
  for (const [href, why] of [
    ["/learn-ai/what-can-i-safely-share", "the safe-sharing guide"],
    ["/learn-ai/why-did-it-forget", "the context guide"],
    ["/learn-ai/verify-an-ai-legal-claim", "the legal-verification guide"],
  ]) {
    if (!confidenceGuideSource.includes(href)) {
      console.error(`the confidence guide no longer links ${why} (${href}).`);
      process.exit(1);
    }
  }
  // Discoverability.
  for (const [file, needle, message] of [
    ["app/ai-resources/page.tsx", "why-does-it-sound-so-certain", "AI Resources no longer links the confidence guide"],
    ["app/ai-resources/page.tsx", "nist.gov/publications/artificial-intelligence-risk-management-framework", "AI Resources no longer lists the NIST Generative AI Profile"],
  ]) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    if (!source.includes(needle)) {
      console.error(`${message} (expected "${needle}" in ${file}).`);
      process.exit(1);
    }
  }
  // The five claim statuses and four framework steps stay in one record each.
  for (const [source, label, ids] of [
    [claimStatusSource, "app/lib/aiClaimStatuses.ts", [
      "directly-supported",
      "interpretation",
      "prediction-estimate",
      "recommendation-value",
      "unknown-source-needed",
    ]],
    [evidenceFrameworkSource, "app/lib/evidenceUncertaintyFramework.ts", [
      "name-the-claim",
      "show-the-evidence",
      "bound-the-uncertainty",
      "define-next-check",
    ]],
  ]) {
    for (const id of ids) {
      if (!source.includes(`id: "${id}"`)) {
        console.error(`${label} no longer defines the "${id}" record.`);
        process.exit(1);
      }
    }
  }
  if (!/orderedClaimStatuses\(\)/.test(confidenceComponentSource)) {
    console.error(
      "app/components/ConfidenceGuide.tsx renders claim statuses without reading the ordered record.",
    );
    process.exit(1);
  }
}

console.log(
  `Collections: ${(collectionsSource.match(/ordinal:\s*\d+,/g) ?? []).length} recorded; ` +
    `${coreCollectionOrders.length} guides in the complete first collection; ` +
    `${plannedSlugs.length} planned guide(s) with no route.`,
);

// -----------------------------------------------------------------------------
// Tutorial library. The record in app/lib/tutorialLibrary.ts validates its own
// shape at import, but it cannot read the filesystem — it is imported by the
// client-side search page. So the file-on-disk checks live here: a tutorial whose
// PDF is missing, renamed, or a different size than the record claims would ship
// a broken download and a page asserting a page count and file size for a file
// that no longer exists.
// -----------------------------------------------------------------------------
const tutorialSource = readFileSync(join(process.cwd(), "app/lib/tutorialLibrary.ts"), "utf8");
const tutorialFileBlocks = [...tutorialSource.matchAll(/file:\s*\{([^}]*)\}/g)].map((m) => m[1]);
if (!tutorialFileBlocks.length) {
  console.error("app/lib/tutorialLibrary.ts declares no tutorial files.");
  process.exit(1);
}
let checkedTutorialFiles = 0;
for (const block of tutorialFileBlocks) {
  const name = /name:\s*"([^"]+)"/.exec(block)?.[1];
  const declaredBytes = Number(/bytes:\s*([\d_]+)/.exec(block)?.[1]?.replace(/_/g, "") ?? NaN);
  const declaredPages = Number(/pages:\s*(\d+)/.exec(block)?.[1] ?? NaN);
  if (!name || !Number.isFinite(declaredBytes) || !Number.isFinite(declaredPages)) {
    console.error(
      "a tutorial file record is missing its name, bytes, or pages: " + block.trim().slice(0, 120),
    );
    process.exit(1);
  }
  const filePath = join(process.cwd(), "public/tutorials", name);
  if (!existsSync(filePath)) {
    console.error(
      `tutorial file public/tutorials/${name} does not exist, so the download link would 404.`,
    );
    process.exit(1);
  }
  const actualBytes = statSync(filePath).size;
  if (actualBytes !== declaredBytes) {
    console.error(
      `tutorial file ${name} is ${actualBytes} bytes on disk but the record says ${declaredBytes}. ` +
        "The page shows the recorded size, so update the record when the document is replaced.",
    );
    process.exit(1);
  }
  // A renamed or re-exported file that is no longer a PDF would render an empty
  // preview box with no other symptom.
  const header = readFileSync(filePath).subarray(0, 5).toString("latin1");
  if (!header.startsWith("%PDF")) {
    console.error(`tutorial file ${name} does not begin with %PDF, so it is not a usable PDF.`);
    process.exit(1);
  }
  checkedTutorialFiles += 1;
}

// The first-page image is the only preview some browsers will show, and its
// recorded dimensions are rendered as width/height attributes — wrong numbers
// mean the page reflows when the image loads. PNG stores its real size in the
// IHDR chunk, 16 bytes in, so this is checkable rather than assumed.
const tutorialCoverBlocks = [...tutorialSource.matchAll(/cover:\s*\{([^}]*)\}/g)].map((m) => m[1]);
if (tutorialCoverBlocks.length !== tutorialFileBlocks.length) {
  console.error(
    `app/lib/tutorialLibrary.ts declares ${tutorialFileBlocks.length} tutorial file(s) but ` +
      `${tutorialCoverBlocks.length} cover image(s). Every tutorial needs a first-page image.`,
  );
  process.exit(1);
}
for (const block of tutorialCoverBlocks) {
  const coverPath = /path:\s*"([^"]+)"/.exec(block)?.[1];
  const declaredWidth = Number(/width:\s*(\d+)/.exec(block)?.[1] ?? NaN);
  const declaredHeight = Number(/height:\s*(\d+)/.exec(block)?.[1] ?? NaN);
  if (!coverPath || !Number.isFinite(declaredWidth) || !Number.isFinite(declaredHeight)) {
    console.error("a tutorial cover record is missing its path, width, or height.");
    process.exit(1);
  }
  const coverFile = join(process.cwd(), "public", coverPath.replace(/^\//, ""));
  if (!existsSync(coverFile)) {
    console.error(`tutorial cover image ${coverPath} does not exist.`);
    process.exit(1);
  }
  if (coverPath.endsWith(".png")) {
    const head = readFileSync(coverFile).subarray(0, 24);
    if (head.subarray(1, 4).toString("latin1") !== "PNG") {
      console.error(`tutorial cover image ${coverPath} is not a PNG.`);
      process.exit(1);
    }
    const actualWidth = head.readUInt32BE(16);
    const actualHeight = head.readUInt32BE(20);
    if (actualWidth !== declaredWidth || actualHeight !== declaredHeight) {
      console.error(
        `tutorial cover image ${coverPath} is ${actualWidth}×${actualHeight} but the record says ` +
          `${declaredWidth}×${declaredHeight}. The numbers are rendered as width/height ` +
          "attributes, so a mismatch makes the page reflow when the image loads.",
      );
      process.exit(1);
    }
  }
}

// The two things a tutorial page exists to do. Losing either one silently turns
// the page into a description of a document nobody can read.
const tutorialPageDir = join(process.cwd(), "app/tutorials");
const tutorialPages = existsSync(tutorialPageDir)
  ? readdirSync(tutorialPageDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(tutorialPageDir, entry.name, "page.tsx"))
      .filter((file) => existsSync(file))
  : [];
if (!tutorialPages.length) {
  console.error("app/tutorials/ contains no tutorial detail page.");
  process.exit(1);
}
for (const file of tutorialPages) {
  const source = readFileSync(file, "utf8");
  const rel = file.replace(`${process.cwd()}/`, "");
  if (!/<TutorialActions/.test(source)) {
    console.error(`${rel} does not render <TutorialActions>, so the document cannot be downloaded.`);
    process.exit(1);
  }
  if (!/<TutorialPreview/.test(source)) {
    console.error(`${rel} does not render <TutorialPreview>, so the document cannot be previewed.`);
    process.exit(1);
  }
  if (!/<TutorialFacts/.test(source)) {
    console.error(
      `${rel} does not render <TutorialFacts>, so the page states no dates, length, or file size.`,
    );
    process.exit(1);
  }
}
const tutorialIndexSource = readFileSync(join(tutorialPageDir, "page.tsx"), "utf8");
if (!/<TutorialCard/.test(tutorialIndexSource)) {
  console.error("app/tutorials/page.tsx does not render tutorial cards.");
  process.exit(1);
}

// The library collects nothing and calls nothing: the download is an anchor to a
// file in the export, and the preview draws the same file in the page.
const tutorialComponentSource = readFileSync(
  join(process.cwd(), "app/components/TutorialLibrary.tsx"),
  "utf8",
);
for (const [pattern, why] of [
  [/<form\b/i, "a form"],
  [/<input\b/i, "an input"],
  [/\bfetch\s*\(/, "a network call"],
  [/\bonSubmit\b/, "a submit handler"],
  [/\bonClick\b/, "a click handler"],
  [/\bgtag\b|\banalytics\b|\bdataLayer\b/i, "an analytics call"],
]) {
  for (const [label, source] of [
    ["app/components/TutorialLibrary.tsx", tutorialComponentSource],
    ["app/tutorials/page.tsx", tutorialIndexSource],
    ...tutorialPages.map((f) => [f.replace(`${process.cwd()}/`, ""), readFileSync(f, "utf8")]),
  ]) {
    if (pattern.test(source)) {
      console.error(
        `${label} contains ${why}. The tutorial library must not collect anything or count ` +
          "downloads — the download is a plain link to a file in the static export.",
      );
      process.exit(1);
    }
  }
}

// -----------------------------------------------------------------------------
// The in-page PDF reader. The preview stopped being an <object> handed to the
// browser's own viewer because Chrome shows nothing when its PDF viewer is turned
// off by a setting, a managed-device policy, or an extension. These checks keep
// the replacement honest about the two things that made the old approach worth
// having: it must read the file the download link points at, and a reader with no
// JavaScript must still be told where the document is.
// -----------------------------------------------------------------------------
const pdfViewerPath = join(process.cwd(), "app/components/TutorialPdfViewer.tsx");
if (!existsSync(pdfViewerPath)) {
  console.error(
    "app/components/TutorialPdfViewer.tsx is missing, so tutorial pages have no in-page preview.",
  );
  process.exit(1);
}
const pdfViewerSource = readFileSync(pdfViewerPath, "utf8");
if (!/<TutorialPdfViewer/.test(tutorialComponentSource)) {
  console.error(
    "app/components/TutorialLibrary.tsx no longer renders <TutorialPdfViewer>, so the preview " +
      "shows only the first-page image.",
  );
  process.exit(1);
}
if (!/<noscript>/.test(tutorialComponentSource)) {
  console.error(
    "the tutorial preview has no <noscript> fallback. The reader is drawn by script, so without " +
      "one a browser with JavaScript off shows an empty box captioned as the whole document.",
  );
  process.exit(1);
}
if (!/file=\{tutorial\.file\.path\}/.test(tutorialComponentSource)) {
  console.error(
    "the preview no longer reads tutorial.file.path, so it could show a different file from the " +
      "one the download link delivers.",
  );
  process.exit(1);
}
// The reader loads one thing — the PDF, through pdf.js — and reports nothing. A
// click handler is allowed here, unlike in the pages above, because turning the
// page is what the controls are for.
for (const [pattern, why] of [
  [/<form\b/i, "a form"],
  [/<input\b/i, "an input"],
  [/\bfetch\s*\(/, "a network call of its own"],
  [/\bgtag\b|\banalytics\b|\bdataLayer\b/i, "an analytics call"],
  // Quoted, so a URL written in a comment is prose and a URL in the code is a
  // request to another host.
  [/["'`]https?:\/\//, "an absolute URL, which would mean loading pdf.js or a font from another host"],
]) {
  if (pattern.test(pdfViewerSource)) {
    console.error(
      `app/components/TutorialPdfViewer.tsx contains ${why}. The reader must fetch the tutorial ` +
        "file and nothing else, and must not count who opens it.",
    );
    process.exit(1);
  }
}
// pdf.js off the main thread, from this site's own build output. A worker loaded
// from a CDN would put a gated document's URL in somebody else's logs and would
// break the moment the network policy tightened.
if (!/GlobalWorkerOptions\.workerSrc/.test(pdfViewerSource)) {
  console.error(
    "app/components/TutorialPdfViewer.tsx does not set a pdf.js worker, so a long document would " +
      "render on the main thread and freeze the page.",
  );
  process.exit(1);
}
if (!/import\.meta\.url/.test(pdfViewerSource)) {
  console.error(
    "the pdf.js worker is no longer resolved through import.meta.url, so it may not be bundled " +
      "with the site and served from this origin.",
  );
  process.exit(1);
}

// Discoverability. The header bar is capped at five destinations, so the library
// depends on these three entry points; the nav record enforces the footer link at
// import, and these cover the rest.
for (const [file, needle, message] of [
  ["app/lib/siteNav.ts", '"/tutorials"', "the navigation record no longer publishes /tutorials"],
  ["app/sitemap.ts", "publishedTutorials", "the sitemap no longer lists tutorial routes"],
  ["app/search/page.tsx", "tutorialSearchText", "site search no longer indexes tutorials"],
  ["app/learn-ai/page.tsx", "TutorialCard", "the Learn AI page no longer surfaces the library"],
  // Matches both the JSX form and the destination-card record's `href: "/tutorials"`.
  ["app/page.tsx", '"/tutorials"', "the homepage no longer links the library"],
  ["app/ai-resources/page.tsx", "tutorialResources", "AI Resources no longer lists tutorials"],
]) {
  const source = readFileSync(join(process.cwd(), file), "utf8");
  if (!source.includes(needle)) {
    console.error(`${message} (expected "${needle}" in ${file}).`);
    process.exit(1);
  }
}

// An embedded PDF prints as an empty box, so print swaps the viewer for the
// file's URL. Without this rule a printed tutorial page says a document exists
// but not where to get it.
const cssSource = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
if (!cssSource.includes('a[href^="/tutorials/"][download]::after')) {
  console.error(
    "app/globals.css no longer prints the tutorial file URL after the download link, so a printed " +
      "page gives no way to find the document.",
  );
  process.exit(1);
}

console.log(
  `Tutorial library: ${checkedTutorialFiles} file(s) verified on disk; ${tutorialPages.length} ` +
    `tutorial page(s) carry a preview and a download.`,
);

// A static export cannot report its own build at runtime, and a failed
// deployment keeps serving the previous build with nothing on the page to say
// so. Both stamps have to survive, or "is this live?" becomes unanswerable from
// the site itself. See docs/deployment.md.
const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
for (const name of ["build-commit", "build-time"]) {
  if (!layoutSource.includes(`"${name}"`)) {
    console.error(
      `app/layout.tsx no longer stamps the "${name}" meta tag. Every page must record the ` +
        "build that produced it — see docs/deployment.md.",
    );
    process.exit(1);
  }
}
if (!existsSync(join(process.cwd(), "../scripts/write_build_stamp.mjs"))) {
  console.error("scripts/write_build_stamp.mjs is missing; /build.txt would stop being generated.");
  process.exit(1);
}
const websitePackage = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
if (!(websitePackage.scripts?.prebuild ?? "").includes("write_build_stamp.mjs")) {
  console.error(
    'the website "prebuild" script no longer runs scripts/write_build_stamp.mjs, so the deployed ' +
      "site would not publish /build.txt.",
  );
  process.exit(1);
}

console.log(
  `Teaching guide: learning-first ordering verified; the concern section is section ` +
    `${concernIndex + 1} of ${sectionIds.length}.`,
);

console.log("Website lint checks passed.");
