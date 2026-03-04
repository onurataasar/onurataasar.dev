# Architecture Research: Integration with Next.js App Router

> Research document covering how each new feature integrates with the existing
> Next.js 15 App Router architecture. Includes routing changes, component boundaries,
> and a recommended build order.

---

## 1. i18n Architecture with next-intl

### Route Structure

The current route structure lives directly under `src/app/`. With next-intl, all routes
move under a `[locale]` dynamic segment:

```
src/app/
  [locale]/
    page.tsx            # Homepage
    layout.tsx          # Locale-aware layout
    blog/
      page.tsx          # Blog listing
      local/[slug]/
        page.tsx
      medium/[slug]/
        page.tsx
    notes/
      page.tsx
      [slug]/
        page.tsx
    cv/
      page.tsx
    projects/
      page.tsx
```

### Middleware Configuration

A `middleware.ts` at the project root handles locale detection and routing:

- Reads `Accept-Language` header for first-time visitors
- Checks a `NEXT_LOCALE` cookie for returning visitors
- Redirects to the appropriate locale prefix
- Default locale (Turkish) can be configured to work without prefix to preserve existing URLs

```
Incoming request: /blog
  -> Middleware detects locale from header/cookie
  -> If Turkish (default): serves /blog (no redirect, no prefix)
  -> If English: redirects to /en/blog
```

### Translation Files

```
messages/
  tr.json    # Turkish (default locale)
  en.json    # English
```

Each JSON file is organized by namespace matching component areas:

```json
{
  "navigation": { "home": "Ana Sayfa", "blog": "Blog", ... },
  "home": { "hero.title": "...", "hero.subtitle": "..." },
  "blog": { "title": "...", "readMore": "..." },
  "common": { "loading": "...", "error": "..." }
}
```

### Server vs Client Components

- **Server components:** Use `getTranslations('namespace')` from `next-intl/server`
- **Client components:** Use `useTranslations('namespace')` from `next-intl`
- **Layout:** `NextIntlClientProvider` wraps the app and passes messages to client components

### Content Strategy

MDX content files remain Turkish-only in this phase. Only the UI shell (navigation, labels,
buttons, headings, meta descriptions) becomes bilingual. Translating all blog posts and notes
is a future phase.

---

## 2. Full-Viewport Section Architecture

### Section Component Pattern

Each homepage section occupies the full viewport height using a consistent pattern:

```tsx
<section className="min-h-svh flex items-center relative overflow-hidden">
  <div className="absolute inset-0 bg-[var(--section-color)]" />  {/* Color block */}
  <div className="absolute inset-0 grain-overlay" />               {/* Grain texture */}
  <div className="container mx-auto px-6 relative z-10">
    {/* Section content */}
  </div>
</section>
```

### Why `min-h-svh` Instead of `h-screen`

- `h-screen` (100vh) does not account for mobile browser chrome (address bar, toolbar)
- `min-h-svh` uses the Small Viewport Height unit, which excludes browser chrome
- `min-h-` (not `h-`) allows content to grow beyond one viewport if needed
- Prevents content clipping on mobile without sacrificing the full-screen visual effect

### Scroll Behavior: Free Scroll (Not Snap)

Scroll-snap (`scroll-snap-type: y mandatory`) was considered and rejected:

- **Problem:** Snap points feel restrictive on creative sites where users want to browse freely
- **Problem:** Variable content heights make snap points unreliable
- **Problem:** Conflicts with smooth scroll libraries

Instead, use free scrolling with full-height sections. Visual boundaries between sections
come from contrasting color blocks, not scroll mechanics.

### Section Color Mapping (Electric Warm Palette)

Each section gets a distinct background from the palette:

