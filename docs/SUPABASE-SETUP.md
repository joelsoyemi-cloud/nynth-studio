# NYNTH publishing integration

## Status
Code prepared for a dedicated Supabase project. No existing database has been changed. Live provisioning, login and end-to-end publishing still require project selection and configuration. Public demo references are now in docs/reference, not hosted under public/. No public page links to the studio.

## Activate
1. Create/select a dedicated NYNTH Supabase project in the organization approved by Joel. Do not reuse devblog, invoice-app2 or Flexed.
2. Apply supabase/migrations/20261019182335_nynth_editorial.sql and run Supabase security advisors.
3. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY on the deployment. These are the project URL and publishable key, never a secret/service-role key. See .env.example.
4. Disable public signups and anonymous sign-ins in Supabase Auth; configure the production Site URL and explicit redirect allowlist. Keep the provider's rate limits and abuse protection enabled.
5. Invite Newman using his verified email in the Supabase dashboard. Set the invite email link to the site's /auth/confirm?token_hash={{ .TokenHash }}&type=invite (replace the site origin with the actual deployed origin). Do not send an invitation until Joel supplies the recipient and authorizes it.
6. As a trusted operator, insert the invited auth user's UUID into public.editorial_members with role 'admin'. Never let the browser assign roles. For contributors use role 'contributor'. Invitees without membership cannot enter the studio.
7. Newman opens the invitation, enters /studio and uses Set or change your password. Subsequent visits use /studio/login. There is no signup link and no admin link on the public journal. Bookmark /studio.
8. Create a test draft with an uploaded image. Check anonymously that neither is readable. Publish, verify homepage/archive/article, then unpublish and verify the story disappears. Test a nonmember and a contributor. Do not call the integration live until these checks pass on the deployed site.

## Data and behavior
- journal_stories stores plain-text paragraphs (React escapes text), metadata, status, author, featured order and an optional private cover path. Admins publish/feature; contributors write their own drafts and submit for approval. No permanent deletion UI in this slice.
- Public pages use a separate anonymous client and published-only queries. They do not use an editor's elevated session. Pages render dynamically to avoid stale publication state. Configured backend failures surface an error rather than falling back to demo data.
- Without environment configuration, existing seed stories remain visible for design review and the login page reports setup pending. Once connected, only database stories appear; an empty database is an empty journal. Existing sample stories are not silently published/imported.
- Private bucket journal-media only accepts JPEG/PNG/WebP, maximum 3 MB. App checks magic bytes. Files are immutable uploads under the editor UUID. Public readers can request signed URLs only for covers referenced by published stories. URLs already issued can work for up to one hour after unpublishing; do not upload confidential content. Orphan uploads need later cleanup.
- Session refresh is scoped to studio/auth routes, with no-store responses. Server actions recheck user and membership, and RLS independently enforces authorization.
- Password login and invitation confirmation implemented. MFA enrollment/enforcement, password recovery UI, audit log, media cleanup, rich text, automatic store synchronization and newsletter delivery are not implemented in this slice.
- Store checkout remains on nynthworld.com. Product API must be confirmed before sync.

## Validation
npm run lint
npm run typecheck
npm run build
node scripts/test-editorial.mjs
The policy test applies the actual migration to local PGlite with minimal auth/storage schema stubs. It verifies SQL and RLS behavior but is not a substitute for live Supabase Auth/Storage integration tests.

## Checks completed on 19 October 2026
- Lint, TypeScript and production build passed.
- Local policy harness passed draft isolation, membership escalation rejection, contributor ownership, upload ownership and publish/unpublish visibility.
- Production HTTP checks passed for homepage, archive, founder article, setup-pending login, studio/edit redirects to login, absence of public studio links and removal of the old public admin demo (404). Missing articles render the not-found page with noindex; Next streaming returns HTTP 200 for this route.
- Live Auth/Storage, email delivery, deployment and browser visual/keyboard verification remain pending. No existing Supabase project was modified.
