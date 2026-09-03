"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { primaryNav, returnToHubLink } from "../lib/siteNav";

// The bar holds six internal destinations and the search form — no more, and
// nothing that leaves the site. Both rules are enforced in app/lib/siteNav.ts,
// where the list lives.
//
// Home needs its own aria-current test: every path starts with "/", so the
// startsWith check that marks a section as current would mark Home current on
// every page.
//
// The link back to the AI Learning Hub also comes from siteNav.ts rather than a
// literal here. The hub is where most readers arrive from, and this is the return
// half of that handoff — the two sites are separate deployments and neither
// embeds the other, so an ordinary link each way is the whole integration.

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Same tab, deliberately, and this is the one asymmetry with the hub's link in
  // the other direction. The hub's button into this site opens a new tab, because
  // a Stanford SSO redirect chain is most reliable running at the top level, and
  // any hub page still being read inside a frame would otherwise load this site
  // within that frame. Coming back the other way there is no sign-in to negotiate
  // and nothing frames this site, so "Return to AI Learning Hub" can simply mean
  // what it says: same tab, no new-tab warning to announce. It is a plain anchor
  // rather than next/link because it leaves the application entirely.
  const returnToHub = (
    <a className="headerReturn" href={returnToHubLink.href}>
      {returnToHubLink.label}
      <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
    </a>
  );

  const logo = (
    <Image
      src="/images/robert-crown-law-library-logo.svg"
      alt="Stanford Law School | Robert Crown Law Library"
      width={551}
      height={139}
      priority
      unoptimized
    />
  );

  return (
    <header className="siteHeader">
      <Link className="headerLogo" href="/" aria-label="Robert Crown Law Library home">
        {logo}
      </Link>

      <button
        className="navToggleBtn"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hamburgerIcon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        id="primary-nav"
        className={`primaryNav${open ? " isOpen" : ""}`}
        aria-label="Main navigation"
      >
        {primaryNav.map(({ label, href }) => {
          const current =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          );
        })}
        <form className="siteSearch" role="search" onSubmit={(event) => {
          event.preventDefault();
          if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setOpen(false);
          }
        }}>
          <label className="srOnly" htmlFor="site-search">Search this site</label>
          <input id="site-search" type="search" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Submit search">Search</button>
        </form>
        {returnToHub}
      </nav>
    </header>
  );
}
