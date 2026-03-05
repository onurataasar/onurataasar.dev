# Codebase Structure

**Analysis Date:** 2026-03-04

## Directory Layout

```
onurataasar.dev/
├── content/                    # Content files (blog, notes, CV)
│   ├── blog/                   # Local blog posts (MDX files)
│   ├── notes/                  # Developer notes (MDX files)
│   └── cv.md                   # CV content
├── public/                     # Static assets (images, favicons)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n route group (unused but present)
│   │   ├── blog/               # Blog routes
│   │   ├── cv/                 # CV page
│   │   ├── notes/              # Notes routes
│   │   ├── projects/           # Projects page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles and design system
│   │   └── error.tsx           # Global error boundary
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utilities and helpers
│   └── app/error.tsx           # Global error boundary
├── .next/                      # Next.js build output (generated)
├── node_modules/               # Dependencies (generated)
├── package.json                # NPM dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind CSS config
├── mdx-components.tsx          # MDX component overrides
├── postcss.config.mjs          # PostCSS config
└── eslint.config.mjs           # ESLint config
```

## Directory Purposes

**content/:**
- Purpose: Store all content files (blog posts, notes, CV)
- Contains: `.mdx` files with YAML frontmatter
- Key files:
  - `content/blog/hello-world.mdx`, `shadcn-mcp.mdx` (local blog posts)
  - `content/notes/git-commands.mdx`, `production-logs-nextjs.mdx` (developer notes)
  - `content/cv.md` (CV content)

**public/:**
- Purpose: Static assets served directly by Next.js
- Contains: Images, favicons, Open Graph cards

**src/app/:**
- Purpose: Next.js App Router pages and layouts
- Contains: Route segments (directories with `page.tsx`), error boundaries, loading skeletons, metadata generators

**src/app/blog/:**
- Purpose: Blog feature routes
- Key directories:
  - `local/[slug]/` - Local MDX blog post detail page
  - `medium/[slug]/` - Medium RSS blog post detail page
- Files: `page.tsx` (listing), `error.tsx` and `loading.tsx` (per detail route)

**src/app/notes/:**
- Purpose: Developer notes routes
- Key files: `page.tsx` (listing), `[slug]/page.tsx` (detail)

**src/components/:**
- Purpose: Reusable React components
- Key files:
  - `Navigation.tsx` - Header with sticky scroll effect and mobile menu (client component)
  - `Footer.tsx` - Footer with social links (client component)
  - `BlogCard.tsx` - Blog post card renderer (shared by local and Medium posts)
  - `motion.tsx` - Animation primitives (FadeIn, StaggerContainer, StaggerItem, ParallaxLayer, etc.)

**src/lib/:**
- Purpose: Shared utilities and business logic
- Key files:
  - `mdx.ts` - Content fetching: `getContentList()`, `getContentBySlug()`
  - `medium.ts` - Medium RSS fetching: `getMediumPosts()`

**src/app/globals.css:**
- Purpose: Global styles and Katman design system
- Contains: Tailwind @theme directives, light/dark mode color definitions, prose/card utilities, dot-grid background

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root layout with navigation and footer scaffolding
- `src/app/page.tsx` - Homepage with hero, skills, social links
- `src/app/blog/page.tsx` - Blog listing (local + Medium combined)
- `src/app/notes/page.tsx` - Notes listing

**Configuration:**
- `tsconfig.json` - TypeScript: `@/*` alias maps to `./src/*`
- `next.config.ts` - Next.js: Image remote patterns for Medium and CDN
- `tailwind.config.ts` - Tailwind: Content glob paths, typography plugin
- `package.json` - Dependencies and scripts

**Core Logic:**
- `src/lib/mdx.ts` - File-system content reading with `fs.readFileSync` and `gray-matter`
- `src/lib/medium.ts` - RSS feed parsing and caching with `rss-parser`
- `src/components/BlogCard.tsx` - Blog post rendering logic with type discrimination

**Testing:**
- No test files present (no test framework configured)

## Naming Conventions

**Files:**
- PascalCase: React components (`Navigation.tsx`, `BlogCard.tsx`, `Footer.tsx`)
- camelCase: Utilities and libraries (`mdx.ts`, `medium.ts`)
- UPPERCASE: Global styles and config (`globals.css`)
- lowercase: Route segments and content files (`blog/`, `notes/`, `content/`)

