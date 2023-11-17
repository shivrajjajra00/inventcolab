const adminSchema = require("../models/adminSchema");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

class dashboardController {
  async getUserById(req, res) {
    try {
      const userId = req.params.id;

      const user = await adminSchema.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "User found",
        data: user,
      });
    } catch (error) {
      console.error("Error in getUserById:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error.",
      });
    }
  }
}

module.exports = new dashboardController();
