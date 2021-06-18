const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  const email = req.query.email;
  try {
    const user = userId
      ? await User.findById(userId)
      : username
      ? await User.findOne({ username: username })
      : await User.findOne({ email: email });
    const { password, updatedAt, ...other } = user._doc; //the _doc is property from mongodb to return the whole object
    res.status(200).json(other);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//update user's lastActive
router.put("/:id/lastActive", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const date = new Date();
    await user.updateOne({ lastActive: date });
    res.status(200).json("updatedLastActive");
  } catch (err) {
    return res.status(400).json(err);
  }
});

//update a user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "User has been updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//chat Follow a user
router.put("/:id/chatfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.chatFollow.includes(req.body.userId)) {
        await user.updateOne({ $push: { chatFollow: req.body.userId } });
        await currentUser.update({ $push: { chatFollow: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already followed this user");
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

//get all people that has a chat with user of userId
router.get("/chatfollow/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.chatFollow.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      //nani why below can??
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
