const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
