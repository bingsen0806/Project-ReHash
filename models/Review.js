const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      //the one doing the review
      type: String,
      required: true,
    },
    revieweeId: {
      //the one getting reviewed
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      default: "",
      max: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
