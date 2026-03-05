# Testing Patterns

**Analysis Date:** 2026-03-04

## Test Framework

**Status:** Not configured

No testing framework is currently set up in this project. The `package.json` contains no test dependencies (Jest, Vitest, Playwright, etc.) and there are no test files in the `src/` directory.

**Recommendation:** For a personal blog/portfolio with minimal dynamic functionality, manual testing and deployment verification may suffice. However, when adding interactive features, consider:
- Unit testing utilities (`jest` or `vitest`)
- Component testing for reusable components
- E2E testing for critical user flows

## Test File Organization

**Current State:**
- No test files exist in the codebase
- `package.json` has no test script

**Potential Convention (if testing is added):**
- **Location:** Co-located tests in same directory as source
  - `src/components/Navigation.tsx` → `src/components/Navigation.test.tsx`
  - `src/lib/mdx.ts` → `src/lib/mdx.test.ts`
- **Naming:** `.test.ts` or `.spec.ts` suffix
- **Separation:** Keep tests separate from source during development, same folder as source files

## Testing Strategy by Component Type

**Server Components (majority of codebase):**
- Limited ability to unit test directly (async rendering)
- Validation approach: verify metadata generation works
- Integration testing through API calls or E2E scenarios
- Manual testing: check page renders correctly and data loads

Example untestable server component: `src/app/blog/page.tsx`
- Directly awaits `getContentList()` and `getMediumPosts()`
- Renders without props or interactivity
- Testing would require mocking file system and HTTP

**Client Components:**
- `Navigation.tsx` — interactive mobile menu, scroll detection
  - Should test: menu open/close state, scroll threshold, route-based active states
  - Framework recommendation: Jest + React Testing Library
  - User interactions: button clicks, route changes

**Utility Functions:**
- `getContentList()` in `src/lib/mdx.ts` — file system operations
  - Should test: reading MDX files, parsing frontmatter, sorting by date
  - Framework recommendation: Jest with mock fs module
  - Edge cases: missing files, malformed frontmatter, empty directory

- `getMediumPosts()` in `src/lib/medium.ts` — network I/O
  - Should test: fetch success/error handling, thumbnail extraction, category mapping
  - Framework recommendation: Jest with mock fetch
  - Edge cases: empty feed, malformed XML, rate limiting

**Motion Components:**
- `src/components/motion.tsx` — animation utilities
  - Framer Motion components difficult to unit test
  - Should verify: props pass through correctly, animation props structure valid
  - Manual testing: observe animation behavior in browser

## What Gets Tested vs. Not Tested

**Should Test (if implementing tests):**
- Date parsing and sorting in `getContentList()`
- HTML stripping logic in `BlogCard.stripHtml()`
- Thumbnail extraction regex in `getMediumPosts()`
- Navigation active route detection
- Error boundary display in `error.tsx`

**Cannot Easily Test (server-side limits):**
- Page component rendering (would need E2E framework)
- MDX file reading from disk in page components
- RSS feed fetching in page components
- Framer Motion animation timing

**Not Worth Testing (trivial/external):**
- Simple render-only components: `Footer.tsx` (just links)
- CSS class application via Tailwind
- Icon rendering from `react-icons`
- Data display via `.map()` rendering

## Manual Testing Approach

**Current practice:**
- No automated tests configured
- Reliance on:
  - `npm run lint` (ESLint for static analysis)
  - `npm run build` (Next.js build validation)
  - `npm run dev` (local browser testing)
  - Deployment to Vercel (production validation)

**Recommended manual test checklist:**
- Homepage loads with all sections visible
- Blog listing shows local + Medium posts (if feed accessible)
- Blog detail pages render correctly and show formatted content
- Dev notes list and detail pages work
- Projects page renders
- CV page renders
- Navigation menu works on mobile (open/close, active states)
- Sticky header behavior on scroll
- Dark mode CSS applied correctly
- Error pages display on invalid routes

## Build & Lint Verification

**Run Commands:**
```bash
npm run dev              # Local development with hot reload
npm run build            # Production build validation
npm start                # Production server
npm run lint             # ESLint static analysis
```

