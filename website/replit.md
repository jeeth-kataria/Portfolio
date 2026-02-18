# Overview

This is a personal portfolio website for Jeeth Bhavesh Kataria, inspired by the "Bento Grid" aesthetic of landonorris.com. The site features a dark-themed, modular card-based layout showcasing projects, skills, social links, and research work. It's built as a full-stack application with a React frontend and Express backend, though the primary focus is on the frontend presentation layer.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router) — currently two routes: Home (`/`) and a 404 catch-all
- **Styling**: Tailwind CSS with a custom dark-mode-only design system. CSS variables define the color palette (deep blacks, greens/teals for primary accent). The theme is configured in `client/src/index.css` and `tailwind.config.ts`
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives. Components live in `client/src/components/ui/`
- **Animations**: Framer Motion for card entrance animations and hover effects
- **Icons**: Lucide React + react-icons (for brand/tech icons like Python, CUDA, PyTorch)
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace), Fira Code, DM Sans, Architects Daughter — loaded via Google Fonts
- **State Management**: TanStack React Query for server state (configured with sensible defaults in `client/src/lib/queryClient.ts`)
- **Design Pattern**: "Bento Box" grid layout with modular, rounded cards that have hover scale/glow effects

## Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via tsx
- **API Pattern**: All API routes prefixed with `/api`, registered in `server/routes.ts`
- **Storage**: Abstracted via `IStorage` interface in `server/storage.ts`. Currently uses in-memory storage (`MemStorage`), but the interface is designed to be swapped for database-backed storage
- **Dev Server**: Vite dev server is integrated as Express middleware for HMR during development (`server/vite.ts`)
- **Production**: Client is built to `dist/public`, server is bundled via esbuild to `dist/index.cjs`. Static files served by Express in production (`server/static.ts`)

## Database
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` — currently has a `users` table with id (UUID), username, and password
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Validation**: drizzle-zod for generating Zod schemas from Drizzle table definitions
- **Connection**: Requires `DATABASE_URL` environment variable pointing to a PostgreSQL instance

## Project Structure
```
client/               # Frontend React application
  src/
    components/ui/    # shadcn/ui component library
    hooks/            # Custom React hooks (mobile detection, toast)
    lib/              # Utilities (cn helper, query client)
    pages/            # Page components (home, not-found)
server/               # Express backend
  index.ts            # Server entry point
  routes.ts           # API route registration
  storage.ts          # Data access layer (interface + in-memory impl)
  static.ts           # Production static file serving
  vite.ts             # Dev server Vite integration
shared/               # Shared code between client and server
  schema.ts           # Drizzle database schema + Zod types
attached_assets/      # Reference materials and design specs
migrations/           # Drizzle database migrations output
```

## Build System
- **Development**: `npm run dev` — runs tsx with Vite HMR middleware
- **Production Build**: `npm run build` — runs custom `script/build.ts` that builds the Vite client then bundles the server with esbuild
- **Type Checking**: `npm run check` — runs tsc with noEmit
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

# External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable
- **Google Fonts**: Inter, JetBrains Mono, Fira Code, DM Sans, Architects Daughter loaded from fonts.googleapis.com
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`
- **No external APIs currently integrated** — the routes file is a stub ready for API endpoints