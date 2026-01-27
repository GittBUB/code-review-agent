# PR #9: Password Hashing Utility (Python) - WEAK CRYPTOGRAPHY

This PR adds password hashing functionality.

## Changes
- Add password hashing and verification functions
- Used for user authentication

## ⚠️ Security Issue
**CRITICAL: Weak cryptography** - Uses MD5 instead of bcrypt/scrypt for password hashing.

## Expected Copilot Feedback
Copilot should identify:
1. MD5 is cryptographically broken for password hashing
2. Need to use bcrypt, scrypt, or Argon2
3. Missing salt in hashing process
