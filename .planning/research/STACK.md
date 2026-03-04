# Stack Research: Libraries to Add

> Research document for the portfolio redesign project.
> Covers new dependencies to add on top of the existing Next.js 15 / React 19 / Tailwind CSS 4 / Framer Motion stack.

---

## 1. Smooth Scroll: Lenis

**Package:** `lenis` (formerly `@studio-freight/lenis`)
**Confidence:** High (95%)

Lenis is the industry standard smooth-scroll library used across award-winning creative sites (Awwwards, FWA). It provides buttery-smooth inertia scrolling without hijacking native scroll behavior entirely.

**Why Lenis:**
- Lightweight (~4kb gzipped)
- Official React wrapper available (`lenis/react`) with hooks like `useLenis`
- Works alongside Framer Motion's `useScroll` and `useTransform` without conflict
- Preserves native scroll events so accessibility tools still function
- Actively maintained, strong community adoption in 2025-2026

**Integration notes:**
- Wrap the app in a `<ReactLenis>` provider in the root layout (client boundary)
- Server components are completely unaffected since Lenis only manipulates the DOM scroll container
- Must handle cleanup on Next.js route transitions (the React wrapper does this automatically)

**Alternatives considered:**
- Locomotive Scroll: Deprecated, team recommends Lenis as successor
- Native CSS `scroll-behavior: smooth`: Too basic, no inertia or fine-grained control
- GSAP ScrollSmoother: Requires GSAP Club license for commercial use

---

## 2. Internationalization: next-intl

**Package:** `next-intl`
**Confidence:** High (90%)

next-intl is the leading i18n solution purpose-built for Next.js App Router. It supports React Server Components natively, which is critical for this project.

**Why next-intl:**
- First-class App Router support with `[locale]` dynamic segment routing
- Works in both server and client components via different import paths
- Middleware-based locale detection (Accept-Language header, cookies, URL)
- Built-in message formatting (ICU syntax for plurals, dates, numbers)
- TypeScript-safe message keys with autocomplete
- Supports default locale without URL prefix (preserves existing URLs)

**Integration notes:**
- Requires `createMiddleware` in `middleware.ts` for locale routing
- Translation files live in `messages/en.json` and `messages/tr.json`
- Each component uses `useTranslations('namespace')` (client) or `getTranslations('namespace')` (server)
- MDX content stays Turkish-only initially; only UI chrome becomes bilingual

**Alternatives considered:**
- next-i18next: Designed for Pages Router, poor App Router support
- Paraglide.js: Newer, less mature ecosystem
- Custom solution: Too much boilerplate for locale routing and detection

---

## 3. Dark Mode Toggle: next-themes

**Package:** `next-themes`
**Confidence:** High (95%)

next-themes is the standard dark mode solution for Next.js projects. It is lightweight, well-tested, and handles the tricky parts (FOUC prevention, system preference sync, SSR).

**Why next-themes:**
- Tiny bundle (~1.5kb)
- Handles system preference detection and manual toggle simultaneously
- Injects a script before hydration to prevent flash of wrong theme (FOUC)
- Works with Tailwind CSS `class` dark mode strategy out of the box
- Provides `useTheme()` hook for toggle UI components

**Integration notes:**
- `ThemeProvider` wraps the app in root layout with `attribute="class"` and `defaultTheme="system"`
- Tailwind CSS v4 dark mode config must be set to `class` strategy (not default `media`)
- CSS custom properties define the Electric Warm palette with light/dark variants
- The toggle component is a small client component in the navigation

**Alternatives considered:**
- Manual implementation with `prefers-color-scheme`: No persistence, no toggle, FOUC issues
- Tailwind `media` strategy only: No user toggle possible

---

## 4. Typography: Google Fonts via next/font

**Package:** `next/font/google` (already available, no install needed)
**Confidence:** High (90%)

Bold, distinctive typography is central to the Color Block / Pop maximalist aesthetic. The project already uses Inter via `next/font/google`, so the infrastructure is in place.

**Recommended font pairings:**

### Option A (Recommended): Syne + DM Sans
- **Display (headings):** Syne -- geometric, bold, slightly quirky. Perfect for oversized hero text.
- **Body:** DM Sans -- clean geometric sans-serif, highly readable at small sizes.
- **Code:** Fira Code -- ligature support, excellent for code blocks.

