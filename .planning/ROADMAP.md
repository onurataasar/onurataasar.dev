# Roadmap: onurataasar.dev Redesign

**Created:** 2026-03-04
**Phases:** 7
**Requirements:** 46 mapped | 0 unmapped ✓

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | 2/2 | Complete   | 2026-03-05 | 4 |
| 2 | Layout & Navigation | Build full-viewport section structure and redesigned navigation | LAY-01..06 | 4 |
| 3 | Animations & Scroll | Add smooth scroll, scroll-triggered reveals, grain, magnetic effects | ANIM-01..06 | 5 |
| 4 | Homepage | Build the flagship page — proves the design end-to-end | HOME-01..05 | 4 |
| 5 | Content Pages | Redesign blog, notes, projects, CV with new aesthetic | BLOG-01..05, PROJ-01..03, CV-01..03 | 4 |
| 6 | Internationalization | Add Turkish + English bilingual support | I18N-01..04 | 3 |
| 7 | Polish & Launch | 404 page, loading states, OG images, performance audit | POL-01..04 | 4 |

---

## Phase 1: Design Foundation

**Goal:** Establish the complete visual identity — Electric Warm palette, distinctive typography, design tokens with light/dark variants, and a working dark mode toggle.

**Requirements:**
- DS-01: Electric Warm color palette with CSS custom properties
- DS-02: Distinctive display font (Syne or similar)
- DS-03: Readable body font (DM Sans or similar)
- DS-04: Monospace font (Fira Code) for code blocks
- DS-05: Fluid typography scaling with clamp() for oversized headlines
- DS-06: Color tokens with light and dark mode variants
- DM-01: Manual dark/light mode toggle
- DM-02: System preference respected on first visit
- DM-03: Theme preference persists via localStorage
- DM-04: No flash of wrong theme (FOUC prevented)

**Success Criteria:**
1. Visiting the site shows Electric Warm colors and distinctive fonts (not Inter)
2. Clicking the theme toggle switches between light and dark instantly with no flash
3. Refreshing the page preserves the chosen theme
4. Headlines scale from ~40px on mobile to 100px+ on desktop using fluid typography

**Dependencies:** None — this is the foundation.

---

## Phase 2: Layout & Navigation

**Goal:** Restructure the site into full-viewport color-block sections with a redesigned navigation that fits the maximalist aesthetic.

**Requirements:**
- LAY-01: Homepage sections fill full viewport height (min-h-svh)
- LAY-02: Each section has its own bold color-block background
- LAY-03: Navigation redesigned for maximalist aesthetic
- LAY-04: Fully responsive across mobile, tablet, desktop
- LAY-05: Asymmetric grid-breaking layouts where appropriate
- LAY-06: Footer redesigned with contact section and social links

**Success Criteria:**
1. Scrolling the homepage shows distinct full-viewport color-block sections
2. Navigation looks intentionally designed (not generic) and works on mobile
3. Site looks correct on 375px, 768px, and 1440px viewports
4. Footer includes prominent contact CTA with social links

**Dependencies:** Phase 1 (needs tokens and fonts).

**Plans:** 3 plans

Plans:
- [ ] 02-01-PLAN.md — Section system, color tokens, layout restructure (Wave 1)
- [ ] 02-02-PLAN.md — Navigation redesign with maximalist aesthetic (Wave 1)
- [ ] 02-03-PLAN.md — Footer variants and homepage section wiring (Wave 2)

---

## Phase 3: Animations & Scroll

**Goal:** Add the motion layer — smooth scroll, scroll-triggered reveals, grain textures, magnetic effects — that makes the site feel alive.

**Requirements:**
- ANIM-01: Smooth scroll engine (Lenis)
- ANIM-02: Scroll-triggered staggered content reveals
- ANIM-03: Smooth page transitions
- ANIM-04: Magnetic hover effects on interactive elements
- ANIM-05: Grain/noise texture overlay on backgrounds
- ANIM-06: Animations respect prefers-reduced-motion

