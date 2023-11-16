const express = require("express");
const router = express.Router();
const clientcontroller = require("../controllers/clientcontroller.js");
const tokenVerify = require("../middlewares/tokenVerify.js")

router.post("/users", async (req, res) => {
  clientcontroller.createUser(req, res);
});

router.get("/users",tokenVerify, clientcontroller.getAllUsers);
router.delete("/users/:id",tokenVerify, clientcontroller.deleteUser);
router.get("/users/:id",tokenVerify, clientcontroller.getUserById);
router.put("/users/:id",tokenVerify, clientcontroller.updateUserById);

module.exports = router;
