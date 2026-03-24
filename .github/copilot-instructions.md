# Workspace Instructions

## Project Snapshot
- Stack: Next.js App Router + React + TypeScript + ESLint.
- Purpose: personal portfolio with route-driven modes (`/dev`, `/editing`) and a standalone tool at `/riffmaker`.
- Validation available: lint only (no test runner configured).

## Commands Agents Should Use
- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build check: `npm run build`

## Architecture Map
- App shell and providers: [app/layout.tsx](../app/layout.tsx)
- Global styles and theme variables: [app/globals.css](../app/globals.css)
- Main landing composition: [app/page.tsx](../app/page.tsx)
- Section/components library: [app/components](../app/components)
- Global language state: [app/context/LanguageContext.tsx](../app/context/LanguageContext.tsx)
- Global mode state and route coupling: [app/context/ModeContext.tsx](../app/context/ModeContext.tsx)
- Analytics helper: [app/lib/analytics.ts](../app/lib/analytics.ts)

## Conventions To Follow
- Use TypeScript function components and keep props typed explicitly.
- Mark interactive components with `"use client"`.
- Keep bilingual content in `pt/en` objects and read from context (`useLanguage`).
- Respect mode-driven UX (`dev` vs `editor`) from `ModeContext` and pathname mapping.
- Prefer existing styling pattern:
  - shared/global behavior in [app/globals.css](../app/globals.css)
  - component-isolated styling in CSS Modules near the component file
- Use [app/lib/analytics.ts](../app/lib/analytics.ts) `trackEvent()` for meaningful UI interactions.

## Critical Pitfalls
- SSR/hydration safety:
  - Do not read `localStorage` in a `useState` initializer.
  - Initialize with a deterministic default, then sync in `useEffect`.
  - Reference pattern: [app/context/LanguageContext.tsx](../app/context/LanguageContext.tsx).
- ESLint rule behavior:
  - Avoid unnecessary `setState` in `useEffect` (`react-hooks/set-state-in-effect` can flag this).
  - Prefer derived state from props/pathname when possible.
- Theme consistency:
  - Color/scrollbar variables are centralized in [app/globals.css](../app/globals.css).
  - Any mode theme change must keep `:root` and mode body classes aligned.
- Route-mode coupling:
  - If changing `/dev` or `/editing` routes, update pathname-to-mode assumptions in [app/context/ModeContext.tsx](../app/context/ModeContext.tsx).

## High-Value Examples
- i18n + mode content composition: [app/components/Hero.tsx](../app/components/Hero.tsx)
- Mode switch behavior and route guards: [app/components/ModeSwitch.tsx](../app/components/ModeSwitch.tsx)
- Language toggle behavior: [app/components/LanguageSwitch.tsx](../app/components/LanguageSwitch.tsx)
- Observer + analytics instrumentation: [app/components/ScrollObserver.tsx](../app/components/ScrollObserver.tsx)

## Editing Guidance
- Keep edits minimal and local to the feature being changed.
- Preserve naming and structure conventions already used in neighboring components.
- When touching shared styles in [app/globals.css](../app/globals.css), run lint and quickly verify `/`, `/dev`, `/editing`, and `/riffmaker` visually.
- If adding a new route-level feature, prefer composing from `app/components` instead of introducing duplicate section logic.
