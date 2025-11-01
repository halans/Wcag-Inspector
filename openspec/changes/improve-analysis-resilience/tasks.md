## 1. Implementation
- [x] 1.1 Tighten the shared `analysisRequestSchema` and client form validation to require well-formed URLs with explicit protocol handling and meaningful error copy.
- [x] 1.2 Introduce configurable fetch timeouts and abort handling inside `analyzeWebsite`, mapping timeout and network errors to structured server responses.
- [x] 1.3 Update API route error handling to return standardized JSON payloads (status-aware codes/messages) and ensure the client fetch layer propagates them.
- [x] 1.4 Add a React error boundary component around the app shell with accessible fallback UI and logging hooks.
- [x] 1.5 Improve client-side error surfaces (toasts / inline messaging) so analysis failures show actionable guidance without breaking the layout.
- [x] 1.6 Add automated test coverage (unit, integration, or component) that verifies invalid URL rejection, fetch timeout handling, and error boundary rendering.

## 2. Validation
- [x] 2.1 Exercise timeout, invalid URL, and generic error scenarios through manual or automated tests to confirm graceful handling end-to-end.
- [x] 2.2 Run the test suite and document any remaining gaps before completion.
