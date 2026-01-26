# GitHub Copilot Code Review Agent Demo Plan

## Overview
Create a compelling 30-minute demo showcasing how proper three-layer instruction setup enables Copilot Code Review to consistently identify missing tests across 5 PRs in a microservices API. Pre-seeded Copilot Memory demonstrates progressively more specific, learned feedback patterns across Python (pytest) and JavaScript (Jest), with explicit Memory visualization and backup materials for seamless presentation.

## Implementation Steps

### 1. Build Microservices API Demo Repository
- User service (Python/Flask)
- Product service (Node.js/Express)
- Shared utilities
- `.github/copilot-instructions.md` with:
  - API standards
  - "All endpoints require 80% test coverage with pytest/Jest"
  - Build/test commands
- `.github/instructions/python.instructions.md` with:
  - pytest fixtures
  - Flask test client patterns
  - `test_*.py` naming conventions
- `.github/instructions/javascript.instructions.md` with:
  - Jest mocking patterns
  - `*.test.js` naming conventions
  - React Testing Library examples

### 2. Pre-seed Copilot Memory
Create and merge 2-3 PRs with excellent test coverage:
- Flask POST /auth/login endpoint with pytest integration tests
- Express middleware with Jest unit tests
- Utility function with edge case testing

Train Memory on patterns:
- "API endpoints need request/response testing"
- "Utilities need boundary condition tests"
- "Use fixtures/mocks appropriately"

### 3. Create 15 Pre-built PRs

#### 5 PRs Missing Tests (in order for progressive Memory demonstration):
1. Python POST /users endpoint without tests
2. Python data transformer utility without tests
3. JavaScript React UserForm component without tests
4. JavaScript CSV parser without tests
5. JavaScript email/phone validator without tests

#### 4 PRs with Security Issues:
6. Hardcoded AWS credentials in config
7. SQL injection vulnerability in query builder
8. XSS in Jinja2 template
9. bcrypt replaced with MD5

#### 3 PRs with Performance Issues:
10. N+1 queries in user lookup
11. Event listener memory leak
12. O(n²) sorting algorithm

#### 3 PRs with Code Quality Issues:
13. Dead imports
14. Missing try/catch blocks
15. Undocumented API functions

### 4. Prepare Scenario 1 Presentation Materials
- Live review of all 5 test-missing PRs showing Memory-enhanced progression:
  - PR1: Basic "missing tests" feedback
  - PR2: "Like previous endpoint PRs, add pytest with fixtures"
  - PR3-5: Increasingly specific with exact patterns and file locations
- Capture screenshots/screen recordings of each PR's Code Review comments as backup
- Prepare Memory UI screenshots showing learned patterns stored

### 5. Configure Scenario 2 Automated Fix Workflow
Use PR2 (Python data transformer utility):
- Code Review Agent identifies missing tests with Memory-enhanced suggestion
- Example: "Previous utility functions use pytest with parametrize for edge cases"
- Demonstrate pass-to-Coding-Agent flow
- Agent generates `test_transformer.py` with fixtures, edge cases, assertions
- Creates automated fix PR
- Pre-run entire flow, save logs and PR links

### 6. Set Up Scenario 4 Workspace Agent Demonstration
- Create GitHub issue: "Add pagination to GET /products endpoint with offset/limit params, include Jest integration tests and OpenAPI docs"
- Show delegation to Copilot Workspace agent
- Monitor agent using instructions + Memory to create:
  - Endpoint implementation
  - `products.test.js` with request mocking
  - API documentation following established patterns
- Presenter works on separate task while agent completes work

## Demo Timeline (30 minutes)

| Time | Section | Content |
|------|---------|---------|
| 0-3 min | Introduction | Quick instruction generation demo, explain three-layer setup |
| 3-10 min | Scenario 1 | Review all 5 test-missing PRs, show Memory UI with learned patterns |
| 10-15 min | Scenario 2 | Delegate test generation to Coding Agent, show automated PR |
| 15-20 min | Scenario 3 | VS Code pre-commit review using same instructions |
| 20-27 min | Scenario 4 | Workspace agent completing paginated endpoint with tests |
| 27-30 min | Wrap-up | Reveal instruction files, refactoring guidance, Q&A |

## Key Talking Points

### Customer Pain Points Addressed:
1. **Context Understanding**: Three-layer instructions + Memory provide deep codebase context
2. **Abstraction Levels**: Repository-wide (high-level) + path-specific (detailed) + Memory (learned patterns)
3. **Manual Formatting**: Agent auto-generation eliminates time-consuming markdown reformatting

### Value Propositions:
- Consistent test coverage enforcement across 5 PRs
- Security/performance issue detection
- 80-90% time savings on instruction creation
- Progressive learning through Memory
- Automated fix generation and PR creation

## Technology Stack
- **Backend**: Python 3.x with Flask
- **Frontend/API**: Node.js with Express
- **Testing**: pytest (Python), Jest (JavaScript)
- **Repository Theme**: Generic microservices API

## Backup Strategy
- Pre-captured screenshots of all Code Review comments
- Screen recordings of key workflows
- Memory UI screenshots
- Pre-run logs of agent workflows
- If live reviews exceed 30 seconds, show backup materials while actual review processes

## Success Metrics
Demo proves:
- Instructions make reviews context-aware and team-specific
- Memory enables progressive learning and specificity
- Agents eliminate manual work (instruction generation, test creation, ticket completion)
- Setup investment pays off immediately with consistent, high-quality reviews