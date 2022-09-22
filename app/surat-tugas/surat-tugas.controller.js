const { Ok, InternalServerError } = require("../../utils/http-response");
const {
  FetchSuratTugas,
  CreateSuratTuas,
  UpdateSuratTugas,
  DeleteSuratTugas,
} = require("./surat-tugas.repository");

module.exports = {
  ReadSuratTugas: async (req, res) => {
    try {
      const result = await FetchSuratTugas(req.params.id);

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  CreateSuratTugas: async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        filePath: req.files.filePath[0].path.split("\\").pop(),
        deskripsi: req.body.deskripsi,
        tagId: +req.body.tagId,
        createdBy: req.body.createdBy,
      };

      const result = await CreateSuratTuas(payload);

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  UpdateSuratTugas: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        tagId: +req.body.tagId,
      };

      if (req.files.filePath) {
        payload.filePath = req.files.filePath[0].path.split("\\").pop();
      }

      // console.log(payload);

      const result = await UpdateSuratTugas(req.params.id, payload);
      return Ok(res, result, "Berhasil mengubah Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  DeleteSuratTugas: async (req, res) => {
    try {
      const result = await DeleteSuratTugas(req.params.id);
      return Ok(res, result, "Berhasil menghapus Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
