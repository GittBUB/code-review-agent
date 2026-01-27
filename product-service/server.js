/**
 * Product Service - Express Microservice
 * Handles product catalog operations
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory product storage (for demo purposes)
const products = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 50 },
    { id: 2, name: 'Mouse', price: 29.99, stock: 200 },
    { id: 3, name: 'Keyboard', price: 79.99, stock: 150 }
];
let productIdCounter = 4;

// Middleware: Simple authentication check
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'product-service' });
});

// Get all products
app.get('/products', requireAuth, (req, res) => {
    res.json({ products, count: products.length });
});

// Get product by ID
app.get('/products/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
});

// Create new product
app.post('/products', requireAuth, (req, res) => {
    const { name, price, stock } = req.body;
    
    if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    
    const newProduct = {
        id: productIdCounter++,
        name,
        price: parseFloat(price),
        stock: parseInt(stock)
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product
app.put('/products/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const { name, price, stock } = req.body;
    
    if (name) products[productIndex].name = name;
    if (price !== undefined) products[productIndex].price = parseFloat(price);
    if (stock !== undefined) products[productIndex].stock = parseInt(stock);
    
    res.json(products[productIndex]);
});

// Delete product
app.delete('/products/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    products.splice(productIndex, 1);
    res.status(204).send();
});

// Start server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Product service listening on port ${port}`);
    });
}

module.exports = app;
