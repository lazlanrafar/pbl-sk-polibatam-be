const express = require("express");
const { CreatePengajuan, GetPengajuan } = require("./pengajuan.Controller");
const { PengajuanFormMiddleware } = require("./pengajuan.Middleware");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({
  storage: Storage,
}).fields([{ name: "filepath_lampiran", maxCount: 1 }]);

router.get("/", GetPengajuan);
router.post("/", Upload, PengajuanFormMiddleware, CreatePengajuan);

module.exports = router;
