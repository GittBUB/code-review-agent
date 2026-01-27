/**
 * WebSocket notification manager
 * PERFORMANCE ISSUE: Memory leak from uncleaned event listeners
 */
const EventEmitter = require('events');

class NotificationManager extends EventEmitter {
    constructor() {
        super();
        this.connections = new Map();
        this.userSubscriptions = new Map();
    }
    
    /**
     * Add new user connection
     * PERFORMANCE ISSUE: Event listeners never removed
     */
    addConnection(userId, socket) {
        // Store socket connection
        this.connections.set(userId, socket);
        
        // PERFORMANCE ISSUE: Adding listeners without cleanup
        socket.on('message', (data) => {
            this.handleMessage(userId, data);
        });
        
        socket.on('subscribe', (channel) => {
            this.subscribe(userId, channel);
        });
        
        // Subscribe to user-specific events
        this.on(`notification:${userId}`, (notification) => {
            socket.send(JSON.stringify(notification));
        });
        
        // PERFORMANCE ISSUE: Connection close handler doesn't clean up listeners
        socket.on('close', () => {
            console.log(`User ${userId} disconnected`);
            this.connections.delete(userId);
            // Missing: Listener cleanup!
        });
    }
    
    /**
     * Subscribe user to channel
     * PERFORMANCE ISSUE: Accumulating listeners
     */
    subscribe(userId, channel) {
        if (!this.userSubscriptions.has(userId)) {
            this.userSubscriptions.set(userId, new Set());
        }
        
        this.userSubscriptions.get(userId).add(channel);
        
        // PERFORMANCE ISSUE: New listener for every subscription
        this.on(`channel:${channel}`, (message) => {
            const socket = this.connections.get(userId);
            if (socket) {
                socket.send(JSON.stringify(message));
            }
        });
        
        // No unsubscribe mechanism!
    }
    
    /**
     * Handle incoming message
     */
    handleMessage(userId, data) {
        // Process message and emit events
        this.emit(`user:${userId}:message`, data);
    }
    
    /**
     * Send notification to user
     */
    sendNotification(userId, notification) {
        this.emit(`notification:${userId}`, notification);
    }
    
    /**
     * Broadcast to channel
     */
    broadcast(channel, message) {
        this.emit(`channel:${channel}`, message);
    }
}

/**
 * Auto-refresh component
 * PERFORMANCE ISSUE: Interval never cleared
 */
class AutoRefreshComponent {
    constructor(refreshInterval = 1000) {
        this.refreshInterval = refreshInterval;
        this.data = null;
    }
    
    start() {
        // PERFORMANCE ISSUE: setInterval without clearInterval
        this.intervalId = setInterval(() => {
            this.fetchData();
        }, this.refreshInterval);
        
        // Also add listeners without cleanup
        window.addEventListener('focus', () => {
            this.fetchData();
        });
        
        window.addEventListener('online', () => {
            this.fetchData();
        });
    }
    
    // Missing stop() method to clear interval and remove listeners!
    
    async fetchData() {
        // Fetch fresh data
        console.log('Fetching data...');
    }
}

/**
 * Real-time dashboard
 * PERFORMANCE ISSUE: Multiple memory leaks
 */
class Dashboard {
    constructor() {
        this.charts = [];
        this.dataStreams = [];
    }
    
    initialize() {
        // PERFORMANCE ISSUE: Creating many setInterval without cleanup
        for (let i = 0; i < 10; i++) {
            setInterval(() => {
                this.updateChart(i);
            }, 5000);
        }
        
        // PERFORMANCE ISSUE: Event listeners never removed
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        window.addEventListener('resize', () => {
            this.resizeCharts();
        });
        
        // PERFORMANCE ISSUE: Creating closures that hold references
        this.charts = Array(100).fill(null).map((_, i) => {
            return {
                id: i,
                data: [],
                update: () => {
                    // Closure captures entire Dashboard instance
                    this.updateChart(i);
                }
            };
        });
    }
    
    // Missing cleanup/destroy method!
    
    updateChart(index) {
        console.log(`Updating chart ${index}`);
    }
    
    handleVisibilityChange() {
        console.log('Visibility changed');
    }
    
    resizeCharts() {
        console.log('Resizing charts');
    }
}

// CORRECT APPROACH (for reference):
class NotificationManagerFixed extends EventEmitter {
    addConnection(userId, socket) {
        this.connections.set(userId, socket);
        
        const messageHandler = (data) => this.handleMessage(userId, data);
        const subscribeHandler = (channel) => this.subscribe(userId, channel);
        const notificationHandler = (notification) => {
            socket.send(JSON.stringify(notification));
        };
        
        socket.on('message', messageHandler);
        socket.on('subscribe', subscribeHandler);
        this.on(`notification:${userId}`, notificationHandler);
        
        // Proper cleanup
        socket.on('close', () => {
            console.log(`User ${userId} disconnected`);
            this.connections.delete(userId);
            
            // Remove all listeners
            socket.removeListener('message', messageHandler);
            socket.removeListener('subscribe', subscribeHandler);
            this.removeListener(`notification:${userId}`, notificationHandler);
            
            // Clean up subscriptions
            const channels = this.userSubscriptions.get(userId) || new Set();
            for (let channel of channels) {
                this.removeAllListeners(`channel:${channel}`);
            }
            this.userSubscriptions.delete(userId);
        });
    }
}

module.exports = { NotificationManager, AutoRefreshComponent, Dashboard };
