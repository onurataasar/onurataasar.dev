# Feature Landscape

**Domain:** Maximalist developer portfolio website (Color Block / Pop aesthetic)
**Researched:** 2026-03-04
**Confidence:** MEDIUM (based on extensive training knowledge of Awwwards/CSSDA portfolio patterns, not live-verified against current sites)

## Table Stakes

Features users expect from a polished developer portfolio in 2025-2026. Missing any of these makes the site feel unfinished or amateur, especially for someone claiming "taste through craft."

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Responsive design (mobile-first)** | 60%+ traffic is mobile. A "bold" site that breaks on phones is embarrassing. | Medium | Full-viewport sections need careful mobile handling. Stacking, not just shrinking. |
| **Dark mode with manual toggle** | Industry standard since 2022. System-only feels incomplete. | Low | Currently system-only via `prefers-color-scheme`. Need toggle + localStorage persistence + smooth transition. |
| **Smooth page transitions** | Every Awwwards portfolio has them. Jarring route changes kill the "crafted" feel. | Medium | Framer Motion `AnimatePresence` for route transitions. Already partially in place via `PageTransition` component. |
| **Scroll-triggered animations** | Visitors expect content to reveal as they scroll. Static content feels lifeless. | Medium | Current animations fire on mount, not on scroll. Need `whileInView` from Framer Motion. |
| **Social links + contact CTA** | Recruiters and collaborators need clear ways to reach you. | Low | Already exists in hero + footer. Needs dedicated contact section with more prominence. |
| **Project showcase with visuals** | A dev portfolio without visible project work is a resume, not a portfolio. | Medium | Current projects page is text-only bullet lists. Needs screenshots, live links, or video demos. |
| **SEO metadata per page** | Portfolio must be discoverable. Missing OG images means ugly social shares. | Low | Partially exists (`generateMetadata`). Needs per-page OG images and structured data. |
| **Fast load time (Core Web Vitals)** | Bold design that takes 5 seconds to load loses the visitor. LCP < 2.5s is non-negotiable. | Medium | Performance must be actively managed with heavy animations. Lazy load below-fold content. |
| **Accessible navigation** | Keyboard users and screen readers must be able to navigate. WCAG 2.1 AA minimum. | Medium | Needs ARIA landmarks, focus management, skip links. `prefers-reduced-motion` must disable animations. |
| **Blog with readable typography** | Content is the reason people return. If blog posts are hard to read, the site fails its purpose. | Low | Exists but needs the typographic overhaul to match new aesthetic while preserving readability. |
| **CV / Resume section** | Recruiters expect a structured career timeline. | Low | Exists. Needs visual redesign to match maximalist style. |
| **Distinctive typography** | Generic fonts (Inter, Roboto) immediately signal "template." A maximalist site demands character. | Medium | Current site uses Inter. PROJECT.md explicitly bans it. Need display + body font pairing. |
| **Cohesive color system** | A color block aesthetic demands intentional, systematic color usage via design tokens. | Medium | Currently violet/fuchsia/zinc. Needs full overhaul to Electric Warm palette via `@theme` tokens. |
| **404 page** | An unstyled 404 breaks the immersion. On a "taste" portfolio, it must be designed. | Low | No custom 404 exists currently. |

## Differentiators

