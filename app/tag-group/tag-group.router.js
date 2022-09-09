const express = require("express");
const {
  ReadTagGroup,
  CreateTagGroup,
  UpdateTagGroup,
} = require("./tag-gorup.controller");
const router = express.Router();

router.get("/:id?", ReadTagGroup);
router.post("/", CreateTagGroup);
router.put("/:id", UpdateTagGroup);

module.exports = router;
