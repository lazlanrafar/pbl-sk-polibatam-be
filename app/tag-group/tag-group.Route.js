const express = require("express");
const { CreateTagGroup, GetTagGroup } = require("./tag-group.Controller");
const { TagGroupFormMiddleware } = require("./tag-group.Middleware");
const router = express.Router();

router.get("/", GetTagGroup);
router.post("/", TagGroupFormMiddleware, CreateTagGroup);

module.exports = router;
