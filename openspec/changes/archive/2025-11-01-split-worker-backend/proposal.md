## Why
- Cloudflare Workers cannot run the current Express server bundle because it depends on Node-only APIs and lacks a module-style `fetch` handler.
- The repository now combines client, server, and public assets under `src/`, which complicates deploying the Vite-built frontend independently from a Worker-native backend.
- We need an architecture that keeps the existing React UI unchanged while providing a dedicated Worker implementation that satisfies Cloudflare’s module-worker requirements without Node compatibility hacks.

## What Changes
- Restructure the repository into separate `frontend/` and `backend/` roots while preserving the shared TypeScript packages and build tooling.
- Replace the Express server with a Worker-native router (e.g., Hono) that exposes a `fetch` handler, consumes the existing analysis logic, and avoids Node core modules.
- Add Cloudflare-specific configuration and build scripts so the backend worker can be deployed independently, with `/api/*` routes proxied from Pages to the worker.
- Update documentation and project specs to reflect the new layout and deployment workflow.

## Impact
- Cloudflare deployments stop failing due to Node builtin imports and default export assumptions.
- Frontend builds remain unaffected, using the existing Vite setup under the new `frontend/` root.
- Developers gain a clear separation of concerns: React UI in `frontend/`, Worker backend in `backend/`, and shared domain logic under a common package.
- Sets the foundation for other edge-hosted platforms by decoupling backend implementation details from the UI build.
