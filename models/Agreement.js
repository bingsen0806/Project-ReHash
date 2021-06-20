const mongoose = require("mongoose");

const AgreementSchema = new mongoose.Schema(
  {
    parties: {
      type: Array,
      default: [],
    },
    items: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "waiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agreement", AgreementSchema);
