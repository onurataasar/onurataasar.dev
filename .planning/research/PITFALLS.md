# Pitfalls Research: Common Mistakes and Prevention

> Research document cataloging known pitfalls for the portfolio redesign.
> Each pitfall includes the problem, warning signs, prevention strategy, and which
> build phase should address it.

---

## 1. Animation Performance on Mobile

**Severity:** High
**Phase:** Phase 4 (Animations and Scroll)

**Problem:**
Too many simultaneous Framer Motion animations cause dropped frames and jank on mobile
devices. Mobile GPUs cannot composite as many layers as desktop GPUs. Sites that feel
smooth on a MacBook Pro can stutter badly on a mid-range Android phone.

**Warning signs:**
- Frame rate drops below 30fps during scroll on mobile
- Battery drain increases noticeably while browsing the site
- Scrolling feels "sticky" or delayed on older devices
- Chrome DevTools Performance panel shows long composite/paint times

**Prevention:**
- Use `will-change` only on elements that are actively animating, remove it after animation completes
- Prefer CSS `transform` and `opacity` for animations (these are GPU-composited)
- Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding` (triggers layout)
- Limit simultaneous animations to 3-5 elements visible at once
- Implement `prefers-reduced-motion` media query to disable non-essential animations:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Test on real devices: Chrome DevTools throttling is not a substitute for a real phone
- Use Framer Motion's `viewport={{ once: true }}` so elements only animate on first appearance

---

## 2. Lenis + Next.js App Router Route Changes

**Severity:** Medium-High
**Phase:** Phase 4 (Animations and Scroll)

**Problem:**
Smooth scroll libraries maintain internal state (scroll position, velocity, animation frames).
When Next.js performs a client-side route transition, the scroll container changes but the
library may hold stale references, causing broken scroll behavior, memory leaks, or scroll
position not resetting.

**Warning signs:**
- Scroll position does not reset to top when navigating to a new page
- Scroll becomes jittery or unresponsive after several page navigations
- Console warnings about destroyed components still receiving events
- Memory usage steadily increases during a browsing session

**Prevention:**
- Use the official `<ReactLenis>` component from `lenis/react` instead of manual instantiation
- The React wrapper handles mount/unmount lifecycle automatically
- If using a custom implementation, destroy the Lenis instance in a cleanup function:
  ```tsx
  useEffect(() => {
    const lenis = new Lenis();
    return () => lenis.destroy();
  }, []);
  ```
- Ensure `scrollTo(0)` is called on route change if auto-reset is not working
- Test navigation loops: click through 10+ pages rapidly and check for degradation

---

## 3. Full-Viewport Sections with Variable Content

**Severity:** Medium
**Phase:** Phase 2 (Layout Restructure)

**Problem:**
Designing for `100vh` assumes content fits perfectly in one screen. In reality:
- Mobile browsers have dynamic toolbars that change the visible viewport height
- Content length varies (especially with bilingual text that may be longer in one language)
- Very large desktop monitors (4K, ultrawide) make content look lost in empty space
- Very small screens (old iPhones, budget Android) cannot fit all content in one viewport

**Warning signs:**
- Text or buttons get cut off at the bottom on mobile
- Large empty gaps between content and section boundaries on large screens
- Content overlaps section boundaries when zooming in or using large text settings
- Layout looks different in Chrome vs Safari on iOS (different viewport height calculations)

**Prevention:**
- Use `min-h-svh` instead of `h-screen`:
  - `svh` = Small Viewport Height, excludes mobile browser chrome
  - `min-h-` allows content to grow beyond one screen if needed
- Center content vertically with flexbox (`flex items-center`) so it adapts to available space
- Set a `max-w` on content containers to prevent text from stretching too wide on ultrawide monitors
- Test at these breakpoints: 320px (old iPhone SE), 375px (iPhone), 768px (tablet), 1440px (desktop), 2560px (ultrawide)
- Use `clamp()` for font sizes so typography scales between mobile and 4K

---

## 4. i18n Breaking Existing URLs

**Severity:** High
**Phase:** Phase 5 (Internationalization)

**Problem:**
Adding a `[locale]` prefix to all routes changes every URL on the site. Existing bookmarks,
search engine indexes, and external links to `/blog/some-post` will break if they now require
`/tr/blog/some-post`.

**Warning signs:**
- Google Search Console reports a spike in 404 errors after deployment
- Analytics shows a sharp drop in organic traffic
- Users report broken links from social media shares or bookmarks
- RSS feed URLs change, breaking existing subscribers

**Prevention:**
- Configure next-intl with `defaultLocale: "tr"` and `localePrefix: "as-needed"`:
  - Turkish URLs remain unchanged: `/blog/some-post`
  - English URLs get the prefix: `/en/blog/some-post`
  - No existing URL breaks
- Set up explicit redirects in `next.config.ts` for any edge cases
- Update the sitemap to include both locale variants with `hreflang` tags
- Test every existing URL after i18n integration to verify no 404s
- Keep the RSS feed URL stable (or add a redirect from old to new)
- Submit updated sitemap to Google Search Console after launch

---

## 5. Dark Mode Flash (FOUC)

**Severity:** Medium
**Phase:** Phase 3 (Dark Mode Toggle)

**Problem:**
Without proper configuration, the site briefly renders in the wrong theme before JavaScript
hydrates and applies the correct theme class. Users with dark mode preference see a white
flash on every page load, which is jarring and looks buggy.

**Warning signs:**
- Brief white flash visible when loading the site in dark mode
- Theme flickers between light and dark during hydration
- `useTheme()` returns `undefined` on first render
- Hydration mismatch warnings in the console

**Prevention:**
- Use next-themes with these exact props:
  ```tsx
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
  ```
- `attribute="class"` ensures the `dark` class is set on `<html>` before paint
- next-themes injects a blocking script that reads localStorage before the body renders
- `disableTransitionOnChange` prevents awkward transition animations during theme switch
- Do NOT conditionally render the ThemeProvider based on client-side state
- Test by hard-refreshing (Ctrl+Shift+R) with both light and dark system preferences
- Verify in both Chrome and Safari (Safari handles blocking scripts differently)

---

## 6. Over-Animation Fatigue

**Severity:** Medium
**Phase:** Phase 4 (Animations and Scroll), Phase 7 (Polish)

**Problem:**
When every element on the page animates on scroll, the site feels gimmicky and exhausting
rather than polished. Award-winning sites use animation strategically, not universally.
Visitors are here for content (portfolio, blog), not a theme park ride.

**Warning signs:**
- Every paragraph, image, and heading has a scroll-triggered entrance animation
- Users have to wait for animations to complete before they can read content
- The site feels slow even though load times are fast (perceived performance issue)
- Feedback from testers includes words like "distracting" or "busy"

**Prevention:**
- Follow the "animate the moments" principle:
  - **DO animate:** Page entry (hero), section reveals (first appearance), hover states on interactive elements, page transitions
  - **DO NOT animate:** Every paragraph, every image, every list item, every card individually
- Use `viewport={{ once: true }}` so animations play once, not every time you scroll past
- Keep animation durations short: 0.3-0.6s for reveals, 0.15-0.25s for hover states
- Stagger sparingly: 2-3 items in a group, not 10+ items with cascading delays
- Conduct the "show someone else" test: if they say "cool animations" instead of noticing your work/content, you have too many animations
- Review the site with `prefers-reduced-motion` enabled to ensure it is still functional and pleasant

---

## 7. Tailwind CSS v4 Dark Mode with Class Strategy

**Severity:** Medium
**Phase:** Phase 1 (Design System), Phase 3 (Dark Mode Toggle)

**Problem:**
Tailwind CSS v4 changed how dark mode configuration works compared to v3. The default
strategy is `media` (uses `prefers-color-scheme`), and switching to `class` strategy
(required for next-themes toggle) requires different configuration syntax.

**Warning signs:**
- `dark:` variants do not apply when the `dark` class is present on `<html>`
- Dark mode works with system preference but not with the manual toggle
- Build warnings about unrecognized dark mode configuration
- Inconsistent dark mode behavior between development and production

**Prevention:**
- In Tailwind v4, dark mode configuration goes in `globals.css` using the `@theme` directive or the `@custom-variant` directive:
  ```css
  @import "tailwindcss";
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- Do NOT use the old `tailwind.config.js` `darkMode: "class"` syntax (v3 pattern)
- Verify dark mode works by:
  1. Setting system preference to light
  2. Manually toggling to dark via the UI
  3. Confirming all `dark:` utilities are applied
