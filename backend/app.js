const connection = require("./connection");

const adminRoutes = require("./src/routers/adminRouter");
const cors = require("cors");
const resourcesRouter = require("./src/routers/resourcesRouter");
const express = require("express");
const app = express();
const clientRoutes = require("./src/routers/clientrouter");
const dashboardRoutes = require("./src/routers/dashboardRouter")



app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);

app.use("/user", clientRoutes);
app.use("/resources", resourcesRouter);
app.use("/", dashboardRoutes);

app.listen(4040, () => {
  console.log("server run");
});
