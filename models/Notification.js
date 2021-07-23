const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    senderName: {
      type: Array,
    },
    receiverId: {
      required: true,
      type: String,
    },
    invitationId: {
      type: String,
      required: true,
    },
    invitationName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
