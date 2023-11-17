const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController.js");
const tokenVerify = require("../middlewares/tokenVerify.js");

router.get("/user/:id", dashboardController.getUserById);

module.exports = router;
