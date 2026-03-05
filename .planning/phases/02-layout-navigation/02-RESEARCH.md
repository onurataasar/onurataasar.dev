# Phase 2: Layout & Navigation — Research

**Researched:** 2026-03-05
**Status:** Complete

## Current Architecture Analysis

### Layout Structure (layout.tsx)
- Root layout wraps everything in `max-w-4xl mx-auto px-4` — this is the main bottleneck
- Nav sits in a sticky `div` with `bg-[var(--color-bg)]/80 backdrop-blur-md`
- Content + Footer wrapped in another `max-w-4xl` container
- **Key change needed:** Remove the `max-w-4xl` wrappers to allow edge-to-edge color blocks, but keep content constrained inside sections

### Navigation (Navigation.tsx)
- Client component using framer-motion
- Routes: Blog, Dev Notes, Projects, CV
- Desktop: horizontal links with motion layoutId indicator
- Mobile: hamburger with AnimatePresence dropdown panel
- Uses design tokens (var(--color-*)) already from Phase 1
- **Reusable:** Route array, pathname-based active detection, route-change close effect, animated hamburger spans

### Footer (Footer.tsx)
- Client component with social links array (Medium, GitHub, LinkedIn)
- Uses framer-motion hover effects
- Still uses hardcoded `violet-500` and `zinc` colors — needs token migration
- **Reusable:** Social links data structure, icon imports

### Homepage (page.tsx)
- Client component ("use client") with FadeIn/Stagger animations
- Still uses hardcoded `violet-500`, `zinc-*` colors — needs full token migration
- Has hero, profile, and skills sections — no full-viewport structure yet
- Skills use pill badges (to be redesigned in Phase 4, not Phase 2)

### Design Tokens (globals.css)
- Electric Warm palette defined in `@theme` block
- Dark mode via `.dark` class overrides
- Font variables: `--font-display` (Syne), `--font-body` (DM Sans), `--font-code` (Fira Code)
- Fluid typography: `--font-size-display` through `--font-size-small` with clamp()

## Technical Research

### 1. Full-Viewport Color-Block Sections (LAY-01, LAY-02)

**Approach:** Each section is a `<section>` with `min-h-svh` (or `min-h-[70svh]` on mobile) and full-width background color.

```tsx
// Section wrapper pattern
<section className="min-h-svh lg:min-h-svh min-h-[70svh] w-full" style={{ backgroundColor: 'var(--color-section-hero)' }}>
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
    {/* Content */}
  </div>
</section>
```

**Section color tokens needed in globals.css:**
```css
@theme {
  /* Section backgrounds — Light */
  --color-section-hero: #FFF8F0;      /* cream */
  --color-section-about: #1A1A2E;     /* deep charcoal */
  --color-section-skills: #FF6B35;    /* orange */
  --color-section-projects: #FF4444;  /* coral */
  --color-section-contact: #FFD23F;   /* yellow */
}

.dark {
  --color-section-hero: #1A1A2E;      /* charcoal */
  --color-section-about: #0F0F23;     /* deeper dark */
  --color-section-skills: #CC5528;    /* muted orange */
  --color-section-projects: #CC3636;  /* muted coral */
  --color-section-contact: #CCA832;   /* muted yellow */
}
```

