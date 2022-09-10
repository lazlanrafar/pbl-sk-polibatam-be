const { Ok, InternalServerError } = require("../../utils/http-response");
const {
  FetchSuratTugas,
  CreateSuratTuas,
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
};
