const express = require("express");
const { GetAllMahasiswa } = require("./user.controller");
const router = express.Router();

router.get("/mahasiswa", GetAllMahasiswa);

module.exports = router;
