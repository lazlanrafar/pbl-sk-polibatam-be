const { InternalServerError, Ok } = require("../../utils/http-response");
const { StorePengajuan, FetchPengajuan } = require("./pengajuan.Repository");

module.exports = {
  GetPengajuan: async (req, res) => {
    try {
      let createdBy = "";
      if (!req.user.isAdmin) createdBy = req.user.id;

      const result = await FetchPengajuan(createdBy);

      return Ok(res, result, "Successfull to fetch pengajuan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pengajuan");
    }
  },
  CreatePengajuan: async (req, res) => {
    try {
      let data = {
        title: req.body.title,
        type: req.body.type,
        is_lampiran: req.body.is_lampiran,
        pickup_plan: req.body.pickup_plan,
        list_consider: req.body.list_consider,
        list_observe: req.body.list_observe,
        list_decide: req.body.list_decide,
        created_by: req.user.id,
      };

      if (req.body.is_lampiran) {
        data.filepath_lampiran = req.files.filepath_lampiran[0].filename;
      }

      await StorePengajuan(data);

      return Ok(res, {}, "Successfull to create pengajuan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create pengajuan");
    }
  },
};
