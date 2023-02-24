const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../../utils/http-response");
const {
  FetchDocumentByIdTagGroup,
} = require("../document/document.Repository");
const {
  StoreTagGroup,
  FetchTagGroup,
  FetchTagGroupById,
  UpdateTagGroup,
  DestroyTagGroup,
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
  EditTagGroup: async (req, res) => {
    try {
      await UpdateTagGroup(req.params.id, req.body);

      return Ok(res, {}, "Successfull to update tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to update tag group");
    }
  },
  DeleteTagGroup: async (req, res) => {
    try {
      const check = await FetchTagGroupById(req.params.id);
      if (!check) return BadRequest(res, {}, "Tag group not found");

      const checkDocument = await FetchDocumentByIdTagGroup(req.params.id);
      if (checkDocument.length > 0) {
        return BadRequest(res, {}, "Tag group is used in document");
      }

      await DestroyTagGroup(req.params.id);

      return Ok(res, {}, "Successfull to delete tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete tag group");
    }
  },
};
