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

const moment = require("moment");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(
      null,
      "Docs" +
        moment().format("DD-MM-YYYY hh-mm-ss") +
        path.extname(file.originalname)
    );
  },
});

const Upload = multer({
  storage: Storage,
}).fields([{ name: "filepath", maxCount: 1 }]);

router.get("/type/:type", GetDocumentByType);
router.get("/:id", GetDocumentById);

router.post("/", Upload, BodyReqDocumentMiddleware, CreateDocument);
router.put("/:id", Upload, BodyReqDocumentMiddleware, EditDocument);

router.delete("/:id", DeleteDocument);

module.exports = router;
