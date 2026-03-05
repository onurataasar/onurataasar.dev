# Phase 2: Layout & Navigation - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the site into full-viewport color-block sections with a redesigned navigation that fits the maximalist Color Block / Pop aesthetic. Includes: section layout system, navigation redesign, responsive breakpoints, footer/contact block. Does NOT include: homepage content (Phase 4), animations/scroll effects (Phase 3), or content page redesigns (Phase 5).

</domain>

<decisions>
## Implementation Decisions

### Navigation Style
- Oversized horizontal top nav using Syne (display font) for link labels
- Nav links are a design statement — large enough to be part of the visual hierarchy, not just functional
- Active link indicated by accent underline or color-block highlight behind it
- Name "ONUR ATA ASAR" large at left, links spread right
- Nav picks up section colors through backdrop-blur as user scrolls through color blocks
- Theme toggle integrated into the nav bar
- Sticky at top with backdrop-blur transparency

### Mobile Navigation
- Full-screen overlay triggered by hamburger
- Overlay uses accent color background with oversized Syne text for links
- Same design language as the color-block sections — the overlay IS a color block
- Social icons visible in the overlay
- Theme toggle accessible in the overlay

### Section Color-Blocking
- Every section gets a unique background color from the Electric Warm palette
- Distribution: cream (hero), deep charcoal (about), orange (skills), coral (projects), yellow (contact)
- Hard edges between sections — no diagonal cuts, no gradients between blocks
- Poster-like stacking: bold, graphic, confident boundaries

### Text Contrast on Colored Sections
- Orange bg (#FF6B35) → cream text (#FFF8F0) — NOT pure white (contrast ratio)
- Coral bg (#FF4444) → white text
- Yellow bg (#FFD23F) → charcoal text (#1A1A2E)
- Charcoal bg (#1A1A2E) → white/cream text
- Cream bg (#FFF8F0) → charcoal text
- All combinations must pass WCAG AA (4.5:1 minimum)

### Dark Mode Behavior for Color Blocks
- Accent sections (orange, coral, yellow) get muted/darker variants in dark mode
- Light: cream / #FF6B35 / #FF4444 / #FFD23F / charcoal
- Dark: charcoal / #CC5528 / #CC3636 / #CCa832 / deeper dark
- Neutral sections swap: cream → charcoal, charcoal → deeper dark

### Layout Grid
- Sections go edge-to-edge for background color
- Content inside uses a wide container (~1200-1400px) with asymmetric placement
- Text offset left, visuals offset right, etc. — breaks the centered column feel
- Current max-w-4xl centered layout is replaced

### Asymmetry
- Bold overlap and offset — large elements dramatically offset, overlapping section boundaries
- Text and visuals at very unequal sizes — gallery/poster energy
- Not every section needs asymmetry — but key sections should break the grid

### Breakpoints
- Standard Tailwind breakpoints: sm (640), md (768), lg (1024), xl (1280), 2xl (1536)
- 375px → mobile: single column, full-screen overlay nav
- 768px → tablet: layout begins to widen
- 1024px → desktop: full layout, asymmetry kicks in
- 1440px → wide: extra breathing room

### Mobile Section Heights
- Desktop: all sections min-h-svh (full viewport)
- Mobile: min-h-[70svh], grows if content needs more space
- No awkward empty dead space on small screens

### Footer / Contact Block
- Split layout: left side has big "Say hello" CTA text, right side has contact info and socials
- Email shown as visible text (copyable) AND as a mailto link — both options
- Full contact footer appears on homepage only
- Other pages get a compact footer: social icons + copyright
- Footer is full-width, sits at the bottom of the homepage as the last section

### Claude's Discretion
- Exact nav link sizing and spacing
- Hamburger animation style
- Specific muted dark mode color values (as long as they pass WCAG)
- Container max-width exact value (1200-1400px range)
- Which sections get overlap/asymmetry vs which stay cleaner
- Compact footer design for non-homepage pages
- Loading/transition behavior between nav and content

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Navigation.tsx`: Client component with framer-motion, animated hamburger, route-aware active states. Will be heavily rewritten but interaction patterns (route change close, AnimatePresence) can be preserved.
- `Footer.tsx`: Client component with social links array and framer-motion hover effects. Social data structure reusable.
- `ThemeToggle.tsx` / `ThemeProvider.tsx`: Theme infrastructure stays as-is, just repositioned in new nav.
- `motion.tsx`: FadeIn, StaggerContainer, StaggerItem components — reusable for section content reveals.
- `react-icons`: Already installed with FaGithub, FaLinkedin, FaMedium, HiOutlineMail icons.

### Established Patterns
- Design tokens via CSS custom properties: var(--color-*), var(--font-size-*), var(--font-*)
- Class-based dark mode with .dark class and @custom-variant
- Framer Motion for all animations (motion.a, AnimatePresence, layoutId)
- Font variables: --font-display (Syne), --font-body (DM Sans), --font-code (Fira Code)

### Integration Points
- `layout.tsx`: Currently wraps everything in max-w-4xl. Must be restructured to allow edge-to-edge sections while keeping the nav/footer architecture.
- `globals.css`: Section-specific color tokens may need to be added for the per-section backgrounds.
- `page.tsx`: Homepage currently uses hardcoded violet/zinc colors — needs full migration to design tokens and new section structure.

</code_context>

<specifics>
## Specific Ideas

- Nav should feel like it's part of the poster — not a utility bar bolted on top
- Full-screen mobile overlay should feel like an event, not just a menu appearing
- The poster/gallery metaphor: scrolling the homepage = walking through a gallery of posters
- Each section is its own composition — not just "different background color" but different spatial arrangement

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-navigation*
*Context gathered: 2026-03-05*