Features that transform the site from "good portfolio" to "this developer has exceptional taste." These are what Awwwards-level sites have that typical developer portfolios lack.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Full-viewport poster sections** | Each section fills 100vh and feels like a designed poster. This is the core of "Color Block / Pop" aesthetic. Creates a gallery-walk experience. | High | Requires careful content sizing per breakpoint. Content must not overflow or feel lost in space. Each section gets its own bold color block background. |
| **Smooth scroll engine (Lenis)** | Custom scroll feel makes the entire site feel premium. Standard browser scroll feels cheap next to sites using Lenis/Locomotive. | Medium | Lenis is the current standard (Locomotive Scroll is deprecated). Integrate with Framer Motion for scroll-linked animations. Must respect `prefers-reduced-motion`. |
| **Staggered reveal choreography** | Content doesn't just fade in -- it choreographs. Headlines slide, body text follows, accents pop. Each section has a unique entrance sequence. | High | Requires per-section animation orchestration. Framer Motion variants with staggerChildren and custom timing per section. |
| **Oversized display typography (100px+)** | Headlines that dominate the viewport signal confidence. The text itself becomes the visual element. | Medium | Needs fluid typography (clamp) to scale from mobile to desktop. Font choice is critical -- must look good at extreme sizes. |
| **Grain/noise texture overlays** | Adds analog warmth and depth to digital color blocks. Prevents the "flat digital" feel. | Low | CSS or SVG filter. Subtle opacity (3-8%). Apply to backgrounds, not text. Minimal performance cost. |
| **Magnetic hover effects** | Buttons and interactive elements that "pull" toward the cursor. Feels alive and reactive. | Medium | Requires tracking mouse position relative to element. Framer Motion `useMotionValue` + `useTransform`. Must be pointer-only (no touch). |
| **Color block section transitions** | Sections don't just scroll -- the background color transforms between blocks. Creates the "poster gallery" effect. | Medium | Can be scroll-linked color interpolation or hard cuts with clip-path reveals. The hard cut approach is more "Pop." |
| **Bilingual support (TR/EN)** | International reach while maintaining Turkish identity. Shows cultural awareness and technical skill. | High | Not just UI translation -- need content strategy. UI strings via i18n (next-intl or custom context). Blog content stays in original language. URL strategy: `/en/blog` vs `/blog` or query param. |
| **Interactive CV timeline** | CV section as visual timeline with scroll-linked reveals, not a static list. Each role animates in with context. | Medium | Horizontal or vertical timeline with progress indicator. Current CV data is structured well for this. |
| **Custom cursor** | Replacing default cursor with a branded one. Changes state on hover over interactive elements (grow, change color, show text). | Medium | Custom cursor follows mouse with slight delay (smooth). Disappears on touch devices. Must not interfere with actual click targets. |
| **Asymmetric / grid-breaking layouts** | Content that doesn't sit in neat boxes. Overlapping elements, rotated text, diagonal compositions. | High | Hardest to make responsive. Needs careful z-index management. Each section can have a unique layout approach. |
| **Page load sequence** | First visit gets a choreographed entrance: logo, then sections cascade in. Not a loading screen -- a reveal. | Medium | Only on initial load, not subsequent navigation. Use `sessionStorage` to track if user has seen it. Keep under 2 seconds. |
| **Blog post reading progress** | A progress bar or indicator showing how far through an article the reader is. | Low | Simple scroll percentage calculation. Visual bar at top of viewport or alongside content. |
| **Project hover previews** | On the projects listing, hovering a project shows a preview image/video that follows the cursor or animates in place. | Medium | Needs project screenshots/videos as assets. Image follows cursor position with smooth interpolation. |
| **Scroll-linked progress/navigation** | Dot navigation or section indicators on the side showing which section is active and allowing click-to-jump. | Medium | IntersectionObserver to track active section. Smooth scroll to section on click. Common in full-viewport section sites. |
| **Easter eggs / personality touches** | A Konami code effect, a hidden page, a playful 404, console.log art. Memorable details that people share. | Low | Small investment, outsized memorability. The kind of thing that gets tweeted. |

## Anti-Features

