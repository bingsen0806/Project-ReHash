const Agreement = require("../models/Agreement");
const router = require("express").Router();

//create empty agreement
router.post("/", async (req, res) => {
  const newAgreement = new Agreement({
    parties: [],
    items: [],
    status: "waiting",
  });
  try {
    const savedAgreement = await newAgreement.save();
    res.status(200).json(savedAgreement);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add an agreement with parties and items
router.put("/update/addParties/:id", async (req, res) => {
  try {
    const updatedAgreement = await Agreement.findByIdAndUpdate(req.params.id, {
      $push: { parties: req.body.userId, items: req.body.itemId },
    });
    res.status(200).json({ message: "Your agreement has been updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//remove an agreement with parties and items
router.put("/update/removeParties", async (req, res) => {
  try {
    const updatedAgreement = await Agreement.findOneAndUpdate(
      {
        parties: { $in: [req.body.userId] },
        items: { $in: [req.body.itemId] },
      },
      {
        $pull: { parties: req.body.userId, items: req.body.itemId },
      }
    );
    res.status(200).json({ message: "Your agreement has been updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update an agreement status //router.put("/update/status/:id")

//get an agreement by agreementId "/agreements?id=agreementId"
router.get("/", async (req, res) => {
  const agreementId = req.query.id;
  try {
    const agreement = await Agreement.findById(agreementId);
    res.status(200).json(agreement);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get all agreements from a user  "/agreements/user/:userId"
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const agreements = await Agreement.find({ parties: { $in: [userId] } });
    res.status(200).json(agreements);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
