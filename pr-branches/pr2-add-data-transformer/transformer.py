"""
Data transformation utilities
Formats data for API responses
"""
from typing import Dict, List, Any, Union


def transform_user_data(user: Dict[str, Any], include_private: bool = False) -> Dict[str, Any]:
    """
    Transform user data for API response
    
    Removes sensitive fields and formats the response according to API standards.
    
    Args:
        user: User dictionary with all fields
        include_private: Whether to include private fields (default: False)
        
    Returns:
        Transformed user dictionary safe for API response
        
    Examples:
        >>> user = {'id': 1, 'email': 'test@example.com', 'password': 'secret', 'name': 'John'}
        >>> transform_user_data(user)
        {'id': 1, 'email': 'test@example.com', 'name': 'John'}
    """
    if not user:
        return {}
    
    # List of sensitive fields to exclude
    sensitive_fields = {'password', 'password_hash', 'token', 'secret', 'api_key'}
    
    # List of private fields (only included if include_private=True)
    private_fields = {'created_ip', 'last_login_ip', 'internal_notes'}
    
    transformed = {}
    
    for key, value in user.items():
        # Always skip sensitive fields
        if key in sensitive_fields:
            continue
        
        # Skip private fields unless explicitly requested
        if key in private_fields and not include_private:
            continue
        
        # Handle nested dictionaries
        if isinstance(value, dict):
            transformed[key] = transform_user_data(value, include_private)
        # Handle lists of dictionaries
        elif isinstance(value, list):
            transformed[key] = [
                transform_user_data(item, include_private) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            transformed[key] = value
    
    return transformed


def transform_user_list(users: List[Dict[str, Any]], include_private: bool = False) -> List[Dict[str, Any]]:
    """
    Transform a list of users for API response
    
    Args:
        users: List of user dictionaries
        include_private: Whether to include private fields
        
    Returns:
        List of transformed user dictionaries
    """
    if not users:
        return []
    
    return [transform_user_data(user, include_private) for user in users]


def format_api_response(data: Union[Dict, List], success: bool = True, message: str = None) -> Dict:
    """
    Format data according to standard API response structure
    
    Args:
        data: Data to include in response
        success: Whether the operation was successful
        message: Optional message to include
        
    Returns:
        Formatted API response dictionary
    """
    response = {
        'success': success,
        'data': data
    }
    
    if message:
        response['message'] = message
    
    return response
