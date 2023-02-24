const express = require("express");
const router = express.Router();
const {
  GetAllMahasiswa,
  GetMahasiswaByNIM,
  GetAllJurusan,
  GetAllProdi,
} = require("./mahasiswa.Controller");

router.get("/jurusan", GetAllJurusan);
router.get("/prodi", GetAllProdi);

router.get("/", GetAllMahasiswa);
router.get("/:nim", GetMahasiswaByNIM);

module.exports = router;
