# Client-state verification, 14 November 2026

Scope: PR #24, based on `ec0aa9573013ed85e130dad26c205780f8705f87`, plus the synchronous Grid query fix and regression tests in this commit. Dependencies match merged PR #23. These results concern a local production build, not a Cloudflare deployment.

## Regression found and corrected

The first browser pass found a real search-input regression. Inserting `xy` after the `K` in `Kernel` produced `Kxernely`, with the caret jumping to the end after the first edit. Next.js updates `useSearchParams` through a transition, too late to synchronously drive a controlled input. Grid now subscribes to its URL snapshot with `useSyncExternalStore`, notifying synchronously after each history update. This keeps URL-backed filters without a second source of filter state.

After rebuilding, the same edit produced `Kxyernel`, with selection start/end both 3. Backspace removed the character immediately before the caret. Sequential typing retained the whole search string. The three Grid query tests cover synchronous notification, merging successive filters while preserving the selected node, and history/unsubscribe notifications. They supplement the browser checks; they do not simulate a browser caret.

## Observed browser interactions

Tested Chromium against the production Next.js server, with a desktop viewport and a 485 CSS-pixel narrow viewport.

- Grid search `Kernel` produced one node and two modules. Clearing all filters restored 70 nodes and 75 modules and removed the filter query.
- Keyboard activation of Core and Live filters updated the URL and produced six nodes and 29 modules. Navigating to Nodes, then Back/Forward/Back, restored the selected filters and counts.
- Dragging Kernel moved it without navigation. Reload retained its coordinates. Reset Positions restored the original coordinates. Clicking the node without a drag opened its detail route.
- Reset Intro from the node route returned to the boot sequence. Holding Jack In completed the sequence and displayed the homepage.
- Desktop console `run.snake` opened Snake. Restart resumed play; close/reopen created a fresh score-zero game; Escape closed it.
- At narrow width the Grid displayed its intentional desktop-only notice and Return Home action. The mobile navigation menu opened and closed. Snake fit the viewport, showed its four directional buttons, accepted an Up action after Restart, and closed/reopened with score zero.

## Checks and boundaries

- Frozen npm 11.16 installation, strict ESLint with zero warnings, TypeScript no-emit, seven signal tests, six intro preference tests, three Grid query tests and the 39-page production Next.js build passed.
- The final source passed a complete OpenNext Cloudflare build, including the generated Worker bundle.
- No GitHub Actions workflow is checked in. No CI or Sonar pass is inferred from absent checks.
- Reduced-motion preference switching and physical touch-device testing were not exercised. Narrow-width evidence is browser-window resizing, not device emulation. The browser disallows DevTools; no bypass was attempted.
- Console errors inspected during the local pass were browser-extension metadata errors, not a confirmed application error. This is not a claim that every possible application error was exhaustively checked.
