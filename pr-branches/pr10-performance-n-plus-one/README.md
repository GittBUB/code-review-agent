# PR #10: User Lookup Endpoint (JavaScript) - N+1 QUERY PROBLEM

This PR adds endpoint to get users with their orders.

## Changes
- Add GET /users-with-orders endpoint
- Returns users and their order history

## ⚠️ Performance Issue
**N+1 Query Problem** - Makes separate database query for each user's orders.

## Expected Copilot Feedback
Copilot should identify:
1. N+1 query problem (one query for users, then N queries for orders)
2. Performance degradation with large datasets
3. Suggestion to use JOIN or batch queries
