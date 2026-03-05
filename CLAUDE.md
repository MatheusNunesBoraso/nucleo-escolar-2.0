# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server on http://localhost:3000
yarn build      # Production build (also validates TypeScript)
yarn lint       # Run ESLint
yarn start      # Start production server (requires build first)
```

No test suite is configured yet. TypeScript errors surface during `yarn build`.

## Architecture

**Stack:** Next.js 14 (App Router) · TypeScript · Chakra UI v2 · `react-icons` (MdXxx icons from `react-icons/md`)

**Path alias:** `@/` maps to `src/`.

### Data layer (frontend-only, no backend yet)

All data lives in `src/data/mock.ts` as exported arrays (`escolas`, `turmas`, `alunos`) and helper functions (`getTurmasByEscola`, `getAlunosByTurma`, `getAlunosByEscola`). `dashboardStats` is derived from those arrays at module load time. When the backend is introduced, these exports are the replacement points.

Domain types are in `src/types/index.ts`. The core hierarchy is:

```
Escola (esc-xxx) → Turma (tur-xxx) → Aluno (alu-xxx)
```

IDs use prefixed string format (`esc-001`, `tur-001`, `alu-001`). Foreign keys are stored denormalized — each `Turma` carries both `escolaId` and `escolaNome`; each `Aluno` carries `turmaId`, `turmaNome`, `escolaId`, and `escolaNome`.

### Page structure

`src/app/page.tsx` redirects to `/dashboard`. Every route wraps its content with `AppLayout` (Sidebar + Header):

```tsx
<AppLayout title="..." subtitle="...">
  {/* page content */}
</AppLayout>
```

Pages are all client components (`'use client'`) because they use `useState` for local filter state.

### Chakra UI theme

Custom `brand` color scale (blues, 50–900) is defined in `src/app/providers.tsx` via `extendTheme`. The `Providers` component wraps the app in `src/app/layout.tsx`. Do not import `useEmotionCache` from `@chakra-ui/react` — it does not exist in v2.

### Adding new pages

1. Create `src/app/<route>/page.tsx` as `'use client'`
2. Import `AppLayout` and wrap content
3. Import data from `@/data/mock` and types from `@/types`
4. Add a nav entry in `src/components/layout/Sidebar.tsx` (`navItems` array)
