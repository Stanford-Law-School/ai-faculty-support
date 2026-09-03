import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";
import { SITE_URL } from "./lib/site";
import { BUILD_COMMIT, BUILD_TIME } from "./lib/buildInfo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  // metadataBase lets pages declare canonical and Open Graph URLs as paths.
  metadataBase: new URL(SITE_URL),
  // Which build produced this page. A static export cannot report this at
  // runtime, and a failed deployment silently keeps serving the previous build,
  // so the answer has to be baked into the HTML. See app/lib/buildInfo.ts.
  other: {
    "build-commit": BUILD_COMMIT,
    "build-time": BUILD_TIME,
  },
  title: "AI and Technology Support for SLS Faculty",
  description:
    "Practical, judgment-first AI and technology support for SLS faculty from the Robert Crown Law Library — a growing set of resources, starting with ready-made skills for ChatGPT and Claude.",
  // No `alternates.canonical` here, deliberately. Metadata declared on the root
  // layout is inherited by every descendant, and a canonical URL is the one
  // field for which that is always wrong: it identifies a single URL, so an
  // inherited one tells all 76 pages they are the home page. The home page's own
  // canonical lives in app/page.tsx alongside the per-route canonicals the rest
  // of the site already declares. Title and description stay here, because those
  // are genuine site-wide defaults that a page overrides when it has something
  // better to say.
  //
  // The whole site sits behind Stanford SSO and is not meant to be indexed, so
  // every page asks to be kept out of search results and out of the crawling
  // that follows from them. Declared once here rather than per page: Next merges
  // a page's metadata over the root layout's, and no page sets `robots`, so this
  // governs all of them and a new page cannot forget it.
  //
  // This is the meta-tag half; app/robots.ts is the other half. Neither is
  // access control — see the note in app/robots.ts.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

// Applies an explicit theme before the body is rendered. Keeping both themes
// explicit avoids an unthemed first render while localStorage is being read.
const themeInit =
  "try{document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <SiteFooter />
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  );
}
