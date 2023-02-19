const express = require("express");
const {
  GetAllMahasiswa,
  GetAllPegawai,
  GetMahasiswaByNIM,
} = require("./user.controller");
const router = express.Router();

router.get("/mahasiswa", GetAllMahasiswa);
router.get("/mahasiswa/:nim", GetMahasiswaByNIM);

router.get("/pegawai", GetAllPegawai);

module.exports = router;
