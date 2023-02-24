const { fetchPolibatam } = require("../../utils/fetch-polibatam");
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../../utils/http-response");
const {
  FetchIsAdmin,
  CreateAdmin,
  DestroyAdmin,
} = require("./user.repository");

module.exports = {
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
  GetAllPegawai: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetSemuaPegawai",
        token: token.data.data.token,
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
      console.log(error);
      return InternalServerError(res, error, "Failed to fetch all pegawai");
    }
  },
  GetPegawaiByNIK: async (req, res) => {
    try {
      const token = await fetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await fetchPolibatam({
        act: "GetDataByID",
        token: token.data.data.token,
        filter: `nik=${req.params.nik}`,
      });

      return Ok(
        res,
        result.data.data[0],
        "Successfull to fetch pegawai by NIK"
      );
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pegawai by NIK");
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
      console.log(error);
      return InternalServerError(res, error, "Failed to set admin");
    }
  },
  DeleteAdmin: async (req, res) => {
    try {
      const check = await FetchIsAdmin(req.body.uid);

      if (!check) {
        return BadRequest(res, {}, "User is not admin");
      }

      await DestroyAdmin(req.body.uid);

      return Ok(res, {}, "Successfull to delete admin");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete admin");
    }
  },
};
