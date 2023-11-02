const axios = require("axios");
const urlApiPolibatam = process.env.API_POLIBATAM_URL;
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  // cert: fs.readFileSync(certificatePath),
});

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
      httpsAgent: httpsAgent,
    });
  },
};
