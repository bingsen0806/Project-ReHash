const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //check username not taken
    const username = req.body.username;
    const existUsername = await User.findOne({ username: username });
    if (existUsername) {
      res.status(403).json({ message: "username taken" });
    }

    //check email not taken
    const email = req.body.email;
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      res.status(403).json({ message: "email taken" });
    }

    //create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json({ message: "username does not exist" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json({ message: "wrong password" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
