const connection = require("./connection");

const adminRoutes = require("./src/routers/adminRouter");
const cors = require("cors");
const resourcesRouter = require("./src/routers/resourcesRouter");
const express = require("express");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/admin", adminRoutes);
console.log("connect");

app.use("/resources", resourcesRouter);

app.listen(4040, () => {
  console.log("server run");
});
