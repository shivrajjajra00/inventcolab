const adminController = require("../controllers/admincontroller");
const tokenverify = require("../middlewares/tokenVerify");
const express = require("express");
const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

module.exports = router;
