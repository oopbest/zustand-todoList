# Repository Guidelines

## Project Structure & Module Organization
This Next.js app keeps routing and layout logic in `src/app` with `page.tsx` as the root view. Shared UI lives in `src/components`, each file exporting a single PascalCase component. Application state is isolated in `src/store/todo-store.ts`, built with Zustand selectors to keep components lean. Static assets, including favicons, belong in `public`, while global styles extend Tailwind via `src/app/globals.css`.

## Build, Test, and Development Commands
- `npm run dev`: Launches the hot-reloading dev server at http://localhost:3000.
- `npm run build`: Produces the optimized production bundle and type-checks the project.
- `npm run start`: Serves the output from `npm run build`; use it to replicate production locally.
- `npm run lint`: Runs `next lint` with the project ESLint config; resolve warnings before opening a PR.

## Coding Style & Naming Conventions
Write TypeScript using strict mode defaults and two-space indentation. Components, stores, and hooks should be PascalCase (components) or camelCase (functions, Zustand selectors). Favor co-located component styles via Tailwind utility classes in JSX and avoid inline style objects. Use path aliases (`@/components/...`) instead of relative `../../` chains. Run `npm run lint` after significant edits; add contextual comments sparingly when logic is non-obvious.

## Testing Guidelines
Automated tests are not yet wired up; add new tests under `src/__tests__` or alongside the component they cover. Prefer React Testing Library for UI behavior and light Zustand store tests to guard regressions in selectors such as `selectCounts`. Ensure new features ship with meaningful assertions and, when possible, cover empty-state and filter interactions. Manual QA should include toggling, filtering, and clearing tasks in the browser.

## Commit & Pull Request Guidelines
Follow the existing history by writing short, imperative commit subjects (e.g., `Add todo summary footer`). Group related updates per commit to keep diffs reviewable. PRs should summarize the change, link to any tracking issue, list verification steps (`npm run lint`, manual browser check), and include screenshots or clips when UI shifts. Request review once CI is green and outstanding comments are addressed.
