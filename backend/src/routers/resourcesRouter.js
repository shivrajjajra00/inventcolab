const resourcesController = require("../controllers/resources");
const tokenverify = require("../middlewares/tokenVerify");
const express = require("express");
const router = express.Router();

router.post("/signup", resourcesController.signup);
router.post("/login", resourcesController.login);

module.exports = router;
