# PR #12: Product Sorting Algorithm (Python) - O(n²) COMPLEXITY

This PR adds product sorting and filtering functionality.

## Changes
- Add sort_products_by_popularity function
- Add find_similar_products function

## ⚠️ Performance Issue
**Inefficient Algorithm** - O(n²) complexity for operations that could be O(n log n) or O(n).

## Expected Copilot Feedback
Copilot should identify:
1. Nested loops causing O(n²) time complexity
2. Performance degradation with large datasets
3. Suggestion to use built-in sorted() or more efficient algorithms
