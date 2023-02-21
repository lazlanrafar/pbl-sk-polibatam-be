const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreTagGroup } = require("./tag-group.Repository");

module.exports = {
  CreateTagGroup: async (req, res) => {
    try {
      await StoreTagGroup(req.body);

      return Ok(res, {}, "Successfull to create tag group");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create tag group");
    }
  },
};
