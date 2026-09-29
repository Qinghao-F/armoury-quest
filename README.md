# Armoury Quest

Interactive React demo for Armoury Quest. It includes the Project Overview, Dashboard, Quiz Setup, Quiz Results and Teams screens, built with Inter, Lucide icons, React Router, React Query, Zod and mock API fixtures.

## Live demo

After GitHub Pages has deployed, open:

`https://qinghao-f.github.io/armoury-quest/`

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

The default data source is local fixtures. Set `VITE_USE_MOCKS=false` to use the API client at `VITE_API_BASE_URL`.

MSW handlers are included in `src/mocks`. To enable browser interception, generate the worker file once after installing dependencies:

```bash
npx msw init public --save
```

Then set `VITE_USE_MSW=true`.

## Routes

- `#/projects/demo` — Project Overview
- `#/dashboard` — Learning Dashboard
- `#/projects/demo/quiz/setup` — Quiz Setup
- `#/projects/demo/quiz/results` — Quiz Results
- `#/teams` — Teams

All routes share the same AppShell, design tokens and component system.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`. The workflow builds the Vite app with the repository base path and publishes `dist` to GitHub Pages.
