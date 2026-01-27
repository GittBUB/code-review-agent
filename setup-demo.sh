#!/bin/bash

# Demo Setup Script for Copilot Code Review Agent
# This script creates all 15 demo PRs and the Scenario 4 issue automatically

set -e  # Exit on error

echo "🚀 Setting up Copilot Code Review Agent Demo"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Get current repo
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Working with repository: $REPO"
echo ""

# Function to create background agent issues
create_background_agent_issues() {
    echo "${BLUE}Creating Background Agent Issues for Demo${NC}"
    echo ""
    
    # Issue 1: Pagination (Primary demo issue)
    local issue1_body=$(cat <<'EOF'
## Requirements
- Add `offset` and `limit` query parameters to GET /products endpoint
- Default: offset=0, limit=20
- Maximum limit: 100 items
- Return total count in response metadata

## Acceptance Criteria
- [ ] Endpoint supports offset/limit parameters
- [ ] Input validation for offset (≥0) and limit (1-100)
- [ ] Jest integration tests with Supertest
- [ ] OpenAPI documentation updated
- [ ] Error handling for invalid parameters

## Related Work
- None

## Context for Reviewers
This enables client-side pagination for the products list endpoint. Following our testing standards (80% coverage) and API conventions (consistent JSON responses).

## Technical Notes
- Modify `product-service/server.js` to add pagination logic
- Create `product-service/__tests__/products.test.js` for integration tests
- Update any API documentation with new query parameters
- Follow Express middleware patterns for input validation
EOF
)
    
    echo "${BLUE}[1/5] Creating pagination issue...${NC}"
    gh issue create \
        --title "Add pagination to GET /products endpoint" \
        --body "$issue1_body" \
        --label "enhancement" \
        --label "demo" \
        --label "workspace-agent" \
        2>/dev/null || echo "${YELLOW}Issue may already exist${NC}"
    echo "${GREEN}✓ Issue 1 created${NC}"
    echo ""
    
    # Issue 2: Authentication Middleware
    local issue2_body=$(cat <<'EOF'
## Requirements
- Add JWT authentication middleware to user-service
- Verify tokens on protected endpoints
- Return 401 Unauthorized for invalid/missing tokens
- Support token refresh mechanism

## Acceptance Criteria
- [ ] `@require_auth` decorator validates JWT tokens
- [ ] Middleware extracts user ID from token payload
- [ ] Returns appropriate error messages for auth failures
- [ ] Pytest tests for middleware with valid/invalid/expired tokens
- [ ] Documentation updated with authentication flow

## Related Work
- None

## Context for Reviewers
Currently using basic auth decorator. Need proper JWT implementation following security best practices from our instructions (no hardcoded secrets, proper error handling).

## Technical Notes
- Modify `user-service/app.py` to add JWT middleware
- Use `PyJWT` library (add to `requirements.txt`)
- Store JWT secret in environment variables (never hardcode)
- Create `user-service/tests/test_auth_middleware.py` with 80% coverage
- Follow Flask middleware patterns from Python instructions
EOF
)
    
    echo "${BLUE}[2/5] Creating authentication middleware issue...${NC}"
    gh issue create \
        --title "Add JWT authentication middleware to user-service" \
        --body "$issue2_body" \
        --label "security" \
        --label "demo" \
        --label "workspace-agent" \
        2>/dev/null || echo "${YELLOW}Issue may already exist${NC}"
    echo "${GREEN}✓ Issue 2 created${NC}"
    echo ""
    
    # Issue 3: Error Logging System
    local issue3_body=$(cat <<'EOF'
## Requirements
- Add structured logging to both user-service and product-service
- Log errors with context (user ID, request ID, timestamp)
- Support different log levels (DEBUG, INFO, WARNING, ERROR)
- Output logs in JSON format for easy parsing

## Acceptance Criteria
- [ ] Python service uses structured logging (structlog or similar)
- [ ] Node.js service uses Winston or Pino for structured logging
- [ ] All errors include request context and stack traces
- [ ] Log levels configurable via environment variables
- [ ] Tests verify logging behavior (mock logger assertions)

## Related Work
- None

## Context for Reviewers
Per our error handling standards: "Log errors with appropriate context for debugging." Need consistent logging across both services.

## Technical Notes
- Add to `user-service`: `structlog` library with JSON formatter
- Add to `product-service`: `winston` or `pino` with JSON transport
- Create `shared/logger_config.py` and `shared/logger_config.js` for reusable configuration
- Update existing error handlers to use new logger
- Add tests: `test_logging.py` and `logging.test.js`
EOF
)
    
    echo "${BLUE}[3/5] Creating logging system issue...${NC}"
    gh issue create \
        --title "Add structured error logging to both services" \
        --body "$issue3_body" \
        --label "enhancement" \
        --label "demo" \
        --label "workspace-agent" \
        2>/dev/null || echo "${YELLOW}Issue may already exist${NC}"
    echo "${GREEN}✓ Issue 3 created${NC}"
    echo ""
    
    # Issue 4: Database Connection Pooling
    local issue4_body=$(cat <<'EOF'
## Requirements
- Implement connection pooling for user-service database connections
- Configure pool size based on expected load
- Add connection health checks
- Handle connection failures gracefully

## Acceptance Criteria
- [ ] Connection pool configured with min/max connections
- [ ] Pool automatically reconnects on connection loss
- [ ] Health check endpoint returns pool status
- [ ] Performance tests show reduced connection overhead
- [ ] Documentation includes pool configuration guidelines

## Related Work
- None

## Context for Reviewers
Performance optimization per our instructions: "Avoid N+1 queries" and improve database efficiency. Connection pooling reduces overhead for multiple requests.

## Technical Notes
- Use `psycopg2.pool` or `SQLAlchemy` connection pooling
- Add to `user-service/database.py` or create `user-service/db_pool.py`
- Configure via environment: `DB_POOL_MIN=5`, `DB_POOL_MAX=20`
- Add health check: `GET /health` returns pool stats
- Tests: Mock database connections, verify pool behavior
- Ensure 80% test coverage
EOF
)
    
    echo "${BLUE}[4/5] Creating database pooling issue...${NC}"
    gh issue create \
        --title "Implement database connection pooling in user-service" \
        --body "$issue4_body" \
        --label "performance" \
        --label "demo" \
        --label "workspace-agent" \
        2>/dev/null || echo "${YELLOW}Issue may already exist${NC}"
    echo "${GREEN}✓ Issue 4 created${NC}"
    echo ""
    
    # Issue 5: API Rate Limiting
    local issue5_body=$(cat <<'EOF'
## Requirements
- Add rate limiting to product-service API endpoints
- Limit: 100 requests per minute per IP address
- Return 429 Too Many Requests when limit exceeded
- Include rate limit headers in responses

## Acceptance Criteria
- [ ] Rate limiting middleware applied to all API routes
- [ ] Response headers include: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
- [ ] 429 status with Retry-After header when limit exceeded
- [ ] Rate limits configurable via environment variables
- [ ] Jest tests verify rate limiting behavior

## Related Work
- None

## Context for Reviewers
Security best practice to prevent abuse. Follows our API endpoint standards: "consistent JSON response format" for error responses.

## Technical Notes
- Use `express-rate-limit` package (add to `package.json`)
- Add middleware in `product-service/server.js`
- Configuration: `RATE_LIMIT_WINDOW_MS=60000`, `RATE_LIMIT_MAX_REQUESTS=100`
- Return consistent error format: `{'error': 'Too many requests'}`
- Tests: `__tests__/rate-limit.test.js` with multiple request scenarios
- Test coverage: 80% minimum
EOF
)
    
    echo "${BLUE}[5/5] Creating rate limiting issue...${NC}"
    gh issue create \
        --title "Add rate limiting to product-service API" \
        --body "$issue5_body" \
        --label "security" \
        --label "enhancement" \
        --label "demo" \
        --label "workspace-agent" \
        2>/dev/null || echo "${YELLOW}Issue may already exist${NC}"
    echo "${GREEN}✓ Issue 5 created${NC}"
    echo ""
    
    echo "${GREEN}✓ All 5 background agent issues created${NC}"
    echo ""
}

