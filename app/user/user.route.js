const express = require("express");
const { GetAllMahasiswa, GetAllPegawai } = require("./user.controller");
const router = express.Router();

router.get("/mahasiswa", GetAllMahasiswa);
router.get("/pegawai", GetAllPegawai);

module.exports = router;