| Section   | Light Mode Background       | Dark Mode Background        |
| --------- | --------------------------- | --------------------------- |
| Hero      | Deep Charcoal (#1a1a2e)     | Deep Charcoal (#1a1a2e)     |
| About     | Hot Orange (#ff4500)        | Muted Orange (#c23400)      |
| Projects  | Electric Yellow (#ffd700)   | Dark Gold (#b89b00)         |
| Blog      | Coral (#ff6b6b)             | Deep Coral (#c24444)        |
| Contact   | Deep Charcoal (#1a1a2e)     | Deep Charcoal (#1a1a2e)     |

Colors are defined as CSS custom properties and switch based on the `dark` class.

---

## 3. Smooth Scroll Integration with Lenis

### Provider Architecture

Lenis integrates as a client-side provider wrapping the scroll container:

```
RootLayout (server)
  -> ThemeProvider (client, next-themes)
    -> NextIntlClientProvider (client, next-intl)
      -> LenisProvider (client, lenis/react)
        -> {children} (mix of server + client components)
```

### Interaction with Framer Motion

Lenis and Framer Motion's scroll utilities coexist because they operate at different levels:

- **Lenis:** Controls the scroll container's behavior (smoothing, inertia, velocity)
- **Framer Motion `useScroll`:** Reads scroll position to drive animations
- Both use the same native scroll events, no conflict

The Lenis `scroll` event can optionally be piped into Framer Motion for more precise
scroll-linked animations, but `useScroll` works fine independently.

### Route Change Handling

The `<ReactLenis>` component from `lenis/react` automatically handles:
- Scroll position reset on route change
- Cleanup of scroll listeners on unmount
- Re-initialization when the component remounts

No manual cleanup code is needed when using the React wrapper.

### Server Component Compatibility

Lenis only touches the DOM. Server components render their HTML as usual and are completely
unaware of the smooth scroll layer. The Lenis provider sits in a client component boundary
in the root layout, but its children can still be server components.

---

## 4. Dark Mode Architecture

### next-themes Configuration

```tsx
// In root layout.tsx (client boundary)
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

**Key settings:**
- `attribute="class"`: Adds/removes `dark` class on `<html>` element
- `defaultTheme="system"`: Respects OS preference on first visit
- `enableSystem`: Watches for OS theme changes in real time

### Tailwind CSS v4 Dark Mode

Tailwind v4 uses the `@theme` directive in `globals.css`. Dark mode with the `class` strategy
requires explicit configuration since Tailwind v4 defaults to `media` strategy.

CSS custom properties define the palette:

```css
:root {
  --color-bg-primary: #fafafa;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a2e;
  --color-accent-orange: #ff4500;
  --color-accent-coral: #ff6b6b;
  --color-accent-yellow: #ffd700;
}

.dark {
  --color-bg-primary: #1a1a2e;
  --color-bg-secondary: #16162a;
  --color-text-primary: #fafafa;
  --color-accent-orange: #ff5722;
  --color-accent-coral: #ff7b7b;
  --color-accent-yellow: #ffe44d;
}
```

### Toggle Component

A small client component in the navigation bar provides the theme toggle:
- Icon switches between sun/moon based on current theme
- Uses `useTheme()` hook from next-themes
- Cycles through: system -> light -> dark -> system
- Persists preference in `localStorage`

### FOUC Prevention

next-themes injects a blocking `<script>` tag before the body renders that:
1. Reads `localStorage` for saved preference
2. Falls back to `prefers-color-scheme` media query
3. Sets the `dark` class on `<html>` before paint
This eliminates the flash of wrong theme on page load.

---

## 5. Component Boundary Map

Understanding which components need `"use client"` is critical for performance:

### Must Be Client Components
- `LenisProvider` (wraps scroll container, needs DOM access)
- `ThemeToggle` (uses `useTheme` hook)
- `MagneticWrapper` (uses mouse events and motion values)
- `AnimatedSection` (uses Framer Motion's `useScroll`, `useInView`)
- `Navigation` (already client, add theme toggle and language switcher)
- `GrainOverlay` (if animated; static grain can be server-rendered CSS)

### Stay as Server Components
- All page components (`page.tsx` files)
- Blog/note content rendering
- Metadata generation (`generateMetadata`)
- Layout shells (except the provider wrapper)
- Static section content (text, images)

### Hybrid Pattern
Some sections use a server component for content with a client wrapper for animation:

```tsx
// Server component - renders content
function ProjectsContent() {
  return <div>...</div>;
}

// Client component - adds animation
"use client";
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return <motion.div ref={ref}>{children}</motion.div>;
}

// Usage in page (server)
<AnimatedSection>
  <ProjectsContent />
</AnimatedSection>
```

---

## 6. Recommended Build Order

The order matters because later phases depend on earlier foundations.

### Phase 1: Design System (Foundation)
**What:** CSS custom properties, color tokens, typography setup, Tailwind theme config
**Why first:** Every subsequent component uses these tokens. Changing them later cascades everywhere.
**Depends on:** Nothing
**Output:** Updated `globals.css`, font configuration, Tailwind theme tokens

### Phase 2: Layout Restructure
**What:** Full-viewport section components, new navigation, responsive grid system
**Why second:** The page skeleton must exist before filling it with animated content.
**Depends on:** Phase 1 (tokens and typography)
**Output:** New layout components, section wrapper, updated navigation

### Phase 3: Dark Mode Toggle
**What:** next-themes integration, dark/light palette variants, toggle UI
**Why third:** Needs the layout in place but does not depend on animations.
**Depends on:** Phase 1 (color tokens), Phase 2 (navigation for toggle placement)
**Output:** ThemeProvider, ThemeToggle component, dark mode CSS variables

### Phase 4: Animations and Scroll
**What:** Lenis smooth scroll, scroll-triggered reveals, staggered animations, magnetic effects
**Why fourth:** Animations layer on top of the existing layout and design system.
**Depends on:** Phase 1-3 (layout, tokens, dark mode compatibility)
**Output:** LenisProvider, AnimatedSection, MagneticWrapper, scroll animations

### Phase 5: Internationalization
**What:** next-intl setup, route restructure, translation files, language switcher
**Why fifth:** Touches every component's text content. Doing this after visual design stabilizes avoids double work.
**Depends on:** Phase 1-4 (all UI text must exist before translating it)
**Output:** Middleware, locale routing, translation JSON files, language switcher

### Phase 6: Content Pages Redesign
**What:** Blog listing, blog detail, notes, projects, CV, contact -- all in the new design
**Why sixth:** Individual page designs use the full system (tokens + layout + animation + i18n).
**Depends on:** Phase 1-5
**Output:** Redesigned page components for all routes

### Phase 7: Polish and Micro-interactions
**What:** Grain textures, page transitions, loading states, hover effects, Easter eggs
**Why last:** Polish is iterative and should not block core functionality.
**Depends on:** Phase 1-6
**Output:** GrainOverlay, refined animations, performance optimizations

---

## 7. File Structure After Redesign

```
src/
  app/
    [locale]/
      layout.tsx          # Locale-aware layout with providers
      page.tsx            # Homepage (full-viewport sections)
      blog/
        page.tsx
        local/[slug]/page.tsx
        medium/[slug]/page.tsx
      notes/
        page.tsx
        [slug]/page.tsx
      cv/page.tsx
      projects/page.tsx
      contact/page.tsx
    globals.css           # Design tokens, dark mode, grain
  components/
    layout/
      Navigation.tsx
      Footer.tsx
      LenisProvider.tsx
      ThemeToggle.tsx
      LanguageSwitcher.tsx
    sections/
      HeroSection.tsx
      AboutSection.tsx
      ProjectsSection.tsx
      BlogSection.tsx
      ContactSection.tsx
    ui/
      MagneticWrapper.tsx
      AnimatedSection.tsx
      GrainOverlay.tsx
      Button.tsx
      Card.tsx
  hooks/
    useMagnetic.ts
    useScrollProgress.ts
  lib/
    mdx.ts              # Existing, unchanged
    medium.ts            # Existing, unchanged
messages/
  tr.json
  en.json
content/
  blog/                  # Existing MDX files
  notes/                 # Existing MDX files
middleware.ts            # next-intl locale detection
```