- Test both the `@theme` approach and the `@custom-variant` approach to determine which is correct for the project's Tailwind v4 version

---

## 8. Font Loading Causing Layout Shift

**Severity:** Medium
**Phase:** Phase 1 (Design System)

**Problem:**
Distinctive display fonts (like Syne or Clash Display) are larger files than system fonts.
If the font takes time to load, the browser first renders with a fallback font and then
swaps, causing a visible layout shift (CLS). This is especially noticeable with oversized
headings where even small metric differences cause large visual jumps.

**Warning signs:**
- Headings visibly "jump" or resize after page load
- Cumulative Layout Shift (CLS) score exceeds 0.1 in Lighthouse
- Flash of unstyled text (FOUT) visible on slower connections
- Different text wrapping before and after font loads

**Prevention:**
- Use `next/font/google` with `display: "swap"` (renders fallback immediately, swaps when loaded):
  ```tsx
  const syne = Syne({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-display",
    weight: ["400", "600", "700", "800"],
  });
  ```
- Subset fonts to only needed character sets (`latin` + `latin-ext` covers Turkish)
- Limit font weights: load only the weights actually used (not the full family)
- Use `size-adjust` in CSS to match fallback font metrics to the display font:
  ```css
  @font-face {
    font-family: "Syne Fallback";
    src: local("Arial");
    size-adjust: 105%;
    ascent-override: 90%;
  }
  ```
