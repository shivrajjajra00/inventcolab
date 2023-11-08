const connection = require("./connection")
const adminRoutes = require("./src/routers/adminrouter")


const express = require("express");

const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);

app.listen(4040, () => {
  console.log("server run");
});