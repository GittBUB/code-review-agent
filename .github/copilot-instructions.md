# Microservices API - Copilot Instructions

## High-Level Details
This is a microservices API demonstration project consisting of:
- **User Service**: Python 3.x with Flask framework
- **Product Service**: Node.js with Express framework
- **Project Type**: REST API microservices architecture
- **Purpose**: Demo repository for GitHub Copilot Code Review Agent

## Build Instructions

### User Service (Python/Flask)
```bash
cd user-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Runs on http://localhost:5000
```

### Product Service (Node.js/Express)
```bash
cd product-service
npm install
npm start  # Runs on http://localhost:3000
```

### Testing Requirements
**CRITICAL: All new features require unit tests with 80% code coverage**

- Python tests: Run `pytest --cov=user-service --cov-report=term-missing`
- JavaScript tests: Run `npm test` (Jest with coverage)
- Tests must pass before PR merge
- Test files must be co-located with source files

**Known Testing Issue**: If pytest fails with module import errors, ensure you're in the virtual environment and run `pip install -e .`

## Project Layout

### Directory Structure
```
/
├── user-service/          # Python Flask service
│   ├── app.py            # Main application
│   ├── requirements.txt  # Python dependencies
│   └── tests/            # Test files (test_*.py)
├── product-service/       # Node.js Express service
│   ├── server.js         # Main application
│   ├── package.json      # Dependencies and scripts
│   └── __tests__/        # Test files (*.test.js)
├── shared/               # Shared utilities
└── .github/
    ├── copilot-instructions.md
    └── instructions/     # Path-specific instructions
```

### Key Configuration Files
- `user-service/requirements.txt`: Python dependencies
- `product-service/package.json`: Node.js dependencies and test scripts
- `.github/copilot-instructions.md`: This file
- `.github/instructions/*.instructions.md`: Language-specific guidelines

## Security Requirements

### Critical Security Issues to Flag
1. **Hardcoded Secrets**: Never commit API keys, passwords, tokens, or credentials
2. **SQL Injection**: Always use parameterized queries, never string concatenation
3. **XSS Vulnerabilities**: Sanitize all user input, use proper templating escaping
4. **Weak Cryptography**: Use bcrypt/scrypt for passwords, never MD5/SHA1

### Example - Bad vs Good
```python
# ❌ BAD: SQL Injection vulnerability
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ GOOD: Parameterized query
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

## Code Quality Standards

### API Endpoints
- All endpoints must have error handling with appropriate HTTP status codes
- Input validation required for all POST/PUT requests
- Authentication required for non-public endpoints (use `@require_auth` decorator or `requireAuth` middleware)
- Return consistent JSON response format: `{'data': {...}}` or `{'error': 'message'}`

### Documentation
- All functions/methods must have docstrings (Python) or JSDoc comments (JavaScript)
- API endpoints must document: purpose, parameters, return values, error codes

### Performance
- Avoid N+1 database queries
- Use pagination for list endpoints returning >100 items
- Flag any O(n²) or higher complexity algorithms

### Error Handling
- Never expose stack traces or internal errors to API responses
- Log errors with appropriate context for debugging
- Use try/catch blocks for external service calls

## Testing Standards

### Test Coverage Requirements
- **Minimum 80% code coverage** for all new code
- All API endpoints must have integration tests
- All utility functions must have unit tests with edge cases
- Test files follow naming convention:
  - Python: `test_*.py` or `*_test.py`
  - JavaScript: `*.test.js` or `*.spec.js`

### Test Structure (Arrange-Act-Assert)
```python
def test_user_creation():
    # Arrange: Setup test data
    user_data = {'email': 'test@example.com', 'name': 'Test'}
    
    # Act: Perform action
    response = client.post('/users', json=user_data)
    
    # Assert: Verify results
    assert response.status_code == 201
    assert response.json['email'] == 'test@example.com'
```

### Required Test Types
- **Unit Tests**: Individual functions with mocked dependencies
- **Integration Tests**: API endpoints with test database/fixtures
- **Edge Cases**: Empty inputs, null values, boundary conditions, invalid data

## CI/CD Requirements
- All tests must pass before merge
- Coverage report must show ≥80% for modified files
- No linting errors (flake8 for Python, ESLint for JavaScript)

## PR Dependencies and Related Work

**⚠️ EXPERIMENTAL:** This approach has not been verified to work with Copilot Code Review Agent. It may improve human review coordination but requires testing to confirm Copilot actually uses this information. Test thoroughly before relying on this feature.

### Check PR Descriptions for Dependencies
All PR descriptions should include a "Related Work" section when applicable:

```markdown
## Related Work
- Depends on: #123 (description)
- Blocks: #130 (description)
- Related to: #125 (description)

## Context for Reviewers
[Explanation of how this PR relates to other work]
```

### Review Process for Dependencies
When reviewing a PR:
1. **Check for "Related Work" section** in PR description
2. **Flag missing dependencies**: If PR modifies areas with known active work (see Current Development Context below), verify dependencies are documented
3. **Verify compatibility**: Consider how changes interact with referenced PRs
4. **Check merge order**: Ensure PRs that depend on others can't merge first

### Current Development Context
**Update this section weekly with active work:**

*Currently no active development with cross-PR dependencies.*

<!-- When you have active work, document it like this:
- **PR #123 (migration branch)**: Database schema changes to users table - adds `role` column
- **PR #125 (auth-refactor)**: Moving from JWT to OAuth2 - impacts all `/api/auth/*` endpoints
- **PR #127 (performance)**: Caching layer being added to product service

Known areas requiring coordination:
- Any PR touching `users` table must account for PR #123 schema changes
- Auth-related PRs should coordinate with PR #125 OAuth2 migration
- Product service PRs may conflict with new Redis caching (PR #127)
-->

### What to Flag
- PR modifying database schema without checking for related migration work
- PR changing authentication without referencing active auth refactors
- PR adding features that duplicate work from other open PRs
- Missing "Related Work" section when PR clearly relates to known active development

## Review Priorities
When reviewing pull requests, prioritize feedback on:
1. **Security vulnerabilities** (highest priority)
2. **Missing tests** or inadequate test coverage
3. **Performance issues** (N+1 queries, memory leaks, inefficient algorithms)
4. **Error handling** gaps
5. **Code quality** and documentation

## Dependencies
- Python services require virtual environment activation before running
- Node.js services require `npm install` before first run
- Shared utilities may be used by both services