**Pre-commit validation (current):**
- ESLint checks run via `npm run lint`
- TypeScript strict checking during build
- No pre-commit hooks configured for automated checks

## Error Testing

**How errors are handled (no formal test coverage):**

Error handling in `src/lib/medium.ts` catch block (lines 58-64):
```typescript
catch (error) {
  console.error("Failed to fetch Medium posts:", error);
  if (error instanceof Error && error.message.includes("429")) {
    throw new Error("Rate limited by Medium. Please try again later.");
  }
  return [];
}
```

If tests were added, should verify:
- Fetch failure returns empty array (safe fallback)
- Rate limit errors throw with specific message
- Console logs error for debugging

Error boundary in `src/app/blog/local/[slug]/error.tsx`:
```typescript
useEffect(() => {
  console.error("Blog post error:", error);
}, [error]);
```

If tests were added, should verify:
- Error message displays to user
- Reset button calls retry function
- Error digest logged for monitoring

## Mocking Strategy (if testing is implemented)

**File System (for `src/lib/mdx.ts`):**
```typescript
import fs from 'fs';
jest.mock('fs');

// Mock fs.readdirSync to return test files
(fs.readdirSync as jest.Mock).mockReturnValue(['post-1.mdx', 'post-2.mdx']);

// Mock fs.readFileSync to return frontmatter + content
(fs.readFileSync as jest.Mock).mockReturnValue(`---
title: Test Post
date: "2026-01-01"
description: Test description
---
Test content`);
```

**Network Requests (for `src/lib/medium.ts`):**
```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('<rss>...</rss>'),
  })
);

// Test error case
(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
```

**React Testing Library (for `Navigation.tsx`):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation');

it('opens and closes mobile menu', () => {
  (usePathname as jest.Mock).mockReturnValue('/blog');
  render(<Navigation />);

  const menuButton = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(menuButton);
  // Assert menu is visible
});
```

## Coverage Targets

**Current:** Not enforced (no test framework)

**Recommendation if implementing tests:**
- Utility functions: 80%+ coverage (core logic)
- Components: 60%+ coverage (mostly rendering)
- Pages/Routes: 20-40% coverage (integration tested separately)

## Test Types & Scope

**Unit Tests (if implemented):**
- Test individual functions in isolation
- File: `src/lib/mdx.ts` — `getContentList()`, `getContentBySlug()`
- File: `src/lib/medium.ts` — `getMediumPosts()`, error handling
- File: `src/components/BlogCard.tsx` — `stripHtml()` helper

**Integration Tests (limited applicability):**
- Test data flow: content reading → page rendering
- Test Medium feed fetching → display in blog listing
- Would require Next.js test utilities or E2E framework

**E2E Tests (recommended for critical paths):**
- Framework: Playwright (already in project for testing utilities)
- Paths to test:
  - User visits homepage → navigates to blog → reads a post
  - User visits notes → views a dev note
  - Mobile user opens/closes navigation menu
  - Invalid route shows 404

Example Playwright test (hypothetical):
```typescript
test('User can navigate to blog and read a post', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Blog');
  await page.waitForURL('/blog');
  const firstPost = page.locator('article').first();
  await firstPost.click();
  await expect(page.locator('h1')).toBeVisible();
});
```

## Known Testing Gaps

**Untested Areas:**
- No validation of MDX frontmatter parsing (edge cases: missing fields, wrong formats)
- No testing of Medium RSS parsing (malformed XML, missing fields)
- No testing of HTML sanitization in `BlogCard.stripHtml()`
- No testing of date formatting (DD.MM.YYYY vs YYYY-MM-DD inconsistency not caught)
- No testing of error boundaries on invalid routes
- No testing of responsive behavior (mobile menu)
- No testing of Framer Motion animations

**Risk Level:** Low
- Site is primarily content-driven (static MDX files)
- Interactive features limited to navigation menu
- External dependency risks (Medium RSS) mitigated by fallback to empty array
- Deployment verification via Vercel provides production safety net

---

*Testing analysis: 2026-03-04*