### Option B: Space Grotesk + General Sans
- **Display:** Space Grotesk -- modern, techy feel with distinctive character shapes.
- **Body:** General Sans -- neutral but warm, great readability.
- **Code:** JetBrains Mono -- crisp, designed for code.

### Option C: Clash Display + Satoshi
- **Display:** Clash Display -- very bold and editorial, makes a strong statement.
- **Body:** Satoshi -- modern, friendly, works well at all sizes.
- **Code:** Fira Code.

**Integration notes:**
- Use `next/font/google` with `display: "swap"` to prevent invisible text during load
- Subset to `latin` and `latin-ext` (covers Turkish characters: c, g, i, o, s, u variants)
- Define as CSS variables (`--font-display`, `--font-body`, `--font-code`) for Tailwind integration
- Syne is ~25kb for regular+bold weights, DM Sans is ~20kb -- acceptable bundle sizes

---

## 5. Grain / Noise Texture: CSS-Only SVG Filter

**Package:** None needed
**Confidence:** High (95%)

A film grain overlay adds tactile quality to the Color Block aesthetic. This is achievable with pure CSS using an inline SVG filter, requiring zero additional dependencies.

**Approach:**
- Define an SVG `<filter>` with `<feTurbulence>` in the HTML (or as a data URI)
- Apply as a `::before` pseudo-element on sections that need grain
- Set `pointer-events: none` so it does not block interactions
- Use `mix-blend-mode: overlay` or `soft-light` for subtlety
- Animate `baseFrequency` slightly for a living grain effect (optional)

**Why no library:**
- SVG filters are GPU-accelerated in all modern browsers
- Zero bundle size impact
- Full control over grain intensity, scale, and blend mode
- Can be toggled per-section or globally

---

## 6. Magnetic / Cursor Effects: Custom Hook with Framer Motion

**Package:** None needed (uses existing Framer Motion)
**Confidence:** High (90%)

Magnetic effects (elements that subtly attract toward the cursor on hover) enhance interactivity. Framer Motion already provides all the primitives needed.

**Approach:**
- Custom `useMagnetic()` hook using `useMotionValue` and `useTransform`
- Track mouse position relative to the element via `onMouseMove`
- Apply `x` and `y` motion values with spring physics via `useSpring`
- Reset to center on `onMouseLeave`
- Wrap interactive elements (buttons, nav links, social icons) with a `<MagneticWrapper>` component

**Why no library:**
- Framer Motion's spring physics produce natural-feeling attraction
- Custom implementation allows fine-tuning strength, radius, and easing per element
- Keeps the dependency count low

---

## 7. What NOT to Use

### GSAP
- Licensing complexity: Free tier has restrictions, commercial features require paid Club plan
- Framer Motion covers all needed animation capabilities (scroll-triggered, staggered, spring physics, layout animations)
- Mixing two animation libraries creates bundle bloat and competing scroll listeners

### Three.js / WebGL / R3F
- Out of scope for this project phase
- The Color Block aesthetic is 2D-focused, not 3D
- Would add significant bundle size (~150kb+ for three.js alone)
- Can be added later as an enhancement if desired

### Locomotive Scroll
- Officially deprecated by the team
- Lenis is its spiritual successor, built by the same community
- No longer receives updates or bug fixes

### CSS Scroll Snap (as primary scroll mechanism)
- Feels restrictive and "trapped" on creative portfolio sites
- Users expect free-scrolling with visual section boundaries
- Can be optionally layered on top of Lenis if desired later

---

## Summary Table

| Feature           | Library/Approach       | Bundle Impact | Confidence |
| ----------------- | ---------------------- | ------------- | ---------- |
| Smooth Scroll     | lenis                  | ~4kb          | 95%        |
| i18n              | next-intl              | ~15kb         | 90%        |
| Dark Mode         | next-themes            | ~1.5kb        | 95%        |
| Display Font      | Syne (next/font)       | ~25kb         | 90%        |
| Body Font         | DM Sans (next/font)    | ~20kb         | 90%        |
| Code Font         | Fira Code (next/font)  | ~30kb         | 90%        |
| Grain Texture     | CSS SVG filter         | 0kb           | 95%        |
| Magnetic Effects  | Custom hook + FM       | 0kb           | 90%        |

**Total new JS bundle impact:** ~20kb gzipped (lenis + next-intl + next-themes)
**Total new font weight:** ~75kb (loaded progressively with swap)
