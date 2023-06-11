const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");

module.exports = {
  BodyReqDocumentMiddleware: async (req, res, next) => {
    try {
      if (req.body.data_pegawai.length == 0 && req.body.details.length == 0) {
        return BadRequest(res, {}, "data pegawai is required");
      }
      req.body.date = new Date(req.body.date);
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
