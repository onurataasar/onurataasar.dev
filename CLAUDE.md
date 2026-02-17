# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and developer notes site for Onur Ata Asar. Built with Next.js 15 (App Router), React 19, TypeScript 5, and Tailwind CSS 4. Site content is primarily in Turkish. Deployed on Vercel.

## Commands

- `npm run dev` — Start dev server (uses Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

No test framework is configured.

## Architecture

### Routing (App Router)

- `/` — Homepage
- `/blog` — Blog listing combining local MDX posts and Medium RSS feed posts
- `/blog/local/[slug]` — Local blog post (from `content/blog/*.mdx`)
- `/blog/medium/[slug]` — Medium blog post (fetched via RSS, HTML sanitized with DOMPurify)
- `/notes` — Developer notes listing
- `/notes/[slug]` — Individual note (from `content/notes/*.mdx`)

### Content System

Content lives in `content/blog/` and `content/notes/` as `.mdx` files with YAML frontmatter (title, date, description). The `src/lib/mdx.ts` module reads files from disk with `fs.readFileSync` and parses frontmatter with `gray-matter`.

Blog posts also pull from Medium RSS feed (`https://medium.com/feed/@onurataasar`) via `src/lib/medium.ts`, cached for 1 hour using Next.js fetch revalidation.

Markdown rendering uses `marked` + `marked-highlight` + `highlight.js` with `dangerouslySetInnerHTML`. Note: there is also an unused `src/components/mdx-content.tsx` component using `next-mdx-remote/rsc` with `rehype-pretty-code`/`shiki`.

### Component Patterns

- Almost everything is a server component. Only `Navigation.tsx` and `error.tsx` boundaries use `"use client"`.
- Each blog detail route has its own `error.tsx` (error boundary) and `loading.tsx` (skeleton).
- Blog detail routes implement `generateMetadata()` for SEO.
- Medium post route uses `generateStaticParams()` for static generation.

### Styling

- Tailwind CSS v4 with `@import "tailwindcss"` syntax and `@theme` directive in `globals.css`
- Dark mode via `prefers-color-scheme: dark` (system preference, no toggle)
- Typography plugin (`@tailwindcss/typography`) with `prose-zinc` / `dark:prose-invert`
- Code highlighting via `highlight.js/styles/github.css` (imported globally)
- Inter font via `next/font/google`

### Path Alias

`@/*` maps to `./src/*` (tsconfig path alias).

## Known Issues

- Two Next.js config files exist (`next.config.ts` and `next.config.mjs`). The `.ts` file is active but lacks `cdn-images-1.medium.com` in remote image patterns and `pageExtensions` that the `.mjs` file has.
- Frontmatter date format is inconsistent: blog uses `"YYYY-MM-DD"`, notes use `"DD.MM.YYYY"`.
- Root layout sets `<html lang="en">` but site content is in Turkish.
