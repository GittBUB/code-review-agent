/**
 * Tests for Product Service
 * Demonstrates good testing practices with Jest and Supertest
 */
const request = require('supertest');
const app = require('../server');

describe('Product Service', () => {
    const validAuth = { Authorization: 'Bearer test-token' };
    
    describe('GET /health', () => {
        test('should return healthy status', async () => {
            const response = await request(app).get('/health');
            
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('healthy');
            expect(response.body.service).toBe('product-service');
        });
    });
    
    describe('GET /products', () => {
        test('should return all products with authentication', async () => {
            const response = await request(app)
                .get('/products')
                .set(validAuth);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('products');
            expect(response.body).toHaveProperty('count');
            expect(Array.isArray(response.body.products)).toBe(true);
            expect(response.body.count).toBeGreaterThan(0);
        });
        
        test('should return 401 without authentication', async () => {
            const response = await request(app).get('/products');
            
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Unauthorized');
        });
        
        test('should return 401 with invalid auth format', async () => {
            const response = await request(app)
                .get('/products')
                .set('Authorization', 'InvalidFormat token');
            
            expect(response.status).toBe(401);
        });
    });
    
    describe('GET /products/:id', () => {
        test('should return product by ID', async () => {
            const response = await request(app)
                .get('/products/1')
                .set(validAuth);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('price');
            expect(response.body).toHaveProperty('stock');
        });
        
        test('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .get('/products/9999')
                .set(validAuth);
            
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Product not found');
        });
        
        test('should return 401 without authentication', async () => {
            const response = await request(app).get('/products/1');
            
            expect(response.status).toBe(401);
        });
    });
    
    describe('POST /products', () => {
        test('should create new product with valid data', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 99.99,
                stock: 100
            };
            
            const response = await request(app)
                .post('/products')
                .set(validAuth)
                .send(newProduct);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newProduct.name);
            expect(response.body.price).toBe(newProduct.price);
            expect(response.body.stock).toBe(newProduct.stock);
        });
        
        test('should return 400 with missing name', async () => {
            const invalidProduct = {
                price: 99.99,
                stock: 100
            };
            
            const response = await request(app)
                .post('/products')
                .set(validAuth)
                .send(invalidProduct);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
        
        test('should return 400 with missing price', async () => {
            const invalidProduct = {
                name: 'Test Product',
                stock: 100
            };
            
            const response = await request(app)
                .post('/products')
                .set(validAuth)
                .send(invalidProduct);
            
            expect(response.status).toBe(400);
        });
        
        test('should return 401 without authentication', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 99.99,
                stock: 100
            };
            
            const response = await request(app)
                .post('/products')
                .send(newProduct);
            
            expect(response.status).toBe(401);
        });
    });
    
    describe('PUT /products/:id', () => {
        test('should update existing product', async () => {
            const updates = {
                name: 'Updated Product',
                price: 149.99
            };
            
            const response = await request(app)
                .put('/products/1')
                .set(validAuth)
                .send(updates);
            
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updates.name);
            expect(response.body.price).toBe(updates.price);
        });
        
        test('should return 404 for non-existent product', async () => {
            const updates = { name: 'Updated' };
            
            const response = await request(app)
                .put('/products/9999')
                .set(validAuth)
                .send(updates);
            
            expect(response.status).toBe(404);
        });
        
        test('should return 401 without authentication', async () => {
            const response = await request(app)
                .put('/products/1')
                .send({ name: 'Updated' });
            
            expect(response.status).toBe(401);
        });
    });
    
    describe('DELETE /products/:id', () => {
        test('should delete existing product', async () => {
            const response = await request(app)
                .delete('/products/2')
                .set(validAuth);
            
            expect(response.status).toBe(204);
        });
        
        test('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .delete('/products/9999')
                .set(validAuth);
            
            expect(response.status).toBe(404);
        });
        
        test('should return 401 without authentication', async () => {
            const response = await request(app).delete('/products/1');
            
            expect(response.status).toBe(401);
        });
    });
    
    describe('Edge Cases', () => {
        test.each([
            ['empty name', { name: '', price: 10, stock: 5 }],
            ['missing stock', { name: 'Test', price: 10 }],
            ['string price', { name: 'Test', price: 'invalid', stock: 5 }],
        ])('should handle %s in product creation', async (_, productData) => {
            const response = await request(app)
                .post('/products')
                .set(validAuth)
                .send(productData);
            
            expect(response.status).toBe(400);
        });
    });
});
