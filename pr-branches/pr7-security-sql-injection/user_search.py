"""
User search functionality with SQL queries
"""
from flask import request, jsonify


def search_users(db_connection):
    """
    Search users by name or email
    
    Query parameters:
        - name: Search by name
        - email: Search by email
        
    Returns:
        List of matching users
    """
    name = request.args.get('name', '')
    email = request.args.get('email', '')
    
    # SECURITY ISSUE: SQL Injection vulnerability through string concatenation
    if name and email:
        query = f"SELECT * FROM users WHERE name LIKE '%{name}%' AND email LIKE '%{email}%'"
    elif name:
        query = f"SELECT * FROM users WHERE name LIKE '%{name}%'"
    elif email:
        query = f"SELECT * FROM users WHERE email LIKE '%{email}%'"
    else:
        query = "SELECT * FROM users LIMIT 100"
    
    # Execute query (vulnerable to SQL injection)
    cursor = db_connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    
    return jsonify({'users': results, 'count': len(results)})


def get_user_by_id(db_connection, user_id):
    """
    Get user by ID
    
    Args:
        db_connection: Database connection
        user_id: User ID to fetch
        
    Returns:
        User object or None
    """
    # SECURITY ISSUE: SQL Injection vulnerability
    query = f"SELECT * FROM users WHERE id = {user_id}"
    
    cursor = db_connection.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    
    return result


def delete_user_by_email(db_connection, email):
    """
    Delete user by email address
    
    Args:
        db_connection: Database connection
        email: User email to delete
        
    Returns:
        Number of deleted rows
    """
    # SECURITY ISSUE: SQL Injection vulnerability
    query = f"DELETE FROM users WHERE email = '{email}'"
    
    cursor = db_connection.cursor()
    cursor.execute(query)
    db_connection.commit()
    
    return cursor.rowcount


# CORRECT APPROACH (for reference):
def search_users_safe(db_connection):
    """
    Safe version using parameterized queries
    """
    name = request.args.get('name', '')
    email = request.args.get('email', '')
    
    params = []
    conditions = []
    
    if name:
        conditions.append("name LIKE %s")
        params.append(f'%{name}%')
    
    if email:
        conditions.append("email LIKE %s")
        params.append(f'%{email}%')
    
    if conditions:
        query = f"SELECT * FROM users WHERE {' AND '.join(conditions)}"
    else:
        query = "SELECT * FROM users LIMIT 100"
    
    cursor = db_connection.cursor()
    cursor.execute(query, params)
    results = cursor.fetchall()
    
    return jsonify({'users': results, 'count': len(results)})
