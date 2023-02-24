const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { FetchIsAdmin } = require("../user/user.repository");

module.exports = {
  GetAllUnitPegawai: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaUnit",
        token: token.data.data.token,
      });

      return Ok(res, result.data.data, "Successfull to fetch all unit");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all unit");
    }
  },
  GetAllPegawai: async (req, res) => {
    try {
      const { unit } = req.query;

      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaPegawai",
        token: token.data.data.token,
        filter: `unit=${unit}`,
      });

      let data = [];
      for (const iterator of result.data.data) {
        let isAdmin = iterator.NIK ? await FetchIsAdmin(iterator.NIK) : false;

        data.push({
          ...iterator,
          isAdmin: isAdmin ? true : false,
        });
      }

      return Ok(res, data, "Successfull to fetch all pegawai");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all pegawai");
    }
  },
  GetPegawaiByNIP: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetDataByID",
        token: token.data.data.token,
        filter: `nip=${req.params.nip}`,
      });

      return Ok(
        res,
        result.data.data[0],
        "Successfull to fetch pegawai by NIP"
      );
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pegawai by NIP");
    }
  },
};
