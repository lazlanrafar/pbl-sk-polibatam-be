const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { FetchIsAdmin } = require("../user/user.repository");

module.exports = {
  GetAllJurusan: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaJurusan",
        token: token.data.data.token,
      });

      return Ok(res, result.data.data, "Successfull to fetch all jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all jurusan");
    }
  },
  GetAllProdi: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaProdi",
        token: token.data.data.token,
      });

      return Ok(res, result.data.data, "Successfull to fetch all prodi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all prodi");
    }
  },
  GetAllMahasiswa: async (req, res) => {
    try {
      const { jurusan, prodi } = req.query;

      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaMahasiswa",
        token: token.data.data.token,
        filter: `jurusan=${jurusan}&prodi=${prodi}`,
      });

      let data = [];
      for (const iterator of result.data.data) {
        let isAdmin = await FetchIsAdmin(iterator.NRP);

        data.push({
          ...iterator,
          isAdmin: isAdmin ? true : false,
        });
      }

      return Ok(res, data, "Successfull to fetch all mahasiswa");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all mahasiswa");
    }
  },
  GetMahasiswaByNIM: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetDataByID",
        token: token.data.data.token,
        filter: `nim=${req.params.nim}`,
      });

      return Ok(
        res,
        result.data.data[0],
        "Successfull to fetch mahasiswa by NIM"
      );
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to fetch mahasiswa by NIM"
      );
    }
  },
};
