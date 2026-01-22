# Copilot Instructions for Pokedex Project

## Project Overview
This is a **Next.js 16 + TypeScript + React 19** project for building a Pokedex application. It uses the App Router pattern (not Pages Router) with Tailwind CSS 4 for styling and ESLint for code quality.

**Tech Stack:**
- Next.js 16.1.4 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## Project Principles

These core principles guide development decisions:

1. **Server Components First** – Use server components by default; add `"use client"` only when browser interactivity is required (forms, state, event handlers)
2. **Code Reuse** – Avoid duplicating code; extract shared logic into utilities or components
3. **Searchable Lists** – Major lists (e.g., Pokemon catalogs) must implement client-side search for better UX
4. **Responsive Design** – All UI must be usable on both desktop and mobile screens using responsive Tailwind classes
5. **Living Document** – These rules evolve; update this file as patterns emerge

## Key Architecture Patterns

### Next.js App Router Structure
- All application code lives in `app/` directory
- `app/layout.tsx` is the root layout wrapping all pages with metadata and font initialization
- `app/page.tsx` is the homepage (currently a template)
- Use file-based routing: create `app/[feature]/page.tsx` for new routes

### Styling Approach
- **Tailwind CSS 4** with postcss integration (`globals.css`)
- CSS Modules not used; inline Tailwind classes only
- Custom CSS variables defined in `globals.css`: `--background`, `--foreground`, `--font-geist-sans`, `--font-geist-mono`
- Dark mode support via `dark:` prefix (using `prefers-color-scheme: dark`)
- Fonts: Geist (sans) and Geist Mono imported from Google Fonts in `layout.tsx`

### TypeScript Configuration
- Strict mode enabled (`strict: true`)
- Path alias `@/*` maps to workspace root (e.g., `@/app`, `@/components`)
- ES2017 target, ESNext modules
- JSX preset: `react-jsx` (automatic runtime)

## Developer Commands

```bash
npm run dev      # Start dev server on localhost:3000 (with hot reload)
npm run build    # Create production build to .next/
npm run start    # Run production build
npm run lint     # Run ESLint with next plugin
```

## Code Conventions

### React Components
- Use functional components with TypeScript
- Export default function at component level (see `app/layout.tsx`, `app/page.tsx`)
- Type children prop as `React.ReactNode` when applicable
- **Use server components by default** – only add `"use client"` when the component needs: state management, event listeners, browser APIs, or interactivity
- Extract reusable logic into utility functions or custom hooks to avoid duplication

### Imports
- Use path aliases: `@/components/...` instead of relative paths
- ESLint auto-fixes unused imports (integrated with next config)
- Group imports: React/Next first, then third-party, then local imports

### Responsive Design
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:` for breakpoints
- Example: `className="text-sm md:text-base lg:text-lg"` scales typography across screen sizes
- Test components on mobile (use browser dev tools) before submission

### Searchable Features
- Major lists must include a search input with real-time client-side filtering
- Use `Array.filter()` with `.toLowerCase()` and `.includes()` for simple search; consider fuzzy matching for complex datasets
- Example pattern: store list state, provide controlled input, filter on each keystroke

### Metadata & SEO
- Define page metadata in `export const metadata: Metadata` (server components only)
- Set title/description in `layout.tsx` and override in page-specific layouts as needed

### File Organization
- Collocate related files: keep components with their styles
- No `styles/` directory; use inline Tailwind classes
- Extract shared utilities into `app/lib/` or `app/utils/` directories

## Integration Points & Patterns

### Dark Mode
- Configured via CSS variables in `:root` and `@media (prefers-color-scheme: dark)`
- Apply dark theme with `dark:` prefix on Tailwind classes (e.g., `dark:bg-black`)

### ESLint Configuration
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Configure additional rules in `eslint.config.mjs` (flat config format)

## Workflow Hints

1. **Creating new pages:** Add `app/feature-name/page.tsx` and optionally `app/feature-name/layout.tsx`
2. **Adding components:** Create in appropriate subdirectory (e.g., `app/components/`) with inline Tailwind styling
3. **API routes:** Use `app/api/route.ts` for Route Handlers (Next.js 13+)
4. **Build issues:** Check `.next/` directory or run `npm run build` to catch TypeScript errors early
5. **Before committing:** Run `npm run lint` to ensure ESLint compliance

## Quick Reference
- **Main entry point:** `app/layout.tsx` → `app/page.tsx`
- **Styling primer:** `app/globals.css` (Tailwind directives)
- **Config files:** `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`
- **Theme variables:** Defined in `app/globals.css` (use `var(--background)` etc.)
