const express = require("express");
const { ReadTagGroup } = require("./tag-gorup.controller");
const router = express.Router();

router.get("/:id?", ReadTagGroup);

module.exports = router;
