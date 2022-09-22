const express = require("express");
const router = express.Router();
const {
  Login,
  ReadDosen,
  ReadMahasiswa,
  ReadMahasiswaByNim,
  SetIsAdmin,
  UnsetIsAdmin,
} = require("./polibatam.controller");

router.post("/login", Login);
router.get("/dosen", ReadDosen);
router.get("/mahasiswa", ReadMahasiswa);
router.get("/mahasiswa/:nim", ReadMahasiswaByNim);
router.get("/setAdmin/:nim", SetIsAdmin);
router.delete("/unsetAdmin/:nim", UnsetIsAdmin);

module.exports = router;
