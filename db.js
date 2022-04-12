const mongoose = require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:"./.env"});
const connectDB =  () => {
  try {
    const conn = mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("succesfully connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
