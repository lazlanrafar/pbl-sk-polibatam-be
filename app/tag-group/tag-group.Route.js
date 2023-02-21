const express = require("express");
const { CreateTagGroup } = require("./tag-group.Controller");
const { TagGroupFormMiddleware } = require("./tag-group.Middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/", TagGroupFormMiddleware, CreateTagGroup);

module.exports = router;