# Array of PR configurations
declare -a PRS=(
    "pr1-add-create-user-endpoint:Add POST /users endpoint:user-service/app.py"
    "pr2-add-data-transformer:Add data transformation utility:shared/transformer.py"
    "pr3-add-userform-component:Add UserForm React component:product-service/components/UserForm.jsx"
    "pr4-add-csv-parser:Add CSV parser utility:shared/csvParser.js"
    "pr5-add-validators:Add email and phone validators:shared/validators.js"
    "pr6-security-hardcoded-secrets:Add database configuration:user-service/config.py"
    "pr7-security-sql-injection:Add user search endpoint:user-service/user_search.py"
    "pr8-security-xss:Add product display templates:product-service/product_display.py"
    "pr9-security-weak-crypto:Add password hashing utilities:shared/password_utils.py"
    "pr10-performance-n-plus-one:Add user lookup with orders:product-service/user_orders.js"
    "pr11-performance-memory-leak:Add notification manager:product-service/notification_manager.js"
    "pr12-performance-algorithm:Add product sorting algorithms:shared/product_sorting.py"
    "pr13-quality-dead-code:Add utility functions:shared/utils.js"
    "pr14-quality-error-handling:Add payment processing:user-service/payment.py"
    "pr15-quality-documentation:Add API routes:product-service/routes.js"
)

