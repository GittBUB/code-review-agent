"""
Product sorting and filtering algorithms
PERFORMANCE ISSUE: O(n²) complexity
"""
from typing import List, Dict, Any


def sort_products_by_popularity(products: List[Dict]) -> List[Dict]:
    """
    Sort products by popularity score
    
    PERFORMANCE ISSUE: Bubble sort implementation - O(n²) complexity
    Should use built-in sorted() which is O(n log n)
    
    Args:
        products: List of product dictionaries
        
    Returns:
        Sorted list of products
    """
    n = len(products)
    result = products.copy()
    
    # PERFORMANCE ISSUE: Bubble sort - O(n²)
    for i in range(n):
        for j in range(0, n - i - 1):
            if result[j]['popularity'] < result[j + 1]['popularity']:
                # Swap
                result[j], result[j + 1] = result[j + 1], result[j]
    
    return result


def find_similar_products(target_product: Dict, all_products: List[Dict]) -> List[Dict]:
    """
    Find products similar to target product
    
    PERFORMANCE ISSUE: O(n²) - compares every product with every other product
    
    Args:
        target_product: Product to find similarities for
        all_products: All available products
        
    Returns:
        List of similar products
    """
    similar = []
    
    # PERFORMANCE ISSUE: Nested loops - O(n²)
    for product in all_products:
        if product['id'] == target_product['id']:
            continue
        
        similarity_score = 0
        
        # Compare all attributes
        for attr in ['category', 'brand', 'color', 'size', 'material']:
            if attr in product and attr in target_product:
                # PERFORMANCE ISSUE: String comparison in nested loop
                if product[attr].lower() == target_product[attr].lower():
                    similarity_score += 1
        
        # Check tags similarity
        if 'tags' in product and 'tags' in target_product:
            # PERFORMANCE ISSUE: Another nested loop for tags
            for tag1 in product['tags']:
                for tag2 in target_product['tags']:
                    if tag1.lower() == tag2.lower():
                        similarity_score += 0.5
        
        if similarity_score > 0:
            similar.append({
                'product': product,
                'score': similarity_score
            })
    
    # PERFORMANCE ISSUE: Another bubble sort
    n = len(similar)
    for i in range(n):
        for j in range(0, n - i - 1):
            if similar[j]['score'] < similar[j + 1]['score']:
                similar[j], similar[j + 1] = similar[j + 1], similar[j]
    
    return [item['product'] for item in similar[:10]]


def remove_duplicates(products: List[Dict]) -> List[Dict]:
    """
    Remove duplicate products from list
    
    PERFORMANCE ISSUE: O(n²) duplicate detection
    
    Args:
        products: List of products
        
    Returns:
        List without duplicates
    """
    unique = []
    
    # PERFORMANCE ISSUE: Checking each product against all existing ones
    for product in products:
        is_duplicate = False
        
        for existing in unique:
            # PERFORMANCE ISSUE: Nested loop
            if (existing['name'] == product['name'] and 
                existing['brand'] == product['brand']):
                is_duplicate = True
                break
        
        if not is_duplicate:
            unique.append(product)
    
    return unique


def find_common_customers(product_ids: List[int], orders: List[Dict]) -> List[int]:
    """
    Find customers who bought all specified products
    
    PERFORMANCE ISSUE: O(n³) complexity
    
    Args:
        product_ids: List of product IDs
        orders: List of order dictionaries
        
    Returns:
        List of customer IDs
    """
    customers_with_all = []
    
    # Get unique customer IDs
    all_customer_ids = set(order['customer_id'] for order in orders)
    
    # PERFORMANCE ISSUE: Triple nested loop - O(n³)
    for customer_id in all_customer_ids:
        has_all_products = True
        
        # Check if customer has each product
        for product_id in product_ids:
            found = False
            
            # Search through all orders
            for order in orders:
                if order['customer_id'] == customer_id:
                    # Check order items
                    for item in order['items']:
                        if item['product_id'] == product_id:
                            found = True
                            break
                    if found:
                        break
            
            if not found:
                has_all_products = False
                break
        
        if has_all_products:
            customers_with_all.append(customer_id)
    
    return customers_with_all


# CORRECT APPROACH (for reference):
def sort_products_by_popularity_optimized(products: List[Dict]) -> List[Dict]:
    """
    Efficient sorting using built-in sorted() - O(n log n)
    """
    return sorted(products, key=lambda p: p['popularity'], reverse=True)


def find_similar_products_optimized(target_product: Dict, all_products: List[Dict]) -> List[Dict]:
    """
    More efficient similarity search - O(n)
    """
    # Pre-compute target attributes as set for O(1) lookups
    target_tags = set(tag.lower() for tag in target_product.get('tags', []))
    
    similar = []
    for product in all_products:
        if product['id'] == target_product['id']:
            continue
        
        score = 0
        
        # Simple attribute comparison
        for attr in ['category', 'brand', 'color']:
            if (attr in product and attr in target_product and 
                product[attr].lower() == target_product[attr].lower()):
                score += 1
        
        # Efficient tag comparison using set intersection
        product_tags = set(tag.lower() for tag in product.get('tags', []))
        common_tags = len(target_tags & product_tags)
        score += common_tags * 0.5
        
        if score > 0:
            similar.append((score, product))
    
    # Efficient sorting
    similar.sort(reverse=True)
    return [product for _, product in similar[:10]]


def remove_duplicates_optimized(products: List[Dict]) -> List[Dict]:
    """
    Efficient duplicate removal using set - O(n)
    """
    seen = set()
    unique = []
    
    for product in products:
        key = (product['name'], product['brand'])
        if key not in seen:
            seen.add(key)
            unique.append(product)
    
    return unique
