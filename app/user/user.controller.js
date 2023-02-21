const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchIsAdmin, CreateAdmin } = require("./user.repository");

module.exports = {
  GetAllMahasiswa: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaMahasiswa",
        token: token.data.data.token,
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
  GetAllPegawai: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });
      console.log("token", token);

      const result = await fetchPolibatam({
        act: "GetSemuaPegawai",
        token: token.data.data.token,
      });

      console.log("result", result);

      return Ok(res, result.data.data, "Successfull to fetch all pegawai");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all pegawai");
    }
  },
  SetAdmin: async (req, res) => {
    try {
      const check = await FetchIsAdmin(req.body.uid);

      if (check) {
        return Ok(res, {}, "User already admin");
      }

      await CreateAdmin(req.body.uid);

      return Ok(res, {}, "Successfull to set admin");
    } catch (error) {
      return InternalServerError(res, error, "Failed to set admin");
    }
  },
};
