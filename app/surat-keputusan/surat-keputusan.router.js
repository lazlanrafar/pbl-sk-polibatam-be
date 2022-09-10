const express = require("express");
const {
  ReadSuratKeputusan,
  CreateSuratKeputusan,
} = require("./surat-keputusan.controller");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(null, "SuratKeputusan-" + Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({
  storage: Storage,
}).fields([{ name: "filePath", maxCount: 1 }]);

router.get("/:id?", ReadSuratKeputusan);
router.post("/", Upload, CreateSuratKeputusan);

module.exports = router;
