const router = require("express").Router();
const Group = require("../models/Group");

//create group
router.post("/", async (req, res) => {
  const newGroup = new Group(req.body);
  try {
    const savedGroup = await newGroup.save();
    res.status(200).json(savedGroup);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add member or join group
router.put("/:id/addMember/:userId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    await group.updateOne({ $push: { members: req.params.userId } });
    res.status(200).json({ message: "user has joined this group" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//remove member or leave group
router.put("/:id/removeMember/:userId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    await group.updateOne({ $pull: { members: req.params.userId } });
    res.status(200).json({ message: "user has leaved this group" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get a group by id "/groups?groupId=groupId"
router.get("/", async (req, res) => {
  const groupId = req.query.groupId;
  try {
    const group = await Group.findById(groupId);
    res.status(200).json(group);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get all groups from a user "/groups/filter?userId=userId"
router.get("/filter", async (req, res) => {
  try {
    const userId = req.query.userId;
    const groups = await Group.find({
      members: { $in: [userId] },
    });
    res.status(200).json(groups);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update group, can be group image or group description
router.put("/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    // res.status(200).json({ message: "Group has been updated" });
    if (req.body.description) {
      const updatedGroup = Object.assign(group, {
        description: req.body.description,
      });
      return res.status(200).json(updatedGroup);
    }
    const updatedGroup = Object.assign(group, {
      groupImg: req.body.groupImg,
    });
    res.status(200).json(updatedGroup);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/** TODO: get all recommended groups from a user */

module.exports = router;
