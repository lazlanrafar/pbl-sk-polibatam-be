const { Ok, InternalServerError } = require("../../utils/http-response");
const { FetchSuratKeputusan } = require("./surat-keputusan.repository");

module.exports = {
  ReadSuratKeputusan: async (req, res) => {
    try {
      const result = await FetchSuratKeputusan(req.params.id);
      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