**Directories:**
- lowercase: Route segments, content directories (`blog/`, `notes/`, `content/`)
- [slug]: Dynamic route parameters
- [locale]: Optional route groups (currently unused but present)

**Variables & Functions:**
- camelCase: Functions (`getContentList`, `getMediumPosts`, `getMediumPost`)
- camelCase: Component props and state variables
- UPPER_SNAKE_CASE: TypeScript enums and constants (rarely used; mostly inline values)

**Types:**
- PascalCase: Interfaces and types (`ContentMeta`, `MediumPost`, `BlogPost`, `LocalPost`, `ExternalPost`)
- Suffix with "Props" for component prop types (`BlogCardProps`, `FadeInProps`)

## Where to Add New Code

**New Blog Post:**
- Create `.mdx` file in `content/blog/`
- Include YAML frontmatter: `title`, `date` (format: `YYYY-MM-DD`), `description`
- Automatically indexed by `getContentList("blog")`; no code changes needed

**New Developer Note:**
- Create `.mdx` file in `content/notes/`
- Include YAML frontmatter: `title`, `date` (format: `DD.MM.YYYY`), `description`
- Automatically indexed by `getContentList("notes")`; no code changes needed

**New Page (e.g., `/about`):**
- Create directory `src/app/about/`
- Add `src/app/about/page.tsx` with `export default function AboutPage() { ... }`
- Optional: Add `layout.tsx` for nested routing, `error.tsx` for error boundary, `loading.tsx` for skeleton
- Import components from `src/components/` and utilities from `src/lib/`

**New Component:**
- Create file in `src/components/ComponentName.tsx`
- Use PascalCase naming
- If client-side interactivity needed, add `"use client"` at top
- Export as named export: `export function ComponentName() { ... }`
- Use in pages via `import { ComponentName } from "@/components/ComponentName"`

**New Utility:**
- Create file in `src/lib/`
- Export async functions for data fetching or pure utilities
- No `"use client"` directive (server-side by default)
- Example pattern from `mdx.ts`:
  ```typescript
  export async function getContentList(type: ContentType): Promise<ContentMeta[]> {
    // Implementation
  }
  ```

**New Animation/Motion Component:**
- Add to `src/components/motion.tsx` or create separate file
- Use Framer Motion primitives (`motion.div`, `useScroll`, `useTransform`, `Variants`)
- Export as named export for reuse in pages
- Follow pattern from existing: accept `children`, `className`, and animation-specific props

## Special Directories

**src/app/[locale]/:**
- Purpose: Internationalization route group (currently unused)
- Generated: No
- Committed: Yes (present but not active)
- Note: Duplicate route structure exists but is shadowed by routes at `src/app/`

**.next/:**
- Purpose: Next.js build output and generated types
- Generated: Yes (auto-generated during `npm run build`)
- Committed: No (in .gitignore)

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes (from package-lock.json)
- Committed: No (in .gitignore)

**public/:**
- Purpose: Static assets served at `/` path
- Generated: No (manually added)
- Committed: Yes

**content/:**
- Purpose: Source content files
- Generated: No (manually authored)
- Committed: Yes

## Content Management Patterns

**YAML Frontmatter Structure:**

Blog posts (`content/blog/*.mdx`):
```yaml
---
title: "Post Title"
date: "2026-03-04"  # Format: YYYY-MM-DD
description: "Brief description"
---
```

Notes (`content/notes/*.mdx`):
```yaml
---
title: "Note Title"
date: "04.03.2026"  # Format: DD.MM.YYYY
description: "Brief description"
---
```

**Markdown Rendering:**
- Local blog/notes: Rendered via `marked` with `markedHighlight` for code blocks
- Medium posts: Sanitized HTML via `isomorphic-dompurify`, rendered raw with `dangerouslySetInnerHTML`
- Prose styling applied via Tailwind utility classes (`.prose`, `.dark:prose-invert`)

## Import Pattern

**Path Alias:**
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Usage: `import { BlogCard } from "@/components/BlogCard"`

---

*Structure analysis: 2026-03-04*
