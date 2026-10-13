# Phase 1 journal migration

Implemented the journal using the existing stable Next.js, React and TypeScript dependencies. The original `public/reference` files are preserved.

The homepage has the campaign cover, founder-first people stories, clothing-only Behind the Pieces filters, community, culture, original product/store links, founder content, newsletter demonstration and footer. Reusable header, navigation, cards, imagery and footer are shared with `/stories` and `/stories/[slug]`. Ten typed seed stories preserve the approved reference copy and distinguish preview material from final editorial writing.

Article content is server rendered and statically generated. Each story has metadata; unknown slugs return HTTP 404. Article photos retain their full proportions and align with the heading and reading column. Native mobile navigation remains available without JavaScript. The existing decrypted-text component is restricted to the short Stay Above phrase, with reduced-motion support.

## Validation

- `npm run lint`: passed without errors or warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; homepage, index and ten story pages generated.
- Headless Edge at 1440, 768 and 390 pixels: homepage, index, founder, ambassador and campaign articles checked; no horizontal overflow or browser console errors.
- Browser measurements confirmed campaign and ambassador photos use `object-fit: contain`, natural proportions and the same left edge as the heading.
- Archive category filtering, native keyboard mobile menu, dialog opening/Escape, reduced-motion behavior and article reading without JavaScript checked.
- Direct loads of all ten story routes returned HTTP 200; an unknown story returned 404; the preserved dashboard returned 200.
- Screenshots and machine-readable browser results are in ignored `artifacts/phase1/`. The repeatable browser script is `scripts/verify-phase1.mjs`; it expects the production server on port 3100 and Chromium remote debugging on port 9224.
- `npm audit --omit=dev`: zero vulnerabilities. The full audit reports five high-severity development-tooling advisories through the ESLint configuration dependency tree. No automatic dependency upgrades were applied.

## Remaining limitations

Final writing and some editorial photography must be supplied/approved by Newman. His current portrait is framed from the supplied embedded screenshot; an original portrait is needed to display a standalone uncropped image. External fonts and Cloudinary/store images require network access. Forms and dashboard are demonstrations; there is no backend, authentication, email delivery, public publishing or store synchronization. The full motion system remains Phase 2. Browser verification covers Edge, not physical devices or every browser/screen reader.

## Original extracted folder

The extracted folder has no `.git` history. Both `git status --short` and `git remote -v` report that it is not a Git repository. The intended repository is **joelsoyemi-cloud/nynth-studio**. No repository connection, commit, push or deployment was attempted. NYNTH-MOCKUP and nynth-mockup were not touched.


## Repository transfer

Phase 1 was copied into a clean clone of joelsoyemi-cloud/nynth-studio based on starter commit 88ca6b4. The original nynth-world folder remains intact. The remote build plan retains its nynth-studio repository and project references. Git metadata, dependencies, build output, deployment metadata, environment files, TypeScript caches and generated browser artifacts were excluded from the transfer. The starter does not track tsconfig.tsbuildinfo, and there were no tracked source deletions to reproduce.

Transfer validation in nynth-studio: npm ci, npm run lint, npm run typecheck and npm run build all passed before committing. The package lockfile and dependencies are unchanged from the remote starter.
