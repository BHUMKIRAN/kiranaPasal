# Copilot / AI-agent instructions — Kirana Pasal

Short, actionable notes to help AI contributors be productive in this repo.

- Project type: Next.js App Router (app/ directory). See [app/layout.tsx](app/layout.tsx#L1-L40) and [app/page.tsx](app/page.tsx#L1-L80).
- Core scripts: `npm run dev` (local dev), `npm run build`, `npm run start`, `npm run lint` — defined in [package.json](package.json#L1-L60).

Architecture & key boundaries
- Frontend-only Next.js UI. Pages live in `app/` (React Server Components + client components where used). Dashboard routes are nested under `app/dashboard/*` with per-role layouts (example: `app/dashboard/admin/layout.tsx`).
- Reusable UI lives under `components/` and `components/ui/` (see `components/ProductCard.jsx` and `components/ui/button.tsx`). Prefer using `components/ui/*` primitives for consistent styling.
- Static/local data: `data/products.jsx` contains sample product data used by product pages (`products/[id]/page.jsx`). When adding product fixtures, mirror its shape.
- Utilities: `lib/utils.ts` contains shared helpers — import via relative or `@/*` path alias (see `tsconfig.json` paths).
- Styling: Tailwind CSS + `app/globals.css`. Follow existing utility classes and `font` setup in `app/layout.tsx`.

Conventions and gotchas
- Mixed TS/JS codebase: many pages/components use `.jsx` while app-level files are `.tsx`. Preserve existing file extensions when editing; convert to TS only if you update related imports and typings.
- Import alias: `@/*` maps to project root per [tsconfig.json](tsconfig.json#L1-L40). Both relative and alias imports are used — prefer `@/` for cross-folder imports.
- No API routes in this repo: `axios` is present in dependencies but there are no `pages/api` routes. Treat backend calls as external; check for environment variables if integrating real APIs.
- Image assets: stored in `public/images/` and referenced via `/images/...` or `public` root paths.

Developer workflows
- Start dev: `npm run dev` (runs `next dev`). If hot reload fails, restart the process — Next 16 + React 19 can require a clean restart after dependency changes.
- Build/preview: `npm run build` then `npm run start` to test production build locally.
- Lint: `npm run lint` runs `eslint`. There are no test scripts in `package.json`.

Patterns and examples
- Product page uses `data/products.jsx` and dynamic route under `products/[id]/page.jsx` — follow that pattern for new simple data-driven pages.
- UI primitives: prefer `components/ui/button.tsx` shape when creating new controls to keep styles consistent.
- Layouts: Global layout is `app/layout.tsx`. Per-section layouts (e.g., dashboard) are placed in the same folder as that section.

When editing or adding code
- Keep changes small and focused; maintain file extension parity.
- If introducing TypeScript types, add them next to the component or in `lib/` and ensure `tsconfig.json` includes the file patterns.
- Run `npm run dev` locally after non-trivial changes to confirm no runtime errors.

Files worth reading first
- [package.json](package.json#L1-L60) — scripts & deps
- [app/layout.tsx](app/layout.tsx#L1-L40) — global layout and fonts
- [app/page.tsx](app/page.tsx#L1-L80) — example home page
- [components/ProductCard.jsx](components/ProductCard.jsx#L1-L200) — representative component
- [components/ui/button.tsx](components/ui/button.tsx#L1-L200) — UI primitives
- [data/products.jsx](data/products.jsx#L1-L200) — sample data

If you need more
- Ask for the API contract or env var names before adding network calls.
- If you want help converting a component from `.jsx` to `.tsx`, request a targeted PR to update imports and types.

— End of file
