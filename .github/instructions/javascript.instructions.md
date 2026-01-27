---
applyTo: "**/*.{js,jsx,ts,tsx}"
---

# JavaScript/Node.js Coding Standards

## Testing with Jest

### Test File Structure
All JavaScript test files must:
- Be named `*.test.js`, `*.spec.js`, or placed in `__tests__/` directory
- Import required testing utilities: `const { describe, test, expect } = require('@jest/globals');`

### Test Setup and Teardown
```javascript
describe('Product Service', () => {
    let app;
    
    beforeAll(() => {
        // Setup before all tests
        app = require('./server');
    });
    
    afterAll(() => {
        // Cleanup after all tests
    });
    
    beforeEach(() => {
        // Setup before each test
    });
    
    afterEach(() => {
        // Cleanup after each test
    });
});
```

### Testing Express Endpoints with Supertest
```javascript
const request = require('supertest');
const app = require('./server');

describe('GET /products', () => {
    test('should return all products with auth', async () => {
        const response = await request(app)
            .get('/products')
            .set('Authorization', 'Bearer test-token');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
    });
    
    test('should return 401 without auth', async () => {
        const response = await request(app).get('/products');
        
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    });
});
```

### Mocking Dependencies
```javascript
// Mock external module
jest.mock('./database', () => ({
    query: jest.fn(),
    connect: jest.fn()
}));

const db = require('./database');

test('should handle database errors', async () => {
    // Setup mock to throw error
    db.query.mockRejectedValue(new Error('Connection failed'));
    
    const response = await request(app).get('/products');
    
    expect(response.status).toBe(500);
});
```

### Testing Edge Cases
```javascript
describe('Product validation', () => {
    test.each([
        [{ name: '', price: 10, stock: 5 }, 'Name cannot be empty'],
        [{ name: 'Test', price: -10, stock: 5 }, 'Price must be positive'],
        [{ name: 'Test', price: 10, stock: -5 }, 'Stock cannot be negative'],
        [{ name: 'Test', price: 'invalid', stock: 5 }, 'Price must be a number']
    ])('should reject invalid data: %s', async (data, expectedError) => {
        const response = await request(app)
            .post('/products')
            .set('Authorization', 'Bearer token')
            .send(data);
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain(expectedError);
    });
});
```

## Express Best Practices

### Route Organization
```javascript
// Use Router for modular routes
const express = require('express');
const router = express.Router();

// Group related routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
```

### Middleware
```javascript
// Authentication middleware
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Verify token (simplified)
    const token = authHeader.substring(7);
    // ... token verification logic
    
    next();
}

// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    
    res.status(status).json({ error: message });
}

app.use(errorHandler);
```

### Input Validation
```javascript
function validateProduct(req, res, next) {
    const { name, price, stock } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Valid product name required' });
    }
    
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
        return res.status(400).json({ error: 'Stock must be a non-negative integer' });
    }
    
    next();
}

app.post('/products', requireAuth, validateProduct, createProduct);
```

## JavaScript Code Style

### Naming Conventions
- Functions and variables: `camelCase`
- Classes and Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private methods: `_leadingUnderscore` (convention)

### Async/Await vs Promises
Prefer async/await over promise chains:

```javascript
// ✅ GOOD: Clear async/await
async function getUser(id) {
    try {
        const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return user;
    } catch (error) {
        console.error('Failed to get user:', error);
        throw error;
    }
}

// ❌ AVOID: Promise chains (less readable)
function getUser(id) {
    return db.query('SELECT * FROM users WHERE id = ?', [id])
        .then(user => user)
        .catch(error => {
            console.error('Failed to get user:', error);
            throw error;
        });
}
```

### Error Handling
```javascript
// Always handle async errors
app.get('/products/:id', async (req, res, next) => {
    try {
        const product = await getProduct(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        next(error); // Pass to error handler
    }
});
```

## React Component Testing (if applicable)

### Testing Library Pattern
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

test('should submit form with valid data', async () => {
    const onSubmit = jest.fn();
    render(<UserForm onSubmit={onSubmit} />);
    
    // Arrange: Fill form
    fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'test@example.com' }
    });
    
    // Act: Submit
    fireEvent.click(screen.getByText('Submit'));
    
    // Assert
    expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com'
    });
});
```

## Common JavaScript Issues to Flag

### Security
- ❌ Using `eval()` with user input
- ❌ SQL injection: ``db.query(`SELECT * FROM users WHERE id = ${userId}`)``
- ✅ Parameterized queries: `db.query('SELECT * FROM users WHERE id = ?', [userId])`
- ❌ Exposing sensitive data in error messages

### Performance
- ❌ Synchronous operations blocking event loop
- ❌ Not using streaming for large datasets
- ❌ Memory leaks from unclosed connections or event listeners
- ✅ Use `Promise.all()` for parallel async operations

### Testing Issues to Flag
- Missing error case tests
- Tests without proper assertions (`expect()`)
- Not cleaning up mocks between tests
- Missing async/await in async tests
- Tests that hit external APIs without mocking

## Coverage Requirements
Run tests with coverage: `npm test -- --coverage`

Required coverage metrics:
- Overall: 80% minimum
- New code: 90% minimum
- Critical paths (auth, payments): 95% minimum

### Coverage Reports
```javascript
// package.json
{
  "jest": {
    "collectCoverageFrom": [
      "**/*.js",
      "!node_modules/**",
      "!coverage/**",
      "!**/*.test.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```
