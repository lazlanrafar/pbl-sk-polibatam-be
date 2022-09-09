const express = require("express");
const {
  ReadTagGroup,
  CreateTagGroup,
  UpdateTagGroup,
  DeleteTagGroup,
} = require("./tag-gorup.controller");
const router = express.Router();

router.get("/:id?", ReadTagGroup);
router.post("/", CreateTagGroup);
router.put("/:id", UpdateTagGroup);
router.delete("/:id", DeleteTagGroup);

module.exports = router;
