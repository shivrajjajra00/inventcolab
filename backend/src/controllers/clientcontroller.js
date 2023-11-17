const express = require("express");
const router = express.Router();
const User = require("../models/clientSchema.js"); // Import the User model
const clientSchema = require("../models/clientSchema.js");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

class clientController {
  async createUser(req, resp) {
    const { name, email, mobileNo, country, address, pincode } = req.body;

    try {
      const existsMail = await clientSchema.findOne({ email: email });
      console.log("req.body", req.body);
      if (existsMail) {
        return resp.status(400).json({
          message: "Email already exists",
        });
      }

      const existsMobileNumber = await clientSchema.findOne({
        mobileNo: mobileNo,
      });
      if (existsMobileNumber) {
        return resp.status(400).json({
          message: "Mobile number already exists",
        });
      }

      const result = await clientSchema.create({
        name,
        email,
        mobileNo,
        country,
        address,
        pincode,
      });
      console.log("result", result);
      if (result) {
        jwt.sign(
          { adminSchema: result },
          jwtKey,
          { expiresIn: "24h" },
          (error, token) => {
            if (error) {
              resp.status(500).json({
                status: 500,
                Message: "Token creation failed",
              });
            } else {
              resp.status(201).json({
                auth: token,
                status: 201,
                Message: "Signup successfully",
                data: result,
              });
            }
          }
        );
      }
    } catch (error) {
      return resp.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      // Check if the 'search' parameter is provided
      const searchQuery = req.query.search
        ? { name: { $regex: req.query.search, $options: "i" } }
        : {};

      const startDate = req.query.startDate;
      const endDate = req.query.endDate;

      const dateFilter = {};

      if (startDate && endDate) {
        dateFilter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      // Build the aggregation pipeline
      let query = [
        {
          $match: {
            ...searchQuery,
            ...dateFilter,
          },
        },
      ];

      // Execute the aggregation query
      const allUsers = await clientSchema.aggregate(query);

      console.log("allUsers", allUsers);
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched all users",
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: ["Error fetching users:", error],
      });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await clientSchema.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Successfully fetched user by ID",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: ["Error fetching user by ID:", error],
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await clientSchema.findByIdAndDelete(userId);

      if (deletedUser) {
        return res.status(200).json({
          status: 200,
          message: "Successfully deleted user",
          data: deletedUser,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "User not found",
          data: null,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: ["Error deleting user:", error],
      });
    }
  }

  async updateUserById(req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      // Validate updateData if needed

      const updatedUser = await clientSchema.findByIdAndUpdate(
        userId,
        updateData,
        {
          new: true, // Return the modified document
          runValidators: true, // Run validators for update
        }
      );

      if (!updatedUser) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Successfully updated user",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: ["Error updating user:", error],
      });
    }
  }
}


const clientcontroller = new clientController();

module.exports = clientcontroller;
