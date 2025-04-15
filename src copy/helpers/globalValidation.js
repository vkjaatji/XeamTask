/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const validateEmail = email => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern?.test(email);
};

/**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
export const validatePassword = password => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern?.test(password);
};

/**
 * Validates the length of a text.
 * @param {string} text - The text to validate.
 * @returns {number} - Returns the length of the text.
 */
export const validateLength = text => {
  return text?.length;
};
