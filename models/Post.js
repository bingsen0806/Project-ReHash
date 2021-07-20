const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    groupId: {
      required: true,
      type: String,
    },
    postUserId: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    likedBy: {
      type: Array,
    },
    itemId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
