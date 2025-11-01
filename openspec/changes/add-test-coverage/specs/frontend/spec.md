## MODIFIED Requirements

### Requirement: Maintain React Frontend Build
The existing Vite-based React UI MUST continue to build and deploy independently under a `frontend/` root directory.

#### Scenario: Frontend tests run with coverage
- **GIVEN** developers run `npm run test` (or `npm run test:frontend`)
- **WHEN** the command completes
- **THEN** coverage reports include key UI modules (results view, error boundary, proxy utilities)
- **AND** the command fails if coverage thresholds fall below the documented values.

## ADDED Requirements

### Requirement: Frontend Interaction Coverage
Critical UI flows (criterion navigation, expansion, and error handling) MUST be protected by automated tests.

#### Scenario: Criteria navigation tests
- **GIVEN** a component test renders the results layout with sample data
- **WHEN** a user triggers “View details” from the criteria summary
- **THEN** the matching card expands and remains open while other cards collapse.

#### Scenario: Error boundary tests
- **GIVEN** a component test triggers runtime errors in the UI
- **WHEN** the error boundary catches them
- **THEN** the fallback UI renders with retry guidance and coverage includes this path.
