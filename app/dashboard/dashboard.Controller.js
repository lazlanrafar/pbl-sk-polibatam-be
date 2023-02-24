const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchDocumentDashboard } = require("./dashboard.Repository");

module.exports = {
  GetDashboard: async (req, res) => {
    try {
      const user = req.user;

      const document = await FetchDocumentDashboard();
      document.forEach((element) => {
        element.data_mahasiswa = JSON.parse(element.data_mahasiswa);
        element.data_pegawai = JSON.parse(element.data_pegawai);

        element.details.forEach((el) => {
          for (const iterator of JSON.parse(el.tag_group.data_mahasiswa)) {
            element.data_mahasiswa.push(iterator);
          }
          for (const iterator of JSON.parse(el.tag_group.data_pegawai)) {
            element.data_pegawai.push(iterator);
          }
        });

        delete element.details;
      });

      let length_sk = 0;
      let length_st = 0;
      let recent = [];

      if (user.isAdmin) {
        length_sk = document.filter(
          (el) => el.type === "Surat Keterangan"
        ).length;
        length_st = document.filter((el) => el.type === "Surat Tugas").length;

        recent = document
          .sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          })
          .slice(0, 5);
      }

      if (!user.isAdmin) {
        if (user.role == "Mahasiswa") {
          length_sk = document.filter(
            (el) =>
              el.type === "Surat Keterangan" &&
              el.data_mahasiswa.some((el) => el.NRP == user.id)
          ).length;
          length_st = document.filter(
            (el) =>
              el.type === "Surat Tugas" &&
              el.data_mahasiswa.some((el) => el.NRP == user.id)
          ).length;

          recent = document
            .filter((el) => el.data_mahasiswa.some((el) => el.NRP == user.id))
            .sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .slice(0, 5);
        } else {
          length_sk = document.filter(
            (el) =>
              el.type === "Surat Keterangan" &&
              el.data_pegawai.some((el) => el.NIP == user.id)
          ).length;
          length_st = document.filter(
            (el) =>
              el.type === "Surat Tugas" &&
              el.data_pegawai.some((el) => el.NIP == user.id)
          ).length;

          recent = document
            .filter((el) => el.data_pegawai.some((el) => el.NIP == user.id))
            .sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .slice(0, 5);
        }
      }

      recent.forEach((element) => {
        delete element.data_mahasiswa;
        delete element.data_pegawai;
      });

      const data = {
        length_sk,
        length_st,
        recent,
      };

      return Ok(res, data, "Welcome to Dashboard");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch dashboard");
    }
  },
};
