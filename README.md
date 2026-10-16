# HubX Frontend Assignment

A responsive feature showcase for the HubX Frontend Developer Case, built with React 18, TypeScript and CSS Modules on the provided Vite 4 template. There are five tabs, and each one shows a short description and an animated phone illustration.

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

You need Node 24 (see `.nvmrc`).

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
  App.tsx                  Page shell
  features.ts              Copy, icons and image positions for each tab
  useImagesReady.ts        Image preloading and decoding
  components/
    FeatureShowcase.tsx    Selected tab and slide transitions
    FeatureTabs.tsx        Tab list
    FeatureSlide.tsx       Copy and animated illustration
  assets/                  Icons and images exported from Figma
```

## Notes

### Layout

- The CSS is mobile-first. The design only exists at 375px and 1440px, so the widths in between are a judgment call: stacked below 1200px, side by side from 1200px, and the full tab grid from 1440px.
- Below 1440px the tabs scroll horizontally and snap to the center, like in the mobile video.
- Image positions are stored in the desktop illustration's coordinates (610 × 483) and converted to percentages, so the same data works at every size.
- Images are exported from Figma at 2x as WebP. Tab icons are CSS masks, so their color can change with the selected state.

### Animations

- Animations are plain CSS. There is no timing spec, so the timings come from the example videos.
- When the tab changes:
  1. The old slide fades out and the new copy fades in.
  2. The phone rises from behind the tab bar in about a second.
  3. The slide's own details animate in.
  4. Meanwhile, the ring around the selected tab draws in.
- The animation replays every time a slide is shown, and it waits until the slide's images are decoded.
- When you click through the tabs quickly, only the last selected slide animates in.
- With `prefers-reduced-motion`, everything fades instead of moving.

### Accessibility

- The tabs follow the WAI-ARIA tabs pattern, including the arrow keys, Home and End.
- Hover outlines only show on devices that can hover. Keyboard focus has its own outline.
- The eyebrow blue (#0381FF) is below WCAG AA contrast on white. It's kept to match the design.

### Differences from Figma

- **Font:** SF Pro can't be embedded on the web, so the page uses the system font stack. It renders a little wider than in Figma, so a few descriptions wrap one word earlier.
- **Learn More spacing:** Figma's description boxes are shorter than their text. The gap above Learn More therefore matches how the design looks rather than the 32px set in the file.
- **Phone mockups:** in Figma, only the desktop "Scan with Ease" mockup has side buttons and an outline. The other phones don't have them, so none of the phones here do.
- **Inconsistent frames:** other small differences between frames, such as an extra underline on one selected tab, are normalized.
- **Learn More link:** "Learn More" has no link in the design, so it's a button.

### Known issues

- **Tab bar shift:** between 768px and 1199px, where there is no design, the tab bar moves by up to 64px when the description length changes between slides. On mobile this only happens on Advanced Filters, and the example video does the same.

### Tooling

- **Provided configs:** ESLint, Stylelint, Prettier and TypeScript are unchanged. Stylelint requires kebab-case class names, so CSS Module classes are exposed in camelCase (`.learn-more` becomes `styles.learnMore`).
- **Vendor prefixes:** Autoprefixer adds them, based on the `defaults` browserslist query.
- **Tests:** they run on Vitest 0.34, the last version that supports Vite 4, with Testing Library and jsdom.
- **Checks:** husky and lint-staged check staged files before each commit, and GitHub Actions runs the format check, lint, tests and build.
- **Browsers:** checked in Chromium, WebKit and Firefox at 375, 768, 1024, 1200 and 1440px.

### Trade-offs

- **CSS instead of Motion or GSAP:** the animations are simple entrances that CSS keyframes handle well, so an animation library would only add weight.
- **Hand-written tabs instead of Radix or React Aria:** the WAI-ARIA tabs pattern is small enough here that a library would add more than it saves.
- **CSS Modules instead of Tailwind:** they give scoped styles without another dependency and work with the provided Stylelint config.
- **Exported images instead of rebuilding the phone screens in HTML:** the mockups are detailed app screenshots, so images are more accurate and lighter.
- **Natural wrapping instead of forced line breaks:** matching Figma's line breaks at every width would need extra markup for a small visual gain.

## AI usage

Built with Claude Code and Claude Opus 5.5. The numbers come from the session logs.

| Metric          | Value                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| Agents          | 1 main session and 2 subagents: an independent UI and animation review, and a fix pass                           |
| Iterations      | 3: build, review (13 findings), fixes                                                                            |
| Prompts         | 22. The first complete version came from the initial brief                                                       |
| First version   | About 1 hour from the brief to 13 commits                                                                        |
| Active time     | About 5 hours over two days                                                                                      |
| Model requests  | 741, with 793 tool calls                                                                                         |
| Tokens          | About 149M, 98% of them re-read from the prompt cache                                                            |
| Figma MCP calls | 7, with the results cached locally to stay within the Starter plan's monthly limit                               |
| Verification    | Playwright checks in Chromium, WebKit and Firefox, and animation timings measured frame by frame from the videos |
