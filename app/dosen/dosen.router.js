const express = require("express");
const router = express.Router();
const { read } = require("./dosen.controller");

router.get("/", read);

module.exports = router;
