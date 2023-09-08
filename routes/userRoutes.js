const express = require("express");
const userRouter = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
} = require("../controllers/userController");
const protectRoute = require("../middlewares/protectRoute");
userRouter.get("/profile/:username", getUserProfile);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/follow/:id", protectRoute, followUnFollowUser);
userRouter.post("/update/:id", protectRoute, updateUser);
module.exports = userRouter;
