const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreTagGroup,
  FetchTagGroup,
  FetchTagGroupById,
} = require("./tag-group.Repository");

module.exports = {
  GetTagGroup: async (req, res) => {
    try {
      const result = await FetchTagGroup();

      return Ok(res, result, "Successfull to get tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get tag group");
    }
  },
  GetTagGroupById: async (req, res) => {
    try {
      const result = await FetchTagGroupById(req.params.id);

      result.data_mahasiswa = JSON.parse(result.data_mahasiswa);
      result.data_pegawai = JSON.parse(result.data_pegawai);

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
