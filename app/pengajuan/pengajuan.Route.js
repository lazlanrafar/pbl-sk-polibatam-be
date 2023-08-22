const express = require("express");
const {
  CreatePengajuan,
  GetPengajuan,
  GetPengajuanById,
  DeletePengajuan,
  EditPengajuan,
  ApprovePengajuan,
  RejectPengajuan,
  PublishPengajuan,
} = require("./pengajuan.Controller");
const {
  PengajuanFormMiddleware,
  PengajuanFormPublishMiddleware,
} = require("./pengajuan.Middleware");

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

const UploadPublish = multer({
  storage: Storage,
}).fields([{ name: "filepath", maxCount: 1 }]);

router.get("/", GetPengajuan);
router.get("/:id", GetPengajuanById);

router.post("/approve", ApprovePengajuan);
router.post("/reject", RejectPengajuan);
router.post(
  "/publish/:id",
  UploadPublish,
  PengajuanFormPublishMiddleware,
  PublishPengajuan
);

router.post("/", Upload, PengajuanFormMiddleware, CreatePengajuan);

router.put("/:id", Upload, PengajuanFormMiddleware, EditPengajuan);
router.delete("/:id", DeletePengajuan);

module.exports = router;
