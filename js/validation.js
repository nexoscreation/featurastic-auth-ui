/**
 * Regex patterns for various input validations
 */
const regexPatterns = {
    username: /^[a-zA-Z0-9_]{5,20}$/, // 5-20 characters, alphanumeric + underscores
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email validation
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    phone: /^\+?[1-9]\d{1,14}$/, // International format (E.164)
    url: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/.*)?$/, // Simple URL pattern
    zipcode: /^\d{5}(-\d{4})?$/, // US Zipcode (5 or 9 digits)
    hexColor: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, // Hex color codes (#FFF, #FFFFFF)
    creditCard: /^\d{16}$/, // Basic 16-digit credit card number (no spaces)
    ipv4: /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/, // IPv4 validation
    ipv6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  };
  
  /**
   * Custom validation messages
   */
  const validationMessages = {
    username: "Username must be 5-20 characters long, only letters, numbers, and underscores allowed.",
    email: "Enter a valid email address.",
    password: "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
    phone: "Enter a valid phone number (e.g., +1234567890).",
    url: "Enter a valid URL (e.g., https://example.com).",
    zipcode: "Enter a valid US zip code (e.g., 12345 or 12345-6789).",
    hexColor: "Enter a valid hex color (e.g., #FFAACC).",
    creditCard: "Enter a valid 16-digit credit card number.",
    ipv4: "Enter a valid IPv4 address (e.g., 192.168.1.1).",
    ipv6: "Enter a valid IPv6 address.",
  };
  
  /**
   * Validates an input value based on the specified type.
   * @param {string} type - The type of validation (e.g., "email", "password").
   * @param {string} value - The value to validate.
   * @returns {object} - An object containing isValid (boolean) and message (string).
   */
  export function validateInput(type, value) {
    if (!regexPatterns[type]) {
      console.warn(`Validation type "${type}" is not supported.`);
      return { isValid: false, message: "Invalid validation type." };
    }
  
    const isValid = regexPatterns[type].test(value.trim());
    return {
      isValid,
      message: isValid ? "" : validationMessages[type],
    };
  }
  
  /**
   * Example Usage:
   * 
   * import { validateInput } from './validation.js';
   * 
   * const result = validateInput("email", "test@example.com");
   * if (!result.isValid) {
   *   console.log(result.message);
   * }
   */
  