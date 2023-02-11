const jwt = require("jsonwebtoken");

module.exports = {
  EncryptToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  DecryptToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