- Measure CLS with Lighthouse and Web Vitals before and after font changes
- Consider preloading the display font for the hero section since it is above the fold

---

## Quick Reference: Pitfall-to-Phase Map

| # | Pitfall                        | Severity    | Phase to Address          |
|---|--------------------------------|-------------|---------------------------|
| 1 | Animation perf on mobile       | High        | Phase 4, Phase 7          |
| 2 | Lenis + route changes          | Medium-High | Phase 4                   |
| 3 | Variable content in vh         | Medium      | Phase 2                   |
| 4 | i18n breaking URLs             | High        | Phase 5                   |
| 5 | Dark mode FOUC                 | Medium      | Phase 3                   |
| 6 | Over-animation fatigue         | Medium      | Phase 4, Phase 7          |
| 7 | Tailwind v4 dark mode config   | Medium      | Phase 1, Phase 3          |
| 8 | Font loading layout shift      | Medium      | Phase 1                   |

---

## Pre-Launch Checklist (Derived from Pitfalls)

Before each deployment, verify:

- [ ] Run Lighthouse on mobile: Performance > 90, CLS < 0.1
- [ ] Test smooth scroll after 10+ rapid page navigations
- [ ] Verify all existing URLs return 200 (not 404 or redirect loops)
- [ ] Hard-refresh in dark mode: no white flash
- [ ] Browse the full site with `prefers-reduced-motion: reduce` enabled
- [ ] Test on a real mobile device (not just DevTools emulation)
- [ ] Check font loading on throttled connection (Slow 3G)
- [ ] Verify both locale variants render correctly (Turkish default, English prefixed)
