# Project Context

## Purpose
WCAG Inspector is a comprehensive web accessibility analysis tool that evaluates websites against WCAG 2.0, 2.1, and 2.2 standards. The application provides real-time accessibility auditing, detailed compliance reporting, and actionable recommendations to help developers and content creators build more accessible web experiences.

**Key Goals:**
- Automate accessibility testing against 27 core WCAG success criteria
- Provide detailed, actionable feedback for accessibility improvements
- Offer visual scoring and reporting capabilities (PDF/CSV exports)
- Demonstrate accessibility-first development principles
- Educational tool for learning WCAG compliance

## Tech Stack

### Frontend
- **React 18** with TypeScript for component-based UI
- **TailwindCSS** for utility-first styling with custom design system
- **shadcn/ui** components for consistent, accessible UI primitives
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **React Hook Form** with Zod validation for form handling
- **Framer Motion** for animations and transitions
- **Lucide React** for iconography

### Backend
- **Cloudflare Worker** (module format) using Hono for routing
- **TypeScript** for type safety across the entire stack
- **Cheerio** for server-side HTML parsing and DOM analysis
- **Zod** for runtime type validation and schema definition
- **Fetch API** (edge runtime) for HTTP requests and website fetching

### Data Storage
- **In-memory storage** for current implementation (no persistent database)
- **Database-ready architecture** with Drizzle ORM schema definitions for future expansion
- **Storage abstraction layer** to easily switch between memory and database storage

### Build & Development
- **Vite** for fast frontend development and optimized production builds under `frontend/`
- **Esbuild** for bundling the Worker entry in `backend/`
- **Wrangler** for local Worker development and deployment
- **PostCSS** and **Autoprefixer** for CSS processing

### Export & Utilities
- **jsPDF** for PDF report generation
- **File-saver** for client-side file downloads
- **Date-fns** for date manipulation

## Project Conventions

### Code Style
- **TypeScript strict mode** enabled across all files
- **ESNext modules** with top-level await support
- **Consistent naming**: PascalCase for components, camelCase for functions/variables
- **Path aliases**: `@/` for client src, `@shared/` for shared types
- **Component co-location**: Keep related components, hooks, and utils close together
- **Explicit typing**: Prefer explicit types over inference for public APIs

### Architecture Patterns
- **Monorepo structure** with clear separation between client, server, and shared code
- **Domain-driven design**: Accessibility analysis logic separated from web framework concerns
- **API-first approach**: RESTful endpoints with GET/POST support for flexibility
- **Type-safe APIs**: Shared schema definitions between client and server
- **Composition over inheritance**: React components use composition patterns
- **Custom hooks** for reusable stateful logic
- **Centralized error handling** with Zod validation and user-friendly error messages

### File Organization
```
├── frontend/
│   ├── src/           # React application code
│   ├── public/        # Static assets
│   └── vite.config.ts # Frontend build configuration
├── backend/
│   ├── src/worker.ts  # Cloudflare Worker entry point
│   └── wrangler.toml  # Worker deployment configuration
├── packages/
│   └── shared/
│       └── src/       # Shared schemas, errors, and analysis logic
└── openspec/          # Project documentation and specs
```

### Testing Strategy
- **Type safety as first-line defense**: Comprehensive TypeScript coverage
- **Runtime validation**: Zod schemas for API boundaries
- **Manual accessibility testing**: Real-world validation of accessibility features
- **Cross-browser compatibility**: Testing across modern browsers
- **Responsive design validation**: Mobile-first approach testing

### Git Workflow
- **Feature branches**: Create branches for new features and bug fixes
- **Descriptive commits**: Clear, actionable commit messages
- **Pull request reviews**: Code review process for quality assurance
- **Semantic versioning**: Version releases following semver principles

## Domain Context

### WCAG Knowledge Domain
The application implements automated testing for 27 core WCAG success criteria across four principles:
1. **Perceivable**: Content must be presentable in ways users can perceive
2. **Operable**: UI components must be operable by all users
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

### Accessibility Analysis Engine
- **Criterion-based evaluation**: Each WCAG criterion has dedicated analysis functions
- **DOM parsing**: Uses Cheerio to analyze HTML structure, attributes, and content
- **Heuristic-based detection**: Combines multiple signals to detect accessibility issues
- **Self-analysis awareness**: Handles edge cases when analyzing the tool itself
- **Scoring algorithm**: Weighted scoring based on criterion importance and compliance level

### Report Generation
- **Multi-format exports**: PDF and CSV formats for different use cases
- **Detailed findings**: Element-level identification of accessibility issues
- **Actionable recommendations**: Specific guidance for fixing identified problems
- **Visual scoring**: Circular progress indicators and principle-based breakdowns

## Important Constraints

### Technical Constraints
- **Server-side analysis only**: Cannot execute JavaScript or analyze dynamic content
- **Public URL requirement**: Websites must be publicly accessible for analysis
- **Rate limiting considerations**: Respectful crawling of external websites
- **Memory constraints**: Large websites may require processing optimization
- **Port flexibility**: Application must handle port conflicts gracefully
- **Stateless operation**: Currently no persistent storage - each analysis is independent

### Accessibility Constraints
- **WCAG 2.2 compliance**: The tool itself must meet high accessibility standards
- **Keyboard navigation**: Full functionality accessible via keyboard
- **Screen reader compatibility**: Proper semantic markup and ARIA labels
- **Color contrast**: Meets WCAG AA standards for color contrast
- **Focus management**: Clear focus indicators and logical tab order

### Business Constraints
- **Educational use**: Designed for learning and development, not legal compliance certification
- **Open source**: MIT licensed for community contribution and transparency
- **Privacy-focused**: No tracking or data collection beyond necessary functionality

## External Dependencies

### Core Services
- **Node.js runtime**: Requires Node.js 16+ for ES modules and modern features
- **External website access**: Requires internet connectivity to fetch and analyze websites

### Future Database Integration (Optional)
- **PostgreSQL support**: Schema and ORM layer ready for database integration
- **Drizzle ORM**: Type-safe database operations when database is enabled
- **Storage abstraction**: Easy migration from memory to persistent storage

### Optional Integrations
- **Environment variables**: Configurable port and database connections
- **Hosting platforms**: Compatible with Vercel, Netlify, Railway, Heroku
- **CI/CD pipelines**: Standard npm-based build and deployment processes

### Browser Compatibility
- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Accessibility tools**: Compatible with screen readers and browser accessibility features
