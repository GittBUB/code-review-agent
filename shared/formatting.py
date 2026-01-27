"""
Formatting utilities for data transformation
"""
from typing import Dict, List, Any
from datetime import datetime


def format_currency(amount: float, currency: str = "USD") -> str:
    """
    Format amount as currency string
    
    Args:
        amount: Amount to format
        currency: Currency code (default: USD)
        
    Returns:
        Formatted currency string
    """
    symbols = {
        "USD": "$",
        "EUR": "€",
        "GBP": "£"
    }
    
    symbol = symbols.get(currency, currency)
    return f"{symbol}{amount:.2f}"


def format_timestamp(dt: datetime) -> str:
    """
    Format datetime as ISO 8601 string
    
    Args:
        dt: Datetime object to format
        
    Returns:
        ISO 8601 formatted string
    """
    return dt.isoformat()


def transform_dict_keys(data: Dict, key_map: Dict[str, str]) -> Dict:
    """
    Transform dictionary keys according to mapping
    
    Args:
        data: Input dictionary
        key_map: Mapping of old keys to new keys
        
    Returns:
        Dictionary with transformed keys
    """
    result = {}
    for old_key, value in data.items():
        new_key = key_map.get(old_key, old_key)
        result[new_key] = value
    return result
