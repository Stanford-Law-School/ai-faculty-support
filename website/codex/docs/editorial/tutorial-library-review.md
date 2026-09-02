# Staff review — tutorial library

Internal editorial record for `/tutorials/`. **Not rendered anywhere on the
website.** Open local questions stay questions here instead of becoming public
claims.

- Library record: `website/app/lib/tutorialLibrary.ts`
- Blocks: `website/app/components/TutorialLibrary.tsx`
- Index: `website/app/tutorials/page.tsx`
- Owner: Robert Crown Law Library

## What the library is for

The Learn AI guides answer one question in five minutes. A tutorial is the other
shape: a long document a faculty member downloads, reads at length, and keeps open
while doing the work. Both are learning content, so the library sits directly
beneath the guide collection on `/learn-ai/` rather than in a separate silo.

## In the library

| Tutorial | Route | File | Document updated | Sources verified | Review by |
| --- | --- | --- | --- | --- | --- |
| Custom AI Chat Assistants | `/tutorials/custom-ai-chat-assistants/` | 42 pp · 3.4 MB | 2026-08-06 | 2026-08-04 | 2026-11-04 |
| ElevenLabs for Faculty | `/tutorials/elevenlabs-for-faculty/` | 41 pp · 10.1 MB | 2026-08-07 | 2026-08-04 | 2026-11-04 |

## How to add a tutorial

1. **Put the file in `website/public/tutorials/`**, named `<slug>.pdf`. The record
   validator requires the file name to match the slug so the download URL and the
   route cannot drift apart.
2. **Render the first page** to `website/public/tutorials/<slug>-page-1.png` at
   about 1000px wide. This image is not optional — see "Why there are two preview
   layers" below. It is committed rather than generated, because the host has no
   PDF rasterizer. What was used here:

   ```python
   import pymupdf
   doc = pymupdf.open("website/public/tutorials/<slug>.pdf")
   page = doc[0]
   zoom = 1000 / page.rect.width
   page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom)).save(
       "website/public/tutorials/<slug>-page-1.png"
   )
   ```

3. **Add the record** to `tutorials` in `website/app/lib/tutorialLibrary.ts`. Every
   field is required; `npm run build` fails on a missing one. `bytes` must be the
   real file size (`stat -c%s`) and the cover `width`/`height` the real pixel
   dimensions — `npm run lint` compares both against the files on disk.
4. **Add the page**: `website/app/tutorials/<slug>/page.tsx`. Copy the existing
   one; it is a thin composition of the shared blocks and holds no content of its
   own. Lint fails if it omits `<TutorialFacts>`, `<TutorialActions>`, or
   `<TutorialPreview>`.
5. **Nothing else needs editing.** The index, the Learn AI section, the homepage
   line, the AI Resources cards, site search, and the sitemap all read from the
   records.

## Why there are two preview layers

An embedded PDF is not a preview a reader can rely on. Several mobile browsers
refuse to display one inline, some desktop configurations have the viewer
disabled, and an embedded viewer prints as an empty box. So the page shows:

1. **An image of the real first page**, always rendered. This is the guaranteed
   preview, and it is what survives printing.
2. **The whole file in the browser's own PDF viewer**, with the download link as
   the object's fallback content.

Verified in headless Chromium: the cover image renders at its intrinsic
1000×1295 and the page does not reflow when it loads. **The embedded viewer could
not be verified here** — headless Chromium has no PDF plugin, so the frame renders
as an empty box regardless of the markup. Confirm the inline viewer once in a real
desktop browser and once on a phone. The failure mode is benign either way: the
first page and the download are already on the page.

## Dates, and the one that needs a decision

Three dates are modelled separately because they are different claims:

- **Document updated** — when the author last revised the document. Rendered.
- **Added to the library** — when it went onto this site. Rendered.
- **Sources verified** — when the product and policy details were last checked
  against vendor and Stanford pages. Rendered, but **gated**: past `reviewBy` the
  page stops saying the details were verified and says a re-check is due instead.

**Open question 1.** The supplied update date is **August 6, 2026**, two days after
the build date of 2026-08-04, so the page currently displays a future date. The
record accepts it and emits a build warning rather than an error, on the view that
an author can hand over a document dated for its release. If that date was a slip,
change `updatedOn` in the record — it is one field, and nothing else needs editing.

**Open question 2.** `reviewBy` is set three months out (2026-11-04), matching the
cadence used for the detection-guidance record. Vendor builder interfaces move
faster than that in practice; a shorter cadence may be right.

## Awaiting confirmation — RCLL editorial

3. Whether **"Tutorial library"** is the preferred public name, and whether
   `/tutorials/` is the preferred route.
4. Whether the tutorial's summary, subtitle, and "what you will be able to do"
   list read the way the author intends. All of it was written from the document,
   not supplied with it.
5. Whether the **cautions** shown on the page are the right three to lift out of
   the document. They are the ones the document itself states: an assistant is not
   automatically more accurate, a shared assistant can expose its instructions and
   files, and interfaces change faster than the document.
6. Whether the **first page** is the best cover image, or whether a later page
   showing an actual builder screen would preview the document better.
7. Whether the library should carry a **topic filter** now or wait until there are
   enough tutorials to need one. There is one tutorial, so it has none.
8. Whether a tutorial should also appear in the **Learn AI guide grid**, or stay in
   its own section beneath it as it does now.

## Navigation

The header bar is capped at five destinations (`PRIMARY_NAV_LIMIT`, measured in
PR #62), and adding a sixth would put it back onto two rows. So the library is
reachable from:

- the footer's "Start here" group — enforced by the nav record's reachability
  check, which fails the build if the link is removed;
- the Learn AI landing page, directly beneath the guide collection;
- a line in the homepage's Learn section;
- an "Long-form tutorials" section on AI Resources;
- site search, matching on contents and outcomes as well as the summary.

If the library should be in the header bar instead, something has to come out —
that is the deliberate cost the cap imposes.

## What the library deliberately does not do

- **Collects nothing.** No form, input, submit handler, or click handler anywhere
  in the library. Lint fails on any of them.
- **Counts nothing.** The download is a plain `<a download>` to a file in the
  static export — no redirect through a counter, no analytics call.
- **Fetches nothing.** The preview is the browser's own viewer reading a local
  file; the cover is a local image.
- **Claims nothing about accuracy.** The record rejects a caution that promises
  accuracy or safety, and requires at least one caution per tutorial — the limits
  are the first thing lost when a 42-page document is summarized into a card.

## Verification performed

- `npx tsc --noEmit`, `npm run lint`, and `npm run build` clean.
- Every record validation and every lint guard verified by deliberately breaking
  the data or the file and then restoring it: byte-size mismatch, missing file, a
  file that is not a PDF, a cover with wrong dimensions, a missing cover, a removed
  preview, a click handler, each of six discoverability links, the print rule, an
  empty caution list, an un-negated promise word, `updatedOn` before `publishedOn`,
  a dead related-guide slug, a mismatched file name, and `reviewBy` before
  `sourcesVerifiedOn`.
- Staleness gate verified in both directions, including `SLS_STRICT_TUTORIALS=1`
  promoting the overdue warning to a build error.
- No horizontal overflow at 320, 768, 1024, or 1440px on the index, the tutorial
  page, `/learn-ai/`, the homepage, or AI Resources. One `h1` per page, no heading
  level skips, no console errors.