Features to deliberately NOT build. Each is either out of scope, counterproductive to the aesthetic, or a trap that wastes time without adding value.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **3D/WebGL scenes (Three.js, R3F)** | Explicitly out of scope per PROJECT.md. Heavy bundle size (three.js is 150KB+ gzipped). Diminishing returns for a content site. Kills mobile performance. | Use 2D animations with Framer Motion. Achieve depth through layering, parallax, and z-index, not actual 3D. |
| **Loading screen / preloader** | Adds perceived latency. Modern users expect instant content. A preloader on a static site signals poor optimization, not premium quality. | Use a page load animation sequence that reveals content progressively. Content is already there, the reveal is the experience. |
| **Parallax scrolling on every section** | Overused since 2015. When everything parallaxes, nothing stands out. Causes jank on low-end devices. | Use parallax sparingly -- one or two hero moments. Let the color blocks and typography carry the visual weight. |
| **Auto-playing background video** | Heavy bandwidth, battery drain on mobile, accessibility nightmare. Screams "agency site" not "developer portfolio." | Use still images with subtle CSS animation (Ken Burns effect) or animated SVG illustrations if needed. |
| **Chat widget / chatbot** | A personal portfolio is not a SaaS product. Chat widgets add clutter and imply 24/7 availability you cannot provide. | Clear contact CTA with email link and social profiles. A well-designed contact section outperforms a chat widget. |
| **Infinite scroll on blog listing** | Ruins SEO (crawlers struggle), breaks back button behavior, users lose their place. Maximalist sites benefit from structured, finite pages. | Paginated blog listing with clear page numbers, or a "load more" button if list gets long. |
| **Particle effects / floating elements background** | The current site already has floating blob backgrounds. These are the exact "AI portfolio" cliche the redesign is escaping. | Solid color blocks with grain texture. The background IS the color. No floating, morphing, or particle effects. |
| **Cursor trail / sparkle effects** | Gimmicky. Fun for 3 seconds, annoying after 10. Undermines the "taste" message. | Custom cursor that changes state contextually (grow on interactive, change color per section). Subtle, not flashy. |
| **Music / sound effects** | Universally disliked. Auto-playing audio is hostile UX. Even opt-in sound rarely adds value to a portfolio. | Silent site. Let the visual design speak. |
| **Complex CMS / admin panel** | Out of scope per PROJECT.md. MDX files work. Adding a CMS adds complexity without user-facing benefit for a personal site. | Keep MDX + Medium RSS pipeline. Write in your editor, push to git. |
| **Cookie consent banner** | If no tracking beyond Vercel Analytics (which is privacy-compliant), no cookie banner is needed. Cookie banners are visual pollution. | Verify Vercel Analytics compliance. If compliant, skip the banner. |
| **Testimonials section** | Developer portfolios are judged by work, not quotes. Testimonials feel corporate and pad-like on a personal site. | Let the projects and blog content speak for themselves. LinkedIn recommendations exist for social proof. |
| **Skills progress bars** | The current site has skill tags, which is fine. Percentage-based skill bars are meaningless (what does "85% TypeScript" mean?) and universally mocked. | Skill categories with technology tags (current approach). Or even remove and let projects demonstrate skills implicitly. |

## Feature Dependencies

```
Design Tokens (@theme overhaul) --> Everything visual depends on this
  |
  +--> Typography system (font loading, fluid sizing)
  |     |
  |     +--> Oversized display headlines
  |     +--> Blog post typography
  |
  +--> Color system (Electric Warm palette tokens)
        |
        +--> Dark mode toggle (needs both palettes defined)
        +--> Color block sections (each section needs its color assignment)
        +--> Grain texture overlays (opacity relative to section color)

Smooth scroll engine (Lenis) --> Scroll-triggered animations
  |
  +--> Full-viewport sections (100vh snapping or free-scroll)
  |     |
  |     +--> Section navigation dots
  |     +--> Color block transitions between sections
  |
  +--> Staggered reveal choreography (scroll-linked timing)
  +--> Blog reading progress bar

Framer Motion animation system --> All motion features
  |
  +--> Page transitions (AnimatePresence + route changes)
  +--> Scroll-triggered reveals (whileInView)
  +--> Magnetic hover effects (useMotionValue)
  +--> Custom cursor (mouse tracking)
  +--> Staggered choreography (variants + staggerChildren)
  +--> Page load sequence

Dark mode toggle --> Depends on design tokens
  |
  +--> Needs: Theme context provider (React context + localStorage)
  +--> Needs: Tailwind dark mode class strategy (switch from media to class)
  +--> Needs: Smooth color transitions (CSS transition on background-color)

Bilingual support (i18n) --> Complex dependency chain
  |
  +--> URL strategy (must be decided before any routing changes)
  +--> UI string extraction (every component touched)
  +--> Language switcher component (in navigation)
  +--> SEO: hreflang tags, per-language metadata
  +--> Content: Blog stays in original language, UI is translated
  +--> Depends on: Navigation redesign (language switcher placement)

Navigation redesign --> Depends on aesthetic direction
  |
  +--> Houses: Dark mode toggle
  +--> Houses: Language switcher
  +--> Needs: Color system (nav colors per section)
  +--> Needs: Scroll tracking (which section is active)

Project showcase redesign --> Needs visual assets
  |
  +--> Requires: Project screenshots or videos (content creation)
  +--> Hover previews depend on: Assets + Framer Motion
  +--> Grid-breaking layouts depend on: Typography + color system
```

