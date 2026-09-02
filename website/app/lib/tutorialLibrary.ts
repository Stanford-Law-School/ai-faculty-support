// =============================================================================
// The tutorial library — long-form documents, one record each.
//
// The Learn AI guides answer one question in five minutes. A tutorial is the
// other shape: a document a faculty member downloads, reads at length, and
// returns to while doing the work. The two are not interchangeable, so the
// library is its own collection rather than more guide cards.
//
// This record is the single source for the index page, the detail page, the
// sitemap, and site search. Adding a tutorial means adding one entry here plus
// the file and a thin page — nothing else derives from a hard-coded list.
//
// Three properties are load-bearing and validated:
//
//   1. A tutorial carries at least one caution. Product interfaces are the part
//      of a long tutorial most likely to be summarized into a confident claim,
//      and the source documents' own IMPORTANT and DATA CHECK notes are the
//      first thing lost when that happens.
//   2. Interface currency is gated on reviewBy. Past that date the page stops
//      asserting "verified on <date>" and says a re-check is due instead. An
//      expired record withholds the claim; it does not keep making it.
//   3. Related guide slugs are checked against the published guides, so a
//      renamed guide cannot leave a dead link on a tutorial page.
//
// The recorded byte size and file name are checked against the file on disk by
// `npm run lint`, which can read the filesystem — this module cannot, because it
// is imported by the client-side search page.
// =============================================================================

import { publishedGuides } from "./guides";

export type TutorialFormat = "pdf";

/** A tutorial with a route and a file, or one recorded before it is ready. */
export type TutorialStatus = "published" | "planned";

export type TutorialFile = {
  /** Served from website/public/tutorials/. */
  name: string;
  /** Site-absolute path. */
  path: string;
  bytes: number;
  pages: number;
  format: TutorialFormat;
};

/**
 * A rendering of the document's first page, committed alongside the file.
 *
 * It exists because an embedded PDF is not a reliable preview: several mobile
 * browsers refuse to display one inline, and a reader then sees an empty box.
 * The image is the fallback inside the viewer and the thumbnail in the library
 * list, so every browser shows something real. Rendered once with the document,
 * never generated at build time — the host has no PDF rasterizer.
 */
export type TutorialCover = {
  path: string;
  /** Intrinsic pixel size, so the browser reserves the right box before it loads. */
  width: number;
  height: number;
  alt: string;
};

/** One line of the document's own contents, for the "what's inside" list. */
export type TutorialSection = {
  title: string;
  detail?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  /** One line under the title. Says what the reader will build or be able to do. */
  subtitle: string;
  /** Two or three sentences. Used on cards, in search, and in metadata. */
  summary: string;
  audience: string;
  /** Reading time for the whole document, honestly long. */
  readTime: string;
  /** Products or platforms the tutorial actually covers. */
  covers: string[];
  /** The document's own structure, in order. */
  contents: TutorialSection[];
  /** What a reader can do afterwards. */
  whatYouLearn: string[];
  /**
   * Limits the tutorial states about itself. At least one is required — see the
   * header note.
   */
  cautions: string[];
  /** When the document was added to this library. */
  publishedOn: string;
  /** When the document itself was last revised by its author. */
  updatedOn: string;
  /** When the tutorial's product and policy details were checked against sources. */
  sourcesVerifiedOn: string;
  /** After this date the currency claim is withheld rather than repeated. */
  reviewBy: string;
  file: TutorialFile;
  cover: TutorialCover;
  /** Guides that pair with this tutorial. Validated against published guides. */
  relatedGuideSlugs: string[];
  /** Extra vocabulary for search, never rendered as visible copy. */
  searchTerms: string[];
  status: TutorialStatus;
};

/**
 * What the library is for, stated once. The index page renders this rather than
 * carrying its own description of the collection.
 */
