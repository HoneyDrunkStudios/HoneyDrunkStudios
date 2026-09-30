# Changelog

## Unreleased

- Label Identity/UI entries as observed project progress with formal Grid registration deferred; local dependency cards do not imply ADR acceptance or completed standup.

- Correct Node Contract data to show local Pocket Quests Identity/UI integrations with release limits; remove unsupported MagicShop Pulse/Vault edges and distinguish game custody from shared secret storage.

- Update studio focus and Pocket Quests/Magic Shop detail copy from planning-only status to verified local implementation/first-playable progress. Explain shared UI/themeability and Identity review with confirmed public UI source and passing checks, while distinguishing unpublished npm packages, unproven full login/native validation and unknown game acceptance.

## 2026-09-26

- Refresh the website dependency lockfile to remediate all 29 open GitHub Dependabot alerts observed on this date. Raise the Next.js and ESLint config minimum to 16.3.6 and the PostCSS override to 8.5.28.
- Update transitive packages including sharp 0.35.4, nanoid 3.3.19, fflate 0.6.11/0.8.3, js-yaml 4.3.2 and patched browser tooling.
- Load Next.js ESLint flat configurations directly, fixing the existing circular-configuration loading failure. Existing source lint violations remain visible; no lint rules are suppressed.
