## Why
- Current backend worker lacks automated regression coverage, risking untested fetch handling, error scenarios, and CORS behaviour.
- Frontend components provide rich interactions (result filtering, expansion, exports) but few tests guard against regressions, especially after recent layout changes.
- Establishing minimum coverage goals and reliable test harnesses improves confidence during ongoing refactors.

## What Changes
- Introduce a backend test suite (likely Vitest or Miniflare-based) exercising worker routes, error codes, and CORS behaviour.
- Expand frontend tests (unit + component) to cover criterion navigation, expansion, and error boundary flows, with shared utilities to simplify mock analysis responses.
- Configure tooling to collect and report coverage, with thresholds that fail CI when key areas regress.

## Impact
- Developers get fast feedback when backend or frontend changes break critical behaviours.
- Coverage metrics surface gaps and enforce improvement, reducing regression risk for future features.
- Enables more aggressive refactors (e.g., worker optimizations, UI reflows) with safety nets in place.
