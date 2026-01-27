"""
Payment processing module
CODE QUALITY ISSUE: Missing error handling for external service calls
"""
import requests
from decimal import Decimal


def process_payment(order_id, amount, payment_method):
    """
    Process payment for an order
    
    CODE QUALITY ISSUE: No error handling for external API call
    
    Args:
        order_id: Order identifier
        amount: Payment amount
        payment_method: Payment method details
        
    Returns:
        Payment transaction ID
    """
    # CODE QUALITY ISSUE: No validation of amount
    # What if amount is negative, zero, or extremely large?
    
    # CODE QUALITY ISSUE: No try/except for network call
    response = requests.post(
        'https://payment-gateway.example.com/api/charge',
        json={
            'order_id': order_id,
            'amount': amount,
            'payment_method': payment_method
        },
        timeout=5
    )
    
    # CODE QUALITY ISSUE: No check if response is successful
    data = response.json()
    
    # CODE QUALITY ISSUE: Accessing keys without checking if they exist
    transaction_id = data['transaction_id']
    
    return transaction_id


def refund_payment(transaction_id, amount):
    """
    Refund a payment
    
    CODE QUALITY ISSUE: No error handling
    
    Args:
        transaction_id: Original transaction ID
        amount: Amount to refund
        
    Returns:
        Refund transaction ID
    """
    # CODE QUALITY ISSUE: No validation
    # What if amount > original payment amount?
    
    # CODE QUALITY ISSUE: No try/except for API call
    response = requests.post(
        'https://payment-gateway.example.com/api/refund',
        json={
            'transaction_id': transaction_id,
            'amount': amount
        }
    )
    
    # CODE QUALITY ISSUE: No error checking
    refund_data = response.json()
    
    return refund_data['refund_id']


def verify_payment_status(transaction_id):
    """
    Check payment status
    
    CODE QUALITY ISSUE: Missing error handling
    
    Args:
        transaction_id: Transaction to check
        
    Returns:
        Payment status
    """
    # CODE QUALITY ISSUE: No error handling for network issues
    response = requests.get(
        f'https://payment-gateway.example.com/api/status/{transaction_id}'
    )
    
    # CODE QUALITY ISSUE: Not handling non-200 responses
    status_data = response.json()
    
    return status_data['status']


def calculate_processing_fee(amount, payment_type):
    """
    Calculate payment processing fee
    
    CODE QUALITY ISSUE: No input validation or error handling
    
    Args:
        amount: Payment amount
        payment_type: Type of payment (credit, debit, etc.)
        
    Returns:
        Processing fee amount
    """
    # CODE QUALITY ISSUE: No validation of payment_type
    # What if it's not a valid type?
    
    fee_rates = {
        'credit': 0.029,
        'debit': 0.015,
        'ach': 0.008
    }
    
    # CODE QUALITY ISSUE: KeyError if payment_type not in dict
    rate = fee_rates[payment_type]
    
    # CODE QUALITY ISSUE: No handling of invalid amount
    # What if amount is string, None, or negative?
    fee = Decimal(str(amount)) * Decimal(str(rate))
    
    return float(fee)


def batch_process_payments(payments):
    """
    Process multiple payments
    
    CODE QUALITY ISSUE: No error handling, one failure breaks everything
    
    Args:
        payments: List of payment dictionaries
        
    Returns:
        List of transaction IDs
    """
    results = []
    
    # CODE QUALITY ISSUE: If any payment fails, entire batch fails
    # No partial success handling
    for payment in payments:
        # CODE QUALITY ISSUE: Accessing dict keys without validation
        transaction_id = process_payment(
            payment['order_id'],
            payment['amount'],
            payment['payment_method']
        )
        results.append(transaction_id)
    
    return results


def update_payment_method(user_id, new_payment_method):
    """
    Update user's payment method
    
    CODE QUALITY ISSUE: No error handling for database operations
    
    Args:
        user_id: User identifier
        new_payment_method: New payment method details
        
    Returns:
        Success boolean
    """
    # CODE QUALITY ISSUE: Database operation without try/except
    db = get_database_connection()
    
    # CODE QUALITY ISSUE: No validation of payment_method format
    db.execute(
        "UPDATE users SET payment_method = ? WHERE id = ?",
        (new_payment_method, user_id)
    )
    
    # CODE QUALITY ISSUE: Not checking if update actually succeeded
    db.commit()
    
    return True


def get_database_connection():
    """Mock database connection"""
    class MockDB:
        def execute(self, query, params):
            pass
        def commit(self):
            pass
    return MockDB()


# CORRECT APPROACH (for reference):
def process_payment_safe(order_id, amount, payment_method):
    """
    Safely process payment with proper error handling
    """
    try:
        # Validate inputs
        if not order_id:
            raise ValueError("Order ID is required")
        
        if not isinstance(amount, (int, float, Decimal)) or amount <= 0:
            raise ValueError("Amount must be a positive number")
        
        if not payment_method:
            raise ValueError("Payment method is required")
        
        # Make API call with error handling
        response = requests.post(
            'https://payment-gateway.example.com/api/charge',
            json={
                'order_id': order_id,
                'amount': float(amount),
                'payment_method': payment_method
            },
            timeout=10
        )
        
        # Check response status
        response.raise_for_status()
        
        data = response.json()
        
        # Validate response data
        if 'transaction_id' not in data:
            raise ValueError("Invalid response from payment gateway")
        
        return data['transaction_id']
        
    except requests.exceptions.Timeout:
        raise Exception("Payment gateway timeout - please try again")
    except requests.exceptions.ConnectionError:
        raise Exception("Could not connect to payment gateway")
    except requests.exceptions.HTTPError as e:
        raise Exception(f"Payment gateway error: {e}")
    except ValueError as e:
        raise Exception(f"Invalid input: {e}")
    except Exception as e:
        raise Exception(f"Payment processing failed: {e}")
