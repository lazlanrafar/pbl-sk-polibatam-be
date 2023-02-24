const express = require("express");
const router = express.Router();
const {
  GetAllPegawai,
  GetPegawaiByNIP,
  GetAllUnitPegawai,
} = require("./pegawai.Controller");

router.get("/unit", GetAllUnitPegawai);

router.get("/", GetAllPegawai);
router.get("/:nip", GetPegawaiByNIP);

module.exports = router;
