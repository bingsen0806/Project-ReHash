const router = require("express").Router();
const Post = require("../models/Post");

//create new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete item of an id "/posts?postId=postId"
router.delete("/", async (req, res) => {
  const postId = req.query.postId;
  try {
    const post = await Post.findById(postId);
    await post.deleteOne();
    res.status(200).json({ message: "the post has been deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get a post by id "/posts?postId=postId"
router.get("/", async (req, res) => {
  const postId = req.query.postId;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get all items by group and user  "/posts/filter?groupId=groupId&userId=userId"
router.get("/filter", async (req, res) => {
  try {
    const groupId = req.query.groupId;
    const userId = req.query.userId;
    if (groupId && userId) {
      const posts = await Post.find({
        postUserId: userId,
        groupId: groupId,
      }).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } else if (groupId) {
      const posts = await Post.find({ groupId: groupId }).sort({
        createdAt: -1,
      });
      res.status(200).json(posts);
    } else if (userId) {
      const posts = await Post.find({ postUserId: userId });
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//add likes and update
router.put("/:id/addLike/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { likedBy: req.params.userId } });
    res.status(200).json({ message: "user has liked this post" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//remove likes and update
router.put("/:id/removeLike/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $pull: { likedBy: req.params.userId } });
    res.status(200).json({ message: "user has disliked this post" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
