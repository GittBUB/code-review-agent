/**
 * CSV Parser Utility
 * Parses CSV data for product imports
 */

/**
 * Parse CSV string into array of objects
 * @param {string} csvString - CSV content as string
 * @param {object} options - Parsing options
 * @returns {Array<object>} Parsed data as array of objects
 */
function parseCSV(csvString, options = {}) {
    const {
        delimiter = ',',
        hasHeaders = true,
        trimValues = true
    } = options;
    
    if (!csvString || typeof csvString !== 'string') {
        throw new Error('CSV string is required');
    }
    
    // Split into lines
    const lines = csvString.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
        return [];
    }
    
    let headers = [];
    let dataStartIndex = 0;
    
    if (hasHeaders) {
        // First line is headers
        headers = parseLine(lines[0], delimiter, trimValues);
        dataStartIndex = 1;
    } else {
        // Generate default headers (col1, col2, etc.)
        const firstLine = parseLine(lines[0], delimiter, trimValues);
        headers = firstLine.map((_, index) => `col${index + 1}`);
    }
    
    // Parse data rows
    const data = [];
    for (let i = dataStartIndex; i < lines.length; i++) {
        const values = parseLine(lines[i], delimiter, trimValues);
        
        // Skip rows that don't match header count
        if (values.length !== headers.length) {
            console.warn(`Row ${i + 1} has ${values.length} values but ${headers.length} headers`);
            continue;
        }
        
        // Create object from headers and values
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        
        data.push(row);
    }
    
    return data;
}

/**
 * Parse a single CSV line into array of values
 * @param {string} line - Single CSV line
 * @param {string} delimiter - Field delimiter
 * @param {boolean} trimValues - Whether to trim whitespace
 * @returns {Array<string>} Array of field values
 */
function parseLine(line, delimiter = ',', trimValues = true) {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            // Handle quoted values
            if (insideQuotes && line[i + 1] === '"') {
                // Escaped quote
                currentValue += '"';
                i++; // Skip next quote
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === delimiter && !insideQuotes) {
            // End of field
            values.push(trimValues ? currentValue.trim() : currentValue);
            currentValue = '';
        } else {
            currentValue += char;
        }
    }
    
    // Add last value
    values.push(trimValues ? currentValue.trim() : currentValue);
    
    return values;
}

/**
 * Validate and convert product data from CSV
 * @param {Array<object>} data - Parsed CSV data
 * @returns {Array<object>} Validated product objects
 */
function validateProductData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    
    const requiredFields = ['name', 'price', 'stock'];
    const validatedProducts = [];
    
    data.forEach((row, index) => {
        // Check required fields
        const missing = requiredFields.filter(field => !row[field]);
        if (missing.length > 0) {
            throw new Error(`Row ${index + 1}: Missing required fields: ${missing.join(', ')}`);
        }
        
        // Validate and convert types
        const product = {
            name: String(row.name).trim(),
            price: parseFloat(row.price),
            stock: parseInt(row.stock, 10)
        };
        
        // Validate price
        if (isNaN(product.price) || product.price < 0) {
            throw new Error(`Row ${index + 1}: Invalid price value`);
        }
        
        // Validate stock
        if (isNaN(product.stock) || product.stock < 0) {
            throw new Error(`Row ${index + 1}: Invalid stock value`);
        }
        
        // Add optional fields if present
        if (row.description) {
            product.description = String(row.description).trim();
        }
        if (row.category) {
            product.category = String(row.category).trim();
        }
        
        validatedProducts.push(product);
    });
    
    return validatedProducts;
}

/**
 * Convert array of objects back to CSV string
 * @param {Array<object>} data - Data to convert
 * @param {object} options - Conversion options
 * @returns {string} CSV string
 */
function toCSV(data, options = {}) {
    const { delimiter = ',', includeHeaders = true } = options;
    
    if (!Array.isArray(data) || data.length === 0) {
        return '';
    }
    
    const headers = Object.keys(data[0]);
    const lines = [];
    
    // Add headers
    if (includeHeaders) {
        lines.push(headers.map(h => escapeValue(h, delimiter)).join(delimiter));
    }
    
    // Add data rows
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header] ?? '';
            return escapeValue(String(value), delimiter);
        });
        lines.push(values.join(delimiter));
    });
    
    return lines.join('\n');
}

/**
 * Escape CSV value if it contains special characters
 * @param {string} value - Value to escape
 * @param {string} delimiter - Field delimiter
 * @returns {string} Escaped value
 */
function escapeValue(value, delimiter) {
    if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

module.exports = {
    parseCSV,
    parseLine,
    validateProductData,
    toCSV,
    escapeValue
};
