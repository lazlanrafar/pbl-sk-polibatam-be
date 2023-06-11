const { CreateBorangPengajuanSurat } = require("../../utils/create-file");
const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreDocument,
  StoreDocumentDetail,
} = require("../document/document.Repository");
const {
  StorePengajuan,
  FetchPengajuan,
  FetchPengajuanById,
  DestoryPengajuan,
  UpdatePengajuan,
  StorePengajuanDetail,
  DestroyAllPengajuanDetailByIdPengajuan,
} = require("./pengajuan.Repository");
const moment = require("moment");

module.exports = {
  GetPengajuan: async (req, res) => {
    try {
      let createdBy = "";
      if (!req.user.isAdmin) createdBy = req.user.id;

      const result = await FetchPengajuan(createdBy);

      return Ok(res, result, "Successfull to fetch pengajuan");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to fetch pengajuan");
    }
  },
  GetPengajuanById: async (req, res) => {
    try {
      const result = await FetchPengajuanById(req.params.id);

      result.list_consider = JSON.parse(result.list_consider);
      result.list_observe = JSON.parse(result.list_observe);
      result.list_decide = JSON.parse(result.list_decide);
      result.data_pegawai = JSON.parse(result.data_pegawai);

      result.details.forEach((element) => {
        element.tag_group.data_pegawai = JSON.parse(
          element.tag_group.data_pegawai
        );
      });

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
        data_pegawai: req.body.data_pegawai,
        created_by: req.user.nama,
      };

      if (req.body.is_lampiran) {
        data.filepath_lampiran = req.files.filepath_lampiran[0].filename;
      }

      const result = await StorePengajuan(data);

      for (const iterator of req.body.details) {
        await StorePengajuanDetail({
          id_pengajuan: result.id,
          id_tag_group: iterator.id,
        });
      }

      return Ok(res, {}, "Successfull to create pengajuan");
    } catch (error) {
      console.log(error);
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
        data_pegawai: req.body.data_pegawai,
        status: "POSTED",
      };

      if (req.body.is_lampiran && req.files.filepath_lampiran) {
        data.filepath_lampiran = req.files.filepath_lampiran[0].filename;
      }

      const result = await UpdatePengajuan(req.params.id, data);

      await DestroyAllPengajuanDetailByIdPengajuan(req.params.id);

      for (const iterator of req.body.details) {
        await StorePengajuanDetail({
          id_pengajuan: result.id,
          id_tag_group: iterator.id,
        });
      }

      return Ok(res, {}, "Successfull to update pengajuan");
    } catch (error) {
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
  ApprovePengajuan: async (req, res) => {
    try {
      const pengajuan = await FetchPengajuanById(req.body.id_pengajuan);

      pengajuan.list_consider = JSON.parse(pengajuan.list_consider);
      pengajuan.list_observe = JSON.parse(pengajuan.list_observe);
      pengajuan.list_decide = JSON.parse(pengajuan.list_decide);

      let list_consider = [];
      pengajuan.list_consider.forEach((element, i) => {
        list_consider.push({
          item: `${i + 1}. ${element}`,
        });
      });

      let list_observe = [];
      pengajuan.list_observe.forEach((element, i) => {
        list_observe.push({
          item: `${i + 1}. ${element}`,
        });
      });

      let list_decide = [];
      pengajuan.list_decide.forEach((element, i) => {
        list_decide.push({
          item: `${i + 1}. ${element}`,
        });
      });

      const data_docs = {
        title: pengajuan.title,
        list_consider: list_consider,
        list_observe: list_observe,
        list_decide: list_decide,
        type: pengajuan.type,
        is_lampiran: pengajuan.is_lampiran ? "Ada" : "Tidak Ada",
        date_issue: moment().format("DD MMMM YYYY"),
        pickup_plan: moment(pengajuan.pickup_plan).format("DD MMMM YYYY"),
        created_at: moment(pengajuan.created_at).format("DD MMMM YYYY"),
        created_by: pengajuan.created_by,
      };

      const File = await CreateBorangPengajuanSurat(data_docs);
      console.log(File);

      if (!File) {
        throw new Error("Gagal Membuat File Borang Pengajuan Surat");
      }

      await UpdatePengajuan(req.body.id_pengajuan, {
        status: "APPROVED",
        date_issue: new Date(),
        filepath: File,
      });

      return Ok(res, {}, "Successfull to approve pengajuan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to approve pengajuan");
    }
  },
  RejectPengajuan: async (req, res) => {
    try {
      await UpdatePengajuan(req.body.id_pengajuan, {
        status: "REJECTED",
        remarks: req.body.remarks,
      });

      return Ok(res, {}, "Successfull to reject pengajuan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to reject pengajuan");
    }
  },
  PublishPengajuan: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await StoreDocument({
        type: req.body.type,
        date: req.body.date,
        filepath: req.files.filepath[0].filename,
        name: req.body.name,
        remarks: req.body.remarks,
        data_pegawai: req.body.data_pegawai,
        created_by: req.body.created_by,
      });

      for (const iterator of req.body.details) {
        await StoreDocumentDetail({
          id_document: result.id,
          id_tag_group: iterator.id,
        });
      }

      await UpdatePengajuan(id, {
        status: "PUBLISHED",
      });

      return Ok(res, {}, "Successfull to publish pengajuan");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to publish pengajuan");
    }
  },
};
