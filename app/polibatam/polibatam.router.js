const express = require("express");
const router = express.Router();
const { Login, ReadDosen, ReadMahasiswa } = require("./polibatam.controller");

router.post("/login", Login);
router.get("/dosen", ReadDosen);
router.get("/mahasiswa", ReadMahasiswa);

module.exports = router;
