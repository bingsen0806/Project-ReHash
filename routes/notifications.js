const router = require("express").Router();
const Notification = require("../models/Notification");

//create notification
router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete notification of an id "/notifications?notificationId=notificationId"
router.delete("/", async (req, res) => {
  const notificationId = req.query.notificationId;
  try {
    const notification = await Notification.findById(notificationId);
    await notification.deleteOne();
    res.status(200).json({ message: "the notification has been deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get a notification by id "/notifications?notificationId=notificationId"
router.get("/", async (req, res) => {
  const notificationId = req.query.notificationId;
  try {
    const notification = await Notification.findById(notificationId);
    res.status(200).json(notification);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get all items by receiverId and groupId (expected only 1 element in return array)  "/posts/filter?userId=userId&invitationId=invitationId"
router.get("/filter", async (req, res) => {
  try {
    const groupId = req.query.invitationId;
    const userId = req.query.userId;
    if (groupId && userId) {
      const notifications = await Notification.find({
        receiverId: userId,
        invitationId: groupId,
      });
      res.status(200).json(notifications);
    } else if (groupId) {
      const notifications = await Notification.find({
        invitationId: groupId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json(notifications);
    } else if (userId) {
      const notifications = await Notification.find({
        receiverId: userId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json(notifications);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//add a sender to the list senderName based on id
router.put("/:id/addSender/:userName", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      if (!notification.senderName.includes(req.params.userName)) {
        await notification.updateOne({
          $push: { senderName: req.params.userName },
        });
        res.status(200).json({ message: "added sender to the notification" });
      } else {
        res
          .status(400)
          .json({ message: "sender already sent this notification" });
      }
    } else {
      res.status(404).json({ message: "notification not found" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
