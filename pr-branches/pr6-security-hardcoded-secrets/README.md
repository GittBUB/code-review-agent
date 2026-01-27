# PR #6: Database Configuration (Python) - SECURITY ISSUE

This PR adds database configuration with hardcoded credentials.

## Changes
- Add database connection configuration
- Database utility functions

## ⚠️ Security Issue
**CRITICAL: Contains hardcoded AWS credentials** - This PR intentionally includes a security vulnerability.

## Expected Copilot Feedback
Copilot should identify:
1. Hardcoded AWS access key and secret key (CRITICAL security issue)
2. Credentials should be in environment variables
3. Risk of credential exposure in version control
