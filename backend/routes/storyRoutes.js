const express = require("express");
const Story = require("../models/Story");
const route = express.Router();
const storyController = require("../controllers/storyController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
route.get("/:id", storyController.getStory);

route.get("/", storyController.getAllStories);

route.post("/", auth, storyController.createStory);

route.delete("/:id", auth, storyController.deleteStory);

route.patch("/:id", auth, storyController.updateStory);

module.exports = route;
