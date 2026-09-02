# SLS Faculty AI Skills Website

This is a standalone Next.js TypeScript site using the App Router. It is intentionally contained in `website/` so the existing Skill source, validation, and packaging workflow remain unchanged.

## Local development

```bash
cd website
npm install
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
cd website
npm run lint
npm run build
npx tsc --noEmit
```

The website is public and requires no account or environment configuration to run locally.

## Release data and downloads

Public Skill metadata is read from `../releases/skills.json`.

Downloadable Skill ZIPs are built automatically from the `skills/` source folders
at build time by `../scripts/build_site_packages.mjs` (run as the `prebuild` step,
so `npm run build` and every Vercel deploy produce them). Each ZIP is written to
`public/downloads/<slug>.zip` and served from the site itself — no external file
host is involved.

A Skill is published only when its `downloadUrl` in `releases/skills.json` is set
to `"/downloads/<slug>.zip"`. Leave it as `"#coming-soon"` to keep a Skill listed
but not yet downloadable. The generated ZIPs are git-ignored because they are
rebuilt on every deploy.

**To publish or update a Skill's download:** edit the Markdown in `skills/<slug>/`,
make sure its `downloadUrl` is `"/downloads/<slug>.zip"`, then commit and push. The
site rebuilds and serves the fresh ZIP.

## Guide screenshots and recordings

The long-form guides under `/build-an-agent` reserve every screenshot and screen
recording with a `MediaPlaceholder` slot (see `app/components/GuideBlocks.tsx`).
An unfilled slot renders as a dashed frame carrying a stable tracking id —
`CLAUDE-06-A` and its siblings — so it is visible on the page which assets are
still outstanding. Only the Claude track has unfilled slots now; remove a slot
outright rather than leaving it in place if the asset is no longer planned.

Drop self-hosted assets in `public/media/build-an-agent/`. Anything in `public/`
is served from the site root, so `public/media/build-an-agent/example.png` is
available at `/media/build-an-agent/example.png`. Use lowercase, descriptive
names and **no spaces** — a space has to be percent-encoded everywhere the file
is referenced, which is a papercut with no upside. The guide page maps each file
to its slot, so filenames do not have to match slot ids.

Export video as **MP4 (H.264 video, AAC audio)**, and run every recording through
this before committing it:

```bash
ffmpeg -i recording.mov -c copy -movflags +faststart recording.mp4
```

`-c copy` remuxes without re-encoding, so it is lossless and near-instant. It
does two necessary things:

**Fixes the container.** A macOS screen recording is QuickTime, and its
`compatible_brands` list says `qt` and nothing else. Browsers refuse to play it
even though the video inside is ordinary H.264 — Firefox never has, and Chrome
will not either. This is not a codec problem and re-encoding is not the answer;
the bytes are fine, only the wrapper is wrong.

**Moves the `moov` atom to the front.** Screen recorders write it last, which
forces a browser to fetch the entire file before it can begin playing — several
seconds of nothing on a 15 MB recording. `+faststart` is what makes
`preload="metadata"` and progressive playback actually work.

Check any file you did not produce yourself:

```bash
ffmpeg -i file.mp4 2>&1 | grep compatible_brands   # want isom/mp41/avc1, not qt
```

Filling a slot is a one-line edit to the guide page. A screenshot:

```tsx
<MediaPlaceholder
  kind="screenshot"
  id="GPT-04-A"
  title="The Skills tab, with Create and Upload from your computer"
  src="/media/build-an-agent/gpt-04-a.png"
  alt="The ChatGPT sidebar with the Skills tab open and the upload option showing."
  shows="Where Plugins and the Skills tab sit in the sidebar."
/>
```

A short self-hosted recording — pass several paths to offer `.webm` before the
`.mp4` fallback, and add `captions` once a WebVTT file exists:

```tsx
<MediaPlaceholder
  kind="recording"
  id="GPT-07-A"
  title="Preview to published: the whole build in one pass"
  src={["/media/build-an-agent/gpt-07-a.webm", "/media/build-an-agent/gpt-07-a.mp4"]}
  poster="/media/build-an-agent/gpt-07-a.jpg"
  captions="/media/build-an-agent/gpt-07-a.vtt"
/>
```

Long recordings should not be committed. `public/media/` is not git-ignored, and
a multi-minute screen capture would sit in git history permanently and ship in
every Vercel build. Host those on Google Drive or Panopto and pass the embed URL
instead, as the install pages already do:

```tsx
<MediaPlaceholder
  kind="recording"
  id="GPT-07-A"
  title="Preview to published: the whole build in one pass"
  embed="https://drive.google.com/file/d/FILE_ID/preview"
  embedHref="https://drive.google.com/file/d/FILE_ID/view"
/>
```

`embedHref` adds a link out to the watch page, which is what a reader needs when
the embed is blocked or asks them to sign in. Rule of thumb: self-host anything
under about 10 MB, embed the rest. Either way, give screenshots real `alt` text
describing what the reader should notice, and add captions to recordings before
they are shared widely.

## Vercel deployment

Create a Vercel project from this repository and set:

- **Root Directory:** `website`
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Install Command:** `npm install`
- **Output Directory:** leave unset — **not** `out`

`next build` writes
`website/.next` (or `.next` when Root Directory is `website`).

- **Root Directory `website` (preferred):** `website/vercel.json` sets `framework:
  "nextjs"` and leaves `outputDirectory` unset.
- **Root Directory repository root:** root `vercel.json` sets
  `outputDirectory: "website/.next"` because the workspace build does not write
  `.next` at the repository root.

Clear any dashboard **Output Directory** override (`public`, `out`, or `.next`).
Those break deployment even when the build succeeds.

Prefer deploying with `website` as the Root Directory. The repository also includes a root-level `vercel.json` plus npm workspace scripts as a safety net for projects that were accidentally created from the repository root; those settings delegate the production build to this website app.
