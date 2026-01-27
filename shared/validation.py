"""
Shared validation utilities
Used across microservices
"""
import re


def is_valid_email(email: str) -> bool:
    """
    Validate email format
    
    Args:
        email: Email string to validate
        
    Returns:
        True if valid email format, False otherwise
    """
    if not email or not isinstance(email, str):
        return False
    
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def sanitize_string(input_str: str, max_length: int = 255) -> str:
    """
    Sanitize user input string
    
    Args:
        input_str: Input string to sanitize
        max_length: Maximum allowed length
        
    Returns:
        Sanitized string
    """
    if not input_str:
        return ""
    
    # Remove potentially dangerous characters
    sanitized = re.sub(r'[<>\"\'&]', '', str(input_str))
    
    # Trim to max length
    return sanitized[:max_length].strip()


def validate_positive_number(value, field_name="value"):
    """
    Validate that a value is a positive number
    
    Args:
        value: Value to validate
        field_name: Name of field for error message
        
    Returns:
        Validated number
        
    Raises:
        ValueError: If value is not a positive number
    """
    try:
        num = float(value)
        if num < 0:
            raise ValueError(f"{field_name} must be positive")
        return num
    except (TypeError, ValueError) as e:
        raise ValueError(f"{field_name} must be a valid positive number: {e}")
