const express = require("express");
const { FetchDashboard } = require("./dashboard.controller");
const router = express.Router();

router.get("/", FetchDashboard);

module.exports = router;
