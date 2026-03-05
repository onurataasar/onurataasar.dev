# Coding Conventions

**Analysis Date:** 2026-03-04

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `Navigation.tsx`, `BlogCard.tsx`, `Footer.tsx`)
- Utility/lib files: camelCase (e.g., `mdx.ts`, `medium.ts`, `motion.tsx`)
- Page routes: lowercase with brackets for dynamic segments (e.g., `[slug]`)
- Server components and pages: No prefix
- Client components marked explicitly with `"use client"` directive

**Functions:**
- Named exports use PascalCase for components: `export function Navigation()`
- Utility functions use camelCase: `getContentList()`, `getContentBySlug()`, `getMediumPosts()`
- Hook-like patterns use camelCase: `useScroll()`, `useTransform()`, `useRef()`, `useEffect()`
- Private helper functions use camelCase: `stripHtml()`, `handleScroll()`

**Variables:**
- React state and hooks: camelCase (e.g., `isOpen`, `scrolled`, `pathname`)
- Object properties: camelCase (e.g., `pubDate`, `thumbnail`, `categories`, `metaTitle`)
- Constants: camelCase or UPPER_SNAKE_CASE (e.g., `routes` array, `socials` array, `marked` instance)
- Type parameters: camelCase with context (e.g., `contentType`, `slugParam`)

**Types:**
- Interfaces: PascalCase (e.g., `ContentMeta`, `MediumPost`, `BlogCardProps`, `FadeInProps`)
- Type aliases: PascalCase (e.g., `ContentType`, `BlogPost`)
- Generic params: Single uppercase letter or descriptive (e.g., `ReactNode`, `Props`)

## Code Style

**Formatting:**
- ESLint config: `eslint.config.mjs` using `@eslint/eslintrc` with Next.js compatibility layer
- ESLint extends: `"next/core-web-vitals"` and `"next/typescript"`
- TypeScript strict mode: enabled (`"strict": true` in tsconfig.json)
- No Prettier config found — formatting relies on ESLint rules
- TypeScript target: ES2017, module: esnext

**Linting:**
- Tool: ESLint v9 with Next.js/TypeScript presets
- Key configurations from `eslint.config.mjs`:
  - Uses FlatCompat for backwards compatibility
  - Enforces Next.js core web vitals best practices
  - Enables TypeScript strict type checking
  - Implicitly enforces no unused variables, proper imports, etc.

## Import Organization

**Order:**
1. External packages (React, Next.js, third-party libraries)
   - `import { useState, useEffect } from "react"`
   - `import Link from "next/link"`
   - `import { motion, AnimatePresence } from "framer-motion"`
2. Internal utilities and libraries
   - `import { getContentList } from "@/lib/mdx"`
   - `import { getMediumPosts } from "@/lib/medium"`
3. Internal components
   - `import { Navigation } from "@/components/Navigation"`
   - `import { BlogCard } from "@/components/BlogCard"`
4. Types (sometimes grouped with other imports)
   - `import type { Metadata } from "next"`
   - `import type { Variants } from "framer-motion"`

**Path Aliases:**
- `@/*` maps to `./src/*` (defined in tsconfig.json)
- Always use `@/` prefix for internal imports: `@/lib/`, `@/components/`, etc.
- Avoid relative imports (`../`, `./`) — use path aliases for consistency

## Error Handling

**Patterns:**
- Try-catch blocks used for async operations that may fail (e.g., `getMediumPosts()`, `getContentBySlug()`)
- Catch handlers log to console for debugging: `console.error("Failed to fetch Medium posts:", error)`
- Specific error checks: `if (error instanceof Error && error.message.includes("429"))`
- Silent fallback returns for non-critical failures: `return []` on fetch error
- Next.js `notFound()` used for page-level 404s: `if (!slug) { notFound(); }`
- Error boundaries via `error.tsx` files at route level
- Error UI shows user-friendly message with optional retry button

Example from `src/lib/medium.ts` (lines 58-64):
```typescript
catch (error) {
  console.error("Failed to fetch Medium posts:", error);
  if (error instanceof Error && error.message.includes("429")) {
    throw new Error("Rate limited by Medium. Please try again later.");
  }
  return [];
}
```

Example error boundary from `src/app/blog/local/[slug]/error.tsx` (lines 12-14):
```typescript
useEffect(() => {
  console.error("Blog post error:", error);
}, [error]);
```

## Logging

**Framework:** `console` (built-in, no logging library)

**Patterns:**
- Use `console.error()` for error conditions
- Log errors with context: `console.error("Failed to fetch Medium posts:", error)`
- Log in catch handlers for visibility during development
- Errors include the attempted operation description
- No structured logging or external service integration

Example from `src/lib/medium.ts`:
- `console.error("No articles found")` when feed is empty
- `console.error("Failed to fetch Medium posts:", error)` in catch handler

## Comments

