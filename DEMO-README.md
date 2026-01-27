# Copilot Code Review Agent Demo Repository

This repository demonstrates GitHub Copilot Code Review Agent capabilities with a focus on test coverage enforcement, security vulnerability detection, and context-aware reviews through proper instruction setup.

## Repository Overview

A microservices API consisting of:
- **User Service**: Python 3.x with Flask (Port 5000)
- **Product Service**: Node.js with Express (Port 3000)
- **Shared Libraries**: Common validation and formatting utilities

## Key Features Demonstrated

### 1. Three-Layer Instruction Setup
- **Repository-wide**: [.github/copilot-instructions.md](.github/copilot-instructions.md) - General standards and requirements
- **Path-specific**: 
  - [.github/instructions/python.instructions.md](.github/instructions/python.instructions.md) - Python/pytest patterns
  - [.github/instructions/javascript.instructions.md](.github/instructions/javascript.instructions.md) - JavaScript/Jest patterns
- **Copilot Memory**: Pre-seeded with test patterns from merged PRs

### 2. Test Coverage Enforcement
15 demo PRs showcasing different scenarios:
- **PRs 1-5**: Missing test coverage (demonstrates consistent detection)
- **PRs 6-9**: Security vulnerabilities
- **PRs 10-12**: Performance issues  
- **PRs 13-15**: Code quality issues

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Setup User Service (Python/Flask)

