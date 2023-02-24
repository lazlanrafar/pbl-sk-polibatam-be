const axios = require("axios");
const urlApiPolibatam = process.env.API_POLIBATAM_URL;

module.exports = {
  fetchPolibatam: async (data) => {
    return await axios({
      url: urlApiPolibatam,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  },
};
