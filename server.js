const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDB.js");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

//Parse JSON data in the res.body
app.use(express.json());
//Parse from data in the req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
