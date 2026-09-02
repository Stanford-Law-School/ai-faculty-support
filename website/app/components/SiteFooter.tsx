"use client";

import Link from "next/link";
import { footerGroups } from "../lib/siteNav";

/**
 * The site footer.
 *
 * It exists because the header bar could not hold everything. Nine routes —
 * the install pages, the agent builder, troubleshooting, about — were previously
 * reachable from no menu at all, and three outbound links were spending the
 * widest slots in the bar. Both now live here, grouped, so the bar can stay at
 * five destinations without anything becoming unreachable.
 *
 * A `<nav>` with a labelled heading per group, so a screen-reader user can skip
 * to the group they want rather than hearing eleven undifferentiated links.
 */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footerNav" aria-label="Site footer">
          {footerGroups.map((group) => (
            <div className="footerGroup" key={group.id}>
              <h2 className="footerHeading" id={`footer-${group.id}`}>
                {group.heading}
              </h2>
              <ul aria-labelledby={`footer-${group.id}`}>
                {group.links.map(({ label, href, external, note }) => (
                  <li key={href}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                        <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
                        <span className="srOnly"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                    {note ? <span className="footerNote">{note}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="footerHelp">
          Need help? Email{" "}
          <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>
        </p>
      </div>
    </footer>
  );
}
