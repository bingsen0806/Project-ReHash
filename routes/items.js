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

//get an item "/items?itemId=itemId"
router.get("/", async (req, res) => {
  const itemId = req.query.itemId;
  try {
    const item = await Item.findById(itemId);
    res.status(200).json(item);
  } catch (err) {
    return res.status(400).json(err);
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
      });
      res.status(200).json(items);
    } else if (categoryName) {
      const items = await Item.find({ categories: { $in: [categoryName] } });
      res.status(200).json(items);
    } else if (userId) {
      const items = await Item.find({ userId: userId });
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

//update Item

module.exports = router;
