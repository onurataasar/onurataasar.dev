# Plan 02: Dark Mode Toggle

---
wave: 2
depends_on: [01-PLAN]
requirements: [DM-01, DM-02, DM-03, DM-04]
files_modified: [src/app/layout.tsx, src/components/ThemeProvider.tsx, src/components/ThemeToggle.tsx, src/components/Navigation.tsx]
autonomous: true
---

## Objective

Implement a dark/light mode toggle using next-themes that respects system preference, persists choice in localStorage, and prevents FOUC. Integrate the toggle into the existing Navigation component.

## must_haves

- ThemeProvider wraps the app with attribute="class" and defaultTheme="system"
- ThemeToggle component with sun/moon icon that switches themes
- Toggle is visible and accessible in the Navigation bar
- System preference is detected on first visit (defaultTheme="system")
- User's choice persists across sessions (next-themes handles localStorage)
- No flash of wrong theme on page load (next-themes script injection)
- Clicking the toggle switches the theme instantly (no delay, no flicker)

## Tasks

<task id="1" title="Create ThemeProvider component">
Create `src/components/ThemeProvider.tsx` as a client component:
1. `"use client"` directive
2. Import `ThemeProvider` from `next-themes`
3. Export a wrapper component that passes:
   - `attribute="class"` (Tailwind dark mode via class)
   - `defaultTheme="system"` (respect OS preference)
   - `enableSystem={true}`
   - `disableTransitionOnChange={false}` (allow smooth transitions)
</task>

<task id="2" title="Create ThemeToggle component">
Create `src/components/ThemeToggle.tsx` as a client component:
1. `"use client"` directive
2. Import `useTheme` from `next-themes`
3. Render a button with:
   - Sun icon (for light mode) / Moon icon (for dark mode)
   - Use react-icons: `HiOutlineSun` / `HiOutlineMoon`
   - onClick toggles between "light" and "dark"
   - aria-label="Toggle dark mode"
   - Handle mounted state to avoid hydration mismatch (common next-themes pattern)
4. Style with new design tokens — the toggle should match the Electric Warm aesthetic
</task>

<task id="3" title="Integrate into layout" depends_on="1">
In `src/app/layout.tsx`:
1. Import ThemeProvider
2. Wrap the `<body>` children with `<ThemeProvider>`
3. Ensure `suppressHydrationWarning` remains on `<html>` (already present)
4. Remove the `dark:` prefixed background/text classes from `<body>` that use `prefers-color-scheme` — these will now be handled by the ThemeProvider class strategy
</task>

<task id="4" title="Add toggle to Navigation" depends_on="2,3">
In `src/components/Navigation.tsx`:
1. Import ThemeToggle
2. Add ThemeToggle to the desktop nav (next to the nav links)
3. Add ThemeToggle to the mobile menu
4. Ensure the toggle is keyboard accessible (tab order, Enter/Space triggers)
</task>

<task id="5" title="Update CSS for class-based dark mode" depends_on="3">
In `src/app/globals.css`:
1. Replace all `@media (prefers-color-scheme: dark)` blocks with `.dark` class selectors
2. Ensure the `@custom-variant dark` from Plan 01 is in place
3. Update prose dark mode styles to use `.dark` class instead of media query
4. Verify all dark mode token overrides work with class strategy
</task>

<task id="6" title="Verify dark mode works end-to-end" depends_on="4,5">
1. Run `npm run build` to ensure no errors
2. Run `npm run dev` and verify:
   - Page loads with system theme (no flash)
   - Clicking toggle switches themes instantly
   - Refreshing preserves the chosen theme
   - Both light and dark themes show Electric Warm colors
</task>

## Verification

- [ ] ThemeProvider.tsx exists and wraps the app
- [ ] ThemeToggle.tsx exists with sun/moon toggle
- [ ] Toggle is visible in Navigation (desktop and mobile)
- [ ] System preference detected on first visit
- [ ] Theme persists after page refresh (check localStorage for "theme" key)
- [ ] No FOUC — page renders with correct theme immediately
- [ ] `npm run build` succeeds
- [ ] All `prefers-color-scheme` media queries replaced with `.dark` class selectors in globals.css

---
*Plan: 01-design-foundation*
*Created: 2026-03-04*
