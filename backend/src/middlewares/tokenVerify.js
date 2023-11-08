const admincontroller = require("../controllers/admincontroller");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      Jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          return res.status(401).send({ result: "please provide valid token" });
        } else {
          next();
        }
      });
    } else {
      return res.status(403).send({ result: "please add token with headers" });
    }
  } catch (error) {
    return res.status(500).send({ result: "Internal Server Error" });
  }
};

module.exports = verifyToken;
