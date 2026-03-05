# External Integrations

**Analysis Date:** 2026-03-04

## APIs & External Services

**Medium RSS Feed:**
- Service: Medium RSS Feed API
- Purpose: Fetch and display blog posts from author's Medium profile
- URL: `https://medium.com/feed/@onurataasar`
- SDK/Client: `rss-parser` v3.13.0
- Implementation: `src/lib/medium.ts` - `getMediumPosts()` function
- Caching: 1 hour (via Next.js fetch `revalidate: 3600`)
- Error Handling: Returns empty array on fetch failure; handles rate limiting (HTTP 429)

**Google Fonts API:**
- Service: Google Fonts
- Purpose: Load custom typefaces (Instrument Serif, Instrument Sans, Fira Code)
- Implementation: `src/app/layout.tsx` - uses Next.js font optimization
- Font Loading: `display: "swap"` prevents layout shift

## Data Storage

**Databases:**
- None detected - No persistent database

**File Storage:**
- Local filesystem only
- Content stored in:
  - `content/blog/` - Blog posts in `.mdx` format
  - `content/notes/` - Developer notes in `.mdx` format
- Files read via `fs.readFileSync()` in `src/lib/mdx.ts`
- No cloud storage service detected

**Caching:**
- Next.js built-in fetch caching (1 hour for Medium RSS feed)
- No external cache service (Redis, Memcached, etc.)

## HTML Sanitization

**Security Library:**
- Service: DOMPurify
- Package: `isomorphic-dompurify` v2.22.0
- Purpose: Sanitize HTML content from Medium RSS feed before rendering with `dangerouslySetInnerHTML`
- Usage:
  - `src/app/blog/medium/[slug]/page.tsx` - Line 56: Sanitizes Medium post content
  - `src/components/BlogCard.tsx` - Sanitizes HTML when extracting text previews

**Implementation Pattern:**
```typescript
import DOMPurify from "isomorphic-dompurify";

const sanitizedContent = DOMPurify.sanitize(mediumPost.content || mediumPost.description);
// Then safely render with:
// <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
```

## Authentication & Identity

**Auth Provider:**
- Custom static site - No authentication required
- No user management or login system
- Metadata includes Twitter handle: `@oenyuar` (in `src/app/layout.tsx`)

## Monitoring & Observability

**Analytics:**
- Service: Vercel Analytics
- Package: `@vercel/analytics` v1.5.0
- Implementation: `src/app/layout.tsx` - Line 73: `<Analytics />` component
- Tracking: Automatic page views and Web Vitals

**Logs:**
- Standard console logging (browser DevTools)
- Server-side logs via Next.js/Vercel
- Error logging in:
  - `src/lib/medium.ts` - Medium fetch failures
  - `src/app/blog/medium/[slug]/page.tsx` - Post loading errors
  - `src/components/BlogCard.tsx` - HTML sanitization fallback

## CI/CD & Deployment

**Hosting:**
- Vercel - Deployment platform
- Deployment URL: `https://onurataasar.vercel.app`
- Site metadata references Vercel deployment (see `src/app/layout.tsx` line 33)

**CI Pipeline:**
- Vercel Git Integration (automatic deployments on push)
- Build command: `npm run build`
- Start command: `npm run start`
- Dev command: `npm run dev -- --turbopack`
- ESLint check: `npm run lint`

**Build Configuration:**
- `next.config.ts` - Configured remote image patterns for Medium thumbnails
- Vercel automatically handles environment setup and deployment

## Image Handling

**Remote Image Patterns:**
- Medium.com images allowed (configured in `next.config.ts`)
- Medium thumbnail images displayed in:
  - `src/components/BlogCard.tsx` - Blog listing
  - `src/app/blog/medium/[slug]/page.tsx` - Medium post detail pages

**Implementation:**
- Next.js `<Image />` component with `fill` prop for responsive images
- Images lazy-loaded by default (except priority images on post detail pages)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Vercel Analytics (telemetry) - Automatic Web Vitals collection
- Next.js build telemetry (opt-out available via Vercel settings)

## Environment Configuration

**Required env vars:**
- Not detected - Site runs without environment variables
- Note: Vercel may inject internal env vars during deployment

**Secrets location:**
- Not applicable - No API keys or secrets required
- Medium RSS feed is public (no authentication needed)

## Static Generation Strategy

**Medium Posts:**
- `generateStaticParams()` in `src/app/blog/medium/[slug]/page.tsx` (Line 139)
- Fetches all Medium posts during build
- Generates static pages for each Medium post
- Regeneration: Full rebuild required to update Medium posts (no ISR)

**Local Blog Posts:**
- Server components read `.mdx` files from disk
- Dynamic generation at request time

---

*Integration audit: 2026-03-04*
