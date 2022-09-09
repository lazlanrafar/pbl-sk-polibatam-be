const express = require("express");
const { ReadTagGroup, CreateTagGroup } = require("./tag-gorup.controller");
const router = express.Router();

router.get("/:id?", ReadTagGroup);
router.post("/", CreateTagGroup);

module.exports = router;
