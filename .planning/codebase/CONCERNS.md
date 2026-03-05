# Codebase Concerns

**Analysis Date:** 2025-03-04

## Tech Debt

**Dual Next.js Config Files:**
- Issue: Two conflicting Next.js configuration files exist (`next.config.ts` and `next.config.mjs`)
- Files: `next.config.ts`, `next.config.mjs`
- Impact:
  - Only `next.config.ts` is active, but it's missing critical configuration from `.mjs`
  - `.ts` file lacks `cdn-images-1.medium.com` in `remotePatterns`, blocking Medium CDN images
  - `.ts` file missing `pageExtensions` configuration present in `.mjs`
  - Risk of configuration drift and confusion during maintenance
- Fix approach: Consolidate to single config file (recommend TypeScript `.ts`) with all settings from both files

**Date Format Inconsistency:**
- Issue: Frontmatter dates use two different formats across content files
- Files:
  - Blog posts: `content/blog/*.mdx` use `"YYYY-MM-DD"` (e.g., `"2025-02-05"`)
  - Notes: `content/notes/*.mdx` use `"DD.MM.YYYY"` (e.g., `"04.03.2025"`)
- Impact:
  - Sorting operations in `src/lib/mdx.ts` line 32 may fail or produce incorrect results
  - `new Date("04.03.2025")` parses as invalid in many JS environments
  - Inconsistent date parsing across content types causes maintenance friction
- Fix approach: Standardize all dates to ISO format `"YYYY-MM-DD"` across all content files

**Unused MDX Remote Setup:**
- Issue: Imported but unused markdown rendering library
- Files: `src/components/mdx-content.tsx` (unused), `package.json` dependencies
- Impact:
  - Dead code consuming bundle size
  - Dependencies (`next-mdx-remote`, `rehype-pretty-code`, `shiki`) installed but not used
  - Duplicates code highlighting setup already done via `marked` + `highlight.js`
- Fix approach: Remove `mdx-content.tsx` component and unused dependencies from `package.json`

**Unused Lodash Dependency:**
- Issue: Only used in one place for simple string truncation
- Files: `src/components/BlogCard.tsx` line 4 (single use at line 75)
- Impact: ~71KB minified library added to bundle for `_.truncate()` function
- Fix approach: Replace `_.truncate(post.title, { length: 70 })` with native JS implementation: `post.title.slice(0, 70) + (post.title.length > 70 ? '...' : '')`

## Security Considerations

**Unsafe HTML Rendering - Local Blog Posts:**
- Risk: HTML content from local blog posts rendered without sanitization
- Files: `src/app/blog/local/[slug]/page.tsx` line 50
- Current mitigation:
  - Content is local and under developer control
  - `marked` + `highlight.js` generate HTML but don't sanitize third-party content
- Recommendations:
  - Minimal risk for local content, but should add DOMPurify sanitization for defense-in-depth
  - Consider: `DOMPurify.sanitize(htmlContent)` before `dangerouslySetInnerHTML`

**Medium Post HTML Rendering - Insufficient Sanitization:**
- Risk: Medium posts are external content; current sanitization may be incomplete
- Files: `src/app/blog/medium/[slug]/page.tsx` line 56-57
- Current mitigation: `DOMPurify.sanitize()` is applied to Medium content
- Recommendations:
  - DOMPurify config should be hardened: `DOMPurify.sanitize(content, { ALLOWED_TAGS: [...], ALLOWED_ATTR: [...] })`
  - Currently allows all tags that DOMPurify considers safe by default
  - Consider restricting to `<p>`, `<h1-6>`, `<strong>`, `<em>`, `<a>`, `<img>`, `<blockquote>`, `<code>`, `<pre>` only

**XSS Risk in Note Content Rendering:**
- Risk: Note markdown parsed and rendered without sanitization
- Files: `src/app/notes/[slug]/page.tsx` line 48-49
- Current mitigation:
  - Content is local (not user-submitted)
  - `marked` produces HTML that could theoretically contain embedded scripts in markdown
