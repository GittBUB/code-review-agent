/**
 * Utility functions for string and date manipulation
 * CODE QUALITY ISSUE: Contains dead code and unused imports
 */

// CODE QUALITY ISSUE: Unused imports
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const util = require('util');
const os = require('os');

/**
 * Format user name
 */
function formatUserName(firstName, lastName) {
    // CODE QUALITY ISSUE: Unused variable
    const middleName = '';
    const separator = ' ';
    
    if (!firstName || !lastName) {
        return 'Anonymous';
    }
    
    return `${firstName} ${lastName}`;
    
    // CODE QUALITY ISSUE: Unreachable code
    console.log('This will never execute');
    return `${firstName}_${lastName}`;
}

/**
 * Validate and format email
 */
function processEmail(email) {
    // CODE QUALITY ISSUE: Unused variables
    const domain = 'example.com';
    const protocol = 'https';
    const port = 443;
    
    if (!email) {
        return null;
    }
    
    return email.toLowerCase().trim();
    
    // CODE QUALITY ISSUE: Unreachable code
    const validated = email.includes('@');
    if (validated) {
        console.log('Email is valid');
    }
}

/**
 * Calculate discount price
 */
function calculateDiscount(price, discountPercent) {
    // CODE QUALITY ISSUE: Unused variables
    const taxRate = 0.08;
    const shippingCost = 10;
    const currency = 'USD';
    
    if (discountPercent > 100) {
        return 0;
    }
    
    const discount = price * (discountPercent / 100);
    return price - discount;
    
    // CODE QUALITY ISSUE: Unreachable code
    const finalPrice = price - discount + shippingCost;
    const withTax = finalPrice * (1 + taxRate);
    return withTax;
}

/**
 * Format date string
 */
function formatDate(date) {
    // CODE QUALITY ISSUE: Unused variables
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timezone = 'UTC';
    
    if (!date) {
        return null;
    }
    
    return date.toISOString();
}

// CODE QUALITY ISSUE: Unused function
function internalHelper() {
    console.log('This function is never called');
}

// CODE QUALITY ISSUE: Unused function
function debugLogger(message) {
    const timestamp = new Date();
    const formatted = `[${timestamp}] ${message}`;
    // Never used anywhere
}

/**
 * Process user data
 */
function processUserData(user) {
    // CODE QUALITY ISSUE: Unused nested function
    function validateAge(age) {
        return age >= 18 && age <= 120;
    }
    
    // CODE QUALITY ISSUE: Unused nested function
    function validateCountry(country) {
        const validCountries = ['US', 'CA', 'UK', 'AU'];
        return validCountries.includes(country);
    }
    
    if (!user) {
        return null;
    }
    
    return {
        id: user.id,
        name: formatUserName(user.firstName, user.lastName),
        email: processEmail(user.email)
    };
    
    // CODE QUALITY ISSUE: Unreachable validation code
    if (!validateAge(user.age)) {
        throw new Error('Invalid age');
    }
}

/**
 * Calculate shipping cost
 */
function calculateShipping(weight, distance) {
    // CODE QUALITY ISSUE: Unused constants
    const MIN_WEIGHT = 0.1;
    const MAX_WEIGHT = 100;
    const MIN_DISTANCE = 1;
    const MAX_DISTANCE = 5000;
    const EXPRESS_MULTIPLIER = 2.5;
    const OVERNIGHT_MULTIPLIER = 5.0;
    
    if (weight <= 0 || distance <= 0) {
        return 0;
    }
    
    // Simple calculation (not using the constants above)
    const baseCost = 5.00;
    const weightCost = weight * 0.5;
    const distanceCost = distance * 0.1;
    
    return baseCost + weightCost + distanceCost;
}

// CODE QUALITY ISSUE: Unused class
class DataProcessor {
    constructor() {
        this.data = [];
        this.processed = false;
    }
    
    process() {
        this.processed = true;
        return this.data;
    }
    
    reset() {
        this.data = [];
        this.processed = false;
    }
}

// CODE QUALITY ISSUE: Unused constant
const API_VERSION = 'v2';
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;

module.exports = {
    formatUserName,
    processEmail,
    calculateDiscount,
    formatDate,
    processUserData,
    calculateShipping
    // Note: Not exporting unused functions, but they're still in the file
};
