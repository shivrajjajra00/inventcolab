const express = require('express');
const router = express.Router();
const User = require('../models/clientSchema.js'); // Import the User model
const clientSchema = require('../models/clientSchema.js');

class clientController {
 async createUser(req, resp) {
        const { name, email, mobileNo, country, address, pincode } = req.body;

        try {
            const existsMail = await clientSchema.findOne({ email: email });
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

            if (result) {
                return resp.status(201).json({
                    status: 201,
                    message: "Signup successfully",
                    data: result,
                });
            }
        } catch (error) {
            return resp.status(500).json({
                status: 500,
                message: "Internal server error",
                data: ["Error during signup:", error],
            });
        }
    }
}


class clientlistcontroller {
  //add product
  async tokenVerification(req, resp, next) {
    try {
      const { name, email, phone } = req.body;

      const data = {
        name,
        email: email,
      };
      let result = await clientSchema.collection.insertOne(data);
      if (result) {
        resp.status(200).send({
          status: 200,
          message: "Product added successfully",
          data: [result],
        });
      } else {
        resp.status(500).send({
          status: 500,
          message: "Failed to add product",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "An error occurred while adding the product",
        error: error.message,
      });
    }
  }

  //product list
  async getProductList(req, resp, next) {
    try {
      const result = await clientSchema.find({ isDeleted: false });

      if (result.length > 0) {
        resp.status(200).send({
          status: 200,
          message: "Products found successfully",
          data: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "No products found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Server Error",
        error: error.message,
      });
    }
  }

  //findOne product by id
  async findOneProduct(req, resp) {
    try {
      const result = await clientSchema.findOne({ _id: req.params.id });
      if (result) {
        resp.status(200).send({
          status: 200,
          message: "Result found successfully",
          data: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "Result not found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Sorry, an error occurred",
        err: [error],
      });
    }
  }

  //update Product list
  async updateProductList(req, resp, next) {
    try {
      const result = await clientSchema.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );

      if (result) {
        resp.status(200).send({
          status: 200,
          message: "Product updated successfully",
          result: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "Product not found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Server error",
      });
    }
  }

  //deleted products
  async deleteProduct(req, resp) {
    try {
      const productId = req.params.id;
      const result = await clientSchema.findByIdAndUpdate(
        { _id: productId, isDeleted: false },
        { $set: { isDeleted: true } }
      );
      console.log("result", result);
      if (result) {
        resp.status(200).send({
          status: 200,
          message: "Item soft deleted successfully",
          data: [result],
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "Item not found or already deleted",
          data: [],
        });
      }
    } catch (error) {
      resp
        .status(500)
        .send({ error: "An error occurred while deleting the item" });
    }
  }

  //search product
  async searchProduct(req, resp) {
    try {
      const result = await clientSchema.find({
        $or: [
          { name: { $regex: req.params.key } },
          { model: { $regex: req.params.key } },
          { price: { $regex: req.params.key } },
        ],
      });

      if (result) {
        resp.status(200).send({
          status: 200,
          message: "Search successful",
          data: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "No results found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}
const clientlistcontroller = new clientlistcontroller();
const clientcontroller = new clientController();
module.exports = clientlistcontroller;
module.exports = clientcontroller;