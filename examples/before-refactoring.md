# Microservices API Instructions (BEFORE REFACTORING)

This file contains instructions for our microservices but needs reorganization.

## Testing

We use pytest for Python and Jest for JavaScript. All new code needs tests. Coverage should be at least 80%. Use fixtures in pytest. For JavaScript use mocks. Tests should go in tests/ folder for Python or __tests__/ for JavaScript.

Python test files: test_*.py
JavaScript test files: *.test.js

Example Python test:
```python
def test_something(client):
    response = client.get('/endpoint')
    assert response.status_code == 200
```

JavaScript test example:
```javascript
test('should work', async () => {
    const response = await request(app).get('/endpoint');
    expect(response.status).toBe(200);
});
```

## Services

User service is Python Flask on port 5000. Product service is Node.js Express on port 3000.

To run Python:
cd user-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

To run Node:
cd product-service
npm install
npm start

## Security

Don't hardcode secrets. Use environment variables. No SQL injection - use parameterized queries. Escape HTML to prevent XSS. Use bcrypt for passwords not MD5.

## Code Quality

Functions need docstrings in Python and JSDoc in JavaScript. Handle errors properly. Don't leave unused imports. Use try/catch for external calls.

## Performance

Avoid N+1 queries. Don't create memory leaks. Use efficient algorithms.

## Dependencies

Python: Flask==3.0.0, pytest==7.4.3, pytest-cov==4.1.0, requests==2.31.0
Node: express ^4.18.2, jest ^29.7.0, supertest ^6.3.3

## API Standards

All endpoints need auth except /health. Use @require_auth decorator in Python or requireAuth middleware in JavaScript. Return JSON: {'data': {...}} or {'error': 'message'}. Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error.

## Testing Commands

Python: pytest --cov=user-service --cov-report=term-missing
JavaScript: npm test

If pytest fails with import errors, activate venv and run pip install -e .

## More Testing Details

Use parametrize in pytest for multiple test cases:
```python
@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4)
])
def test_multiply(input, expected):
    assert input * 2 == expected
```

For JavaScript, use test.each:
```javascript
test.each([
    [1, 2],
    [2, 4]
])('multiplies %i by 2', (input, expected) => {
    expect(input * 2).toBe(expected);
});
```

## Routes

Python uses Flask decorators: @app.route('/path', methods=['GET', 'POST'])
JavaScript uses Express: app.get('/path', handler)

## Validation

Check all inputs. Email format: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
Phone: 10 digits for US

## More Security

SQL injection example BAD:
query = f"SELECT * FROM users WHERE id = {user_id}"

GOOD:
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))

## Testing Coverage

Aim for 80% overall, 90% for new code, 95% for critical paths like auth and payments.

## Error Handling

Never expose stack traces to users. Log errors with context. Use try/catch for external services.

## Documentation

All functions need documentation explaining purpose, parameters, return values, and error codes.

## Project Structure

user-service/ - Python Flask
product-service/ - Node.js Express
shared/ - shared utilities
.github/copilot-instructions.md - this file

## CI/CD

All tests must pass before merge. Coverage must be ≥80%. No linting errors (flake8 for Python, ESLint for JavaScript).

## Review Priorities

1. Security vulnerabilities (highest)
2. Missing tests
3. Performance issues
4. Error handling
5. Code quality

This is hard to read and maintain! Everything is mixed together with no clear organization.
