# NYNTH World

React foundation for the NYNTH editorial journal and Newman's studio.

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

Read AGENTS.md and docs/BUILD-PLAN.md. The build plan contains sequential Codex prompts. This starter does not include a production CMS, authentication or live store sync.

## Deploy
Import the new GitHub repository into a NEW Vercel Next.js project named nynth-studio, using main. Keep nynth-mockup unchanged. Use Node 24. No environment variables are required for the foundation.
