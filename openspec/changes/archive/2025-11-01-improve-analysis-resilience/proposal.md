## Why
- Current URL validation accepts loosely formatted domains and defers protocol fixes to runtime, leading to inconsistent normalization between client and server.
- Long-running or stalled external requests have no timeout, so the analysis endpoint can hang indefinitely and return opaque errors to users.
- Both the API and React client surface raw error messages that provide little guidance and can crash the UI in unexpected states.

## What Changes
- Strengthen shared URL validation and normalization so invalid/unsupported URLs are rejected up front on both the client form and server schema.
- Add bounded fetch behaviour with configurable timeouts and explicit error categories for validation failures, network failures, and upstream timeouts.
- Return structured API error payloads and surface them through a global React error boundary and query error handling for graceful recovery messaging.
- Introduce automated integration and component tests that exercise invalid URL submissions, fetch timeouts, and UI fallback behaviour to prevent regressions.

## Impact
- Clearer guidance for users when they submit malformed URLs or when remote sites cannot be reached.
- Reduced risk of runaway server resources caused by unbounded external fetches.
- Improved resiliency of the React shell by preventing white-screen failures and providing accessible fallback copy.
- Reliable regression coverage that keeps error handling guarantees intact during future iterations.
