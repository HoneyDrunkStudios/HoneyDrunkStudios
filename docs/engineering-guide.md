# Website engineering guide

Read [the repository instructions](../AGENTS.md) and [README](../README.md). All application paths below are relative to `honeydrunk-website/`.

- `package.json` and its lockfile own versions: the current application uses Next.js 16, React 19, TypeScript, Tailwind 4, Three.js and Framer Motion. Do not assume the old Next.js 15 or zero-dependency description.
- Use App Router routes in `app/`, shared navigation in `components/Header.tsx` and `LandingFooter.tsx`, and the static sitemap in `app/sitemap.ts`. Keep route removals consistent across navigation, sitemap and schema metadata.
- Public catalog data lives in `data/schema/`, including `nodes.json`, `modules.json`, `services.json`, `sectors.json` and `signals.json`. Preserve the existing types and stable IDs; the signal-tag validator owns allowed references.
- Use semantic theme tokens from `lib/tokens.ts` and the current `app/globals.css`. Inspect the actual cascade for spacing rather than copying the old claim that all Tailwind typography margins are overridden. Respect reduced motion, keyboard use and readable contrast.
- Keep product status dated and evidence-backed. A catalog description, design or source commit does not establish deployment or founder acceptance. Never copy private planning or prototype material into public signals.
- Run the root AGENTS.md verification commands from the application directory. Validate visible UI/navigation changes in a browser. Inspect current Next.js/configuration behavior before claiming a static export or deployment capability.
