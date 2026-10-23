# NYNTH World — working agreement

Read docs/BUILD-PLAN.md before implementation. Joel is directing this project; Newman Yange is the founder/client. Michael Spyder is an ambassador. Do not invent personal biographies, product details or store capabilities.

- This is a NEW Next.js + React + TypeScript project. Never push changes to NYNTH-MOCKUP or deploy over nynth-mockup.
- docs/reference is the preserved approved static mockup. Use it as the visual and content reference. Rebuild with real React components, not iframes, injected HTML or the old DOM scripting.
- Preserve white luxury editorial styling, section order, Newman priority, clothing in Behind the Pieces, people in appropriate profiles/community.
- Keep server-rendered article content and small client animation islands. No experimental/canary packages. Commit the lockfile. Never blindly upgrade dependencies.
- Motion (motion/react) is the default engine. Add GSAP + @gsap/react only for a scoped complex timeline. Never animate the same property with both engines. Do not add AOS, anime.js, locomotive-scroll or multiple scroll engines.
- Respect reduced motion. Render readable text before hydration/without JS. No autoplay audio, scroll hijacking, hover image blur, blocking loaders or flashing text. Keyboard users must access every control.
- Decrypted text is for short brand phrases; never body copy. Reserve image aspect ratios and avoid layout shifts. Use transform/opacity for frequent motion; clean up timers, observers and GSAP contexts.
- The dashboard is currently a demo. Do not claim real authentication, publishing or store sync until implemented and verified. Never expose secrets or rely on hidden links as authorization.
- Verify npm run lint, npm run typecheck, npm run build. Check desktop/mobile, reduced motion, direct route loads, keyboard navigation and console errors for affected flows. Report actual results and limitations.
