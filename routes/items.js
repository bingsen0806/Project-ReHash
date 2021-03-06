const Item = require("../models/Item");
const router = require("express").Router();

//create item
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//just a function to generate regex and prevent regex DDoS attack
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//get an item "/items?itemId=itemId"
//find item with names matching the search via partial text search "/items?search=...."
router.get("/", async (req, res) => {
  const itemId = req.query.itemId;
  const searchString = req.query.search;
  var item = null;
  try {
    if (itemId) {
      item = await Item.findById(itemId);
    } else if (searchString) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      item = await Item.find({ title: regex, status: "waiting" }).sort({
        views: -1,
      });
    }
    res.status(200).json(item);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//get trending swaps for a user
//"/items/trendingSwaps?userId=userId" if user is logged in
//"/items/trendingSwaps" if user is not logged in
router.get("/trendingSwaps", async (req, res) => {
  const userId = req.query.userId;
  try {
    const thresholdDate = Date.now() - 5 * 24 * 3600 * 1000; //only consider those posted in the past 5 days
    const recentTrendings = await Item.find({
      createdAt: { $gt: new Date(thresholdDate) },
      userId: { $not: { $eq: userId } },
      status: "waiting",
    }).sort({ views: -1 });
    if (recentTrendings.length > 5) {
      return res.status(200).json(recentTrendings.slice(0, 5)); //not tested yet
    } else {
      return res.status(200).json(recentTrendings);
    }
  } catch (err) {
    console.log(err);
  }
});

//get all items from a category and user  "/items/categories?categoryName=categoryName&userId=userId"
router.get("/categories", async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    const userId = req.query.userId;
    if (categoryName && userId) {
      const items = await Item.find({
        userId: userId,
        categories: { $in: [categoryName] },
      }).sort({ createdAt: -1 });
      res.status(200).json(items);
    } else if (categoryName) {
      const items = await Item.find({
        categories: { $in: [categoryName] },
        status: "waiting",
      }).sort({ views: -1 });
      res.status(200).json(items);
    } else if (userId) {
      const items = await Item.find({ userId: userId }).sort({ createdAt: -1 });
      res.status(200).json(items);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete item of an id "/items?itemId=itemId"
router.delete("/", async (req, res) => {
  const itemId = req.query.itemId;
  try {
    const item = await Item.findById(itemId);
    await item.deleteOne();
    res.status(200).json("the item has been deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
});

//update an item's status
router.put("/update/status/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findByIdAndUpdate(itemId, {
      $set: { status: req.body.status },
    });
    const updatedItem = Object.assign(item, { status: req.body.status });
    res.status(200).json(updatedItem);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//update an item's views
router.put("/update/views/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    const oldItem = await Item.findById(itemId);
    const item = await Item.findByIdAndUpdate(itemId, {
      $set: { views: oldItem.views + 1 },
    });
    const updatedItem = Object.assign(item, { views: oldItem.views + 1 });
    res.status(200).json(updatedItem);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
