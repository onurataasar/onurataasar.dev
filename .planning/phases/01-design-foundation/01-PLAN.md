# Plan 01: Design Tokens & Typography

---
wave: 1
depends_on: []
requirements: [DS-01, DS-02, DS-03, DS-04, DS-05, DS-06]
files_modified: [src/app/globals.css, src/app/layout.tsx, package.json, tailwind.config.ts]
autonomous: true
---

## Objective

Replace the current violet/zinc color system and Inter font with the Electric Warm palette and distinctive Syne + DM Sans + Fira Code typography. Establish CSS custom properties for all design tokens with light and dark mode variants. Set up fluid typography scaling with clamp() for oversized headlines.

## must_haves

- Electric Warm color palette defined as CSS custom properties in globals.css
- Syne font loaded via next/font/google and applied to display headings
- DM Sans font loaded via next/font/google and applied to body text
- Fira Code font loaded via next/font/google and applied to code blocks
- Fluid typography scale using clamp() for display/h1/h2/h3/body sizes
- Both light and dark mode color tokens defined
- No Inter font anywhere in the codebase
- No violet/fuchsia/zinc color references in globals.css @theme block
- No blob animation keyframes or classes

## Tasks

<task id="1" title="Install next-themes dependency">
Run `npm install next-themes` to add the dark mode toggle library.
</task>

<task id="2" title="Replace fonts in layout.tsx" depends_on="1">
In `src/app/layout.tsx`:
1. Remove `import { Inter } from "next/font/google"`
2. Add imports for Syne (weights: 400, 500, 600, 700, 800), DM Sans (weights: 400, 500, 700), and Fira Code (weights: 400, 500)
3. Configure each with `display: "swap"` and appropriate subsets
4. Replace `inter.className` on body with DM Sans className as the default body font
5. Add CSS variables for all three fonts: `--font-display`, `--font-body`, `--font-code`
6. Remove the decorative background blob divs entirely
</task>

<task id="3" title="Replace color system in globals.css" depends_on="2">
In `src/app/globals.css`:
1. Add `@custom-variant dark (&:where(.dark, .dark *));` after the tailwindcss import for class-based dark mode
2. Replace the entire `@theme` block with Electric Warm tokens:

**Light mode (default):**
```
--color-bg: #FFF8F0 (cream)
--color-surface: #FFFAF5 (warm white)
--color-text: #1A1A2E (deep charcoal)
--color-text-muted: #64748B (slate)
--color-accent: #FF6B35 (hot orange)
--color-accent-secondary: #FF4444 (coral)
--color-highlight: #FFD23F (electric yellow)
--color-border: #E8E0D8 (warm gray)
```

**Dark mode:**
```
--color-bg: #1A1A2E (deep charcoal)
--color-surface: #16213E (charcoal)
--color-text: #F5F5F5 (light)
--color-text-muted: #94A3B8 (slate light)
--color-accent: #FF6B35 (same orange)
--color-accent-secondary: #FF4444 (same coral)
--color-highlight: #FFD23F (same yellow)
--color-border: #2A2A4A (dark border)
```

3. Add fluid typography CSS custom properties:
```
--font-size-display: clamp(2.5rem, 8vw + 1rem, 8rem);
--font-size-h1: clamp(2rem, 5vw + 0.5rem, 5rem);
--font-size-h2: clamp(1.5rem, 3vw + 0.5rem, 3rem);
--font-size-h3: clamp(1.25rem, 2vw + 0.5rem, 2rem);
--font-size-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
--font-size-small: clamp(0.875rem, 0.3vw + 0.75rem, 0.9375rem);
```

4. Update `@layer base` body styles to use new tokens
5. Remove all violet/fuchsia color references
6. Remove blob animation keyframes and utility classes
7. Update `.gradient-text` and `.gradient-bg` to use Electric Warm colors (orange → yellow gradient)
8. Update `.prose` styles to use new color tokens
</task>

<task id="4" title="Verify build succeeds" depends_on="3">
Run `npm run build` to ensure no TypeScript or CSS errors. Fix any broken references to removed colors or classes in other components.
</task>

## Verification

- [ ] `npm run build` succeeds with zero errors
- [ ] globals.css contains Electric Warm palette tokens (grep for #FF6B35)
- [ ] globals.css contains fluid typography variables (grep for clamp)
- [ ] layout.tsx imports Syne, DM Sans, Fira Code (no Inter)
- [ ] No violet/fuchsia color references remain in globals.css
- [ ] No blob animation CSS remains
- [ ] Dark mode tokens defined with @custom-variant

---
*Plan: 01-design-foundation*
*Created: 2026-03-04*
