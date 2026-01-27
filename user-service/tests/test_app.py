"""
Tests for User Service
Demonstrates good testing practices with pytest
"""
import pytest
from app import app, users_db


@pytest.fixture
def client():
    """Flask test client fixture"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def sample_user():
    """Sample user data fixture"""
    return {
        'email': 'newuser@example.com',
        'password': 'secure_password123',
        'name': 'New User'
    }


@pytest.fixture
def auth_headers():
    """Authentication headers fixture"""
    return {
        'Authorization': 'Bearer token_1_test@example.com'
    }


def test_health_check(client):
    """Test health check endpoint"""
    response = client.get('/health')
    
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'
    assert response.json['service'] == 'user-service'


def test_login_success(client):
    """Test successful login with valid credentials"""
    # Use existing test user from app.py
    login_data = {
        'email': 'test@example.com',
        'password': 'password123'
    }
    
    response = client.post('/auth/login', json=login_data)
    
    assert response.status_code == 200
    assert 'token' in response.json
    assert 'user' in response.json
    assert response.json['user']['email'] == 'test@example.com'
    assert 'password' not in response.json['user']


def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    login_data = {
        'email': 'test@example.com',
        'password': 'wrongpassword'
    }
    
    response = client.post('/auth/login', json=login_data)
    
    assert response.status_code == 401
    assert 'error' in response.json


def test_login_missing_email(client):
    """Test login with missing email"""
    login_data = {'password': 'password123'}
    
    response = client.post('/auth/login', json=login_data)
    
    assert response.status_code == 400
    assert 'error' in response.json


def test_login_missing_password(client):
    """Test login with missing password"""
    login_data = {'email': 'test@example.com'}
    
    response = client.post('/auth/login', json=login_data)
    
    assert response.status_code == 400
    assert 'error' in response.json


def test_login_user_not_found(client):
    """Test login with non-existent user"""
    login_data = {
        'email': 'nonexistent@example.com',
        'password': 'password123'
    }
    
    response = client.post('/auth/login', json=login_data)
    
    assert response.status_code == 401
    assert 'error' in response.json


def test_get_user_success(client, auth_headers):
    """Test retrieving user by ID"""
    response = client.get('/users/1', headers=auth_headers)
    
    assert response.status_code == 200
    assert response.json['id'] == 1
    assert response.json['email'] == 'test@example.com'
    assert 'password' not in response.json


def test_get_user_not_found(client, auth_headers):
    """Test retrieving non-existent user"""
    response = client.get('/users/999', headers=auth_headers)
    
    assert response.status_code == 404
    assert 'error' in response.json


def test_get_user_unauthorized(client):
    """Test retrieving user without authentication"""
    response = client.get('/users/1')
    
    assert response.status_code == 401
    assert 'error' in response.json


def test_list_users_success(client, auth_headers):
    """Test listing all users"""
    response = client.get('/users', headers=auth_headers)
    
    assert response.status_code == 200
    assert 'users' in response.json
    assert 'count' in response.json
    assert isinstance(response.json['users'], list)
    assert response.json['count'] > 0


def test_list_users_unauthorized(client):
    """Test listing users without authentication"""
    response = client.get('/users')
    
    assert response.status_code == 401
    assert 'error' in response.json


@pytest.mark.parametrize("login_data,expected_status", [
    ({'email': 'test@example.com', 'password': 'password123'}, 200),
    ({'email': '', 'password': 'password123'}, 400),
    ({'email': 'test@example.com', 'password': ''}, 400),
    ({}, 400),
    ({'email': 'wrong@example.com', 'password': 'password123'}, 401),
])
def test_login_various_inputs(client, login_data, expected_status):
    """Test login with various input combinations"""
    response = client.post('/auth/login', json=login_data)
    assert response.status_code == expected_status
