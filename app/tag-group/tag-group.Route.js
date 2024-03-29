const express = require("express");
const {
  CreateTagGroup,
  GetTagGroup,
  GetTagGroupById,
  EditTagGroup,
  DeleteTagGroup,
} = require("./tag-group.Controller");
const { TagGroupFormMiddleware } = require("./tag-group.Middleware");
const router = express.Router();

router.get("/", GetTagGroup);
router.get("/:id", GetTagGroupById);
router.post("/", TagGroupFormMiddleware, CreateTagGroup);
router.put("/:id", TagGroupFormMiddleware, EditTagGroup);
router.delete("/:id", DeleteTagGroup);

module.exports = router;
