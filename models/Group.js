const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    creatorId: {
      required: true,
      type: String,
    },
    members: {
      type: Array,
    },
    description: {
      type: String,
      default: "",
    },
    groupName: {
      type: String,
      default: "No Group Name",
    },
    groupImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
