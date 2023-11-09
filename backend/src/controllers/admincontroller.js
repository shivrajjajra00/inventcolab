const adminSchema = require("../models/adminSchema");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

class adminController {
  //signup admin
  async signup(req, resp) {
    const { name, email, mobileNo, password } = req.body;

    try {
      const existsMail = await adminSchema.findOne({ email: email });
      if (existsMail) {
        return resp.status(400).json({
          message: "Email already exists",
        });
      }

      const existsMobileNumber = await adminSchema.findOne({
        mobileNo: mobileNo,
      });
      if (existsMobileNumber) {
        return resp.status(400).json({
          message: "Mobile number already exists",
        });
      }

      const result = await adminSchema.create({
        name,
        email,
        mobileNo,
        password,
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

  //login Admin
  async login(req, resp) {
    try {
      const check = await adminSchema.findOne({ email: req.body.email });

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

  //forgot password

   async forgotpassword (req, res){
    try {
        const { email, newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required.' });
        }

        // email exists in the database
        const user = await adminSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found.' });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Set an expiration time for the reset token (e.g., 1 hour)
        const resetTokenExpiration = Date.now() + 3600000;

        // Save the reset token and its expiration in the user's document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiration;
        user.password = newPassword; // Set the new password

        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error in /forgotpassword:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
}

module.exports = new adminController();
