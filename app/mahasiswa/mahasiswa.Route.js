const express = require("express");
const router = express.Router();
const {
  GetAllMahasiswa,
  GetMahasiswaByNIM,
  GetAllJurusan,
} = require("./mahasiswa.Controller");

router.get("/jurusan", GetAllJurusan);

router.get("/", GetAllMahasiswa);
router.get("/:nim", GetMahasiswaByNIM);

module.exports = router;
