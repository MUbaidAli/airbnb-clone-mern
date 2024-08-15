const mongoose = require("mongoose");
require("dotenv").config();
async function db() {
  try {
    // await mongoose.connect(`mongodb://0.0.0.0:27147/airb`);
    await mongoose.connect(`mongodb://127.0.0.1:27017/airb`);
    console.log("database connected");
  } catch (error) {
    console.log(error);
    console.log("database connections Error");
    process.exit(1);
  }
}
// console.log(process.env);
module.exports = db;
