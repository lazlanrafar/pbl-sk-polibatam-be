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
  GetAllMahasiswa: async (req, res) => {
    try {
      const { angkatan } = req.query;
      const year = angkatan ? angkatan : new Date().getFullYear();

      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaMahasiswa",
        token: token.data.data.token,
        filter: `angkatan=${year}`,
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
