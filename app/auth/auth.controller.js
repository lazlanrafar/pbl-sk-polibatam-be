const axios = require("axios");
const { Ok, InternalServerError } = require("../../utils/http-response");

module.exports = {
  login: async (req, res) => {
    try {
      await axios({
        method: "post",
        url: process.env.API_POLIBATAM_URL + "/login",
        data: {
          username: req.body.username,
          password: req.body.password,
          token: process.env.API_POLIBATAM_TOKEN,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.data.status == "success") {
          Ok(res, response.data.data, response.data.message);
        } else {
          InternalServerError(res, {}, "Username atau password salah");
        }
      });
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
};
