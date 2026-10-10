# HoneyDrunk Studios website agent instructions

The Next.js application lives in `honeydrunk-website/`. Read [README.md](README.md) and [the website guide](docs/engineering-guide.md). This public site publishes verified, dated studio summaries; it does not own private planning, product acceptance or authorization. Keep private prototypes, personal/day-job material and credentials out of public content. Preserve historical signals as dated history and do not resurrect removed Flow navigation or personal-site promotion.

Read the [shared engineering conventions](https://github.com/HoneyDrunkStudios/HoneyDrunk.Standards/blob/main/HoneyDrunk.Standards/docs/CONVENTIONS.md) and this repository's owning documentation before editing. Apply the parts relevant to this stack; preserve existing public contracts, dependency direction and repository-specific behavior. Verify shared capabilities in current code before reusing them; a catalog entry or scaffold is not an implemented integration.

Work within the selected request. Preserve unrelated changes and use a separate worktree when needed. Review the final diff, use Conventional Commits and ready-for-review PRs with exactly one accurate `Authorship:` line and a `Request:` line; include the authorship in commit trailers. Run meaningful checks for the affected behavior and report the reviewed/tested revision, failures and unrun checks. For documentation-only changes, check links, paths and instruction consistency. Preserve required checks and inspect actual latest-head Sonar new-code findings where analysis applies; do not suppress findings or weaken gates to obtain a pass. Legacy Grid Review is retired; do not restore its workers, queues or bypass labels. A configured replacement reviewer is not evidence of a completed review or enforcing merge check.

## Verification

From `honeydrunk-website/`: `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm run test:signals`, `npm run build`. Verify visible route/navigation changes in a browser and check schema/tag consistency. Building a site is not authorization to deploy it.

## Code Review Rules

Apply the [shared review criteria](https://github.com/HoneyDrunkStudios/HoneyDrunk.Standards/blob/main/HoneyDrunk.Standards/docs/CONVENTIONS.md#code-review) to changed behavior, using the repository boundaries above. Report actionable findings with the failing path, concrete impact and a small corrective action; disclose unavailable evidence. These rules grant no cross-repository access or merge authority.

- Keep the public Next.js site separate from private planning and product acceptance. Check published claims against authorized, dated evidence; do not expose private prototypes, personal context or credentials, or turn historical material into current capability claims.
- Trace changed routes/data rendering for unsafe HTML or URL handling, broken navigation, accessibility and client/server data leakage. Flag unbounded fetching, unnecessary client payloads or rendering work using a concrete affected page.
- Require relevant route/content tests and visual/responsive evidence for changed UI. Preserve the existing framework and shared site patterns; do not add speculative design systems or reintroduce removed navigation from stale history.
