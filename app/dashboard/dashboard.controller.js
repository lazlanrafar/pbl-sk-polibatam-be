const { Ok, InternalServerError } = require("../../utils/http-response");
const {
  FetchTotalSuratTugas,
  FetchTotalSuratKeputusan,
  FetchTotalTagGroup,
  FetchTotalAdmin,
  FetchRecentFileSuratTugas,
  FetchRecentFileSuratKeputusan,
} = require("./dashboard.repository");

module.exports = {
  FetchDashboard: async (req, res) => {
    try {
      const totalSuratTugas = await FetchTotalSuratTugas();
      const totalSuratKeputusan = await FetchTotalSuratKeputusan();
      const totalTagGroup = await FetchTotalTagGroup();
      const totalAdmin = await FetchTotalAdmin();

      const recentFileSuratTugas = await FetchRecentFileSuratTugas();
      recentFileSuratTugas.forEach((item) => {
        item.type = "surat-tugas";
      });
      const recentFileSuratKeputusan = await FetchRecentFileSuratKeputusan();
      recentFileSuratKeputusan.forEach((item) => {
        item.type = "surat-keputusan";
      });

      let recentFile = [...recentFileSuratTugas, ...recentFileSuratKeputusan];

      recentFile.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      if (req.query.nim) {
        let resultNim = [];
        for (const iterator of recentFile) {
          let tag = JSON.parse(iterator.TagGroup.tag);
          for (const t of tag) {
            if (t.nim_nik_unit == req.query.nim) {
              resultNim.push(iterator);
              break;
            }
          }
        }
        recentFile = resultNim;
      }

      const result = {
        totalSuratTugas,
        totalSuratKeputusan,
        totalTagGroup,
        totalAdmin,
        recentFile,
      };

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
