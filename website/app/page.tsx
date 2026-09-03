import type { Metadata } from "next";
import Link from "next/link";
import { countLabel } from "./lib/counts";
import { publishedTutorials, tutorialLibrary } from "./lib/tutorialLibrary";
import {
  collectionCount,
  publishedGuideTotal,
} from "./lib/learnAiCollections";
import { AI_LEARNING_HUB_URL, AI_UPLOAD_URL, STUDENT_AI_LEARNING_HUB_URL } from "./lib/site";
import { VideoHero } from "./components/VideoHero";

// The home page's canonical, declared here rather than on the root layout. It
// used to sit in layout.tsx, where every descendant inherited it and each of the
// other 75 pages claimed to be the home page. Title and description are still
// inherited from the layout, which is correct for those — a canonical is the one
// metadata field that cannot be shared, because it names a single URL.
//
// This matches how the rest of the site declares canonicals: per route, as a
// path, resolved against metadataBase from app/lib/site.ts.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The home page is the top-level portal: five destinations as cards, and nothing
// else competing with them.
//
// It previously named every guide on the front page. That was the right fix at the
// time — the guides had been two clicks deep and unnamed — but the list grew with
// the series, and by eight guides across two collections the page was a wall of
// questions with the other four destinations below it. A reader looking for skill
// files had to scroll past every lesson title to find them.
//
// So the questions moved to where they belong: /learn-ai/ lists both collections in
// full, and the homepage carries one card that says how many there are. Each card
// names a destination, states a derived count, and says what the reader will find.
// Nothing here is a hand-maintained number.

/**
 * The five destinations, in the order a faculty member is likely to need them:
 * learn the judgment, use a ready-made assistant, build one, read the long
 * document, and — once it exists — the education-technology area.
 *
 * `meta` is derived on every card that can be. "Three parts" is the exception, and
 * `npm run lint` fails if the agent guide stops having three.
 */
function destinationCards() {
  const tutorials = publishedTutorials();
  const tutorialCount = tutorials.length;
  const firstTutorial = tutorials[0];

  return [
    {
      title: "Lessons",
      href: "/learn-ai",
      meta: `${collectionCount()} collections · ${publishedGuideTotal()} guides`,
      description:
        "Five-minute, answer-first guides to the AI decisions faculty actually face, grouped into collections.",
      linkText: "Browse the lessons",
    },
    {
      title: "Skill files",
      href: "/skills",
      meta: countLabel(),
      description:
        "Downloadable assistants for ChatGPT and Claude. Install one, work in plain language, and review the sources yourself.",
      linkText: "Browse skill files",
    },
    {
      title: "Agents",
      href: "/build-an-agent",
      // Three DocParts in app/build-an-agent/page.tsx. Lint fails if that changes.
      meta: "Three parts",
      description:
        "Combine several skill files into one reusable assistant with a defined job, explicit limits, and a worked walkthrough.",
      linkText: "Open the agent guide",
    },
    {
      title: tutorialLibrary.title,
      href: "/tutorials",
      meta:
        tutorialCount === 1 && firstTutorial
          ? `1 tutorial · ${firstTutorial.file.pages} pages`
          : `${tutorialCount} tutorials`,
      description:
        "Step-by-step documents to download and keep open beside the interface you are configuring.",
      linkText: "Open the library",
    },
    {
      title: "EdTech",
      href: "/education-technology",
      meta: "In development",
      description:
        "Classroom, course, and learning-technology guidance. The Law Library is building this area now.",
      linkText: "See what is planned",
    },
  ];
}

/** Directories rather than lessons: looked up when needed, not read through. */
const lookupLinks = [
  {
    label: "AI Resources",
    href: "/ai-resources",
    note: "Stanford and Law Library services, legal databases, and approved-use guidance",
  },
];

// The pages a faculty member needs once, at the start — previously reachable from
// no menu at all.
const setUpLinks = [
  { label: "What is a skill file?", href: "/what-is-a-skill-file" },
  { label: "How to use a skill", href: "/how-to-use" },
  { label: "Install in ChatGPT or Claude", href: "/install" },
  { label: "Troubleshooting", href: "/troubleshooting" },
];

/** "Five places" reads better than "5 places", and the number stays derived. */
const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

