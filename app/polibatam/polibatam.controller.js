const axios = require("axios");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  Login: async (req, res) => {
    try {
      await axios({
        method: "post",
        url: process.env.API_POLIBATAM_URL + "/login",
        data: {
          username: req.body.username,
          password: req.body.password,
          token: process.env.API_POLIBATAM_TOKEN,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.data.status == "success") {
          Ok(res, response.data.data, response.data.message);
        } else {
          InternalServerError(res, {}, "Username atau password salah");
        }
      });
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
  ReadDosen: async (req, res) => {
    try {
      const result = await axios({
        method: "post",
        url:
          process.env.API_POLIBATAM_URL +
          "/tampilkan-semua?pilih=1&token=" +
          process.env.API_POLIBATAM_TOKEN,
      });

      const admins = await prisma.admin.findMany();

      const data = [];
      result.data.data.filter((item) => {
        const admin = admins.find((admin) => admin.nim == item.nim_nik_unit);
        if (admin) {
          data.push({
            ...item,
            isAdmin: true,
          });
        } else {
          data.push({
            ...item,
            isAdmin: false,
          });
        }
      });

      Ok(res, data, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
  ReadMahasiswa: async (req, res) => {
    try {
      const result = await axios({
        method: "post",
        url:
          process.env.API_POLIBATAM_URL +
          "/tampilkan-semua?pilih=0&token=" +
          process.env.API_POLIBATAM_TOKEN,
      });

      const admins = await prisma.admin.findMany();

      const data = [];
      result.data.data.filter((item) => {
        const admin = admins.find((admin) => admin.nim == item.nim_nik_unit);
        if (admin) {
          data.push({
            ...item,
            isAdmin: true,
          });
        } else {
          data.push({
            ...item,
            isAdmin: false,
          });
        }
      });

      Ok(res, data, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
  ReadMahasiswaByNim: async (req, res) => {
    try {
      await axios({
        method: "post",
        url: process.env.API_POLIBATAM_URL + "/cek-id?id=" + req.params.nim,
      }).then((response) => {
        Ok(res, response.data.data, response.data.message);
      });
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
  SetIsAdmin: async (req, res) => {
    try {
      const check = await prisma.admin.findUnique({
        where: {
          nim: req.params.nim,
        },
      });
      if (check) {
        return InternalServerError(res, {}, "User sudah menjadi Admin");
      }

      const result = await prisma.admin.create({
        data: {
          nim: req.params.nim,
        },
      });

      Ok(res, result, "Berhasil mengubah status admin");
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
  UnsetIsAdmin: async (req, res) => {
    try {
      const result = await prisma.admin.delete({
        where: {
          nim: req.params.nim,
        },
      });

      Ok(res, result, "Berhasil mengubah status admin");
    } catch (error) {
      InternalServerError(res, {}, error);
    }
  },
};
