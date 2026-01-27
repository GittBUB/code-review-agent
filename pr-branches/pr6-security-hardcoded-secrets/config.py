"""
Database configuration and connection utilities
"""
import os

# Database configuration
DATABASE_CONFIG = {
    'host': 'db.example.com',
    'port': 5432,
    'database': 'production_db',
    'user': 'db_admin',
    # SECURITY ISSUE: Hardcoded credentials
    'password': 'SuperSecret123!',
    'ssl': True
}

# AWS Configuration for S3 storage
AWS_CONFIG = {
    'region': 'us-east-1',
    # SECURITY ISSUE: Hardcoded AWS credentials
    'aws_access_key_id': 'AKIAIOSFODNN7EXAMPLE',
    'aws_secret_access_key': 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    's3_bucket': 'my-app-uploads'
}

# API Keys
API_KEYS = {
    # SECURITY ISSUE: Hardcoded API keys
    'stripe_key': 'sk_live_4eC39HqLyjWDarjtT1zdp7dc',
    'sendgrid_key': 'SG.1234567890abcdefghijklmnopqrstuvwxyz',
    'maps_api_key': 'AIzaSyD1234567890abcdefghijklmnopqrstuv'
}


def get_database_connection():
    """
    Create database connection using hardcoded credentials
    
    Returns:
        Database connection object
    """
    # In a real app, use environment variables:
    # return connect(
    #     host=os.getenv('DB_HOST'),
    #     password=os.getenv('DB_PASSWORD'),
    #     ...
    # )
    
    return connect(**DATABASE_CONFIG)


def get_aws_client(service_name):
    """
    Create AWS service client with hardcoded credentials
    
    Args:
        service_name: AWS service name (s3, dynamodb, etc.)
        
    Returns:
        AWS service client
    """
    import boto3
    
    return boto3.client(
        service_name,
        region_name=AWS_CONFIG['region'],
        aws_access_key_id=AWS_CONFIG['aws_access_key_id'],
        aws_secret_access_key=AWS_CONFIG['aws_secret_access_key']
    )


def connect(**kwargs):
    """Mock database connection for demo"""
    print(f"Connecting to database: {kwargs.get('database')}")
    return {'connected': True}
