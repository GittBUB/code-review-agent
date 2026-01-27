"""
Password hashing utilities
"""
import hashlib


def hash_password(password):
    """
    Hash a password for storage
    
    Args:
        password: Plain text password
        
    Returns:
        Hashed password string
    """
    # SECURITY ISSUE: Using MD5 which is cryptographically broken
    # MD5 is too fast and vulnerable to rainbow table attacks
    return hashlib.md5(password.encode()).hexdigest()


def verify_password(password, hashed_password):
    """
    Verify a password against stored hash
    
    Args:
        password: Plain text password to verify
        hashed_password: Stored hash to compare against
        
    Returns:
        True if password matches, False otherwise
    """
    # SECURITY ISSUE: Using MD5
    return hash_password(password) == hashed_password


def hash_api_key(api_key):
    """
    Hash API key for storage
    
    Args:
        api_key: Plain text API key
        
    Returns:
        Hashed API key
    """
    # SECURITY ISSUE: Using SHA1 which is also weak
    return hashlib.sha1(api_key.encode()).hexdigest()


def create_session_token(user_id, timestamp):
    """
    Create session token
    
    Args:
        user_id: User ID
        timestamp: Current timestamp
        
    Returns:
        Session token string
    """
    # SECURITY ISSUE: Weak token generation using MD5
    data = f"{user_id}:{timestamp}:secret_salt"
    return hashlib.md5(data.encode()).hexdigest()


# CORRECT APPROACH (for reference):
# import bcrypt
#
# def hash_password_safe(password):
#     """
#     Safely hash password using bcrypt
#     """
#     salt = bcrypt.gensalt()
#     return bcrypt.hashpw(password.encode(), salt)
#
# def verify_password_safe(password, hashed_password):
#     """
#     Safely verify password using bcrypt
#     """
#     return bcrypt.checkpw(password.encode(), hashed_password)
