## MODIFIED Requirements

### Requirement: Worker-Native API Handler
The backend MUST expose the analysis API as a Cloudflare Worker module with a default export implementing `fetch`.

#### Scenario: Regression tests cover core routes
- **GIVEN** the worker change adds or modifies request handling logic
- **WHEN** backend tests run (`npm run test:backend` or equivalent)
- **THEN** automated tests hit `/api/analyze` GET/POST with valid payloads
- **AND** assert the response body matches `AnalysisResponse`.

### ADDED Requirements

### Requirement: Backend Error Handling Tests
The worker MUST include automated coverage for error paths (validation, network timeout, fetch failures, and CORS).

#### Scenario: Invalid URL coverage
- **GIVEN** a backend test executes `/api/analyze` with an invalid payload
- **WHEN** the worker responds
- **THEN** the test asserts HTTP 400 with `{ code: "INVALID_URL", message: … }`.

#### Scenario: Timeout and fetch failure coverage
- **GIVEN** backend tests stub slow or failing fetches
- **WHEN** the worker code handles the error
- **THEN** tests assert the correct status code (`504`/`502`) and error code.

#### Scenario: CORS behaviour
- **GIVEN** backend tests simulate requests with various origins
- **WHEN** `CORS_ALLOWED_ORIGIN` is configured
- **THEN** the response includes the expected `Access-Control-Allow-Origin` header.
