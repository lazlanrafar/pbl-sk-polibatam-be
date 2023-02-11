const argon2 = require("argon2");

module.exports = {
  /**
   * @param {string} password
   */
  Encrypt: async (password) => {
    return await argon2.hash(password);
  },
  /**
   * @param {string} password
   */
  Compare: async (password, hash) => {
    return await argon2.verify(hash, password);
  },
};
