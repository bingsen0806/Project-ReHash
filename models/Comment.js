const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      required: true,
      type: String,
    },
    commentUserId: {
      required: true,
      type: String,
    },
    commentText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
