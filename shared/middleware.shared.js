const { FetchIsAdmin } = require("../app/admin/admin.Repository");
const { fetchPolibatam } = require("../utils/fetch-polibatam");
const { Unauthorized } = require("../utils/http-response");
const { DecryptToken } = require("../utils/jwt");

module.exports = {
  AuthToken: async (req, res, next) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) return Unauthorized(res, {}, "Unauthorized");

    const token = BearerToken.split(" ")[1];

    try {
      const deCode = DecryptToken(token);

      const user = await fetchPolibatam({
        act: "GetBiodata",
        secretkey: deCode.secretkey,
      });

      if (user.data.error_code !== 0) {
        return Unauthorized(res, {}, "Unauthorized");
      }

      const isAdmin = (await FetchIsAdmin(user.data.data.id)) ? true : false;

      req.user = {
        ...user.data.data,
        isAdmin,
      };
      req.secretkey = deCode.secretkey;

      next();
    } catch (error) {
      return Unauthorized(res, {}, "Unauthorized");
    }
  },
};
