const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreTagGroup, FetchTagGroup } = require("./tag-group.Repository");

module.exports = {
  GetTagGroup: async (req, res) => {
    try {
      const result = await FetchTagGroup();

      result.forEach((item) => {
        item.data_mahasiswa = JSON.parse(item.data_mahasiswa);
        item.data_pegawai = JSON.parse(item.data_pegawai);
      });

      return Ok(res, result, "Successfull to get tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get tag group");
    }
  },
  CreateTagGroup: async (req, res) => {
    try {
      await StoreTagGroup(req.body);

      return Ok(res, {}, "Successfull to create tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create tag group");
    }
  },
};
