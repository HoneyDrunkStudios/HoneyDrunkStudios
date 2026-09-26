# Changelog

## 2026-09-26

- Refresh the website dependency lockfile to remediate all 29 open GitHub Dependabot alerts observed on this date. Raise the Next.js and ESLint config minimum to 16.3.6 and the PostCSS override to 8.5.28.
- Update transitive packages including sharp 0.35.4, nanoid 3.3.19, fflate 0.6.11/0.8.3, js-yaml 4.3.2 and patched browser tooling.
- Load Next.js ESLint flat configurations directly, fixing the existing circular-configuration loading failure. Existing source lint violations remain visible; no lint rules are suppressed.
