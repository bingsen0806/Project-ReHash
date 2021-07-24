const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");

//new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: req.body.members,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversations by conversation id
router.get("/id/:conversationId", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//just a function to generate regex and prevent regex DDoS attack
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//get conversation when a user is searching for other users in chat
router.get("/search/:currentUserId/searchText", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.currentUserId] },
    });
    //perform partial search to get all users that meets the searchText
    const searchString = req.query.searchText;
    if (!searchString || searchString === "") {
      return res.status(200).json(conversation);
    }
    const regex = new RegExp(escapeRegex(searchString), "gi");
    const matchingUsers = await User.find({ username: regex });
    const matchingConversations = conversation.filter((convo) => {
      for (let i = 0; i < matchingUsers.length; i++) {
        if (
          convo.members[0] == matchingUsers[i]._id && //use == instead of === because _id is technically not String type
          convo.members[0] != req.params.currentUserId
        ) {
          console.log("true");
          return true;
        } else if (
          convo.members[1] == matchingUsers[i]._id &&
          convo.members[1] != req.params.currentUserId
        ) {
          console.log("true");
          return true;
        }
      }
      console.log("false");
      return false;
    });
    return res.status(200).json(matchingConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update the last message of a conversation
router.put("/:id/lastmessage", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const lastMessageText = req.body.lastMessageText;
    const lastMessageTime = req.body.lastMessageTime;
    await conversation.updateOne({
      lastMessageText: lastMessageText,
      lastMessageTime: lastMessageTime,
    });
    res.status(200).json("updated last message of conversation");
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
