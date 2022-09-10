const { Ok, InternalServerError } = require("../../utils/http-response");
const {
  FetchSuratKeputusan,
  CreateSuratKeputusan,
} = require("./surat-keputusan.repository");

module.exports = {
  ReadSuratKeputusan: async (req, res) => {
    try {
      const result = await FetchSuratKeputusan(req.params.id);

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  CreateSuratKeputusan: async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        filePath: req.files.filePath[0].path.split("\\").pop(),
        deskripsi: req.body.deskripsi,
        tagId: +req.body.tagId,
        createdBy: req.body.createdBy,
      };
      const result = await CreateSuratKeputusan(payload);
      return Ok(res, result, "Berhasil membuat Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
