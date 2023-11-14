const express = require('express');
const router = express.Router();
const User = require('../models/clientSchema.js'); // Import the User model
const clientSchema = require('../models/clientSchema.js');

class clientController {
    async createUser(req, resp) {


        console.log('foo');
        const { name, email, mobileNo, country, address, pincode } = req.body;

        try {
            const existsMail = await clientSchema.findOne({ email: email });
            console.log('req.body', req.body);
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
                pincode
            });
            console.log('result', result);
            if (result) {
                return resp.status(201).json({
                    status: 201,
                    message: "Signup successfully",
                    data: result,
                });
            }
        } catch (error) {
            console.log('error', error);
            return resp.status(500).json({
                status: 500,
                message: "Internal server error",
                data: ["Error during signup:", error],
            });
        }
    }
}

const clientcontroller = new clientController();
module.exports = clientcontroller;