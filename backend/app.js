const connection = require("./connection")
const express = require("express");
const app = express();

const clientrouter = require("./src/routers/clientrouter.js");

app.use(express.json()); // Add this line to enable JSON request body parsing
app.use("/client", clientrouter);

app.listen(4040, () => {
  console.log("server run");
});