## MVP Recommendation

For Phase 1 (Foundation), prioritize these table stakes that unblock everything else:

1. **Design tokens overhaul** (color system + typography) -- Everything depends on this. Zero visual progress without it.
2. **Full-viewport section layout** -- This is the core structural change. The entire site architecture shifts from scrolling page to poster gallery.
3. **Scroll-triggered animations** -- Swap current mount-based animations to `whileInView`. Immediate visual upgrade with low risk.
4. **Dark mode toggle** -- Switch Tailwind from `media` to `class` strategy. Add context provider + toggle button.
5. **Distinctive typography** -- Replace Inter with a bold display + readable body pairing. This single change has the highest visual impact-to-effort ratio.
6. **Custom 404 page** -- Small effort, completes the experience.

For Phase 2 (Polish), add the differentiators that make it memorable:

7. **Smooth scroll (Lenis)** -- Elevates the entire scroll experience.
8. **Staggered reveal choreography** -- Per-section animation sequences.
9. **Grain texture overlays** -- Quick atmospheric upgrade.
10. **Color block section transitions** -- The signature visual effect of the aesthetic.
11. **Oversized display typography** -- Headlines that fill the viewport.

For Phase 3 (Bilingual + Contact), tackle the high-complexity features:

12. **Bilingual support (TR/EN)** -- Touches every component, best done after visual design is stable.
13. **Contact section redesign** -- Dedicated section with strong CTA.
14. **Interactive CV timeline** -- Scroll-linked career progression.

**Defer to Phase 4 or later:**

- **Custom cursor** -- Nice-to-have, not critical to the aesthetic. Can be added after core experience is solid.
- **Magnetic hover effects** -- Polish layer. Add when the base interactions feel right.
- **Project hover previews** -- Requires asset creation (screenshots/videos) that may not exist yet.
- **Page load sequence** -- Risky to add early (can annoy during development). Add as final polish.
- **Easter eggs** -- Fun but zero priority. Add when everything else is done.

## Complexity Budget

Estimated effort distribution for the full redesign:

| Category | % of Total Effort | Rationale |
|----------|-------------------|-----------|
| Design tokens + typography + colors | 15% | Foundation work, lots of decisions, touches every file |
| Full-viewport section layout | 20% | Structural rebuild of homepage, responsive complexity |
| Animation system (scroll, reveals, choreography) | 20% | Many individual animations, each needs tuning |
| Dark mode (toggle + class strategy) | 5% | Well-understood pattern, low risk |
| Bilingual support (i18n) | 15% | Touches every component, URL routing decisions, content strategy |
| Navigation + footer redesign | 5% | Scoped UI work |
| Blog/notes page redesign | 10% | Typography + layout updates, preserve content system |
| Project showcase + CV redesign | 5% | Visual updates, may need asset creation |
| Polish (cursor, magnetic, grain, easter eggs) | 5% | Small incremental additions |

## Confidence Notes

- **HIGH confidence:** Table stakes list. These are well-established patterns across thousands of portfolio sites.
- **HIGH confidence:** Anti-features list. These are battle-tested "don't do this" lessons from the creative web community.
- **MEDIUM confidence:** Differentiator impact rankings. Based on training data of Awwwards/CSSDA patterns through mid-2025. Current trends may have shifted slightly.
- **MEDIUM confidence:** Complexity estimates. Depend heavily on implementation approach and existing codebase state. The bilingual feature in particular could be simpler or harder depending on the i18n library choice and URL strategy.
- **LOW confidence:** Specific sites as references. Unable to verify current live examples due to web access restrictions. Recommendations are based on established patterns rather than current site analysis.

## Sources

- Training knowledge of Awwwards, CSS Design Awards, FWA portfolio winners (2020-2025)
- Analysis of current codebase (pages, components, styling, motion system)
- PROJECT.md requirements and constraints
- DESIGNER.md aesthetic guidelines
- Framer Motion documentation (from training data)
- Lenis smooth scroll patterns (from training data)
- Next.js App Router patterns (from training data)
