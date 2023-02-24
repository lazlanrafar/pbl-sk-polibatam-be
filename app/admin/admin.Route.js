const express = require("express");
const { SetAdmin, DeleteAdmin } = require("./admin.Controller");
const router = express.Router();

router.post("/", SetAdmin);
router.delete("/", DeleteAdmin);

module.exports = router;