```bash
cd user-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Service runs on http://localhost:5000

### Setup Product Service (Node.js/Express)

```bash
cd product-service
npm install
npm start
```

Service runs on http://localhost:3000

### Run Tests

**Python Tests:**
```bash
cd user-service
source venv/bin/activate
pytest --cov=. --cov-report=term-missing
```

**JavaScript Tests:**
```bash
cd product-service
npm test
```

## Demo Scenarios

### Scenario 1: Test Coverage Detection (PRs 1-5)

These PRs demonstrate Copilot Code Review Agent consistently identifying missing tests with progressively more specific feedback due to Copilot Memory:

| PR | File | Issue | Expected Feedback |
|----|------|-------|-------------------|
| 1 | `pr1-add-create-user-endpoint/app.py` | POST /users endpoint without tests | Basic "missing tests" feedback |
| 2 | `pr2-add-data-transformer/transformer.py` | Data transformation utility without tests | "Like previous PRs, add pytest with parametrize" |
| 3 | `pr3-add-userform-component/UserForm.jsx` | React component without tests | "Add React Testing Library tests" |
| 4 | `pr4-add-csv-parser/csvParser.js` | CSV parser without tests | "Utility functions need edge case tests" |
| 5 | `pr5-add-validators/validators.js` | Validation functions without tests | Most specific with exact patterns |

### Scenario 2: Security Vulnerability Detection (PRs 6-9)

| PR | Issue | Severity |
|----|-------|----------|
| 6 | Hardcoded AWS credentials | CRITICAL |
| 7 | SQL injection vulnerability | CRITICAL |
| 8 | XSS in template rendering | CRITICAL |
| 9 | Weak cryptography (MD5) | CRITICAL |

### Scenario 3: Performance Issues (PRs 10-12)

| PR | Issue | Impact |
|----|-------|--------|
| 10 | N+1 database queries | Scalability |
| 11 | Memory leak from event listeners | Resource usage |
| 12 | O(n²) sorting algorithm | Response time |

### Scenario 4: Code Quality Issues (PRs 13-15)

| PR | Issue | Category |
|----|-------|----------|
| 13 | Dead code and unused imports | Maintainability |
| 14 | Missing error handling | Reliability |
| 15 | Missing documentation | Developer experience |

## Creating PRs for Demo

### Using GitHub CLI
```bash
# Example: Create PR #1
git checkout -b pr1-add-create-user-endpoint
cp pr-branches/pr1-add-create-user-endpoint/app.py user-service/app.py
git add .
git commit -m "Add POST /users endpoint"
git push origin pr1-add-create-user-endpoint
gh pr create --title "Add POST /users endpoint" --body "$(cat pr-branches/pr1-add-create-user-endpoint/README.md)"
```

### Using GitHub Web UI
1. Navigate to repository on GitHub
2. Click "Pull requests" > "New pull request"
3. Select branch with PR changes
4. Copy description from corresponding README.md in pr-branches/
5. Create pull request

## Demo Script (30 Minutes)

### Minutes 0-3: Introduction
- Show three-layer instruction setup
- Explain test coverage requirements (80% minimum)
- Start Copilot Coding Agent generating instructions in background

### Minutes 3-10: Scenario 1 - Test Coverage
- Review PR #1: Basic feedback on missing tests
- Review PR #2: Memory-enhanced feedback with patterns
- Review PR #3-5: Show progressively more specific feedback
- Highlight consistency across all 5 PRs

### Minutes 10-15: Scenario 2 - Delegate Fix to Coding Agent
- Select PR #2 (data transformer)
- Show Code Review Agent identifying missing tests
- Pass suggestion to Coding Agent
- Show automated test generation and PR creation
- *Have pre-generated version ready as backup*

### Minutes 15-20: Scenario 3 - VS Code Pre-commit Review
- Open UserForm.jsx in VS Code
- Run Copilot Code Review before committing
- Show same context-aware feedback
- Emphasize catching issues early

### Minutes 20-27: Scenario 4 - Workspace Agent
- Show GitHub issue: "Add pagination to /products"
- Delegate to Copilot Workspace agent
- Monitor agent creating endpoint + tests
- Show instructions guiding agent behavior

### Minutes 27-30: Wrap-up & Q&A
- Reveal instruction files
- Discuss refactoring existing instructions
- Calculate ROI for customer's team
- Answer questions

## Instruction File Highlights

### Repository-Wide Standards
- 80% test coverage requirement
- Security critical issues (hardcoded secrets, SQL injection, XSS, weak crypto)
- Performance red flags (N+1 queries, memory leaks)
- Code quality expectations

### Python-Specific
- pytest fixtures and parametrize examples
- Flask test client patterns
- Test file naming: `test_*.py`

### JavaScript-Specific
- Jest + Supertest patterns
- React Testing Library examples
- Test file naming: `*.test.js`

## Copilot Memory Pre-seeding

To pre-seed Memory with test patterns:

1. Ensure tests exist in main branch with good coverage
2. Create and merge 2-3 PRs with excellent test examples
3. Memory will learn patterns like:
   - "API endpoints need integration tests"
   - "Utility functions need edge case tests"
   - "Use fixtures/mocks appropriately"

## Expected Copilot Review Feedback

### Test-Missing PRs
- ✅ Identifies missing test files
- ✅ Suggests specific test types (unit, integration, edge cases)
- ✅ References instruction examples
- ✅ Provides progressively specific feedback with Memory

### Security PRs
- ✅ Flags hardcoded credentials as CRITICAL
- ✅ Identifies SQL injection vulnerabilities
- ✅ Catches XSS vulnerabilities
- ✅ Warns about weak cryptography
- ✅ Suggests secure alternatives

### Performance PRs
- ✅ Identifies N+1 query problems
- ✅ Catches memory leaks
- ✅ Flags inefficient algorithms
- ✅ Suggests optimizations

### Code Quality PRs
- ✅ Identifies dead code and unused imports
- ✅ Flags missing error handling
- ✅ Requests documentation for public APIs

## Tips for Customer Demo

1. **Start background agents early**: Generate instructions while presenting other content
2. **Have backups ready**: Pre-captured screenshots/videos if live reviews are slow
3. **Show Memory UI**: Explicitly display learned patterns to prove context learning
4. **Emphasize consistency**: Highlight same feedback across similar issues
5. **Calculate ROI**: Use customer's PR volume to show time savings

## Troubleshooting

### Python Tests Fail
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`
- Check Python version (3.8+ required)

### Node Tests Fail
- Run `npm install`
- Check Node version (16+ required)
- Clear node_modules and reinstall if issues persist

### Copilot Not Using Instructions
- Verify files are in `.github/` directory
- Check file names match exactly
- Ensure "Use custom instructions when reviewing PRs" is enabled in repo settings

### Memory Not Working
- Verify Copilot Memory is enabled in organization settings
- Check that prior PRs were merged (not just created)
- Allow 24 hours for Memory to process merged PRs

## Additional Resources

- [GitHub Copilot Code Review Agent Documentation](https://docs.github.com/copilot/code-review)
- [Copilot Instructions Best Practices](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Demo Plan Document](demo-plan.md)

## License

MIT License - This is a demonstration repository for training purposes.