export default function Home() {
  const cards = destinationCards();
  // Derived, so adding a sixth destination cannot leave the heading saying five.
  const cardCountWord = NUMBER_WORDS[cards.length] ?? String(cards.length);

  return (
    <>
      <section className="homeHero">
        <VideoHero />
        <div className="homeHeroText">
          <h1>AI and Technology Support for SLS Faculty</h1>
          <p className="lede">
            Practical, faculty-ready guidance for using AI and education technology in teaching, research, and
            scholarship. Start with a five-minute guide, use a ready-made skill file, or find the Stanford
            resource that fits your task.
          </p>
          {/* Two actions, not three: the cards below carry the rest. */}
          <div className="actions">
            <Link className="primary" href="/learn-ai">Learn AI in five minutes</Link>
            <Link className="secondary" href="/skills">Explore skill files</Link>
          </div>
          {/* The hub is a neighbouring site, not a step in this one, so it is a
              link and not a third button — two buttons stay two decisions, and a
              reader who wants the hub can still see it without hunting the
              footer. The arrow says it leaves this site. */}
          <p className="homeHeroAside">
            <a
              className="textLink"
              href={AI_LEARNING_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the AI Learning Hub &#8599;
            </a>
          </p>
        </div>
      </section>

      {/* One card per destination. The counts come from the records, so publishing a
          guide, a skill file, or a tutorial updates this page without an edit. */}
      <section aria-labelledby="start-heading">
        <p className="eyebrow">Start here</p>
        <h2 id="start-heading">{`${cardCountWord} places to work from`}</h2>
        <div className="homeDestinations">
          {cards.map(({ title, href, meta, description, linkText }) => (
            <Link className="card interactive homeDestination" key={href} href={href}>
              <div className="homeCardHead">
                <h3>{title}</h3>
                <span className="pill">
                  <span className="dot" aria-hidden="true" />
                  {meta}
                </span>
              </div>
              <p className="muted">{description}</p>
              <span className="explore">{linkText} &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* The AI Upload is a separate application, so this card points directly to
          its public address rather than adding an intermediate landing page. */}
      <a className="card interactive digestCard" href={AI_UPLOAD_URL} target="_blank" rel="noopener noreferrer">
        <p className="eyebrow">This week in AI</p>
        <div className="homeCardHead">
          <h3>The AI Upload</h3>
          <span className="pill"><span className="dot" aria-hidden="true" />New every Friday</span>
        </div>
        <p className="muted">
          The Law Library’s weekly digest of AI news &mdash; the tools, court and policy developments, and
          practical guidance worth a faculty member’s attention, gathered into one short read.
        </p>
        <span className="explore">Read The AI Upload &#8599;</span>
      </a>

      {/* The AI Resources directory, looked up when a question arises rather than
          chosen as a place to start. */}
      <section className="homeLookup" aria-labelledby="lookup-heading">
        <p className="eyebrow">Look something up</p>
        <h2 id="lookup-heading" style={{ fontSize: "1.3rem" }}>
          Directories
        </h2>
        <ul className="homeLookupList">
          {lookupLinks.map(({ label, href, note }) => (
            <li key={href}>
              <Link className="textLink" href={href}>
                {label}
              </Link>
              <span className="muted homeLookupNote">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Student AI as a teaching opportunity, not an enforcement problem. The
          primary action designs an assignment; the hub is the student-facing
          referral; the concern checklist is one quiet tertiary line, deliberately
          smaller than both. */}
      <section className="card crossPromo">
        <div className="crossPromoText">
          <p className="eyebrow">For your students</p>
          <h2>Help students build legal and AI judgment</h2>
          <p className="muted">
            Give students bounded, source-aware AI practice while keeping legal reading, analysis,
            verification, reflection, and consequential decisions visible.
          </p>
        </div>
        <div className="crossPromoActions">
          <div className="actions" style={{ marginTop: 0 }}>
            <Link className="primary" href="/learn-ai/students-use-ai-and-learn-law">
              Design an AI-supported law assignment
            </Link>
          </div>
          <p className="crossPromoAside muted">
            <a
              className="textLink"
              href={STUDENT_AI_LEARNING_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the Student AI Learning Hub &#8599;
            </a>
          </p>
          <p className="crossPromoTertiary muted">
            Handling a possible policy concern?{" "}
            <Link href="/learn-ai/responding-to-student-ai-concern">
              Open the faculty checklist
            </Link>
          </p>
        </div>
      </section>

      <section className="setUpRow" aria-labelledby="set-up-heading">
        <p className="eyebrow">New here?</p>
        <h2 id="set-up-heading" style={{ fontSize: "1.3rem" }}>
          Two minutes to your first skill
        </h2>
        <ul className="setUpLinks">
          {setUpLinks.map(({ label, href }) => (
            <li key={href}>
              <Link className="textLink" href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
