const router = require("express").Router();
const Review = require("../models/Review");

//create a new review "/reviews"

router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all rewviews for a profileUser   "/reviews/profileUser/id_of_the_profile_user"
router.get("/profileUser/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      revieweeId: req.params.id,
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
