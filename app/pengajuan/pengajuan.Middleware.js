const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");

module.exports = {
  PengajuanFormMiddleware: async (req, res, next) => {
    try {
      if (req.body.list_consider[0] == "") {
        return BadRequest(res, {}, "List consider is required");
      }
      if (req.body.list_observe[0] == "") {
        return BadRequest(res, {}, "List observe is required");
      }
      if (req.body.list_decide[0] == "") {
        return BadRequest(res, {}, "List decide is required");
      }

      req.body.list_consider = JSON.stringify(req.body.list_consider);
      req.body.list_observe = JSON.stringify(req.body.list_observe);
      req.body.list_decide = JSON.stringify(req.body.list_decide);

      if (!req.params.id) req.body.created_by = req.user.id;

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create pengajuan in middleware"
      );
    }
  },
};
