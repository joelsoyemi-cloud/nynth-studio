# NYNTH World

Phase 1 React journal, using the approved NYNTH visual reference and sample editorial copy. Newman Yange is the founder; Michael Spyder is an ambassador.

## Run locally
```sh
npm ci
npm run dev
```
Visit http://localhost:3000. Approved static references: /reference/index.html and /reference/admin.html.

## Validate
```sh
npm run lint
npm run typecheck
npm run build
```

Read AGENTS.md and docs/BUILD-PLAN.md. The homepage includes the campaign, people stories, clothing stories, community, culture, original store links and founder content. `/stories` has category filters; `/stories/[slug]` renders typed editorial content on the server with per-story metadata and not-found handling. `src/content/stories.ts` is the seed content source. The dashboard remains at `/reference/admin.html`.

Forms are explicitly labeled demonstrations: no email delivery, publishing, authentication, store synchronization or database is connected. Approved final writing and some photography are still pending. Newman's portrait preserves the reference screenshot framing; a clean original portrait is needed for an uncropped standalone image. Existing external font and image hosts require network access.

Browser verification: start the production server on port 3100 and a headless Chromium browser with remote debugging on port 9224, then run `node scripts/verify-phase1.mjs`. Screenshots and results are written to ignored `artifacts/phase1/`.

## Deploy
The intended GitHub repository is `joelsoyemi-cloud/nynth-studio`. This working clone preserves the existing repository history. The original nynth-world folder is retained separately. Use the separate nynth-studio Vercel project for any future deployment. Keep NYNTH-MOCKUP and nynth-mockup unchanged. Use Node 24. No environment variables are required for Phase 1.
