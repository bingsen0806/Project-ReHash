const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      max: 50,
    },
    lastActive: {
      type: Date,
    },
    chatFollow: {
      type: Array,
      default: [],
    },
    cumulativeRating: {
      type: Number,
      default: 0,
    },
    ratedByUsers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
