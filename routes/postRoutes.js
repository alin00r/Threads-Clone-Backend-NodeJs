const express = require("express");
const {
  getFeedPosts,
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
} = require("../controllers/postController");
const protectRoute = require("../middlewares/protectRoute");
const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/likes/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);
module.exports = router;
