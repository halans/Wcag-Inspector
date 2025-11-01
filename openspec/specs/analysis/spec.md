# analysis Specification

## Purpose
TBD - created by archiving change improve-analysis-resilience. Update Purpose after archive.
## Requirements
### Requirement: Validate Analysis URLs
The accessibility analysis endpoint MUST reject malformed or unsupported URLs before issuing any external requests and provide actionable feedback.

#### Scenario: Reject malformed hostnames
- **GIVEN** a POST `/api/analyze` request with body `{ "url": "not a real site" }`
- **WHEN** the server validates the payload
- **THEN** it does not attempt a fetch
- **AND** responds with HTTP 400 and JSON `{ "code": "INVALID_URL", "message": "Please enter a valid URL (e.g., https://example.com)" }`.

#### Scenario: Block unsupported protocols
- **GIVEN** a POST `/api/analyze` request with body `{ "url": "ftp://files.example.com" }`
- **WHEN** the server validates the payload
- **THEN** it rejects the request with HTTP 400 and the error code `INVALID_URL`
- **AND** the error message explains that only HTTP and HTTPS URLs are supported.

### Requirement: Bound External Fetch Duration
The server MUST abort upstream fetches that exceed 10 seconds and surface a consistent timeout response to the client.

#### Scenario: Abort slow remote responses
- **GIVEN** the analysis service requests a site whose response takes longer than 10 seconds
- **WHEN** the timeout elapses
- **THEN** the server aborts the fetch
- **AND** responds with HTTP 504 and JSON `{ "code": "FETCH_TIMEOUT", "message": "The target site did not respond within 10 seconds. Please try again later." }`.

### Requirement: Structured Analysis Errors
The analysis API MUST standardize error payloads so clients can render contextual guidance.

#### Scenario: Surface upstream fetch failures
- **GIVEN** the origin site returns a network error (e.g., DNS failure)
- **WHEN** the server handles the error
- **THEN** it responds with HTTP 502 and JSON `{ "code": "FETCH_FAILURE", "message": "We could not reach the target site. Check the URL and try again." }`.

#### Scenario: Preserve success payload shape
- **GIVEN** an analysis completes
- **WHEN** the server responds
- **THEN** the payload continues to match `AnalysisResponse`
- **AND** includes no additional error metadata in successful responses.

### Requirement: Automate Error Handling Coverage
The analysis service MUST include automated tests that assert URL validation, fetch timeout, and fetch failure responses.

#### Scenario: Unit test invalid URL rejection
- **GIVEN** the validation layer is exercised in an automated test
- **WHEN** it receives `ftp://example.com`
- **THEN** the test asserts the operation throws or returns the standardized `INVALID_URL` response.

#### Scenario: Integration test timeout fallback
- **GIVEN** an integration or service test that stubs a delayed fetch
- **WHEN** the delay exceeds the configured timeout
- **THEN** the test asserts the API responds with HTTP 504 and the `FETCH_TIMEOUT` payload.

