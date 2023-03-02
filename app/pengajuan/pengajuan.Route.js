const express = require("express");
const { CreatePengajuan } = require("./pengajuan.Controller");
const { PengajuanFormMiddleware } = require("./pengajuan.Middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pengajuan");
});
router.post("/", PengajuanFormMiddleware, CreatePengajuan);

module.exports = router;
