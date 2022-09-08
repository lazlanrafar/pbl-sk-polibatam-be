const axios = require("axios");
const { Ok, InternalServerError } = require("../../utils/http-response");

module.exports = {
  read: async (req, res) => {
    try {
      await axios({
        method: "post",
        url:
          process.env.API_POLIBATAM_URL +
          "/tampilkan-semua?pilih=1&token=" +
          process.env.API_POLIBATAM_TOKEN,
      }).then((response) => {
        Ok(res, response.data.data, response.data.message);
      });
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
};
