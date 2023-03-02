const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StorePengajuan,
  FetchPengajuan,
  FetchPengajuanById,
  DestoryPengajuan,
  UpdatePengajuan,
} = require("./pengajuan.Repository");

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
  GetPengajuanById: async (req, res) => {
    try {
      const result = await FetchPengajuanById(req.params.id);

      result.list_consider = JSON.parse(result.list_consider);
      result.list_observe = JSON.parse(result.list_observe);
      result.list_decide = JSON.parse(result.list_decide);

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
  EditPengajuan: async (req, res) => {
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

      if (req.body.is_lampiran && req.files.filepath_lampiran) {
        data.filepath_lampiran = req.files.filepath_lampiran[0].filename;
      }

      await UpdatePengajuan(req.params.id, data);

      return Ok(res, {}, "Successfull to update pengajuan");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to update pengajuan");
    }
  },
  DeletePengajuan: async (req, res) => {
    try {
      await DestoryPengajuan(req.params.id);

      return Ok(res, {}, "Successfull to delete pengajuan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete pengajuan");
    }
  },
};