# Function to create PR
create_pr() {
    local branch_name=$1
    local title=$2
    local file_path=$3
    local pr_number=$(echo $branch_name | sed 's/pr\([0-9]*\).*/\1/')
    
    echo "${BLUE}Creating PR #$pr_number: $title${NC}"
    
    # Create branch
    git checkout -b "$branch_name" main 2>/dev/null || git checkout "$branch_name"
    
    # Copy files from pr-branches
    local source_dir="pr-branches/$branch_name"
    if [ -d "$source_dir" ]; then
        # Get all files except README.md
        find "$source_dir" -type f ! -name "README.md" -exec basename {} \; | while read filename; do
            local target_file=$(dirname "$file_path")/"$filename"
            mkdir -p "$(dirname "$target_file")"
            cp "$source_dir/$filename" "$target_file"
            git add "$target_file"
        done
        
        # Commit changes
        git commit -m "$title" 2>/dev/null || echo "No changes to commit"
        
        # Push branch
        git push -u origin "$branch_name" -f
        
        # Create PR with description from README
        local pr_body=""
        if [ -f "$source_dir/README.md" ]; then
            pr_body=$(cat "$source_dir/README.md")
        fi
        
        gh pr create --title "$title" --body "$pr_body" --base main --head "$branch_name" 2>/dev/null || \
            echo "${YELLOW}PR may already exist${NC}"
        
        echo "${GREEN}✓ PR #$pr_number created${NC}"
    else
        echo "${YELLOW}⚠ Source directory not found: $source_dir${NC}"
    fi
    
    # Return to main
    git checkout main
    echo ""
}

# Confirm before proceeding
echo "${YELLOW}This will create 15 pull requests and 5 background agent issues in $REPO${NC}"
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo "Creating GitHub issues for background agents..."
echo ""

# Create background agent issues first
create_background_agent_issues

echo "Creating pull requests..."
echo ""

# Create each PR
for pr_config in "${PRS[@]}"; do
    IFS=':' read -r branch_name title file_path <<< "$pr_config"
    create_pr "$branch_name" "$title" "$file_path"
done

echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ All PRs and issues created successfully!${NC}"
echo "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Go to $REPO/pulls to review PRs"
echo "2. Go to $REPO/issues to see 5 background agent tickets"
echo "3. Review PRs using Copilot Code Review Agent"
echo "4. Observe consistent feedback on test coverage (PRs 1-5)"
echo "5. Note security vulnerability detection (PRs 6-9)"
echo "6. Check performance issue identification (PRs 10-12)"
echo "7. Review code quality feedback (PRs 13-15)"
echo "8. Delegate background agent issues to Copilot Workspace"
echo ""
echo "Background Agent Issues Created:"
echo "  • Add pagination to GET /products endpoint"
echo "  • Add JWT authentication middleware to user-service"
echo "  • Add structured error logging to both services"
echo "  • Implement database connection pooling in user-service"
echo "  • Add rate limiting to product-service API"
echo ""
echo "Demo ready! 🎉"
