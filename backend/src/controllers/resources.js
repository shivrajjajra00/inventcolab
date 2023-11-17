const resourcesSchema = require("../models/resourcesSchema");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

class resourcesController {
  //signup resourecs
  async signup(req, resp) {
    const {
      name,
      email,
      officialEmail,
      otherMobileNo,
      mobileNo,
      password,
      address,
      country,
      technology,
    } = req.body;

    try {
      const existsMail = await resourcesSchema.findOne({ email: email });
      if (existsMail) {
        return resp.status(400).json({
          message: "Email already exists",
        });
      }

      const existsMobileNumber = await resourcesSchema.findOne({
        mobileNo: mobileNo,
      });
      if (existsMobileNumber) {
        return resp.status(400).json({
          message: "Mobile number already exists",
        });
      }

      const result = await resourcesSchema.create({
        name,
        email,
        officialEmail,
        otherMobileNo,
        mobileNo,
        password,
        address,
        country,
        technology,
      });

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
        data: ["Error during signup:", error],
      });
    }
  }

  //login resources
  async login(req, resp) {
    try {
      const check = await resourcesSchema.findOne({ email: req.body.email });

      console.log("Check Response:", check);
      if (!check) {
        return resp.status(401).send({
          status: 401,
          Message: "User not found",
        });
      }

      if (check.password === req.body.password) {
        jwt.sign(
          { adminSchema: check },
          jwtKey,
          { expiresIn: "24h" },
          (error, token) => {
            if (error) {
              resp.status(500).json({
                status: 500,
                Message: "Token creation failed",
              });
            } else {
              resp.status(200).json({
                auth: token,
                status: 200,
                Message: "Welcome, you are logged in",
                data: check,
              });
            }
          }
        );
      } else {
        resp.status(401).json({
          status: 401,
          Message: "Wrong password",
        });
      }
      // ... rest of your code
    } catch (error) {
      resp.status(500).json({
        status: 500,
        Message: "Server error",
        error: error.message,
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
      const allUsers = await resourcesSchema.aggregate(query);

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
      const user = await resourcesSchema.findById(userId);

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
      const deletedUser = await resourcesSchema.findByIdAndDelete(userId);

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

      const updatedUser = await resourcesSchema.findByIdAndUpdate(
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

module.exports = new resourcesController();
