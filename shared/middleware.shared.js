const { FetchUserById } = require("../app/user/user.repository");
const { Unauthorized } = require("../utils/http-response");
const { DecryptToken } = require("../utils/jwt");

module.exports = {
  AuthToken: async (req, res, next) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) return Unauthorized(res, {}, "Unauthorized");

    const token = BearerToken.split(" ")[1];

    try {
      const deCode = DecryptToken(token);
      const user = await FetchUserById(deCode.id);

      if (!user) return Unauthorized(res, {}, "Unauthorized");

      req.user = user;
      next();
    } catch (error) {
      return Unauthorized(res, {}, "Unauthorized");
    }
  },
};
