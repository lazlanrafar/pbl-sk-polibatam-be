const { InternalServerError, Ok } = require("../../utils/http-response");
const { StorePengajuan } = require("./pengajuan.Repository");

module.exports = {
  CreatePengajuan: async (req, res) => {
    try {
      await StorePengajuan(req.body);

      return Ok(res, {}, "Successfull to create pengajuan");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create pengajuan");
    }
  },
};