export const tutorialLibrary = {
  id: "tutorial-library",
  title: "Tutorial library",
  tagline: "Long-form, step-by-step tutorials you can download and keep",
  summary:
    "Each tutorial is a complete written walkthrough of one piece of AI work—longer than a five-minute guide, and built to be read while you do the task. Download it, preview it here, or keep it beside the interface you are configuring.",
  /** Set honestly: the library is new and says so rather than implying depth. */
  growthNote:
    "The library is new and grows as tutorials are written. Each one carries its own update date and its own source-verification date.",
  maintainer: "Robert Crown Law Library",
} as const;

export const tutorials: Tutorial[] = [
  {
    slug: "custom-ai-chat-assistants",
    title: "Custom AI Chat Assistants",
    subtitle:
      "Build a Custom GPT, a Gem, and a Claude Project for work you repeat",
    summary:
      "Three step-by-step tutorials for saving instructions and reference material into a reusable assistant—a Custom GPT in ChatGPT, a Gem in Gemini, and a Project in Claude—built around one worked example, a Course Planning Assistant. It includes ready-to-adapt instructions, the tests to run before sharing an assistant, and fifteen law-school patterns for classroom teaching, student learning, and faculty productivity.",
    audience: "SLS faculty and staff",
    readTime: "42 pages",
    covers: [
      "ChatGPT — Custom GPT",
      "Gemini — Gem",
      "Claude — Project",
    ],
    contents: [
      {
        title: "Tutorial 1: Build a Custom GPT in ChatGPT",
        detail:
          "Deciding whether you need one, writing the build brief, the seven builder steps, knowledge files, model and capability choices, Apps versus Actions, testing in Preview, sharing, and common problems.",
      },
      {
        title: "Tutorial 2: Build a Gem in Gemini",
        detail:
          "When a Gem is the right container, the Gem editor, instructions, knowledge sources including Drive files that stay linked to their latest version, previewing, where a Gem is available, and sharing cautions.",
      },
      {
        title: "Tutorial 3: Build a Project in Claude",
        detail:
          "What actually persists in a Project, project instructions, project knowledge, starting a chat, and maintaining the workspace over a term.",
      },
      {
        title: "Practical uses in a law school",
        detail:
          "Fifteen worked patterns in three groups—faculty use in the classroom, student use for learning, and faculty use for productivity—each with what to build, how to use it, and what evidence to collect.",
      },
      {
        title: "Research and governance basis",
        detail:
          "Stanford Teaching Commons guidance, Stanford's Responsible AI data-risk rules, ABA Formal Opinion 512, and the law-teaching and AI-tutoring literature the design advice rests on.",
      },
      {
        title: "Appendix A: A reusable build brief",
        detail:
          "Seven questions—problem, audience, inputs and sources, workflow, output, boundaries, and test plan—to answer before building any assistant.",
      },
      {
        title: "Appendix B: Source record",
        detail:
          "Every vendor and Stanford page the tutorial was checked against, so a reader can re-verify a step that has changed.",
      },
    ],
    whatYouLearn: [
      "Decide whether a saved assistant is actually better than a regular chat for the work in front of you.",
      "Write instructions that hold a workflow together, and keep source material in knowledge rather than in the prompt.",
      "Choose capabilities and knowledge sources deliberately, and tell an App apart from an Action.",
      "Test an assistant against missing evidence, conflicting sources, an out-of-scope request, an instruction challenge, and a privacy-sensitive prompt before anyone else uses it.",
      "Adapt one of fifteen law-school patterns—Socratic ladders, a closed-universe interpretation lab, a case-reading tutor, a rubric-alignment check—into your own course.",
    ],
    cautions: [
      "A custom assistant is not automatically more accurate than a regular chat. Its instructions guide behavior; they are not a security boundary or a guarantee.",
      "A shared assistant can expose its instructions and uploaded files to everyone who has access. Do not add Moderate or High Risk Data to a service and workflow that is not approved for it.",
      "Model names, menus, capabilities, and sharing options change faster than this document. Screens were captured in Stanford accounts on the verification date below; check the current interface as you go.",
    ],
    publishedOn: "2026-08-04",
    updatedOn: "2026-08-06",
    sourcesVerifiedOn: "2026-08-04",
    reviewBy: "2026-11-04",
    file: {
      name: "custom-ai-chat-assistants.pdf",
      path: "/tutorials/custom-ai-chat-assistants.pdf",
      bytes: 3391703,
      pages: 42,
      format: "pdf",
    },
    cover: {
      path: "/tutorials/custom-ai-chat-assistants-page-1.png",
      width: 1000,
      height: 1295,
      alt:
        "First page of Custom AI Chat Assistants: the Robert Crown Law Library masthead, the title, " +
        "and a contents list of the three tutorials.",
    },
    relatedGuideSlugs: [
      "which-ai-tool-fits",
      "what-can-i-safely-share",
      "students-use-ai-and-learn-law",
      "verify-an-ai-legal-claim",
    ],
    searchTerms: [
      "custom gpt",
      "gpt builder",
      "configure gpt",
      "gem",
      "gems",
      "gem editor",
      "claude project",
      "project knowledge",
      "project instructions",
      "custom assistant",
      "custom chatbot",
      "course planning assistant",
      "knowledge files",
      "actions",
      "apps",
      "system prompt",
      "socratic sequence",
      "moot court judge",
      "case reading tutor",
      "retrieval practice",
      "rubric alignment",
      "build brief",
    ],
    status: "published",
  },
  {
    slug: "elevenlabs-for-faculty",
    title: "ElevenLabs for Faculty",
    subtitle:
      "Generate, review, and publish AI speech and audio for teaching—without treating an unapproved tool as an approved data environment",
    summary:
      "A step-by-step tutorial for faculty and instructional teams who want to experiment with ElevenLabs text-to-speech, ElevenCreative Studio, dubbing, transcription, and generative audio. It is built around a faculty-authored ninety-second reading roadmap, then covers longer projects, voice choices and cloning limits, law-school teaching designs, accessibility and disclosure, and the Stanford approval boundary that governs every upload.",
    audience: "SLS faculty and staff",
    readTime: "41 pages",
    covers: [
      "ElevenLabs — Text to Speech",
      "ElevenCreative Studio",
      "Voice library, Voice Design, and voice cloning",
      "Dubbing, speech-to-text, sound effects, and music",
      "Long-form audiobooks and selective image/video generation",
    ],
    contents: [
      {
        title: "Before you create an account",
        detail:
          "Stanford approval as a boundary, the data-use opt-out, account and plan terms, and what never to upload to an unapproved third-party service.",
      },
      {
        title: "Rights, consent, disclosure, and accessibility",
        detail:
          "Voice rights and cloning rules, course-media and simulation disclosures, transcripts and captions, and a preflight checklist for data, rights, consent, accuracy, disclosure, and access.",
      },
      {
        title: "Quick start: a short reading roadmap",
        detail:
          "Set up ElevenCreative, write a ninety-second script, choose a voice, model, and settings, fix pronunciation, export the audio, and publish it with a transcript and disclosure.",
      },
      {
        title: "Voices, cloning, and longer Studio work",
        detail:
          "Library and designed voices, high-caution voice cloning, multi-track Studio projects, long-form audiobooks, dubbing, Low Risk transcription, and sparse use of sound effects, music, images, and video.",
      },
      {
        title: "Law-school teaching designs and faculty uses",
        detail:
          "Classroom patterns, assignment designs that preserve learning, faculty learning and productivity uses, a quality-control checklist, and troubleshooting.",
      },
      {
        title: "Official sources and appendices",
        detail:
          "Vendor and Stanford pages the steps were checked against, a sample text-to-speech script, and notes on video recordings.",
      },
    ],
    whatYouLearn: [
      "Decide whether an audio task is appropriate for an unapproved third-party service, and keep uploads to public or authorized Low Risk material.",
      "Generate, review, and download a short text-to-speech recording, then publish it with a transcript and a clear AI disclosure.",
      "Choose between a library voice, a designed synthetic voice, and a voice clone—and know when cloning is off-limits.",
      "Build and export a longer audio or video project in ElevenCreative Studio, with human review of pronunciation, legal terms, and translations.",
      "Design law-school activities in which the audio supports an observable learning objective rather than substituting for reading or judgment.",
    ],
    cautions: [
      "ElevenLabs is not currently a Stanford-approved AI service. An opt-out setting, a paid plan, or a vendor privacy statement does not make it approved—use only public or appropriately authorized Low Risk material.",
      "Do not clone or imitate a student, client, witness, judge, colleague, public figure, or any other real person without rights and consent. A synthetic voice must not create the impression that a real person said something they did not say.",
      "Model names, credit pools, export formats, attribution rules, and product menus change faster than this document. Screens and plan details were checked on the verification date below; confirm the current interface and terms as you go.",
    ],
    publishedOn: "2026-08-07",
    updatedOn: "2026-08-07",
    sourcesVerifiedOn: "2026-08-04",
    reviewBy: "2026-11-04",
    file: {
      name: "elevenlabs-for-faculty.pdf",
      path: "/tutorials/elevenlabs-for-faculty.pdf",
      bytes: 10124453,
      pages: 41,
      format: "pdf",
    },
    cover: {
      path: "/tutorials/elevenlabs-for-faculty-page-1.png",
      width: 1000,
      height: 1294,
      alt:
        "First page of ElevenLabs for Faculty: the title and a contents list covering setup, " +
        "quick start, voices, Studio workflows, and law-school teaching designs.",
    },
    relatedGuideSlugs: [
      "what-can-i-safely-share",
      "which-ai-tool-fits",
      "students-use-ai-and-learn-law",
    ],
    searchTerms: [
      "elevenlabs",
      "eleven labs",
      "elevencreative",
      "eleven creative",
      "text to speech",
      "tts",
      "speech to text",
      "voice cloning",
      "professional voice clone",
      "voice design",
      "dubbing",
      "audiobook",
      "synthetic voice",
      "ai audio",
      "ai narration",
      "reading roadmap",
      "transcript",
      "captions",
      "sound effects",
      "generative audio",
      "unapproved ai service",
      "low risk data",
    ],
    status: "published",
  },
];

