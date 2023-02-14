const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { InternalServerError, Ok } = require("../../utils/http-response");

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

      return Ok(res, result.data.data, "Successfull to fetch all mahasiswa");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all mahasiswa");
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
      console.log(error);
      return InternalServerError(res, error, "Failed to fetch all pegawai");
    }
  },
};
