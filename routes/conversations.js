const router = require("express").Router();
const Conversation = require("../models/Conversation");

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

//get conversations by conversation if
router.get("/id/:conversationId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      _id: req.params.conversationId,
    });
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
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $in: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
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
