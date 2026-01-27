/**
 * User lookup with orders endpoint
 * Demonstrates N+1 query problem
 */
const express = require('express');
const router = express.Router();

/**
 * Get all users with their order history
 * PERFORMANCE ISSUE: N+1 query problem
 */
router.get('/users-with-orders', async (req, res) => {
    try {
        // First query: Get all users
        const users = await db.query('SELECT * FROM users');
        
        // PERFORMANCE ISSUE: Separate query for EACH user's orders (N+1 problem)
        for (let user of users) {
            // This executes a query for every single user
            user.orders = await db.query(
                'SELECT * FROM orders WHERE user_id = ?',
                [user.id]
            );
            
            // Even worse: nested N+1 for order items
            for (let order of user.orders) {
                order.items = await db.query(
                    'SELECT * FROM order_items WHERE order_id = ?',
                    [order.id]
                );
            }
        }
        
        res.json({ users, count: users.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * Get user's friends and their posts
 * PERFORMANCE ISSUE: Multiple N+1 problems
 */
router.get('/users/:id/friends-posts', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Get user's friends
        const friends = await db.query(
            'SELECT * FROM friendships WHERE user_id = ?',
            [userId]
        );
        
        // PERFORMANCE ISSUE: Query for each friend's details
        for (let friendship of friends) {
            friendship.friend = await db.query(
                'SELECT * FROM users WHERE id = ?',
                [friendship.friend_id]
            );
            
            // PERFORMANCE ISSUE: Query for each friend's posts
            friendship.friend.posts = await db.query(
                'SELECT * FROM posts WHERE user_id = ? LIMIT 10',
                [friendship.friend_id]
            );
            
            // PERFORMANCE ISSUE: Query for likes on each post
            for (let post of friendship.friend.posts) {
                post.likes = await db.query(
                    'SELECT COUNT(*) as count FROM post_likes WHERE post_id = ?',
                    [post.id]
                );
            }
        }
        
        res.json({ friends });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch friends' });
    }
});

/**
 * Get products with categories and reviews
 * PERFORMANCE ISSUE: N+1 queries
 */
async function getProductsWithDetails() {
    // Get all products
    const products = await db.query('SELECT * FROM products');
    
    // PERFORMANCE ISSUE: Query for each product's details
    for (let product of products) {
        // Get category
        product.category = await db.query(
            'SELECT * FROM categories WHERE id = ?',
            [product.category_id]
        );
        
        // Get reviews
        product.reviews = await db.query(
            'SELECT * FROM reviews WHERE product_id = ?',
            [product.id]
        );
        
        // Get average rating
        product.avgRating = await db.query(
            'SELECT AVG(rating) as avg FROM reviews WHERE product_id = ?',
            [product.id]
        );
    }
    
    return products;
}

// CORRECT APPROACH (for reference):
// Use JOIN to get all data in one or few queries
async function getUsersWithOrdersOptimized() {
    const query = `
        SELECT 
            u.*,
            o.id as order_id,
            o.total as order_total,
            o.created_at as order_date
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        ORDER BY u.id, o.created_at DESC
    `;
    
    const results = await db.query(query);
    
    // Group orders by user in application code
    const usersMap = new Map();
    for (let row of results) {
        if (!usersMap.has(row.id)) {
            usersMap.set(row.id, {
                id: row.id,
                name: row.name,
                email: row.email,
                orders: []
            });
        }
        
        if (row.order_id) {
            usersMap.get(row.id).orders.push({
                id: row.order_id,
                total: row.order_total,
                date: row.order_date
            });
        }
    }
    
    return Array.from(usersMap.values());
}

// Mock database
const db = {
    async query(sql, params = []) {
        console.log('Query:', sql, params);
        return [];
    }
};

module.exports = router;
