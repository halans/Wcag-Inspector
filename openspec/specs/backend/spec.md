# backend Specification

## Purpose
TBD - created by archiving change split-worker-backend. Update Purpose after archive.
## Requirements
### Requirement: Worker-Native API Handler
The backend MUST expose the analysis API as a Cloudflare Worker module with a default export implementing `fetch`.

#### Scenario: Worker responds to analyze POST
- **GIVEN** the worker receives a POST `/api/analyze` request with a valid body
- **WHEN** the request matches the analysis schema
- **THEN** the worker invokes the shared analysis engine
- **AND** returns a JSON response matching `AnalysisResponse`.

#### Scenario: Worker returns structured errors
- **GIVEN** the worker encounters an invalid URL or upstream timeout
- **WHEN** the analysis fails
- **THEN** the response includes a JSON body `{ code: "INVALID_URL" | "FETCH_TIMEOUT" | "FETCH_FAILURE", message: "…" }`
- **AND** appropriate HTTP status codes (400, 504, 502 respectively).

### Requirement: Node-Incompatible APIs Removed
The worker implementation MUST avoid Node-specific modules (`fs`, `http`, etc.) in runtime code.

#### Scenario: Bundle inspection
- **GIVEN** the worker bundle is examined
- **WHEN** searching for `import "node:` references
- **THEN** only whitelisted bindings required by Cloudflare (if any) are present
- **AND** the Worker does not call `app.listen` or rely on Node servers.

### Requirement: Backend Build & Deploy Flow
The project MUST provide build tooling to bundle the worker separately from the frontend.

#### Scenario: Backend build command
- **GIVEN** a developer runs the backend build (e.g., `npm run build:worker`)
- **WHEN** the command completes
- **THEN** an output artifact suitable for `wrangler deploy` exists
- **AND** deployment succeeds without Node compatibility errors.

