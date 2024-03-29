const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { BodyReqDocumentMiddleware } = require("./document.Middleware");
const {
  CreateDocument,
  GetDocumentByType,
  GetDocumentById,
  EditDocument,
  DeleteDocument,
} = require("./document.Controller");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({
  storage: Storage,
}).fields([{ name: "filepath", maxCount: 1 }]);

router.get("/", GetDocumentByType);
router.get("/:id", GetDocumentById);

router.post("/", Upload, BodyReqDocumentMiddleware, CreateDocument);
router.put("/:id", Upload, BodyReqDocumentMiddleware, EditDocument);

router.delete("/:id", DeleteDocument);

module.exports = router;
