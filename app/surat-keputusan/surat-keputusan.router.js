const express = require("express");
const { ReadSuratKeputusan } = require("./surat-keputusan.controller");
const router = express.Router();

router.get("/", ReadSuratKeputusan);

module.exports = router;