// -----------------------------------------------------------------------------
// Access helpers
// -----------------------------------------------------------------------------

export const TUTORIALS_ROUTE = "/tutorials";

export function tutorialHref(slug: string): string {
  return `${TUTORIALS_ROUTE}/${slug}`;
}

/** Newest update first, so the library reads as maintained rather than archival. */
export function publishedTutorials(): Tutorial[] {
  return tutorials
    .filter((t) => t.status === "published")
    .sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
}

export function getTutorial(slug: string): Tutorial {
  const tutorial = tutorials.find((t) => t.slug === slug);
  if (!tutorial) throw new Error(`Unknown tutorial: ${slug}`);
  return tutorial;
}

/** Everything a query may match on, including vocabulary that is never rendered. */
export function tutorialSearchText(tutorial: Tutorial): string {
  return [
    tutorial.title,
    tutorial.subtitle,
    tutorial.summary,
    tutorial.covers.join(" "),
    tutorial.contents.map((s) => `${s.title} ${s.detail ?? ""}`).join(" "),
    tutorial.whatYouLearn.join(" "),
    tutorial.searchTerms.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

/** "3.2 MB" — one decimal, because a reader is deciding whether to download it. */
export function formatFileSize(bytes: number): string {
  const mb = bytes / 1_000_000;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1000))} KB`;
}

export function formatTutorialDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export type TutorialCurrency =
  | { state: "verified"; label: string }
  | { state: "review-due"; label: string };

/**
 * Interface currency, gated on reviewBy. Past that date the page must stop
 * telling a reader the product details were verified — the honest statement is
 * that a re-check is due, and the pages read this rather than the raw field.
 */
export function displayableCurrency(
  tutorial: Tutorial,
  today: string = new Date().toISOString().slice(0, 10),
): TutorialCurrency {
  if (today > tutorial.reviewBy) {
    return {
      state: "review-due",
      label: "Interface details are due for a re-check — verify each screen against the current product.",
    };
  }
  return {
    state: "verified",
    label: `Product and policy details verified ${formatTutorialDate(tutorial.sourcesVerifiedOn)}.`,
  };
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A static export has to serve the file; a huge one is a deployment problem. */
const MAX_FILE_BYTES = 25_000_000;

export type TutorialValidation = { errors: string[]; warnings: string[] };

export function validateTutorialLibrary(
  today: string = new Date().toISOString().slice(0, 10),
  options: { strict?: boolean } = {},
): TutorialValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const raise = (message: string) => {
    if (options.strict) errors.push(message);
    else warnings.push(message);
  };

  if (!tutorialLibrary.title) errors.push("the library is missing a title");
  if (!tutorialLibrary.summary) errors.push("the library is missing a summary");
  if (!tutorialLibrary.growthNote) errors.push("the library is missing its growth note");

  const guideSlugs = new Set(publishedGuides().map((g) => g.slug));
  const seenSlugs = new Set<string>();
  const seenFiles = new Set<string>();

  for (const t of tutorials) {
    const where = `tutorial "${t.slug || "(no slug)"}"`;

    if (!t.slug) errors.push("a tutorial is missing its slug");
    else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) {
      errors.push(`${where}: slug must be lowercase words separated by hyphens`);
    }
    if (seenSlugs.has(t.slug)) errors.push(`${where}: duplicate slug`);
    seenSlugs.add(t.slug);

    for (const field of ["title", "subtitle", "summary", "audience", "readTime"] as const) {
      if (!t[field]) errors.push(`${where}: missing ${field}`);
    }
    if (t.summary && t.summary.length < 80) {
      errors.push(`${where}: the summary is too short to describe a long-form document`);
    }
    if (!t.covers.length) errors.push(`${where}: must say what it covers`);
    if (t.contents.length < 3) {
      errors.push(`${where}: needs at least three contents entries — a reader decides from these`);
    }
    for (const section of t.contents) {
      if (!section.title) errors.push(`${where}: a contents entry is missing its title`);
    }
    if (t.whatYouLearn.length < 3) errors.push(`${where}: needs at least three learning outcomes`);
    if (!t.searchTerms.length) errors.push(`${where}: needs search terms`);
    for (const term of t.searchTerms) {
      if (term !== term.toLowerCase()) {
        errors.push(`${where}: search term "${term}" must be lowercase`);
      }
    }

    // See the header note: the cautions are the first thing lost when a long
    // tutorial is summarized, so a record without one is invalid.
    if (!t.cautions.length) {
      errors.push(
        `${where}: needs at least one caution. A tutorial that states no limits reads as a guarantee.`,
      );
    }
    // A caution must not promise accuracy or safety — but the most useful
    // cautions say a tool is *not* a guarantee, so the promise words only count
    // when nothing negates them. Matching the word alone flags the sentence that
    // does the job correctly.
    const PROMISE = /\b(guarantees?|guaranteed|always accurate|fully accurate|safe to trust)\b/gi;
    const NEGATED = /\b(not|never|no|nor|isn't|aren't|cannot|can't|without|rather than)\b[^.]{0,60}$/i;
    for (const caution of t.cautions) {
      for (const match of caution.matchAll(PROMISE)) {
        const before = caution.slice(0, match.index);
        if (!NEGATED.test(before)) {
          errors.push(
            `${where}: the caution "${caution.slice(0, 60)}…" promises accuracy or safety ` +
              `("${match[0]}") without negating it`,
          );
        }
      }
    }

    // Dates.
    for (const field of ["publishedOn", "updatedOn", "sourcesVerifiedOn", "reviewBy"] as const) {
      if (!ISO_DATE.test(t[field])) errors.push(`${where}: ${field} is not a valid ISO date`);
    }
    if (ISO_DATE.test(t.publishedOn) && ISO_DATE.test(t.updatedOn) && t.updatedOn < t.publishedOn) {
      errors.push(
        `${where}: updatedOn (${t.updatedOn}) precedes publishedOn (${t.publishedOn}); a document ` +
          "cannot have been revised before it was added",
      );
    }
    if (ISO_DATE.test(t.reviewBy) && ISO_DATE.test(t.sourcesVerifiedOn) && t.reviewBy <= t.sourcesVerifiedOn) {
      errors.push(`${where}: reviewBy must fall after sourcesVerifiedOn`);
    }
    // A date ahead of the build is not an error — an author can hand over a
    // document dated for its release — but it should be visible, because the
    // page will display a future date to a reader.
    if (ISO_DATE.test(t.updatedOn) && t.updatedOn > today) {
      warnings.push(
        `${where}: updatedOn ${t.updatedOn} is later than the build date ${today}, so the page shows a future date`,
      );
    }

    // The file.
    if (t.status === "published") {
      if (t.file.format !== "pdf") errors.push(`${where}: only PDF tutorials are supported so far`);
      if (!t.file.name.endsWith(".pdf")) errors.push(`${where}: file name must end in .pdf`);
      if (t.file.name !== `${t.slug}.pdf`) {
        errors.push(
          `${where}: file is named "${t.file.name}"; name it "${t.slug}.pdf" so the download URL matches the route`,
        );
      }
      if (t.file.path !== `/tutorials/${t.file.name}`) {
        errors.push(`${where}: file path must be "/tutorials/${t.file.name}"`);
      }
      if (seenFiles.has(t.file.path)) errors.push(`${where}: two tutorials claim the same file`);
      seenFiles.add(t.file.path);
      if (!(t.file.bytes > 0)) errors.push(`${where}: file bytes must be a positive number`);
      if (t.file.bytes > MAX_FILE_BYTES) {
        errors.push(
          `${where}: the file is ${(t.file.bytes / 1_000_000).toFixed(1)} MB, over the ` +
            `${MAX_FILE_BYTES / 1_000_000} MB limit for a file served from the static export`,
        );
      }
      if (!Number.isInteger(t.file.pages) || t.file.pages <= 0) {
        errors.push(`${where}: page count must be a positive integer`);
      }

      // The cover is the only preview some browsers will show, so it is required
      // rather than optional, and its alt text has to describe the page instead
      // of repeating the title a screen reader has already announced.
      if (!t.cover.path.startsWith("/tutorials/")) {
        errors.push(`${where}: the cover image must be served from /tutorials/`);
      }
      if (!/\.(png|jpg|webp)$/.test(t.cover.path)) {
        errors.push(`${where}: the cover image must be a .png, .jpg, or .webp file`);
      }
      if (!(t.cover.width > 0) || !(t.cover.height > 0)) {
        errors.push(`${where}: the cover image needs its intrinsic width and height`);
      }
      if (t.cover.height <= t.cover.width) {
        errors.push(
          `${where}: the cover is ${t.cover.width}×${t.cover.height}; a page rendering should be ` +
            "taller than it is wide, so this is probably the wrong image",
        );
      }
      if (!t.cover.alt) errors.push(`${where}: the cover image needs alt text`);
      else if (t.cover.alt.trim().length < 25) {
        errors.push(`${where}: the cover alt text must describe the page, not just name the file`);
      }
    }

    // Related guides.
    for (const slug of t.relatedGuideSlugs) {
      if (!guideSlugs.has(slug)) {
        errors.push(
          `${where}: related guide "${slug}" is not a published guide, so the link would 404`,
        );
      }
    }

    if (ISO_DATE.test(t.reviewBy) && today > t.reviewBy) {
      const days = Math.round((Date.parse(today) - Date.parse(t.reviewBy)) / 86_400_000);
      raise(
        `${where} is ${days} day(s) overdue for review (reviewBy ${t.reviewBy}, today ${today}). ` +
          "The currency statement is withheld from display until a maintainer re-checks the product screens.",
      );
    }
  }

  return { errors, warnings };
}

const validation = validateTutorialLibrary(undefined, {
  strict: process.env.SLS_STRICT_TUTORIALS === "1",
});
if (validation.errors.length) {
  throw new Error(`Tutorial library is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[tutorial-library] ${w}`);
}
