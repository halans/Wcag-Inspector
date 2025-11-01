## 1. Planning & Tooling
- [ ] 1.1 Decide on test harness for Cloudflare Worker (e.g., Miniflare with Vitest) and document environment setup.
- [ ] 1.2 Establish coverage thresholds and reporting (e.g., `--coverage` with per-package configs).

## 2. Backend Coverage
- [ ] 2.1 Add tests covering happy-path analyze POST/GET responses using shared fixtures.
- [ ] 2.2 Add tests for error scenarios (invalid URL, fetch timeout, CORS behaviour, structured errors).
- [ ] 2.3 Integrate tests into existing npm scripts/CI (e.g., `npm run test:backend`).

## 3. Frontend Coverage
- [ ] 3.1 Add component tests for criteria navigation/expansion and error flows.
- [ ] 3.2 Add utilities/mocks for shared analysis fixtures reused across tests.
- [ ] 3.3 Update `npm run test` or add `test:frontend` with coverage enabled.

## 4. Documentation & Validation
- [ ] 4.1 Update README or CONTRIBUTING with new test commands and coverage expectations.
- [ ] 4.2 Run coverage suite and ensure thresholds pass before closing the change.
