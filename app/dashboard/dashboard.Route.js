const express = require("express");
const { GetDashboard } = require("./dashboard.Controller");
const router = express.Router();

router.get("/", GetDashboard);

module.exports = router;
