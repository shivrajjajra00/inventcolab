const connection = require("./connection")

const adminRoutes = require("./src/routers/adminRouter");
const resourcesRouter = require("./src/routers/resourcesRouter");

const express = require("express");
const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/resources", resourcesRouter);


app.listen(4040, () => {
  console.log("server run");
});