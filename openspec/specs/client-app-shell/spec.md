# client-app-shell Specification

## Purpose
TBD - created by archiving change improve-analysis-resilience. Update Purpose after archive.
## Requirements
### Requirement: Provide Global Error Fallback
The React application shell MUST wrap routed content with an error boundary that renders an accessible fallback instead of crashing.

#### Scenario: Render fallback on runtime error
- **GIVEN** a descendant component throws during render
- **WHEN** the boundary catches the error
- **THEN** the UI displays a landmarked section with a descriptive heading, short apology, and a button to retry or reload
- **AND** focus moves to the fallback so screen readers announce the issue.

### Requirement: Surface Analysis Failures Accessibly
Analysis failures MUST be surfaced with actionable messaging that does not rely solely on toasts.

#### Scenario: Display fetch timeout guidance
- **GIVEN** the analysis request returns an error payload with `code: "FETCH_TIMEOUT"`
- **WHEN** the client renders the results zone
- **THEN** it shows an inline alert region describing the timeout and recommending retrying later
- **AND** the alert exposes a retry affordance without breaking the page layout.

### Requirement: Test Error UI Experiences
Client-side automated tests MUST cover the global error boundary fallback and inline error alert states.

#### Scenario: Component test for boundary fallback
- **GIVEN** a component test renders the app shell with a child that throws
- **WHEN** the error boundary catches the exception
- **THEN** the test asserts the fallback heading, message, and retry action are present.

#### Scenario: Query failure test
- **GIVEN** a test mocks an analysis request that returns `{ code: "FETCH_FAILURE" }`
- **WHEN** the Results section renders
- **THEN** the test asserts the inline alert communicates the failure and exposes a retry affordance.

