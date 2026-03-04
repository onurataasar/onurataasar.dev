# Research Summary

**Project:** onurataasar.dev — Portfolio Redesign & Rebrand
**Synthesized:** 2026-03-04

## Stack Additions

| Library | Purpose | Bundle Impact | Confidence |
|---------|---------|---------------|------------|
| Lenis | Smooth scroll engine | ~4kb gzipped | 95% |
| next-intl | i18n for App Router | ~12kb | 90% |
| next-themes | Dark mode toggle | ~2kb | 95% |
| Syne / DM Sans / Fira Code | Typography pairing | ~75kb fonts | 85% |
| CSS SVG filter | Grain texture | 0kb (CSS only) | 95% |
| Custom FM hook | Magnetic effects | 0kb (built-in) | 90% |

**Total new JS:** ~20kb | **Do NOT add:** GSAP, Three.js, Locomotive Scroll

## Table Stakes (Must Have)

1. Dark mode with manual toggle (currently system-only)
2. Scroll-triggered animations (currently mount-based)
3. Distinctive typography (currently Inter — explicitly banned)
4. Cohesive Electric Warm color system via design tokens
5. Responsive full-viewport sections
6. Project showcase with visuals (currently text-only)
7. Accessible navigation (ARIA, focus management, skip links)
8. Custom 404 page
9. Fast load time (LCP < 2.5s despite heavy animations)

## Key Differentiators

1. **Full-viewport poster sections** — each section is a designed color-block poster
2. **Smooth scroll (Lenis)** — premium feel throughout
3. **Staggered reveal choreography** — per-section entrance sequences
4. **Oversized display typography (100px+)** — text as visual element
5. **Grain/noise overlays** — analog warmth, 3-8% opacity
6. **Magnetic hover effects** — buttons pull toward cursor
7. **Bilingual TR/EN** — international reach with Turkish identity

## Architecture Decisions

- **i18n routing:** `[locale]` segment, default locale (Turkish) without prefix
- **Full-viewport:** `min-h-svh` with free scroll (not snap)
- **Dark mode:** `class` strategy via next-themes + CSS variables
- **Smooth scroll:** Lenis provider in root layout, works alongside Framer Motion

## Build Order

1. Design system (tokens, typography, color palette)
2. Layout restructure (full-viewport sections, navigation)
3. Dark mode toggle
4. Animations (scroll-triggered, staggered reveals, smooth scroll)
5. i18n (after visual design stabilizes)
6. Content pages redesign (blog, notes, projects, CV, contact)
7. Polish (grain, magnetic effects, micro-interactions)

## Top Pitfalls to Watch

| Pitfall | Severity | When to Address |
|---------|----------|-----------------|
| Animation jank on mobile | High | Phase 4 — limit simultaneous animations to 3-5 |
| Full-viewport overflow on mobile | Medium | Phase 2 — use `min-h-svh` not `h-screen` |
| i18n breaking existing URLs | High | Phase 5 — default locale without prefix |
| Dark mode FOUC | Medium | Phase 3 — next-themes script in layout |
| Over-animation fatigue | Medium | Phase 4/7 — animate key moments only |
| Font loading layout shift | Medium | Phase 1 — next/font with swap + fallbacks |

---
*Research synthesized: 2026-03-04*
