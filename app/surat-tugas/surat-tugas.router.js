const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { ReadSuratTugas } = require("./surat-tugas.controller");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(null, "SuratTugas-" + Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({
  storage: Storage,
}).fields([{ name: "filePath", maxCount: 1 }]);

router.get("/:id?", ReadSuratTugas);

module.exports = router;