- Recommendations:
  - Add `DOMPurify.sanitize()` wrapper around `marked.parse()` output
  - Add Content Security Policy (CSP) headers in `next.config.ts` to mitigate inline scripts
  - Pattern: `const htmlContent = DOMPurify.sanitize(marked.parse(content))`

**Medium Image URL Trust:**
- Risk: Medium CDN image URLs embedded in posts are from external source
- Files: `src/lib/medium.ts` line 35-43 (thumbnail extraction), `src/app/blog/medium/[slug]/page.tsx` line 95-101
- Current mitigation:
  - Images rendered via Next.js `<Image>` component with remote pattern restrictions
  - `remotePatterns` in `next.config.ts` restricts to `medium.com` and `cdn-images-1.medium.com`
- Recommendations:
  - Ensure `cdn-images-1.medium.com` remains in active config (currently missing in `next.config.ts`)
  - Consider adding image validation/verification layer before display

## Performance Bottlenecks

**Synchronous File System Reads on Every Page Load:**
- Problem: MDX content files read synchronously from disk during page generation
- Files: `src/lib/mdx.ts` lines 19, 24, 39
- Cause: `fs.readdirSync()` and `fs.readFileSync()` block during request handling
- Impact:
  - Blog and notes listing pages wait for all file I/O
  - Each file read is blocking (no parallelization within single file)
  - Scales poorly as content grows
- Improvement path:
  - Keep synchronous reads (necessary for server components) but add caching layer
  - Implement memo/cache for `getContentList()` results across requests
  - Consider moving content to database or cached JSON file for faster queries

**Repeated Medium Feed Fetches:**
- Problem: Medium RSS feed parsed on every page load (blog listing, Medium post detail routes)
- Files: `src/lib/medium.ts` lines 13-65, `src/app/blog/page.tsx` line 14
- Impact:
  - Network latency per request (even with 1-hour cache, cold starts fetch again)
  - Medium API rate limits risk (line 60 handles 429 errors reactively)
  - Medium service outage blocks entire blog/medium routes
- Improvement path:
  - Increase cache revalidation window beyond 1 hour for production
  - Implement fallback/stale content strategy if fetch fails
  - Consider pre-rendering medium posts at build time with ISR (Incremental Static Regeneration)

**Blog List Renders Both Local + Medium Posts:**
- Problem: Blog page renders mixed local and Medium posts requiring parallel fetch
- Files: `src/app/blog/page.tsx` lines 12-15
- Impact:
  - Page load blocked on slowest data source (Medium API)
  - Single Medium feed outage breaks entire blog listing
- Improvement path:
  - Separate blog and Medium posts into distinct routes (`/blog/local`, `/blog/medium`) with fallbacks
  - Or: Cache Medium posts aggressively and show stale data on fetch failure

**Large Component Bundle Size:**
- Problem: `framer-motion` (12.34.1) included for animations on all pages
- Files: Package dependency, used primarily in `src/components/Navigation.tsx` and motion utilities
- Impact: ~60KB minified framer-motion bundle on every page load
- Improvement path:
  - Consider lighter animation library (CSS animations, `react-spring` is smaller)
  - Or: Lazy-load navigation component to defer framer-motion loading

## Fragile Areas

**Medium Post Slug Generation:**
- Files:
  - `src/lib/medium.ts` lines 143-146
  - `src/app/blog/medium/[slug]/page.tsx` lines 29-31, 143-147
  - `src/components/BlogCard.tsx` lines 38-43
- Why fragile:
  - Slug generated inconsistently across multiple files via repeated regex logic
  - `post.link.split("/").pop()?.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase()`
  - If Medium URL structure changes, all three locations break silently
  - No validation that generated slug matches actual post
- Safe modification:
  - Extract slug generation to utility function in `src/lib/medium.ts`
  - Add slug validation against actual Medium link structure
  - Test coverage: Verify slug generation with various Medium URL formats

**Error Handling in Blog Routes:**
- Files:
  - `src/app/blog/local/[slug]/page.tsx` lines 54-56
  - `src/app/blog/medium/[slug]/page.tsx` lines 112-136
  - `src/app/notes/[slug]/page.tsx` lines 52-54
