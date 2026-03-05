# Phase 1 Research: Design Foundation

**Phase:** 01 — Design Foundation
**Researched:** 2026-03-04

## Current State Analysis

### Fonts
- **Current:** Inter (Google Fonts) — the #1 banned font per DESIGNER.md
- **Setup:** `next/font/google` with `Inter({ subsets: ["latin"] })` in `layout.tsx`
- **Usage:** Applied via `inter.className` on `<body>`

### Colors
- **Current:** Violet/fuchsia/zinc palette in `globals.css` `@theme` block
- **Dark mode:** `prefers-color-scheme: dark` media queries (CSS-only, no toggle)
- **Gradient:** `.gradient-text` and `.gradient-bg` use violet→fuchsia linear gradient
- **Background blobs:** Animated violet/fuchsia/blue blobs in `layout.tsx` — explicitly an anti-pattern per DESIGNER.md

### Typography Scale
- No fluid typography (no `clamp()`)
- Headlines use standard Tailwind sizes (`text-4xl`, `text-5xl`, `text-6xl`)

### Dark Mode
- CSS-only via `prefers-color-scheme: dark` — no JavaScript toggle
- No localStorage persistence
- No user control

## Implementation Research

### Font Pairing Decision

**Display font candidates (for 100px+ headlines):**
| Font | Character | Weight Range | License |
|------|-----------|-------------|---------|
| Syne | Geometric, bold, modern | 400-800 | Open Source (Google) |
| Space Grotesk | — BANNED by DESIGNER.md | — | — |
| Clash Display | Sharp, editorial | 200-700 | Free for personal use |
| Cabinet Grotesk | Warm geometric | 100-900 | Free for personal use |

**Recommendation: Syne** — Available on Google Fonts (easy with next/font), distinctive at large sizes, good weight range, pairs well with DM Sans.

**Body font:** DM Sans — clean, readable, available on Google Fonts, good pairing with geometric display fonts.

**Code font:** Fira Code — already in the stack (per STACK.md), ligatures for code.

### Electric Warm Palette

```
Primary colors:
- Hot Orange:      #FF6B35 (primary accent)
- Coral:           #FF4444 (secondary accent / danger)
- Electric Yellow:  #FFD23F (highlight / emphasis)

Neutral base:
- Deep Charcoal:   #1A1A2E (dark background)
- Charcoal:        #16213E (dark surface)
- Slate:           #0F3460 (dark elevated)
- Cream:           #FFF8F0 (light background)
- Warm White:      #FFFAF5 (light surface)

Text:
- Dark text:       #1A1A2E (on light backgrounds)
- Light text:      #F5F5F5 (on dark backgrounds)
- Muted dark:      #64748B (secondary text, light mode)
- Muted light:     #94A3B8 (secondary text, dark mode)
```

### Tailwind CSS v4 + Dark Mode Strategy

**Current approach:** `prefers-color-scheme: dark` media queries in CSS
**Target approach:** Class-based dark mode via `next-themes`

**Key change:** Tailwind v4 uses `@custom-variant` for dark mode class strategy:
```css
@custom-variant dark (&:where(.dark, .dark *));
```
This replaces the Tailwind v3 `darkMode: "class"` config.

**next-themes setup:**
1. Install `next-themes`
2. Wrap app in `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`
3. Add `suppressHydrationWarning` to `<html>` (already present!)
4. next-themes injects a script before React hydration to prevent FOUC

### Fluid Typography with clamp()

```css
/* Example scale */
--font-size-display: clamp(2.5rem, 8vw + 1rem, 8rem);    /* 40px → 128px */
--font-size-h1: clamp(2rem, 5vw + 0.5rem, 5rem);          /* 32px → 80px */
--font-size-h2: clamp(1.5rem, 3vw + 0.5rem, 3rem);        /* 24px → 48px */
--font-size-h3: clamp(1.25rem, 2vw + 0.5rem, 2rem);       /* 20px → 32px */
--font-size-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); /* 16px → 18px */
```

### Files to Modify

| File | Changes |
|------|---------|
| `src/app/globals.css` | Replace entire `@theme` block, add `@custom-variant dark`, add fluid type scale, remove blob animations, remove violet/fuchsia colors |
| `src/app/layout.tsx` | Replace Inter with Syne + DM Sans + Fira Code, add ThemeProvider, remove blob divs |
| `package.json` | Add `next-themes` |
| New: `src/components/ThemeToggle.tsx` | Dark/light mode toggle button |
| New: `src/components/ThemeProvider.tsx` | Client component wrapping next-themes |

### Pitfalls to Watch

1. **FOUC:** next-themes must inject its script before React hydrates. The `suppressHydrationWarning` on `<html>` is critical.
2. **Tailwind v4 dark variant:** Must use `@custom-variant` syntax, not v3 config.
3. **Font loading CLS:** Use `next/font` with `display: "swap"` and appropriate fallbacks.
4. **highlight.js styles:** The current `github.css` theme won't match Electric Warm. Need a dark-compatible theme or custom styles.

---
*Research complete: 2026-03-04*
