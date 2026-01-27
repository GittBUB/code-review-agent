# PR #3: Add UserForm React Component (JavaScript) - MISSING TESTS

This PR adds a React form component for user registration.

## Changes
- Add `UserForm.jsx` component with email, password, and name fields
- Implements client-side validation
- Handles form submission with API call

## ⚠️ Testing Status
**NO TESTS INCLUDED** - This PR intentionally omits tests to demonstrate Copilot Code Review detecting missing React component tests.

## Expected Copilot Feedback
Copilot should identify:
1. Missing React Testing Library tests
2. Need for tests covering form submission, validation, error handling
3. Missing tests for user interactions (typing, clicking submit)
4. Based on Memory: "React components need tests with @testing-library/react"