**Success Criteria:**
1. Scrolling feels smooth and premium (Lenis active)
2. Content animates into view as sections enter the viewport
3. Hovering over buttons shows magnetic pull effect (desktop only)
4. Setting prefers-reduced-motion in OS disables all non-essential animations
5. Site maintains 60fps during scroll on desktop, 30fps+ on mobile

**Dependencies:** Phase 2 (needs sections to animate).

---

## Phase 4: Homepage

**Goal:** Build the flagship homepage — hero, about, skills, projects preview, and contact — as full-viewport poster sections that prove the design works end-to-end.

**Requirements:**
- HOME-01: Hero section with oversized name, role, animated entrance
- HOME-02: About section as full-viewport color block
- HOME-03: Skills section with visual impact (not generic pill badges)
- HOME-04: Featured projects section with visuals and links
- HOME-05: Contact section with CTA and social links as full-viewport block

**Success Criteria:**
1. Homepage hero has oversized animated typography that makes an immediate impression
2. Scrolling through homepage feels like walking through a gallery of posters
3. Skills are presented with visual distinction (not pill badges)
4. Contact section has clear call-to-action that makes it easy to reach out

**Dependencies:** Phase 3 (needs animations and scroll).

---

## Phase 5: Content Pages

**Goal:** Redesign all content pages (blog, notes, projects, CV) to match the maximalist aesthetic while preserving content readability and functionality.

**Requirements:**
- BLOG-01: Blog listing with maximalist card layout
- BLOG-02: Blog detail pages with redesigned typography
- BLOG-03: Notes listing matches new aesthetic
- BLOG-04: Notes detail pages consistent with blog
- BLOG-05: Medium RSS integration continues working
- PROJ-01: Projects page with visual per project
- PROJ-02: Project cards with title, description, tech stack, links
- PROJ-03: Projects layout uses grid-breaking aesthetic
- CV-01: CV page as interactive visual timeline
- CV-02: Work experience, education, skills clearly structured
- CV-03: CV matches maximalist aesthetic while scannable

**Success Criteria:**
1. Blog listing and detail pages are visually striking and readable
2. Medium posts continue to load and display correctly
3. Projects page shows visuals for each project with clear navigation
4. CV page presents career timeline in an engaging, scannable format

**Dependencies:** Phase 4 (homepage proves the design, patterns reused here).

---

## Phase 6: Internationalization

**Goal:** Add Turkish + English bilingual support with language switching, preserving backward compatibility for existing Turkish URLs.

**Requirements:**
- I18N-01: UI supports Turkish and English with language switching
- I18N-02: Default locale (Turkish) works without URL prefix
- I18N-03: Language switcher accessible from navigation
- I18N-04: HTML lang attribute updates dynamically

**Success Criteria:**
1. Clicking language switcher toggles all UI text between Turkish and English
2. Existing Turkish URLs (e.g., /blog) continue to work without /tr/ prefix
3. English URLs use /en/ prefix (e.g., /en/blog)

**Dependencies:** Phase 5 (all pages must be stable before adding i18n layer).

---

## Phase 7: Polish & Launch

**Goal:** Final pass — custom 404, loading states, SEO, and performance audit to ensure the site is production-ready.

**Requirements:**
- POL-01: Custom 404 page matching new design
- POL-02: Loading states and skeletons match new design
- POL-03: OG images and SEO metadata updated for new brand
- POL-04: Core Web Vitals maintained (LCP < 2.5s, CLS < 0.1)

**Success Criteria:**
1. Navigating to a non-existent URL shows a designed 404 page
2. Slow-loading pages show skeleton states that match the design
3. Sharing a page URL on social media shows correct OG image and description
4. Lighthouse performance score is 90+ on mobile

**Dependencies:** Phase 6 (all features complete, this is the final audit).

---

## Dependency Chain

```
Phase 1 (Design Foundation)
  └─► Phase 2 (Layout & Navigation)
       └─► Phase 3 (Animations & Scroll)
            └─► Phase 4 (Homepage)
                 └─► Phase 5 (Content Pages)
                      └─► Phase 6 (Internationalization)
                           └─► Phase 7 (Polish & Launch)
```

All phases are sequential — each builds on the previous.

---
*Roadmap created: 2026-03-04*
*Last updated: 2026-03-05 after Phase 2 planning*
