const { Ok, InternalServerError } = require("../../utils/http-response");
const { FetchSuratTugas } = require("./surat-tugas.repository");

module.exports = {
  ReadSuratTugas: async (req, res) => {
    try {
      const result = await FetchSuratTugas(req.params.id);

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
