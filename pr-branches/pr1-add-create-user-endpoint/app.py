"""
User Service - Flask Microservice
Handles user management operations
"""
from flask import Flask, request, jsonify
from functools import wraps
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

# In-memory user storage (for demo purposes)
users_db = {}
user_id_counter = 1


def require_auth(f):
    """Simple authentication decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'user-service'})


@app.route('/auth/login', methods=['POST'])
def login():
    """
    User login endpoint
    Returns authentication token on success
    """
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password required'}), 400
    
    email = data['email']
    password = data['password']
    
    # Find user by email
    user = None
    for uid, u in users_db.items():
        if u['email'] == email:
            user = u
            break
    
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Generate simple token (in production, use JWT)
    token = f"token_{user['id']}_{user['email']}"
    
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'name': user['name']
        }
    }), 200


@app.route('/users', methods=['POST'])
@require_auth
def create_user():
    """
    Create a new user
    
    Request JSON:
        - email: User email (required)
        - password: User password (required)
        - name: User full name (required)
    
    Returns:
        201: User created successfully
        400: Invalid input
        409: User already exists
    """
    global user_id_counter
    
    data = request.get_json()
    
    # Validate required fields
    if not data:
        return jsonify({'error': 'Request body required'}), 400
    
    if 'email' not in data or not data['email']:
        return jsonify({'error': 'Email is required'}), 400
    
    if 'password' not in data or not data['password']:
        return jsonify({'error': 'Password is required'}), 400
    
    if 'name' not in data or not data['name']:
        return jsonify({'error': 'Name is required'}), 400
    
    email = data['email'].strip()
    password = data['password']
    name = data['name'].strip()
    
    # Validate email format (basic validation)
    if '@' not in email or '.' not in email:
        return jsonify({'error': 'Invalid email format'}), 400
    
    # Check if user already exists
    for user in users_db.values():
        if user['email'] == email:
            return jsonify({'error': 'User with this email already exists'}), 409
    
    # Create new user
    new_user = {
        'id': user_id_counter,
        'email': email,
        'password': password,
        'name': name
    }
    
    users_db[user_id_counter] = new_user
    user_id_counter += 1
    
    # Return user without password
    user_response = {
        'id': new_user['id'],
        'email': new_user['email'],
        'name': new_user['name']
    }
    
    return jsonify(user_response), 201


@app.route('/users/<int:user_id>', methods=['GET'])
@require_auth
def get_user(user_id):
    """Get user by ID"""
    user = users_db.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Don't return password
    user_data = {k: v for k, v in user.items() if k != 'password'}
    
    return jsonify(user_data), 200


@app.route('/users', methods=['GET'])
@require_auth
def list_users():
    """List all users"""
    users = []
    for user in users_db.values():
        user_data = {k: v for k, v in user.items() if k != 'password'}
        users.append(user_data)
    
    return jsonify({'users': users, 'count': len(users)}), 200


if __name__ == '__main__':
    # Add sample user for testing
    users_db[1] = {
        'id': 1,
        'email': 'test@example.com',
        'password': 'password123',
        'name': 'Test User'
    }
    
    app.run(debug=True, port=5000)
