"""
Tests for middleware functionality
Demonstrates testing authentication and error handling
"""
import pytest
from app import app


@pytest.fixture
def client():
    """Flask test client fixture"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


class TestAuthentication:
    """Test suite for authentication middleware"""
    
    def test_auth_with_valid_bearer_token(self, client):
        """Test endpoint access with valid Bearer token"""
        response = client.get(
            '/users/1',
            headers={'Authorization': 'Bearer valid_token_here'}
        )
        # Should not get 401 (will get 200 or other status based on logic)
        assert response.status_code != 401
    
    def test_auth_without_header(self, client):
        """Test endpoint access without Authorization header"""
        response = client.get('/users/1')
        
        assert response.status_code == 401
        assert 'error' in response.json
        assert response.json['error'] == 'Unauthorized'
    
    def test_auth_with_invalid_format(self, client):
        """Test endpoint access with invalid auth format"""
        response = client.get(
            '/users/1',
            headers={'Authorization': 'InvalidFormat token'}
        )
        
        assert response.status_code == 401
    
    def test_auth_with_empty_token(self, client):
        """Test endpoint access with empty Bearer token"""
        response = client.get(
            '/users/1',
            headers={'Authorization': 'Bearer '}
        )
        
        assert response.status_code == 401
