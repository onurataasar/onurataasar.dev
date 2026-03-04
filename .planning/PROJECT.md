# onurataasar.dev — Redesign & Rebrand

## What This Is

A complete visual redesign and rebrand of Onur Ata Asar's personal portfolio website. Transforming from a generic developer portfolio (Inter font, violet gradients on zinc grays, floating blobs) into a bold, maximalist, color-block-driven experience with full-viewport sections, kinetic animations, and an electric warm palette. The site serves as a personal brand statement — a developer portfolio that proves taste through craft. Built on the existing Next.js 15 / React 19 / Tailwind CSS 4 stack.

## Core Value

**"This dev has taste."** — The design itself is the portfolio piece. Every pixel, animation, and interaction should demonstrate craft and intentionality that separates this from every other developer site.

## Requirements

### Validated

- ✓ Blog system with local MDX + Medium RSS integration — existing
- ✓ Dev notes system with MDX content — existing
- ✓ Projects page — existing
- ✓ CV / Experience page — existing
- ✓ SEO metadata generation per page — existing
- ✓ Vercel deployment with analytics — existing
- ✓ Mobile responsive layout — existing
- ✓ Framer Motion animation system — existing

### Active

- [ ] Full redesign with Color Block / Pop maximalist aesthetic
- [ ] Electric Warm color palette (hot orange, coral, electric yellow on deep charcoal)
- [ ] Distinctive typography — no generic fonts (no Inter, Roboto, Arial, system fonts)
- [ ] Full-viewport responsive sections (each section fills the screen, poster-like)
- [ ] Bold scroll-triggered animations and staggered reveals
- [ ] Dark mode toggle + system preference detection (system + toggle)
- [ ] Bilingual support (Turkish + English with language switching)
- [ ] Redesigned navigation for maximalist aesthetic
- [ ] Redesigned homepage with hero, about, skills as full-screen sections
- [ ] Redesigned blog listing and detail pages
- [ ] Redesigned notes listing and detail pages
- [ ] Redesigned projects showcase with visuals
- [ ] Redesigned CV / Experience page (interactive version)
- [ ] Dedicated contact section with social links and call-to-action
- [ ] Smooth scroll experience (Lenis or similar)
- [ ] Grain/noise texture overlays for depth and atmosphere
- [ ] Grid-breaking asymmetric layouts
- [ ] Oversized display typography (100px+ headlines)
- [ ] Magnetic/interactive hover effects on buttons and links

### Out of Scope

- 3D/WebGL effects (bruno-simon style) — too heavy for a content site, diminishing returns
- CMS migration — keep local MDX files, no headless CMS
- Backend/API routes — stay static/ISR
- E-commerce or paid content — not relevant
- User authentication — public site
- Complete content rewrite — focus on design, not copywriting

## Context

**Current state:** The existing site is a functional Next.js 15 App Router site with blog (local MDX + Medium RSS), dev notes, projects, and CV pages. It uses Inter font, violet/fuchsia gradients on zinc grays, floating blob background — a generic "AI portfolio" aesthetic that blends in with thousands of similar sites.

**Existing architecture strengths:**
- Server components by default, minimal client JS — good for performance
- Content system (MDX + Medium RSS) is solid and should be preserved
- Framer Motion already integrated — can be extended for bolder animations
- Tailwind CSS v4 with `@theme` directive — ready for design token overhaul

**Known issues from codebase map:**
- Two Next.js config files (`next.config.ts` and `next.config.mjs`) — consolidate during redesign
- Unused dependencies (next-mdx-remote, rehype-pretty-code, shiki) — clean up
- `<html lang="en">` but content is Turkish — fix with i18n implementation
- Inconsistent date formats between blog and notes

**Design direction (from DESIGNER.md rules):**
- Aesthetic: Color Block / Pop — vivid color sections, oversized elements, poster-like
- Palette: Electric Warm — hot orange (#FF6B35), coral (#FF4444), electric yellow (#FFD23F) on deep charcoal (#1A1A2E)
- Typography: Distinctive display + body font pairing (NO Inter, Roboto, Arial, Space Grotesk)
- Motion: High-impact scroll-triggered reveals, staggered animations, smooth scroll
- Layout: Full-viewport sections, asymmetric grids, generous negative space between dense blocks
- Details: Grain overlays, dramatic shadows, custom cursor effects, magnetic buttons

## Constraints

- **Tech stack**: Must stay on Next.js 15 / React 19 / Tailwind CSS 4 / Framer Motion — no framework migration
- **Content system**: Preserve existing MDX + Medium RSS pipeline — no content migration
- **Performance**: Animations must not degrade Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- **Accessibility**: Respect `prefers-reduced-motion`, keyboard navigation, ARIA labels
- **Deployment**: Stay on Vercel — no infrastructure changes
- **Turkish content**: Existing blog/notes content stays in Turkish; UI becomes bilingual

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Color Block / Pop aesthetic | User wants bold, maximalist, memorable — not subtle/minimal | — Pending |
| Electric Warm palette | Warm, energetic, distinctive — avoids purple/blue AI cliches | — Pending |
| Full-viewport sections | Poster-like impact, each section is its own "poster" | — Pending |
| System + toggle dark mode | Respects user preference while giving manual control | — Pending |
| Turkish + English bilingual | International reach while keeping Turkish identity | — Pending |
| Keep existing content pipeline | MDX + Medium RSS works well, no reason to migrate | — Pending |

---
*Last updated: 2026-03-04 after initialization*