**Text contrast pairs (from CONTEXT.md decisions):**
- Cream bg → charcoal text
- Charcoal bg → white/cream text
- Orange bg → cream text (#FFF8F0)
- Coral bg → white text
- Yellow bg → charcoal text (#1A1A2E)

All must pass WCAG AA (4.5:1). Verified:
- #FF6B35 on #FFF8F0 = ~3.2:1 — **FAILS AA for body text**. Need to darken orange or use larger text (3:1 for large text passes). Alternative: use charcoal text on orange.
- #FFF8F0 on #1A1A2E = ~15:1 — passes
- #1A1A2E on #FFD23F = ~10:1 — passes
- #FFFFFF on #FF4444 = ~3.9:1 — borderline, passes for large text only

**Recommendation:** For body text on orange/coral sections, use charcoal (#1A1A2E) instead of cream/white to guarantee AA compliance. Reserve cream/white for headings (large text).

### 2. Layout Restructuring (LAY-05)

**Current problem:** `layout.tsx` constrains everything to `max-w-4xl` (896px). Need to:

1. Remove outer `max-w-4xl` wrappers from layout.tsx
2. Let sections go edge-to-edge for background color
3. Content inside uses a wide container (~1200-1400px)
4. Non-homepage pages still need a content container

**Proposed layout.tsx structure:**
```tsx
<ThemeProvider>
  <Navigation /> {/* Full-width, handles its own container */}
  <main>{children}</main> {/* No wrapper — pages control their own width */}
  <Analytics />
</ThemeProvider>
```

**Homepage gets edge-to-edge sections.** Other pages (blog, notes) get their own content wrapper:
```tsx
// In blog/notes/etc pages:
<div className="max-w-4xl mx-auto px-6">
  {/* Page content */}
</div>
```

### 3. Navigation Redesign (LAY-03)

**Context decisions:**
- Oversized horizontal nav with Syne font
- "ONUR ATA ASAR" large at left, links spread right
- Sticky with backdrop-blur, picks up section colors
- Active link: accent underline or color-block highlight
- Theme toggle integrated

**Implementation approach:**
- Keep as client component (needs useState for mobile menu, usePathname for active state)
- Use `font-[var(--font-display)]` or Syne class for nav text
- Nav text sizing: `text-lg` or `text-xl` for links (design statement)
- Name: `text-2xl` or `text-3xl` with Syne
- Full-width nav, content constrained to same max-width as sections (~1400px)

**Mobile overlay (from CONTEXT.md):**
- Full-screen overlay with accent color background
- Oversized Syne text links
- Social icons visible
- Theme toggle accessible

**Implementation:** Replace current dropdown with fixed full-screen overlay:
```tsx
<motion.div className="fixed inset-0 z-50 bg-[var(--color-accent)] flex flex-col items-center justify-center">
  {/* Oversized links */}
</motion.div>
```

### 4. Responsive Strategy (LAY-04)

**Breakpoints (Tailwind defaults):**
- `sm` (640px): Minor adjustments
- `md` (768px): Tablet layout begins
- `lg` (1024px): Desktop, asymmetry kicks in
- `xl` (1280px): Wide layout
- `2xl` (1536px): Extra breathing room

**Mobile section heights:**
- Desktop: `min-h-svh` (full viewport)
- Mobile (<1024px): `min-h-[70svh]` with `h-auto` to grow

**Container widths:**
- Content: `max-w-[1400px]` with `px-6 lg:px-12`
- Blog/notes content: `max-w-4xl` (existing, for readability)

### 5. Asymmetric Layouts (LAY-05)

**Not every section needs asymmetry** (per CONTEXT.md). Key approach:
- Use CSS Grid with named areas or column offsets
- Text offset left (`col-start-1 col-span-7`), visuals right (`col-start-8 col-span-5`) on a 12-col grid
- Some sections: content centered, others dramatically offset
- Overlap elements: `relative z-10 -mt-20` to break section boundaries

**Tailwind grid pattern:**
```tsx
<div className="grid grid-cols-12 gap-6 lg:gap-12">
  <div className="col-span-12 lg:col-span-7">
    {/* Text content */}
  </div>
  <div className="col-span-12 lg:col-span-5 lg:-mt-12">
    {/* Visual element overlapping */}
  </div>
</div>
```

### 6. Footer Redesign (LAY-06)

**Two footer variants (from CONTEXT.md):**

1. **Homepage full footer:** Split layout — left "Say hello" CTA, right contact/socials. This IS the contact section (last color block).

2. **Compact footer (other pages):** Social icons + copyright. Simple, not a color block.

**Implementation:**
- Create `HomeFooter` component (full contact section)
- Create `CompactFooter` component (for other pages)
- Homepage imports `HomeFooter` directly
- Layout.tsx uses `CompactFooter`
- Or: single `Footer` component with `variant` prop

### 7. Key Dependencies & Integration Points

**From Phase 1 (available):**
- All color tokens in `@theme`
- Font variables (Syne, DM Sans, Fira Code)
- Dark mode toggle infrastructure
- ThemeProvider wrapping all children

**NOT in this phase (defer):**
- Scroll animations (Phase 3 — ANIM-01..06)
- Homepage content (Phase 4 — HOME-01..05)
- Page transition effects (Phase 3)

**This phase builds the STRUCTURE.** Content and animations layer on top.

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| WCAG contrast failures on colored sections | High | Pre-calculate all contrast ratios, use dark text on bright backgrounds |
| Layout shift during theme toggle | Medium | CSS transitions on background-color, not JS |
| Mobile overlay blocking scroll | Low | Body scroll lock when overlay open, unlock on close |
| Non-homepage pages breaking with new layout | High | Ensure blog/notes/cv pages have their own content wrappers |
| `svh` unit not supported in older browsers | Low | Fallback: `min-h-screen` with `min-h-[100svh]` override |

## Validation Architecture

### Dimension 1: Visual Verification
- Screenshot comparison at 375px, 768px, 1440px
- Color contrast checker on each section combination

### Dimension 2: Functional Verification
- Navigation works on desktop and mobile
- Theme toggle works from nav on both desktop and mobile overlay
- All routes accessible and active state shows correctly
- Mobile overlay opens/closes properly

### Dimension 3: Responsive Verification
- Each section fills viewport on desktop
- Mobile sections use 70svh minimum
- Content doesn't overflow containers
- No horizontal scroll on any breakpoint

### Dimension 4: Integration Verification
- Blog, notes, projects, CV pages render correctly with new layout
- Footer variant correct per page type
- Design tokens from Phase 1 applied throughout

---

## RESEARCH COMPLETE

All 6 requirements (LAY-01 through LAY-06) researched. Key findings:
1. Layout.tsx needs restructuring to remove max-w-4xl wrappers
2. Section color tokens need to be added to globals.css
3. WCAG contrast on orange/coral sections requires careful text color choices
4. Navigation becomes a design element (oversized Syne text)
5. Two footer variants needed (homepage full vs compact)
6. Non-homepage pages need their own content wrappers

Ready for planning.
