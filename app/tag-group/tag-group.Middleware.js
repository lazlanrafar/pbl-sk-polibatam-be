const {
  BadRequest,
  InternalServerError,
} = require("../../utils/http-response");
const { FetchTagGroupByName } = require("./tag-group.Repository");

module.exports = {
  TagGroupFormMiddleware: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) return BadRequest(res, {}, "Name is required");

      const checkName = await FetchTagGroupByName(name);
      if (checkName) return BadRequest(res, {}, "Name already exists");

      req.body.data_mahasiswa = JSON.stringify(req.body.data_mahasiswa);
      req.body.data_pegawai = JSON.stringify(req.body.data_pegawai);
      req.body.created_by = req.user.id;

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tag group in middleware"
      );
    }
  },
};
