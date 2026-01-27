/**
 * Shared validation utilities for Node.js services
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

/**
 * Sanitize user input string
 * @param {string} inputStr - Input string to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized string
 */
function sanitizeString(inputStr, maxLength = 255) {
    if (!inputStr) {
        return '';
    }
    
    // Remove potentially dangerous characters
    const sanitized = String(inputStr).replace(/[<>"'&]/g, '');
    
    // Trim to max length
    return sanitized.substring(0, maxLength).trim();
}

/**
 * Validate that a value is a positive number
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of field for error message
 * @returns {number} Validated number
 * @throws {Error} If value is not a positive number
 */
function validatePositiveNumber(value, fieldName = 'value') {
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        throw new Error(`${fieldName} must be a valid number`);
    }
    
    if (num < 0) {
        throw new Error(`${fieldName} must be positive`);
    }
    
    return num;
}

/**
 * Validate pagination parameters
 * @param {number} offset - Offset value
 * @param {number} limit - Limit value
 * @returns {object} Validated pagination object
 */
function validatePagination(offset = 0, limit = 10) {
    const validOffset = Math.max(0, parseInt(offset) || 0);
    const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
    
    return { offset: validOffset, limit: validLimit };
}

module.exports = {
    isValidEmail,
    sanitizeString,
    validatePositiveNumber,
    validatePagination
};
