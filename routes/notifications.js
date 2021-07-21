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

//get all notifications from a user "/notifications/filter?userId=userId"
router.get("/filter", async (req, res) => {
  try {
    const userId = req.query.userId;
    const notifications = await Notification.find({
      receiverId: userId,
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
