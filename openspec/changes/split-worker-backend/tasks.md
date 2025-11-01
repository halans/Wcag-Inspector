## 1. Planning & Structure
- [x] 1.1 Design the new repository layout separating `frontend/`, `backend/`, and `packages/shared/` (or equivalent) while documenting migration steps.
- [x] 1.2 Define build targets and tooling updates for each workspace (frontend Vite build, backend Worker build, shared type compilation).

## 2. Backend Worker Implementation
- [x] 2.1 Select a Worker-native framework (Hono, itty-router, or @cloudflare/express) and scaffold a new `backend/worker.ts` entry exposing `export default` with `fetch`.
- [x] 2.2 Port existing route handlers and analysis logic to the worker environment, replacing Node APIs with web/Fetch-compatible alternatives.
- [x] 2.3 Ensure the worker integrates with shared schemas and returns the structured error payloads introduced in `improve-analysis-resilience`.
- [x] 2.4 Configure `wrangler.toml` (or per-environment config) for the new backend, including environment variables and bindings.

## 3. Frontend Adjustments
- [x] 3.1 Move the current React app into `frontend/` and update tooling (Vite config, tsconfig paths, Tailwind config) to match the new structure.
- [x] 3.2 Update client fetch calls or env settings, if necessary, to target the worker `/api` origin via Pages proxy or direct Worker URL.

## 4. Documentation & Specs
- [x] 4.1 Update README and project docs with the new layout, build commands, and deployment workflow (Pages + Worker).
- [x] 4.2 Document the worker deployment process, including Pages routing for `/api/*`.
- [x] 4.3 Capture the architectural changes in OpenSpec specs (frontend/backend capabilities) and validate with `openspec validate`.

## 5. Validation
- [x] 5.1 Add integration tests or smoke scripts to confirm worker responses mimic existing API behaviour.
- [ ] 5.2 Verify Cloudflare deployments succeed (Pages build + Worker publish) with the new structure.
