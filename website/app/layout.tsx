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
  alternates: { canonical: "/" },
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
