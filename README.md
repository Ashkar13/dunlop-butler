# Dunlop & Butler — homepage

A single-page front-end preview of the Dunlop & Butler homepage, built from the
approved Figma **v3** design.

- Home page frame — `node-id=59885-644` (1440 × 4267)
- Style guide — `node-id=49801-176`

Next.js (App Router) + TypeScript + CSS Modules. No backend, no database, no
authentication. Everything on the page is either supplied design content or a
clearly-labelled demo interaction.

---

## Getting started

```bash
npm install       # Node 20.9+ (developed on Node 22)
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build
npm run start     # serve the production build on http://localhost:3000
npm run typecheck # tsc --noEmit
```

To use a different port: `npm run dev -- -p 3210`.

---

## Project layout

```
images/                      Original supplied assets — untouched, never referenced at runtime
public/assets/
  images/                    Optimised, descriptively-named runtime copies
  icons/                     Ten SVG icons (see "Assets" below)
  logos/                     Official logo lockup
src/
  app/
    layout.tsx               Metadata, fonts, skip link, PreviewProvider
    page.tsx                 Section composition, top to bottom
    globals.css              Reset, layout primitives, shared type helpers
    icon.png / apple-icon.png  Favicons generated from the supplied logo mark
  styles/tokens.css          Every design token, extracted from the style guide
  data/site.ts               All copy, categories, cards, stats, pricing, footer
  components/
    preview/PreviewProvider  Shared client state: announcements, favourites, search
    header/SiteHeader        Logo, country, three-part search, account, Post an Ad
    sections/                One component per band of the page
```

`src/data/site.ts` is the single place to edit copy or add content. The
components render whatever is in there — no strings are hard-coded in JSX.

---

## Design tokens

`src/styles/tokens.css` holds colour, type, spacing, radius, elevation and
motion tokens taken from the Figma style guide.

| | |
|---|---|
| Brand | `#009EF4` |
| Ink (content primary) | `#003F62`, plus 70 / 50 / 20 / 10 / 6 % alphas |
| Deep | `#002F49` — announcement strip, book panel |
| Tints | `#EEF9FF`, `#CCECFD`, `#B2E2FC` |
| Type | Inter (UI, body) and Inter Tight (H2, stats, prices), self-hosted via `@fontsource-variable` |
| Ramp | H1 64 · H2 48 · H3 32 · H4 24 · H5 20 · body 18 / 16 / 14 |
| Radii | 8 · 12 · 16 · 32 · 999 |
| Container | 1440px max, 120px gutter at desktop |

The type ramp and gutters are **fluid**: each token is a `clamp()` that lands on
the exact Figma value at 1440px and scales down to a small-screen minimum, so
desktop fidelity is preserved at the real frame width.

---

## Assets

The supplied filenames are not descriptive, so each file was opened and mapped
to its section before being copied:

| Original | Runtime copy | Used by |
|---|---|---|
| `public/PNG image.png` (2880×800) | `hero-interior-wide.jpg` | hero background |
| `public/SVG image.svg` (20×20) | `icons/heart.svg` | header favourites icon |
| `PNG image 2.png` | `tiny-home-modern.jpg` | card — Modern Tiny Home |
| `PNG image 3.png` | `tiny-home-interior.jpg` | card — Tiny Home Interior |
| `PNG image 4.png` | `tiny-home-on-wheels.jpg` | card — Tiny Home on Wheels |
| `PNG image 5.png` | `tiny-home-community.jpg` | card — Tiny Home Community |
| `public/assets/images/PNG image.png` (957×825) | *used as supplied* | book CTA panel **and** the "Our Book" card |
| `PNG image.png` | `flag-us.png` | header country control |
| `logos/PNG image.png` | `dunlop-butler-logo.png` | header, favicons, Open Graph |
| `SVG image.svg` → `8.svg` | `chevron-down`, `user`, `heart`, `search`, `house-tiny-home`, `house-adu`, `plan-basic`, `plan-premium` | header, directory, pricing |

Originals stay in `images/` exactly as delivered. Runtime copies are re-encoded
(photos to progressive JPEG) — the four card photos total ~250 KB.

The book cover is the exception: `public/assets/images/PNG image.png` is used
byte-for-byte as supplied, with no re-encode, resize, rotation or crop. It
arrives pre-tilted with its shadow baked in and its bottom edge already flat and
opaque, so it is designed to sit flush on the card. `images/PNG image 6.png` was
the earlier book render and is no longer referenced anywhere.

`check.svg` and `arrow-up-right.svg` did not exist in `images/`. Their vector
data was exported from the Figma nodes themselves (`59885:952`, `59885:1106`)
rather than redrawn by hand.

The hero uses a dedicated 2880×800 source — exactly 2× the 1440×400 Figma hero
frame — so at desktop the composition matches the design one-to-one and is
never upscaled. It is re-encoded to progressive JPEG (2.2 MB → 322 KB) because
it is the LCP image. The supplied `public/SVG image.svg` proved byte-identical
to the heart icon already in `public/assets/icons/heart.svg`
(md5 `3ab2374f…`), so that file is unchanged and is confirmed to be exactly the
supplied artwork.

---

## Responsive behaviour

No mobile or tablet designs were supplied. These decisions were inferred:

