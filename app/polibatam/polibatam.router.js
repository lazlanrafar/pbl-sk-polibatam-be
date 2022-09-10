const express = require("express");
const router = express.Router();
const {
  Login,
  ReadDosen,
  ReadMahasiswa,
  ReadMahasiswaByNim,
} = require("./polibatam.controller");

router.post("/login", Login);
router.get("/dosen", ReadDosen);
router.get("/mahasiswa", ReadMahasiswa);
router.get("/mahasiswa/:nim", ReadMahasiswaByNim);

module.exports = router;
