# Requirements: onurataasar.dev Redesign

**Defined:** 2026-03-04
**Core Value:** "This dev has taste" — the design itself is the portfolio piece

## v1 Requirements

### Design System

- [ ] **DS-01**: Site uses Electric Warm color palette with CSS custom properties (hot orange, coral, electric yellow on deep charcoal)
- [ ] **DS-02**: Site uses distinctive display font (Syne or similar) for headlines — no Inter, Roboto, Arial, or system fonts
- [ ] **DS-03**: Site uses readable body font (DM Sans or similar) paired with display font
- [ ] **DS-04**: Site uses monospace font (Fira Code) for code blocks
- [ ] **DS-05**: Typography scales fluidly across breakpoints using clamp() for oversized headlines (100px+ on desktop)
- [ ] **DS-06**: Color tokens have both light and dark mode variants

### Layout

- [ ] **LAY-01**: Homepage sections fill the full viewport height (min-h-svh) creating poster-like sections
- [ ] **LAY-02**: Each homepage section has its own bold color-block background
- [ ] **LAY-03**: Navigation is redesigned to match maximalist aesthetic
- [ ] **LAY-04**: Layout is fully responsive across mobile, tablet, and desktop
- [ ] **LAY-05**: Site uses asymmetric grid-breaking layouts where appropriate
- [ ] **LAY-06**: Footer is redesigned with dedicated contact section and social links

### Dark Mode

- [ ] **DM-01**: User can toggle between light and dark mode manually
- [ ] **DM-02**: Site respects system preference on first visit
- [ ] **DM-03**: Theme preference persists across sessions via localStorage
- [ ] **DM-04**: No flash of wrong theme on page load (FOUC prevented)

### Animations

- [ ] **ANIM-01**: Smooth scroll engine (Lenis) provides premium scroll feel across the site
- [ ] **ANIM-02**: Content reveals on scroll with staggered choreography per section
- [ ] **ANIM-03**: Page transitions are smooth (no jarring route changes)
- [ ] **ANIM-04**: Interactive elements have magnetic hover effects (pointer only)
- [ ] **ANIM-05**: Grain/noise texture overlay adds depth to backgrounds
- [ ] **ANIM-06**: All animations respect prefers-reduced-motion (disabled when user prefers)

### Internationalization

- [ ] **I18N-01**: UI supports Turkish and English with language switching
- [ ] **I18N-02**: Default locale (Turkish) works without URL prefix for backward compatibility
- [ ] **I18N-03**: Language switcher is accessible from navigation
- [ ] **I18N-04**: HTML lang attribute updates dynamically based on selected locale

### Homepage

- [ ] **HOME-01**: Hero section with oversized name, role, and animated entrance
- [ ] **HOME-02**: About section as full-viewport color block with profile text
- [ ] **HOME-03**: Skills section redesigned with visual impact (not generic pill badges)
- [ ] **HOME-04**: Featured projects section with visuals and links
- [ ] **HOME-05**: Contact section with CTA and social links as full-viewport block

### Blog & Notes

- [ ] **BLOG-01**: Blog listing page redesigned with maximalist card layout
- [ ] **BLOG-02**: Blog detail pages have redesigned typography and reading experience
- [ ] **BLOG-03**: Notes listing page redesigned to match new aesthetic
- [ ] **BLOG-04**: Notes detail pages have consistent reading experience with blog
- [ ] **BLOG-05**: Medium RSS integration continues to work after redesign

### Projects

- [ ] **PROJ-01**: Projects page shows each project with visual (screenshot/mockup)
- [ ] **PROJ-02**: Each project card has title, description, tech stack, and links (live/source)
- [ ] **PROJ-03**: Projects layout uses the maximalist grid-breaking aesthetic

### CV / Experience

- [ ] **CV-01**: CV page is redesigned as an interactive visual timeline
- [ ] **CV-02**: Work experience, education, and skills are clearly structured
- [ ] **CV-03**: CV page matches the maximalist aesthetic while remaining scannable

### Polish

- [ ] **POL-01**: Custom 404 page matching the new design
- [ ] **POL-02**: Loading states and skeletons match new design
- [ ] **POL-03**: OG images and SEO metadata updated for new brand
- [ ] **POL-04**: Core Web Vitals maintained (LCP < 2.5s, CLS < 0.1)

## v2 Requirements

### Enhanced Interactions
- **V2-01**: Custom cursor that changes shape based on hovered element
- **V2-02**: Scroll-linked color interpolation between sections (gradual transitions)
- **V2-03**: Page transition effects with clip-path reveals

### Content
- **V2-04**: Blog post reading progress indicator
- **V2-05**: Related posts suggestions at end of articles
- **V2-06**: Project case study pages with detailed breakdowns

### Analytics
- **V2-07**: Heatmap tracking for portfolio engagement
- **V2-08**: A/B testing for different layout variants

## Out of Scope

| Feature | Reason |
|---------|--------|
| 3D/WebGL effects | Performance cost too high for content site |
| CMS migration | MDX + Medium RSS pipeline works well |
| Backend API routes | Site is static/ISR, no backend needed |
| User authentication | Public portfolio site |
| Real-time features | No collaboration or chat needed |
| Skills progress bars | Universally mocked in developer community |
| Floating blob backgrounds | The exact cliche being escaped |
| Parallax on every section | Overused, causes motion sickness |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| DS-04 | Phase 1 | Pending |
| DS-05 | Phase 1 | Pending |
| DS-06 | Phase 1 | Pending |
| LAY-01 | Phase 2 | Pending |
| LAY-02 | Phase 2 | Pending |
| LAY-03 | Phase 2 | Pending |
| LAY-04 | Phase 2 | Pending |
| LAY-05 | Phase 2 | Pending |
| LAY-06 | Phase 2 | Pending |
| DM-01 | Phase 3 | Pending |
| DM-02 | Phase 3 | Pending |
| DM-03 | Phase 3 | Pending |
| DM-04 | Phase 3 | Pending |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 4 | Pending |
| ANIM-04 | Phase 4 | Pending |
| ANIM-05 | Phase 4 | Pending |
| ANIM-06 | Phase 4 | Pending |
| I18N-01 | Phase 5 | Pending |
| I18N-02 | Phase 5 | Pending |
| I18N-03 | Phase 5 | Pending |
| I18N-04 | Phase 5 | Pending |
| HOME-01 | Phase 6 | Pending |
| HOME-02 | Phase 6 | Pending |
| HOME-03 | Phase 6 | Pending |
| HOME-04 | Phase 6 | Pending |
| HOME-05 | Phase 6 | Pending |
| BLOG-01 | Phase 6 | Pending |
| BLOG-02 | Phase 6 | Pending |
| BLOG-03 | Phase 6 | Pending |
| BLOG-04 | Phase 6 | Pending |
| BLOG-05 | Phase 6 | Pending |
| PROJ-01 | Phase 6 | Pending |
| PROJ-02 | Phase 6 | Pending |
| PROJ-03 | Phase 6 | Pending |
| CV-01 | Phase 6 | Pending |
| CV-02 | Phase 6 | Pending |
| CV-03 | Phase 6 | Pending |
| POL-01 | Phase 7 | Pending |
| POL-02 | Phase 7 | Pending |
| POL-03 | Phase 7 | Pending |
| POL-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after initial definition*
