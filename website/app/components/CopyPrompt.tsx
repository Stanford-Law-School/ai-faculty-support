"use client";

import { useState } from "react";

// Small copy-to-clipboard button used by the paste-ready prompt blocks in the
// agent guide and by the Learn AI guides. Faculty are meant to copy these
// verbatim, so the button carries the whole text.
//
// `itemLabel` names what was copied in the screen-reader announcement — a
// checklist should not be announced as a prompt. It is a parameter rather than a
// second implementation so there is only ever one copy control on the site.
export function CopyPrompt({
  text,
  label = "Copy",
  itemLabel = "Prompt",
}: {
  text: string;
  label?: string;
  itemLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  return (
    <button
      type="button"
      className="copyBtn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
        } catch {
          setState("failed");
        }
        setTimeout(() => setState("idle"), 2200);
      }}
    >
      <span aria-hidden="true">{state === "copied" ? "✓" : state === "failed" ? "✕" : "⧉"}</span>
      <span className="copyBtnLabel">
        {state === "copied" ? "Copied" : state === "failed" ? "Select and copy" : label}
      </span>
      <span aria-live="polite" className="srOnly">
        {state === "copied" ? `${itemLabel} copied to your clipboard.` : state === "failed" ? "Copying failed. Select the text and copy it manually." : ""}
      </span>
    </button>
  );
}
