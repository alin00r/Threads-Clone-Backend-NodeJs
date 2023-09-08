const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({
        message: "Unathorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-paswword");
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
    console.log("Error in protectRoute:", err.message);
  }
};
module.exports = protectRoute;
