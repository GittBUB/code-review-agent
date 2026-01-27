# PR #5: Add Email/Phone Validation (JavaScript) - MISSING TESTS

This PR adds validation functions for email and phone number formats.

## Changes
- Add `validators.js` with email and phone validation functions
- Supports multiple international phone formats
- Provides detailed validation error messages

## ⚠️ Testing Status
**NO TESTS INCLUDED** - This PR intentionally omits tests to demonstrate Copilot Code Review detecting missing validation tests.

## Expected Copilot Feedback
Copilot should identify:
1. Missing Jest unit tests for validation functions
2. Need for parametrized tests with valid/invalid inputs
3. Need for edge case tests (null, undefined, empty string, special characters)
4. Based on Memory: "Validation functions require extensive edge case testing"
