const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: Array,
      default: [],
    },
    categories: {
      type: Array,
      default: [],
    },
    idealSwaps: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      max: 30,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
