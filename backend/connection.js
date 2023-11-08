const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shivrajjajra00:I2QuQvwWk6hAY3xB@cluster0.eraqjbd.mongodb.net/inventcolab"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.log(`mongoose connection error`, error);
  });
