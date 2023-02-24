const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../../utils/http-response");
const {
  FetchIsAdmin,
  CreateAdmin,
  DestroyAdmin,
} = require("./admin.Repository");

module.exports = {
  SetAdmin: async (req, res) => {
    try {
      const check = await FetchIsAdmin(req.body.uid);

      if (check) {
        return Ok(res, {}, "User already admin");
      }

      await CreateAdmin(req.body.uid);

      return Ok(res, {}, "Successfull to set admin");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to set admin");
    }
  },
  DeleteAdmin: async (req, res) => {
    try {
      const check = await FetchIsAdmin(req.body.uid);

      if (!check) {
        return BadRequest(res, {}, "User is not admin");
      }

      await DestroyAdmin(req.body.uid);

      return Ok(res, {}, "Successfull to delete admin");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete admin");
    }
  },
};
