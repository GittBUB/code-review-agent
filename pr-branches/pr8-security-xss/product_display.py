"""
Product display and template rendering
"""
from flask import request, Response


def render_product_page(product):
    """
    Render product details page
    
    Args:
        product: Product dictionary with name, description, price, reviews
        
    Returns:
        HTML response
    """
    # SECURITY ISSUE: XSS vulnerability - unsanitized user input in HTML
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{product['name']}</title>
    </head>
    <body>
        <h1>{product['name']}</h1>
        <div class="description">
            {product['description']}
        </div>
        <p class="price">${product['price']}</p>
        
        <div class="reviews">
            <h2>Customer Reviews</h2>
            {render_reviews(product.get('reviews', []))}
        </div>
    </body>
    </html>
    """
    
    return Response(html, mimetype='text/html')


def render_reviews(reviews):
    """
    Render customer reviews
    
    Args:
        reviews: List of review dictionaries
        
    Returns:
        HTML string of reviews
    """
    if not reviews:
        return "<p>No reviews yet</p>"
    
    # SECURITY ISSUE: XSS vulnerability - user-generated content not escaped
    html_reviews = []
    for review in reviews:
        review_html = f"""
        <div class="review">
            <h3>{review['title']}</h3>
            <p class="author">By {review['author']}</p>
            <div class="rating">Rating: {review['rating']}/5</div>
            <div class="comment">{review['comment']}</div>
        </div>
        """
        html_reviews.append(review_html)
    
    return "\n".join(html_reviews)


def render_search_results(query, results):
    """
    Render search results page
    
    Args:
        query: User search query
        results: List of product results
        
    Returns:
        HTML response
    """
    # SECURITY ISSUE: XSS vulnerability - search query not escaped
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Search Results</title>
    </head>
    <body>
        <h1>Search Results for: {query}</h1>
        <p>Found {len(results)} results</p>
        
        <div class="results">
    """
    
    for product in results:
        # SECURITY ISSUE: Product data not escaped
        html += f"""
            <div class="product">
                <h2>{product['name']}</h2>
                <p>{product['description']}</p>
                <span class="price">${product['price']}</span>
            </div>
        """
    
    html += """
        </div>
    </body>
    </html>
    """
    
    return Response(html, mimetype='text/html')


# CORRECT APPROACH (for reference):
from markupsafe import escape

def render_product_page_safe(product):
    """
    Safe version with HTML escaping
    """
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{escape(product['name'])}</title>
    </head>
    <body>
        <h1>{escape(product['name'])}</h1>
        <div class="description">
            {escape(product['description'])}
        </div>
        <p class="price">${escape(product['price'])}</p>
    </body>
    </html>
    """
    
    return Response(html, mimetype='text/html')
