const User = require("../models/userModel");
const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "Postedby and text fields are required" });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized to create post" });
    }
    const maxlength = 10000;
    if (text.length > maxlength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxlength} characters` });
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: "Post Created successfully", newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.status(200).json({ message: "Post Delete successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err);
//   }
// };
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return (
        res.status(404),
        json({
          message: "Post not found",
        })
      );
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      //unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200),
        json({
          message: "Post unliked successfully",
        });
    } else {
      // Like post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const replyToPost = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const postId = req.params.id;
//     const userId = req.user._id;
//     const userProfilePic = req.user.ProfilePic;
//     const username = req.user.username;

//     if (!text) {
//       res.status(500).json({ message: "Text field is required" });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       res.status(500).json({ message: "Post not found" });
//     }

//     const reply = { userId, text, userProfilePic, username };

//     post.replies.push(reply);
//     await post.save();
//     res.status(200).json({ post });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const reply = { userId, text, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getFeedPosts,
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
};
