const mongoose = require("mongoose");
const conectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected :${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectDB;
