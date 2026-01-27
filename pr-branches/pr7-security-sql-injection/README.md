# PR #7: User Search Endpoint (Python) - SQL INJECTION

This PR adds user search functionality with SQL query building.

## Changes
- Add GET /users/search endpoint
- Search by name, email, or both

## ⚠️ Security Issue
**CRITICAL: SQL Injection vulnerability** - This PR intentionally includes string concatenation in SQL queries.

## Expected Copilot Feedback
Copilot should identify:
1. SQL injection vulnerability from string concatenation
2. Need for parameterized queries
3. Example of proper query construction
