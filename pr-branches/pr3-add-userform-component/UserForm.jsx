import React, { useState } from 'react';

/**
 * UserForm Component
 * Handles user registration with validation
 */
const UserForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    /**
     * Validate email format
     */
    const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };
    
    /**
     * Validate form fields
     */
    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        // Name validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    /**
     * Handle input changes
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    /**
     * Handle form submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
            
            // Reset form on success
            setFormData({
                email: '',
                password: '',
                name: ''
            });
        } catch (error) {
            setErrors({
                submit: error.message || 'Failed to create user'
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>Create User Account</h2>
            
            {errors.submit && (
                <div className="error-message" role="alert">
                    {errors.submit}
                </div>
            )}
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <span id="email-error" className="error">
                        {errors.email}
                    </span>
                )}
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {errors.password && (
                    <span id="password-error" className="error">
                        {errors.password}
                    </span>
                )}
            </div>
            
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                    <span id="name-error" className="error">
                        {errors.name}
                    </span>
                )}
            </div>
            
            <div className="form-actions">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                >
                    {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
                
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default UserForm;
