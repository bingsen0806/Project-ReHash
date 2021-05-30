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

module.exports = router;
