## ADDED Requirements

### Requirement: Maintain React Frontend Build
The existing Vite-based React UI MUST continue to build and deploy independently under a `frontend/` root directory.

#### Scenario: Frontend build after repo restructure
- **GIVEN** the repository is reorganized with `frontend/` hosting the React app
- **WHEN** `npm run build` (or the new frontend build script) executes
- **THEN** the client bundle emits to `frontend/dist` (or configured outDir)
- **AND** no backend worker files are required for the build to succeed.

### Requirement: Update Documentation for Frontend Layout
Project documentation MUST reflect the new `frontend/` directory and associated tooling.

#### Scenario: README references new paths
- **GIVEN** a developer reads the README setup instructions
- **WHEN** they look for client code references
- **THEN** paths reference `frontend/` (e.g., `frontend/src/…`) instead of the previous `src/client/…` layout.
