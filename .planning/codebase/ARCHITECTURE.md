# Architecture

**Analysis Date:** 2026-03-04

## Pattern Overview

**Overall:** Next.js App Router with server-side rendering and static generation. Content-driven site with hybrid local and external content sources (local MDX + Medium RSS feed).

**Key Characteristics:**
- Server components as default; minimal client-side JavaScript
- File-system based content management with YAML frontmatter (MDX files)
- Static generation with ISR for Medium posts
- Separated routing for blog sources: `/blog/local/[slug]` and `/blog/medium/[slug]`
- Design system using CSS custom properties for theming (light and dark modes)
- Framer Motion for page and element animations

## Layers

**App Router Layer:**
- Purpose: Handle all routing and page rendering via file-based routing
- Location: `src/app/`
- Contains: Route segments, error boundaries, loading states, and metadata generation
- Depends on: lib utilities for content fetching, components for UI rendering
- Used by: Next.js App Router at request time

**Content Library Layer:**
- Purpose: Abstract content fetching and parsing from files and external APIs
- Location: `src/lib/`
- Contains: `mdx.ts` (local MDX parsing), `medium.ts` (RSS feed fetching)
- Depends on: `gray-matter` for YAML parsing, `rss-parser` for Medium RSS, `marked` for markdown rendering
- Used by: Page components and route handlers

**Component Layer:**
- Purpose: Reusable UI elements and composition primitives
- Location: `src/components/`
- Contains: `Navigation.tsx` (header), `Footer.tsx`, `BlogCard.tsx`, `motion.tsx` (animation components)
- Depends on: Framer Motion, react-icons, Tailwind CSS for styling
- Used by: Page components for rendering

**Styling System:**
- Purpose: Katman design system with light/dark mode support
- Location: `src/app/globals.css`
- Contains: CSS custom properties (colors, shadows), component utilities (`.card`, `.prose`), base styles
- Depends on: Tailwind CSS v4, highlight.js for code blocks
- Used by: All components via class names

## Data Flow

**Blog Listing Flow:**

1. User navigates to `/blog`
2. `src/app/blog/page.tsx` executes on server (async component)
3. Concurrently:
   - `getContentList("blog")` reads `content/blog/*.mdx` files from disk, parses YAML frontmatter via `gray-matter`
   - `getMediumPosts()` fetches RSS feed from `https://medium.com/feed/@onurataasar`, caches for 1 hour
4. Both lists are normalized to union type and combined
5. `BlogCard` component renders each post with appropriate link target (`/blog/local/{slug}` or `/blog/medium/{slug}`)

**Local Blog Post Flow:**

1. User navigates to `/blog/local/[slug]`
2. `src/app/blog/local/[slug]/page.tsx` fetches content via `getContentBySlug("blog", slug)`
3. Markdown content is parsed via `marked` with `markedHighlight` for syntax highlighting
4. HTML is rendered via `dangerouslySetInnerHTML` in prose container
5. `generateMetadata()` generates SEO metadata from frontmatter

**Medium Post Flow:**

1. User navigates to `/blog/medium/[slug]`
2. `src/app/blog/medium/[slug]/page.tsx` calls `getMediumPost(slug)`
3. All Medium posts are fetched, then filtered by slug (URL-safe slug generated from post link)
4. HTML content is sanitized via `isomorphic-dompurify` before rendering
5. `generateStaticParams()` pre-generates routes for all Medium posts during build

**State Management:**
- No global state library (Redux, Zustand, etc.)
- Navigation component (`Navigation.tsx`) uses `useState` for mobile menu state and scroll detection
- All data fetching is server-side; client hydration minimal

## Key Abstractions

**Content Meta:**
- Purpose: Unified representation of blog/notes metadata
- Examples: `src/lib/mdx.ts` (ContentMeta interface)
- Pattern: Flat object structure with title, date, description, slug, isLocal boolean

**Content Fetching:**
- Purpose: Abstract the retrieval and parsing of markdown/RSS
- Examples: `getContentList()`, `getContentBySlug()`, `getMediumPosts()`
- Pattern: Async functions with try/catch error handling; returns typed objects

**Blog Post Union Type:**
- Purpose: Represent both local and Medium posts with shared interface
- Examples: `src/components/BlogCard.tsx` (LocalPost | ExternalPost)
- Pattern: Discriminated union using `type` field for type narrowing

**Motion Primitives:**
- Purpose: Reusable Framer Motion animation components
- Examples: `FadeIn`, `StaggerContainer`, `StaggerItem`, `PageTransition`, `ParallaxLayer`
- Pattern: Wrapper components that encapsulate animation logic, accept children and className

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Sets up HTML structure, fonts, Analytics, sticky navigation, main container

**Homepage:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Hero section with animations, skills grid, social links (client-side for animations)

**Blog Page:**
- Location: `src/app/blog/page.tsx`
- Triggers: GET `/blog`
- Responsibilities: Combines local and Medium posts, renders BlogCard list

**Notes Page:**
- Location: `src/app/notes/page.tsx`
- Triggers: GET `/notes`
- Responsibilities: Lists notes from `content/notes/*.mdx`

## Error Handling

**Strategy:** Per-route error boundaries with fallback 404 pages

**Patterns:**
- Each detail route (`/blog/local/[slug]`, `/blog/medium/[slug]`, `/notes/[slug]`) has own `error.tsx` boundary
- Try/catch blocks in async functions that fetch content; catch errors invoke `notFound()` from `next/navigation`
- Medium rate limit handling: Catches 429 error message and renders user-friendly error page with link to Medium profile
- Synchronous component error boundary at `src/app/error.tsx` for unhandled errors

## Cross-Cutting Concerns

**Logging:**
- Native `console.error()` for failures in `getMediumPosts()` and `getMediumPost()`
- Error context logged before re-throwing

**Validation:**
- Empty string checks for dynamic route params (`slug`)
- Fallback to `notFound()` if slug is falsy

**Authentication:**
- Not applicable; public site

**Markdown Rendering:**
- Dual approach: `marked` for local blog/notes, `dangerouslySetInnerHTML` for Medium (sanitized with DOMPurify)
- Unused: `next-mdx-remote` component in `src/components/mdx-content.tsx` (legacy pattern)

**Image Optimization:**
- Next.js `Image` component for blog thumbnails and Medium post images
- Remote patterns configured in `next.config.ts`: `medium.com` and `cdn-images-1.medium.com`

---

*Architecture analysis: 2026-03-04*
