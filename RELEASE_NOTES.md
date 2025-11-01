# WCAG Inspector Release Notes

## Version 1.5.0 (April 15, 2025)

### Overview
This release focuses on resilience and reliability. We hardened URL handling, added safeguards around external fetches, introduced structured error responses, and improved the client experience with accessible fallbacks and richer guidance when analysis fails.

### Highlights
- **Stricter URL validation** shared by the client and server ensures malformed or unsupported links are rejected with actionable copy.
- **Bounded fetch lifecycle** with a configurable timeout (`ANALYSIS_FETCH_TIMEOUT_MS`) prevents stalled upstream requests and surfaces consistent timeout messaging.
- **Structured API errors** return machine-friendly `code` and human-friendly `message` fields across invalid URL, timeout, and network failure scenarios.
- **Client resilience upgrades** including an application-wide error boundary, inline retry controls, and contextual troubleshooting tips in the results view.
- **Repository reorganization** moves application source into `src/` (client, server, shared, public) for clearer separation from specs and tooling.

### Developer Experience
- Added Vitest + Testing Library harness along with targeted unit and component coverage for URL validation, timeout aborts, and error UI fallbacks.
- Updated npm scripts and Vite config to reflect the new `src/` layout, plus environment docs for the fetch timeout configuration.
- Expanded logging of API responses to aid in diagnosing failure states while keeping payloads concise.

---

## Version 1.0.0 (April 5, 2025)

### Overview
The WCAG Inspector tool is now available for general use. This comprehensive web accessibility analysis tool evaluates websites against WCAG 2.2 standards, providing interactive and educational insights into digital accessibility compliance.

### Features
- **Real-time Website Analysis**: Analyze any website's accessibility with a simple URL input
- **WCAG 2.2 Compliance Checking**: Test against 27 success criteria from the latest WCAG standards
- **Interactive Results Display**: Filter results by WCAG principle (Perceivable, Operable, Understandable, Robust) and status (Passed, Failed)
- **Detailed Criterion Reports**: View explanations, issues found, and recommendations for each criterion
- **Export Functionality**: Save results as PDF or CSV for documentation and sharing
- **Accessible Implementation**: The tool itself is built following WCAG best practices

### Accessibility Enhancements
- ✅ Implemented keyboard navigation support throughout the application
- ✅ Added visible focus indicators for all interactive elements
- ✅ Included "Skip to Content" navigation link for keyboard users
- ✅ Utilized proper ARIA landmarks with descriptive labels
- ✅ Ensured proper color contrast ratios throughout the interface
- ✅ Implemented semantic HTML5 elements for better screen reader support
- ✅ Added proper text alternatives for all non-text content

### Technical Improvements
- ✅ Implemented server-side analysis using Cheerio and Node.js
- ✅ Created comprehensive test suite for success criteria evaluation
- ✅ Built PDF and CSV export functionality with jspdf and file-saver
- ✅ Optimized application for performance with React best practices
- ✅ Implemented responsive design using Tailwind CSS
- ✅ Added dark mode support for improved accessibility
- ✅ Created domain detection for self-testing in bypass blocks test

### UI/UX Improvements
- ✅ Created intuitive tabbed interface for navigating WCAG principles
- ✅ Designed clear visual indicators for pass/fail status
- ✅ Added expanding panel details for deeper criterion information
- ✅ Implemented loading states during analysis
- ✅ Designed informative error states for failed analyses
- ✅ Included educational WCAG information section
- ✅ Added clear result summary section with overall score

### Mobile Responsiveness
- ✅ Optimized layout for all screen sizes
- ✅ Improved filter tabs for mobile viewing
  - ✅ Maintained horizontal layout with responsive spacing
  - ✅ Hidden count badges on small screens to save space
  - ✅ Used shortened principle names on small screens (Perceive, Operate, etc.)
- ✅ Fixed typography issues with proper line height and padding
- ✅ Ensured proper tap target sizes for mobile users
- ✅ Improved responsive padding throughout the interface

### Bug Fixes
- ✅ Fixed character truncation in status badges
- ✅ Corrected bypass blocks test for self-testing scenarios
- ✅ Improved error handling in fetch API calls
- ✅ Fixed contrast calculation algorithm
- ✅ Corrected focus order detection
- ✅ Improved language detection accuracy

### Development Environment
- ✅ Integrated with Cloudflare for easy development and deployment
- ✅ Set up automated deployment pipeline
- ✅ Configured TypeScript for improved type safety
- ✅ Implemented modular component architecture
- ✅ Created comprehensive documentation

## Roadmap for Future Releases
- Authenticated user accounts for saving analysis history
- Batch URL analysis capability
- Detailed reporting with trend analysis
- Custom criterion weighting
- Integration with popular CMS platforms
- Browser extension for quick analysis
- PDF report customization options

## Special Thanks
Special thanks to all contributors and beta testers who helped make this release possible!

---

© 2025 WCAG Inspector
