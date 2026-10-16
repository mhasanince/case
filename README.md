# HubX Frontend Assignment

A responsive feature showcase built from the HubX Frontend Developer Case: five tabs, each with its own copy and an animated phone illustration. It uses React 18, TypeScript and CSS Modules on the provided Vite 4 template.

## Design

Figma design URL:

```
https://www.figma.com/file/fqq3IGqxAiIUEItAWHZ54W/Frontend-Case-(HubX)?type=design&node-id=896%3A263&mode=design&t=7TvYeaXudwa3TGy5-1
```

Example implementation videos:

```
https://drive.google.com/drive/folders/1kkicvHG7UMc-MY9npv_fy4gW1cZF3QiO?usp=drive_link
```

## Getting started

Requires Node 24 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

| Script               | What it does                                     |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Starts the Vite dev server                       |
| `npm run build`      | Type-checks and builds to `dist/`                |
| `npm run preview`    | Serves the production build                      |
| `npm test`           | Runs the test suite once                         |
| `npm run test:watch` | Runs the tests in watch mode                     |
| `npm run lint`       | Runs ESLint, the TypeScript check and Stylelint  |
| `npm run format`     | Formats with Prettier and fixes Stylelint issues |

## Project structure

```
src/
  App.tsx                  Page shell with a visually hidden h1
  features.ts              Feature copy, icons and illustration image positions
  useImagesReady.ts        Image preloading and decode tracking
  components/
    FeatureShowcase.tsx    Selection state, slide transition and tab panel
    FeatureTabs.tsx        Accessible tab list
    FeatureSlide.tsx       Copy and animated phone illustration
  assets/                  Icons and WebP images exported from Figma
```

## Decisions

### Layout

- The CSS is mobile-first. The design exists at 375px and 1440px, and the widths in between follow these breakpoints:
  - Below 768px, the 375px design: content stacked and the illustration scaled to 399px wide.
  - From 768px, the desktop type scale and the full-size illustration, still stacked.
  - From 1200px, copy and illustration side by side in a 1440px container, centered vertically on the page.
  - From 1440px, the Figma tab grid: four 300px tabs and a 240px last tab. Below that, tabs keep their 300px width and the strip scrolls horizontally, so labels never get squeezed.
- The illustration area uses the desktop design's coordinate space (610 × 483px). Every image keeps its Figma position in px, and CSS turns it into percentages, so one set of data serves every screen size.

### Assets

- Phone mockups and decorations are rendered from the Figma file at 2x, trimmed and encoded as WebP, about 620 KB for all five slides. Each phone keeps only the part above the tab bar, because the rest is never visible.
- Tab icons are single-color SVGs used as CSS masks, so their color can transition between the inactive and active states. The detailed stamp icon is a PNG mask because its SVG is about 150 KB.

### Typography

- The design uses SF Pro, Apple's system font, whose license does not allow embedding it on the web. The font stack resolves to SF Pro on Apple devices and to the platform's UI font elsewhere.
- Browsers render the system font 3–10% wider than Figma does, more at small sizes, so some descriptions wrap one word earlier. The Figma type values are kept instead of tuned letter spacing that would only fit one platform.

### Animation

There are no timing specs, so the order and timing come from the example videos. Each element was tracked frame by frame in the 60fps desktop video and fitted to CSS easing curves. Everything is plain CSS.

1. The current slide fades out in 300ms, and the next slide's copy fades in the same way (`ease`).
2. 100ms after the copy, the phone rises from behind the tab bar in 1s (`ease`).
3. 850ms after the copy, the decorations enter one after another, 500ms each (`ease`):
   - the signature and stamp grow in from nothing, 150ms apart;
   - the scanned pages slide up 375ms apart, each starting at the size of the front page and shrinking into its place in the stack;
   - the filter sliders slide out from behind the phone, 150ms apart;
   - the arrow pops in and the exported files float up after it, 215ms apart.
4. Meanwhile the selected tab's ring draws around its icon and the previous one retracts (600ms, `ease-in-out`), and the tab colors change in 225ms.

- Each slide remounts when it is shown, so its animation replays every time.
- All images are preloaded on mount, and an illustration's animation stays paused until its images are decoded, so nothing animates in half-loaded.
- Fast switching: the tab selection updates at once, the outgoing slide keeps fading, and only the last selected slide enters. Selecting the visible slide again during the fade fades it back in.
- With `prefers-reduced-motion`, movement turns into plain fades, the ring appears without drawing, and the tab strip scrolls without smoothing.

### Accessibility

- The tabs follow the WAI-ARIA tabs pattern: roving tabindex, ArrowLeft and ArrowRight (wrapping), Home and End, automatic activation, and a panel labelled by its tab. On narrow screens the selected tab scrolls into view.
- The DOM order matches the visual order (panel, then tabs), so keyboard focus moves top to bottom.
- Each illustration is one `role="img"` element with a description, and the images inside it are decorative.
- Hover outlines apply only to devices that can hover, and only to unselected tabs: as in the video, the outline fades out once a tab is clicked. Keyboard focus has its own outline.
- Known issue: the design's eyebrow blue (#0381FF) has a 3.7:1 contrast ratio on white, below WCAG AA for 16px text. It is kept for fidelity to the design.

### Deviations from the Figma file

- The selected tab's ring is a full circle, as in the videos. Figma shows a partially drawn arc.
- Layers outside the visible frames, the "FastScan delivers advanced technological solutions" heading and the "Try Filters" section, are not part of the design and are not built.
- Inconsistencies between frames are normalized: the reused "Active" tab layer, an extra underline on one selected tab, and a larger Learn More button in one mobile frame.
- "Learn More" has no destination in the design, so it is a button.

### Tooling

- The provided ESLint, Stylelint, Prettier and TypeScript configs are unchanged. stylelint-config-standard requires kebab-case class names, so Vite exposes CSS Module classes in camelCase: `.learn-more` becomes `styles.learnMore`.
- Autoprefixer with the `defaults` browserslist query adds vendor prefixes such as `-webkit-mask-image`.
- Vitest 0.34, the last version that supports Vite 4, runs the tests with Testing Library and jsdom. They cover the tab semantics, keyboard navigation, slide transitions including fast switching, and image readiness.
- husky and lint-staged lint and format staged files before each commit. GitHub Actions checks formatting, lint, tests and the build on every push.
- The page was checked in Chromium, WebKit and Firefox at 375, 768, 1024, 1200, 1440 and 1920px.
