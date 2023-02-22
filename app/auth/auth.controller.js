const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { EncryptToken } = require("../../utils/jwt");
const { FetchIsAdmin } = require("../user/user.repository");

module.exports = {
  Login: async (req, res) => {
    try {
      const body = req.body;

      const resLogin = await fetchPolibatam({
        act: "Login",
        username: body.username,
        password: body.password,
      });

      if (resLogin.data.error_code === 102) {
        return InternalServerError(res, {}, resLogin.data.error_desc);
      }

      const result = await fetchPolibatam({
        act: "GetBiodata",
        secretkey: resLogin.data.data.secretkey,
      });

      const token = EncryptToken({
        secretkey: resLogin.data.data.secretkey,
      });

      const isAdmin = (await FetchIsAdmin(result.data.data.id)) ? true : false;

      const payload = {
        user: {
          ...result.data.data,
          isAdmin,
        },
        token,
      };

      return Ok(res, payload, "User logged in successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to login user");
    }
  },
};