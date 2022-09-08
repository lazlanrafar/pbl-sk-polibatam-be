const express = require("express");
const router = express.Router();
const { read } = require("./mahasiswa.controller");

router.get("/", read);

module.exports = router;
