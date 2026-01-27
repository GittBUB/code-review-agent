---
applyTo: "**/*.py"
---

# Python-Specific Coding Standards

## Testing with pytest

### Test File Structure
All Python test files must:
- Be named `test_*.py` or `*_test.py`
- Be placed in a `tests/` directory or co-located with source files
- Import pytest: `import pytest`

### Fixtures
Use pytest fixtures for setup/teardown and shared test data:

```python
import pytest
from app import app

@pytest.fixture
def client():
    """Flask test client fixture"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def sample_user():
    """Sample user data fixture"""
    return {
        'email': 'test@example.com',
        'password': 'secure_pass123',
        'name': 'Test User'
    }
```

### Testing Flask Endpoints
```python
def test_login_success(client, sample_user):
    """Test successful login"""
    response = client.post('/auth/login', json=sample_user)
    
    assert response.status_code == 200
    assert 'token' in response.json
    assert response.json['user']['email'] == sample_user['email']

def test_login_missing_credentials(client):
    """Test login with missing credentials"""
    response = client.post('/auth/login', json={})
    
    assert response.status_code == 400
    assert 'error' in response.json
```

### Parametrized Tests for Edge Cases
Use `@pytest.mark.parametrize` for testing multiple scenarios:

```python
@pytest.mark.parametrize("input_data,expected_status", [
    ({'email': 'valid@test.com', 'password': 'pass'}, 200),
    ({'email': '', 'password': 'pass'}, 400),
    ({'email': 'valid@test.com', 'password': ''}, 400),
    ({'email': 'invalid', 'password': 'pass'}, 400),
])
def test_login_validation(client, input_data, expected_status):
    response = client.post('/auth/login', json=input_data)
    assert response.status_code == expected_status
```

## Flask Best Practices

### Route Definitions
- Use blueprints for organizing related routes
- Include HTTP methods explicitly: `@app.route('/users', methods=['GET', 'POST'])`
- Add docstrings to all route handlers

### Request Validation
```python
from flask import request, jsonify

@app.route('/users', methods=['POST'])
def create_user():
    """Create a new user"""
    data = request.get_json()
    
    # Validate required fields
    if not data or 'email' not in data:
        return jsonify({'error': 'Email required'}), 400
    
    # Validate email format
    if not is_valid_email(data['email']):
        return jsonify({'error': 'Invalid email format'}), 400
    
    # Process request...
```

### Error Handling
Use Flask error handlers:

```python
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
```

## Python Code Style

### Naming Conventions
- Functions and variables: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private methods: `_leading_underscore`

### Import Order
1. Standard library imports
2. Third-party imports
3. Local application imports

```python
import os
import sys

from flask import Flask, request
import pytest

from app import create_user
from utils import validate_email
```

### Type Hints (Recommended)
```python
from typing import Dict, List, Optional

def get_user(user_id: int) -> Optional[Dict[str, any]]:
    """Retrieve user by ID"""
    pass
```

## Common Python Issues to Flag

### Security
- ❌ Using `eval()` or `exec()` with user input
- ❌ String formatting in SQL queries: `f"SELECT * FROM users WHERE id={id}"`
- ✅ Parameterized queries: `cursor.execute("SELECT * FROM users WHERE id=%s", (id,))`

### Performance
- ❌ Loading entire datasets into memory when streaming is possible
- ❌ Multiple database queries in loops (N+1 problem)
- ✅ Use list comprehensions instead of loops for transformations

### Testing Issues to Flag
- Missing test fixtures when setup code is repeated
- Tests without assertions
- Tests that depend on external services without mocking
- Missing edge case tests (None, empty string, negative numbers, etc.)

## Coverage Requirements
Run tests with coverage: `pytest --cov=. --cov-report=term-missing --cov-report=html`

Required coverage metrics:
- Overall: 80% minimum
- New code: 90% minimum
- Critical paths (auth, payments): 95% minimum
