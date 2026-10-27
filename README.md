# Black Womxn Caucus — website

Static site, ready to deploy to Netlify. No build step, no dependencies —
plain HTML/CSS/JS.

## Pages
- `index.html` — Home
- `about.html` — About, mission/vision, principles, team
- `our-work.html` — The three divisions + campaigns
- `media.html` — Video/press archive (audio-toggle enabled)
- `resources.html` — Publications
- `get-involved.html` — Donate, volunteer, merch, contact
- `404.html` — Not-found page

## Deploying on Netlify
**Fastest way (drag and drop):**
1. Go to https://app.netlify.com/drop
2. Drag the whole `bwc-site` folder (or a zip of it) into the browser window.
3. Netlify gives you a live URL immediately.
4. In Site settings → Domain management, add `blackwomxncaucus.org` as a custom domain and follow Netlify's DNS instructions (or point your existing DNS provider's A/CNAME records at Netlify).

**Git-based (recommended for ongoing edits):**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: Add new site → Import an existing project → connect the repo.
3. Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
4. Every push to your main branch auto-deploys.

## Adding real video/audio
Every video should be tagged `data-audio="true"` and `muted` by default —
the site's global sound toggle (bottom-right corner button) controls all
of them together. See the comment block at the top of `media.html` for the
exact markup to drop in once files are ready. Keep video files reasonably
compressed (H.264 MP4, under ~15MB where possible) since Netlify serves
them directly — for longer-form video, embedding YouTube/Vimeo is lighter.

## Editing content
There's no CMS — text lives directly in the HTML files. Each page repeats
the same header/footer; if you change the nav or footer, update it in all
six page files (or ask to have this wired up to a static-site generator
later if the content will change often).

## Logo
The BWC badge now sits in the nav on every page, and is used for the
favicon (`assets/img/favicon-32.png` / `favicon-180.png`). Source files
live in `assets/img/` — swap in a higher-resolution version there if one
becomes available; the supplied logo is only 156×156px.

## Accessibility
- **Listen to this page** — the button next to the sound toggle (bottom
  right of every page) uses the browser's built-in text-to-speech
  (Web Speech API) to read the page's main content aloud. This works even
  for visitors who don't have their own screen-reader software installed.
  No account, plugin, or cost involved — it's native to the browser.
- A "Skip to main content" link appears for keyboard users on first Tab
  press.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), ARIA labels on
  icon-only buttons, and visible focus outlines are in place throughout.
- This covers the essentials, but isn't a full WCAG audit — if BWC needs
  formal accessibility compliance (e.g. for a grant or government
  requirement), a proper audit against WCAG 2.1 AA is worth commissioning.

## Things to finish
- **Crisis of Care link:** the "Visit the Crisis of Care website" button on
  `our-work.html` (section `#crisis-of-care`) is hidden until the website
  address is known. Put the address in its `href`, delete the word `hidden`.
- **Training manual:** `assets/docs/BWC-UNCSW-Training-Manual-3rd-Cohort-DRAFT-2.pdf`
  (compressed from 67 MB to 23 MB for the web). To publish a final version,
  replace that file (keep the name, or update the two links in `resources.html`).
- **Photos:** all brief photos are in `assets/img/` (programs and home) and
  `assets/img/media/` (gallery). Captions and descriptions are in the HTML.

## Colour & type system
Defined at the top of `assets/style.css` as CSS variables — change
`--ink`, `--paper`, `--accent` etc. in one place to re-theme the whole site.
