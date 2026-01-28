// utils/helpers.js

/**
 * Truncate text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length = 100) {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Format date to readable format
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Convert object to query string
 * @param {object} obj - Object to convert
 * @returns {string} - Query string
 */
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

/**
 * Parse query string to object
 * @param {string} queryString - Query string to parse
 * @returns {object} - Parsed object
 */
export function queryStringToObject(queryString) {
  const obj = {}
  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=')
    obj[decodeURIComponent(key)] = decodeURIComponent(value)
  })
  return obj
}

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Limit time in ms
 * @returns {function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
