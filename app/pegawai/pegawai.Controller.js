const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError, BadRequest } = require("../../utils/http-response");
const { getRedis, setRedis, client } = require("../../utils/redis");
const { FetchIsAdmin, FetchAdmin } = require("../admin/admin.Repository");

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
      let result = [];

      client.connect();

      const responseRedis = await client.get("pegawai");

      if (responseRedis) {
        result = JSON.parse(responseRedis);
      } else {
        const token = await fetchPolibatam({
          act: "GetToken",
          secretkey: req.secretkey,
        });

        const responsePolibatam = await fetchPolibatam({
          act: "GetSemuaPegawai",
          token: token.data.data.token,
        });
        console.log("responsePolibatam");

        client.set("pegawai", JSON.stringify(responsePolibatam.data.data));
        client.expire("pegawai", 60 * 60 * 24);

        result = responsePolibatam.data.data;
      }

      client.disconnect();

      const listAdmin = await FetchAdmin();

      result.map((item) => {
        const isAdmin = listAdmin.find((admin) => admin.uid === item.nip);

        if (isAdmin) item.isAdmin = true;
        else item.isAdmin = false;
      });

      return Ok(res, result, "Successfull to fetch all pegawai");
    } catch (error) {
      console.log("error", error);
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

      return Ok(res, result.data.data[0], "Successfull to fetch pegawai by NIP");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pegawai by NIP");
    }
  },
};
