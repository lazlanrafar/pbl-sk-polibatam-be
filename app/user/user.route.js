const express = require("express");
const {
  GetAllMahasiswa,
  GetAllPegawai,
  GetMahasiswaByNIM,
  SetAdmin,
  DeleteAdmin,
} = require("./user.controller");
const router = express.Router();

router.get("/mahasiswa", GetAllMahasiswa);
router.get("/mahasiswa/:nim", GetMahasiswaByNIM);

router.get("/pegawai", GetAllPegawai);

router.post("/admin", SetAdmin);
router.delete("/admin", DeleteAdmin);

module.exports = router;
