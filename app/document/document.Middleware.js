const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");

module.exports = {
  BodyReqDocumentMiddleware: async (req, res, next) => {
    try {
      if (
        req.body.data_mahasiswa.length == 0 &&
        req.body.data_pegawai.length == 0 &&
        req.body.details.length == 0
      ) {
        return BadRequest(
          res,
          {},
          "Data mahasiswa and data pegawai is required"
        );
      }

      //   req.body.data_mahasiswa = JSON.stringify(req.body.data_mahasiswa);
      //   req.body.data_pegawai = JSON.stringify(req.body.data_pegawai);

      req.body.details = JSON.parse(req.body.details);
      if (!req.params.id) req.body.created_by = req.user.id;

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create document in middleware"
      );
    }
  },
};
