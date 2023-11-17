const resourcesController = require("../controllers/resources");
const tokenverify = require("../middlewares/tokenVerify");
const express = require("express");
const router = express.Router();

router.post("/signup", tokenverify, resourcesController.signup);
router.post("/login", tokenverify, resourcesController.login);
router.get("/all", tokenverify, resourcesController.getAllUsers);
router.get("/all/:id", tokenverify, resourcesController.getUserById);
router.delete("/all/:id", tokenverify, resourcesController.deleteUser);
router.put("/all/:id", tokenverify, resourcesController.updateUserById);

module.exports = router;
