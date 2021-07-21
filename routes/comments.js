const router = require("express").Router();
const Comment = require("../models/Comment");

//create comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete comment of an id "/comments?commentId=commentId"
router.delete("/", async (req, res) => {
  const commentId = req.query.commentId;
  try {
    const comment = await Comment.findById(commentId);
    await comment.deleteOne();
    res.status(200).json({ message: "the comment has been deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get all comments from a post "/comments/filter?commentId=commentId"
router.get("/filter", async (req, res) => {
  try {
    const postId = req.query.postId;
    const comments = await Comment.find({ postId: postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get a comment by id "/comments?commentId=commentId"
router.get("/", async (req, res) => {
  const commentId = req.query.commentId;
  try {
    const comment = await Comment.findById(commentId);
    res.status(200).json(comment);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