- Why fragile:
  - Broad `catch` blocks that swallow all errors and call `notFound()`
  - Logs errors to console (security issue: may expose paths/internal data)
  - Cannot distinguish between "post doesn't exist" and "file system error"
  - Medium rate limit error has special case handling (line 113) but logged content is crude
- Test coverage:
  - No error boundary testing for 404 vs 500 scenarios
  - No tests for Medium API failures
- Safe modification:
  - Distinguish error types: `Error`, `NotFoundError`, `RateLimitError`
  - Return specific HTTP status codes (404 vs 500)
  - Remove raw error logging to console

**Content Meta Type Casting:**
- Files: `src/lib/mdx.ts` lines 25-30, 43-47
- Why fragile:
  - `as ContentMeta` cast trusts frontmatter data structure without validation
  - If frontmatter missing required fields (title, date, description), code fails silently
  - `isLocal` check uses string search (`source.includes("medium.com")`) - unreliable heuristic
- Safe modification:
  - Add schema validation (e.g., Zod) for frontmatter parsing
  - Validate required fields and throw meaningful errors
  - Remove `isLocal` heuristic; use directory location or explicit flag

**HTML Lang Attribute Mismatch:**
- Issue: Root layout sets incorrect language
- Files: `src/app/layout.tsx` line 51
- Current: `<html lang="tr">` (Turkish)
- Content: All content is in Turkish but metadata uses English
- Impact:
  - SEO implications (language tags affect search indexing)
  - Accessibility tools receive wrong language information
  - Inconsistent with `lang="en"` mentioned in CLAUDE.md as issue

## Scaling Limits

**Static Content Growth:**
- Current capacity: Unlimited (static generation via filesystem)
- Limit: Developer must manually manage MDX files; no admin UI
- Scaling path:
  - Migrate to headless CMS (Contentful, Sanity, Strapi) for dynamic content management
  - Or: Build admin dashboard with form-based content creation

**Medium RSS Feed Dependency:**
- Current capacity: Medium API rate limits (likely 60-100 requests/hour)
- Limit: If blog traffic grows, cache misses on Medium fetch cause cascading failures
- Scaling path:
  - Cache Medium posts in database (PostgreSQL/MongoDB)
  - Queue-based update system (e.g., cron job every 6 hours)
  - Decouple Medium fetches from request path

**Build Time:**
- Current capacity: `generateStaticParams()` for Medium posts fetches full feed on every build
- Limit: Build time increases linearly with Medium post count
- Scaling path:
  - Pre-generate top N most recent Medium posts
  - Use ISR for older posts (regenerate on demand)

## Dependencies at Risk

**Medium Article API Dependency:**
- Risk: `medium-article-api` package (v1.0.4) appears unused (code uses `rss-parser` instead)
- Impact: Unused dependency consuming space and potential security surface
- Migration plan: Remove from `package.json`

**Highlight.js Bundle:**
- Risk: Large syntax highlighting library (11.11.1) with many language definitions
- Impact: ~200KB+ shipped to client for code blocks
- Migration plan:
  - Consider `shiki` (already in dependencies but unused via `next-mdx-remote`)
  - Or: Use smaller `prism.js` library
  - Or: Pre-highlight code at build time and ship only necessary languages

## Test Coverage Gaps

**No Testing Framework Configured:**
- What's not tested: All functionality untested
- Files: Entire codebase
- Risk:
  - Medium RSS parsing logic has no test coverage
  - Frontend components have no tests
  - Markdown rendering edge cases untested
  - Slug generation bugs could go unnoticed
- Priority: **High** - Recommend adding Jest/Vitest with tests for:
  - Medium feed parsing edge cases (empty feed, malformed XML, rate limits)
  - Date formatting consistency in sorting
  - MDX frontmatter validation
  - Image URL sanitization from Medium
  - Component rendering with different data states

**No E2E Tests:**
- Missing: Integration tests between blog/Medium routes and data fetching
- Risk: New changes could break blog listing or post detail routes without detection
- Recommendation: Add Playwright or Cypress tests for critical user paths:
  - Blog listing loads and displays posts
  - Clicking Medium post link navigates correctly
  - Error states render (404, rate limit)
  - Date display formats consistently

---

*Concerns audit: 2025-03-04*
