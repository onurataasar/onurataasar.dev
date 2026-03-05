# Technology Stack

**Analysis Date:** 2026-03-04

## Languages

**Primary:**
- TypeScript 5 - All source code in `src/` uses TypeScript with strict mode enabled
- JavaScript - Package configuration and build files

**Secondary:**
- CSS - Tailwind CSS v4 with PostCSS (see Styling section)
- MDX - Content files in `content/blog/` and `content/notes/` use `.mdx` format with YAML frontmatter

## Runtime

**Environment:**
- Node.js - Required for development and build (version specified by Vercel)

**Package Manager:**
- npm - Primary package manager
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.2.8 (App Router) - Web framework with Turbopack for development
- React 19.0.0 - UI library
- React DOM 19.0.0 - DOM rendering

**Content & Markdown:**
- @next/mdx 15.2.0 - MDX support for Next.js
- @mdx-js/react 3.1.0 - MDX React components
- @mdx-js/loader 3.1.0 - MDX loader for webpack/Turbopack
- marked 15.0.7 - Markdown parser for blog posts
- marked-highlight 2.2.1 - Code highlighting in marked
- highlight.js 11.11.1 - Syntax highlighting library
- gray-matter 4.0.3 - YAML frontmatter parser

**Alternative/Unused Markdown:**
- next-mdx-remote 6.0.0 - Alternative MDX rendering (unused, see `src/components/mdx-content.tsx`)
- rehype-pretty-code 0.14.0 - Code formatting plugin (unused)
- shiki 1.29.2 - Code highlighter (unused, highlight.js is used instead)
- remark-gfm 4.0.1 - GitHub Flavored Markdown (included but minimal usage)

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework with `@import` syntax
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind
- @tailwindcss/typography 0.5.16 - Typography plugin for prose styling

**Animations:**
- Framer Motion 12.34.1 - React animation library

**UI Components:**
- react-icons 5.5.0 - Icon library (Font Awesome, Feather, etc.)

**Testing:**
- Not detected - No test framework configured

**Build/Dev:**
- TypeScript 5 - Compiler and type checking
- ESLint 9 - Code linting
- eslint-config-next 15.2.0 - Next.js ESLint configuration
- @eslint/eslintrc 3 - ESLint configuration loader (flat config support)

## Key Dependencies

**Critical:**
- @vercel/analytics 1.5.0 - Analytics tracking on Vercel (injected via `<Analytics />` in `src/app/layout.tsx`)
- isomorphic-dompurify 2.22.0 - HTML sanitization for Medium post content (used in `src/app/blog/medium/[slug]/page.tsx` and `src/components/BlogCard.tsx`)
- rss-parser 3.13.0 - RSS feed parsing for Medium integration

**Infrastructure:**
- medium-article-api 1.0.4 - Medium API package (installed but not directly used in codebase; RSS parsing via rss-parser is the active approach)
- date-fns 4.1.0 - Date utility library
- lodash 4.17.21 - Utility library functions
- next/font/google - Google Fonts integration for Instrument Serif, Instrument Sans, and Fira Code

**Type Definitions:**
- @types/node 20 - Node.js types
- @types/react 19 - React type definitions
- @types/react-dom 19 - React DOM types
- @types/marked 6.0.0 - Marked parser types
- @types/highlight.js 10.1.0 - Highlight.js types
- @types/lodash 4.17.16 - Lodash type definitions

## Configuration

**Environment:**
- No environment variables detected in source code
- Vercel handles deployment configuration (inferred from metadata URL in `src/app/layout.tsx`)
- Analytics automatically configured via `@vercel/analytics/next`

**Build:**
- `next.config.ts` - Next.js configuration file (active, located at root)
- Remote image patterns configured: `https://medium.com` (used for Medium post thumbnails)
- Note: `next.config.mjs` also exists but is inactive; `.ts` version takes precedence

**Development:**
- Turbopack enabled for `npm run dev` (Next.js default for v15+)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `./src/*`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS v4
- `tailwind.config.ts` - Tailwind theme configuration with custom Katman Design System
- `eslint.config.mjs` - ESLint flat config extending Next.js core rules

**Formatting:**
- No Prettier configuration detected - ESLint rules are the linting authority

## Platform Requirements

**Development:**
- Node.js (LTS recommended by Vercel)
- npm (included with Node.js)
- Git (for version control)
- Modern terminal with bash/zsh support

**Production:**
- Vercel (deployment platform)
- Deployment URL: `https://onurataasar.vercel.app` (set in layout metadata)

## Font Loading

**Google Fonts:**
- Instrument Serif (weight: 400) - Serif font for display
- Instrument Sans (default weights) - Sans-serif font for body
- Fira Code (default weights) - Monospace font for code

All fonts use `display: "swap"` to prevent layout shift during font load.

---

*Stack analysis: 2026-03-04*
