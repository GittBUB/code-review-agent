/**
 * Validation utilities for user input
 * Provides email and phone number validation
 */

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result with isValid and error message
 */
function validateEmail(email, options = {}) {
    const {
        allowDisposable = true,
        requireDomain = true
    } = options;
    
    // Check if email is provided
    if (!email) {
        return {
            isValid: false,
            error: 'Email is required'
        };
    }
    
    // Check type
    if (typeof email !== 'string') {
        return {
            isValid: false,
            error: 'Email must be a string'
        };
    }
    
    // Trim whitespace
    email = email.trim();
    
    // Check basic format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return {
            isValid: false,
            error: 'Invalid email format'
        };
    }
    
    // Split into local and domain parts
    const [localPart, domainPart] = email.split('@');
    
    // Validate local part (before @)
    if (localPart.length > 64) {
        return {
            isValid: false,
            error: 'Email local part too long (max 64 characters)'
        };
    }
    
    // Check for consecutive dots
    if (localPart.includes('..')) {
        return {
            isValid: false,
            error: 'Email cannot contain consecutive dots'
        };
    }
    
    // Validate domain part
    if (requireDomain && domainPart.length < 3) {
        return {
            isValid: false,
            error: 'Invalid domain name'
        };
    }
    
    // Check against disposable email domains (if not allowed)
    if (!allowDisposable) {
        const disposableDomains = [
            'tempmail.com',
            'throwaway.email',
            '10minutemail.com',
            'guerrillamail.com'
        ];
        
        if (disposableDomains.some(domain => domainPart.toLowerCase().includes(domain))) {
            return {
                isValid: false,
                error: 'Disposable email addresses are not allowed'
            };
        }
    }
    
    return {
        isValid: true,
        email: email.toLowerCase()
    };
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
function validatePhone(phone, options = {}) {
    const {
        country = 'US',
        allowInternational = true
    } = options;
    
    // Check if phone is provided
    if (!phone) {
        return {
            isValid: false,
            error: 'Phone number is required'
        };
    }
    
    // Check type
    if (typeof phone !== 'string') {
        return {
            isValid: false,
            error: 'Phone number must be a string'
        };
    }
    
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if we have any digits
    if (digitsOnly.length === 0) {
        return {
            isValid: false,
            error: 'Phone number must contain digits'
        };
    }
    
    // US phone number validation
    if (country === 'US') {
        // US numbers should be 10 digits (without country code) or 11 (with +1)
        if (digitsOnly.length === 10) {
            return {
                isValid: true,
                phone: digitsOnly,
                formatted: `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
            };
        } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
            return {
                isValid: true,
                phone: digitsOnly.slice(1),
                formatted: `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`
            };
        } else {
            return {
                isValid: false,
                error: 'US phone number must be 10 digits'
            };
        }
    }
    
    // International validation (basic)
    if (allowInternational) {
        // Most international numbers are 7-15 digits
        if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
            return {
                isValid: true,
                phone: digitsOnly,
                formatted: phone // Keep original formatting for international
            };
        } else {
            return {
                isValid: false,
                error: 'Phone number must be between 7 and 15 digits'
            };
        }
    }
    
    return {
        isValid: false,
        error: 'Invalid phone number format'
    };
}

/**
 * Validate multiple contact fields
 * @param {object} contact - Contact object with email and/or phone
 * @returns {object} Validation results
 */
function validateContact(contact) {
    const results = {
        isValid: true,
        errors: {}
    };
    
    if (!contact || typeof contact !== 'object') {
        return {
            isValid: false,
            errors: { general: 'Contact data must be an object' }
        };
    }
    
    // Validate email if provided
    if (contact.email !== undefined) {
        const emailResult = validateEmail(contact.email);
        if (!emailResult.isValid) {
            results.isValid = false;
            results.errors.email = emailResult.error;
        }
    }
    
    // Validate phone if provided
    if (contact.phone !== undefined) {
        const phoneResult = validatePhone(contact.phone);
        if (!phoneResult.isValid) {
            results.isValid = false;
            results.errors.phone = phoneResult.error;
        }
    }
    
    // Require at least one contact method
    if (!contact.email && !contact.phone) {
        results.isValid = false;
        results.errors.general = 'At least one contact method (email or phone) is required';
    }
    
    return results;
}

module.exports = {
    validateEmail,
    validatePhone,
    validateContact
};
