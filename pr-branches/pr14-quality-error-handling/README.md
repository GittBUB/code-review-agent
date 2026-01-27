# PR #14: Payment Processing (Python) - MISSING ERROR HANDLING

This PR adds payment processing functionality without proper error handling.

## Changes
- Add process_payment function
- Add refund_payment function
- Integrate with payment gateway

## ⚠️ Code Quality Issue
**Missing Error Handling** - No try/catch blocks for external service calls, unhandled edge cases.

## Expected Copilot Feedback
Copilot should identify:
1. External API calls without try/except blocks
2. No error handling for network failures
3. Missing validation for payment amounts
4. No handling of payment gateway errors
