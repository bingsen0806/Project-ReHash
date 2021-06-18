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

//get reviews between 2 users "/reviews/between/revieweeId/reviewerId"
router.get("/between/:revieweeId/:reviewerId", async (req, res) => {
  try {
    const reviews = await Review.find({
      revieweeId: req.params.revieweeId,
      reviewerId: req.params.reviewerId,
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a review based on id of review "/reviews/id/:id"
router.delete("/id/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      res.status(200).json({ message: "review successfully deleted" });
    } else {
      res.status(404).json({ message: "review with stated id not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
