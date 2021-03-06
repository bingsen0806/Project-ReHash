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
    if (group) {
      if (!group.members.includes(req.params.userId)) {
        await group.updateOne({ $push: { members: req.params.userId } });
        const updatedGroup = await Group.findById(req.params.id);
        res.status(200).json(updatedGroup);
      } else {
        res.status(400).json({ message: "user already in this group" });
      }
    } else {
      res.status(404).json({ message: "group not found" });
    }
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

//just a function to generate regex and prevent regex DDoS attack
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//get a group by id "/groups?groupId=groupId"
//find groups with names matching the search via partial text search "/groups?search=...."
router.get("/", async (req, res) => {
  const groupId = req.query.groupId;
  const searchString = req.query.search;
  var group = null;
  try {
    if (groupId) {
      group = await Group.findById(groupId);
    } else if (searchString) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      group = await Group.find({ groupName: regex });
    }
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
    }).sort({ createdAt: -1 });
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
//maybe can change to be the top 10 most popular group
router.get("/recommended/:userId", async (req, res) => {
  try {
    const groupsNotIn = await Group.find({
      members: { $nin: [req.params.userId] },
    });
    if (groupsNotIn.length <= 10) {
      return res.status(200).json(groupsNotIn);
    } else {
      var index = [];
      var recommendedGroups = [];
      while (recommendedGroups.length < 10) {
        var r = Math.floor(Math.random() * groupsNotIn.length);
        if (index.indexOf(r) === -1) {
          recommendedGroups.push(groupsNotIn[r]);
          index.push(r);
        }
      }
      return res.status(200).json(recommendedGroups);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