- **Header.** Below 1200px the search moves to its own full-width row and the
  account controls collapse behind a labelled `Menu` disclosure. Below 640px the
  search stacks into three full-width fields plus a labelled `Search` button, so
  no label is ever squeezed and nothing essential is hidden. Below 480px the
  country control keeps flag + chevron only, with the country name still in its
  accessible name.
- **Grids.** Stats go 4 → 2 columns at 900px. The category directory goes 2 → 1
  card at 900px, and its inner two columns become one below 480px — reading
  order is preserved throughout. The card grid goes 4 → 2 → 1 at 1024 / 560px.
- **Tabs.** The filter row scrolls horizontally inside its own track (bleeding to
  the page edge as a scroll affordance) rather than wrapping or shrinking. The
  page itself never scrolls sideways at any width.
- **Touch.** Interactive controls are at least 40–44px tall on small screens.
- **Images.** The hero is `object-fit: cover` on a filled `next/image` — the
  `background-size: cover` / `background-position` pair, kept as an `<img>` so
  it still gets responsive sources and an LCP preload. Its crop steps at three
  widths (`45% 58%` → `48% 54%` → `center center` from 1200px), pulling left of
  centre on narrow screens to hold the seating group and plant in frame rather
  than the bright blinds on the right. Card images are `object-fit: cover`, and
  the transparent book cover is `object-fit: contain` on a deep-navy field.

---

## Interaction and motion

No hover or animation specs were supplied. The system is deliberately restrained:

- Hover and focus transitions run at 160–200ms; content transitions
  (tab panels, the menu disclosure, the toast) at 300ms.
- Interactive surfaces change border, background and shadow; movement is capped
  at ~2px of translation and a 1.03 image scale. No large zooms, no scroll-linked
  effects.
- Every interactive element has a visible focus ring (`--focus-ring`, or a white
  variant on dark panels). A skip link is the first tab stop.
- The category ticker is a seamless marquee: the run is rendered twice and the
  track translates by exactly half its width. It pauses on hover, on keyboard
  focus, and via an explicit pause button; the duplicate run is hidden from
  assistive tech.
- The four statistics count up from zero the first time the band enters the
  viewport, once per page load. `src/components/ui/useCountUp.ts` is a
  dependency-free reusable hook: give it the display strings as they should
  finish (`31.5B`, `40+`, `180%`), and it drives them all off one
  `requestAnimationFrame` clock with a cubic ease-out over 1.8s, landing on the
  supplied strings verbatim so decimals and suffixes are never re-derived. The
  value sits in a one-cell grid over an invisible sizer holding the final
  string, with tabular figures, so counting causes no layout shift. The markup
  server-renders the final values, so they are correct without JavaScript.
- `prefers-reduced-motion: reduce` collapses all durations to ~0, turns the
  ticker into a static horizontally-scrollable strip, and shows the statistics
  at their final values immediately without counting.

---

## What is real, what is demo

**Real**

- Category tabs genuinely filter the local card data.
- The header search genuinely filters the category directory — by scope
  (Categories / Tiny Homes / ADUs) and by keyword against category names.
- Premium term tabs (3 / 4 / 6 months) genuinely switch the displayed price.
- "Get the Book" links to the Amazon page given in the Figma annotation.

**Demo only**

- Favourites. The heart on a card and the header counter are in-memory state.
  No account, no persistence — they reset on reload. The design showed the
  header heart only; the per-card save button is an inferred addition.

**Not connected — every one announces itself**

Post an Ad · My Account · Country selector · See All (both verticals) · every
category name in the directory · View Details on the four listing cards · all
five footer links. Each renders a plain-language "isn't connected in this
preview" message in a polite live region plus a visible toast, instead of a dead
link or a fake success. All of them route through
`usePreview().notConnected()` — that one function is the integration point.

---

## Handoff — what is still needed

**Missing content**

1. **Premium prices for the 3-month and 6-month terms.** Only `$14.95 / 4 months`
   appears in the design. The other two terms show an explicit "hasn't been
   supplied yet" note rather than an invented number. Add `price` and `period`
   to `PREMIUM_TERMS` in `src/data/site.ts`.
2. **Cards for three showcase tabs.** ADUs, Tiny Home Manufacturers and ADU
   Contractors have tabs but no cards in the design. They render a named empty
   state. Add entries to `SHOWCASE_CARDS` with a matching `tab`.
3. **A higher-resolution hero image.** The hero and the "Tiny Home Interior" card
   share one 544 × 500 file — the only asset supplied for that slot. It is soft
   when stretched across a 1440px hero. A ~2560px wide original would fix it.

**Missing destinations**

Everything in the "not connected" list above. Figma's annotations describe the
intent for two of them — `My Account` should route to the profile, or to sign-up
/ login when signed out; `Post an Ad` presumably starts the listing flow — but no
routes, auth or submission endpoints exist yet, and none were created.

**Deliberately out of scope**

No authentication, billing, listing submission, backend, additional pages or
remote data. Treat the account / post-ad / payment annotations as future
integration requirements.

---

## Notes

- `robots` is set to `noindex, nofollow` in `src/app/layout.tsx` — this is a
  preview build. Remove that before any public deployment.
- `metadataBase` uses a placeholder host; set the real origin before deploying.
- No repository remote has been configured and nothing has been deployed.
