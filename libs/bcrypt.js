let bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Generates a salted and hashed string for passwords.
 *
 * @param {string} password string to salt and hash
 * @returns a hashed password
 */
exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

/**
 * Checks if two passwords are the same.
 *
 * @param {string} password plain-text password to be salted+hashed
 * @param {string} storedPassword password thats already salted+hashed
 * @returns true = if equal
 */
exports.compare = function(password, storedPassword){
    return bcrypt.compareSync(password, storedPassword);
};