**When to Comment:**
- Comments used for intent and "why" questions, not "what"
- Comments mark decorative or non-obvious styling: `{/* Full-viewport-width scroll background that fades in */}`
- Comments explain animation behavior: `// Track scroll position for background transition`
- Comments mark sections: `{/* Mobile hamburger */}`, `{/* Desktop links */}`
- Comments explain data transformations: `// Skip tracking URLs and get actual image URL`
- Code is generally self-documenting via clear naming

**JSDoc/TSDoc:**
- Not consistently used across codebase
- Function signatures have inline type annotations
- Interfaces are self-documenting via property names and types
- No formal JSDoc blocks observed in source files

Example comment pattern from `src/components/Navigation.tsx` (line 21):
```typescript
// Track scroll position for background transition
useEffect(() => {
  function handleScroll(): void {
    setScrolled(window.scrollY > 60);
  }
  // ...
}, []);
```

## Function Design

**Size:**
- Functions are kept reasonably concise (10-50 lines typical)
- Complex logic (e.g., MDX parsing) delegated to external libraries
- Rendering logic separated from data fetching

**Parameters:**
- Single parameter objects used for components: `{ post }: BlogCardProps`
- Utility functions take explicit parameters: `getContentList(type: ContentType)`
- Destructuring used for props and parameters
- Optional parameters with defaults: `delay = 0`, `direction = "up"`

**Return Values:**
- Async functions return Promises: `Promise<ContentMeta[]>`, `Promise<MediumPost[]>`
- Components return React JSX: `React.JSX.Element` (typed return in Navigation.tsx)
- Utility functions return typed values: explicit return types declared
- Error cases return empty defaults: `[]` for failed fetches
- No implicit undefined returns — explicitly return or throw

Example from `src/lib/mdx.ts` (lines 15-35):
```typescript
export async function getContentList(
  type: ContentType
): Promise<ContentMeta[]> {
  const contentDir = path.join(process.cwd(), "content", type);
  const files = fs.readdirSync(contentDir);

  const contents = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { data } = matter(source);
      return {
        ...data,
        slug: file.replace(".mdx", ""),
        isLocal: !source.includes("medium.com"),
      } as ContentMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return contents;
}
```

## Module Design

**Exports:**
- Named exports preferred for components and utilities: `export function Navigation()`
- Default exports used for page components: `export default function BlogPage()`
- Default exports for error/loading boundaries
- Single responsibility per file (one main export, helpers as named)

**Barrel Files:**
- Not used in this codebase
- Motion utilities exported individually from `src/components/motion.tsx`
- Each component file stands alone

Example from `src/components/motion.tsx` (multiple named exports):
```typescript
export const fadeInUp: Variants = { ... }
export function FadeIn({ ... }) { ... }
export function StaggerContainer({ ... }) { ... }
export function StaggerItem({ ... }) { ... }
export function PageTransition({ ... }) { ... }
export function ParallaxLayer({ ... }) { ... }
export function CardHover({ ... }) { ... }
```

## React & Next.js Patterns

**Server vs. Client Components:**
- Default to Server Components (no prefix)
- Only `Navigation.tsx` marked as `"use client"` for interactivity
- Error boundaries (`error.tsx`) must be client components
- Footer.tsx is client component for social links interactivity

**Async Server Components:**
- Page components are async: `export default async function BlogPage()`
- Directly await data fetching: `const [posts, mediumPosts] = await Promise.all([...])`
- No separate data layer or API routes for content fetching
- Use `getContentBySlug()` and `getMediumPosts()` directly in components

**Metadata & SEO:**
- Implement `generateMetadata()` for dynamic pages: `export async function generateMetadata({ params }: Props)`
- Use `generateStaticParams()` for static generation optimization
- Root layout exports static metadata
- Each page provides title and description

Example from `src/app/blog/local/[slug]/page.tsx` (lines 59-81):
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  try {
    const { meta } = await getContentBySlug("blog", slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Error loading blog post",
    };
  }
}
```

## Tailwind CSS Conventions

**Styling approach:**
- Utility-first with custom CSS variables for theming
- Custom color scheme via CSS variables: `var(--color-bg-base)`, `var(--color-accent)`, `var(--color-text-primary)`, etc.
- Dark mode via `prefers-color-scheme: dark` in globals.css
- Custom spacing and shadows via CSS variables: `shadow-sm`, `shadow-md`
- Typography plugin with `prose` and `prose-invert` classes

**Class naming:**
- Tailwind utilities applied directly in JSX
- Complex variants using template literals: `` `${isActive ? "text-accent" : "text-secondary"}` ``
- Conditional classes via objects not used (string concatenation instead)
- Responsive prefixes: `sm:`, `md:`, etc.

Example from `src/components/Navigation.tsx` (line 82):
```typescript
className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
  isActive
    ? "text-[var(--color-accent)]"
    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
}`}
```

---

*Convention analysis: 2026-03-04*
