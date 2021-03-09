exports.getStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!story) {
      return res.status(400).json({
        message: "Story not found",
      });
    }
    return res.status(200).json({
      story: story,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
exports.getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find({}).populate({
      path: "author",
      select: "name",
    });
    return res.status(200).json({
      stories: stories,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
exports.createStory = async (req, res, next) => {
  try {
    //const author_id = await req.user.id;
    const story = await new Story(req.body);
    story.author = req.user.id;
    await story.save();

    res.status(201).json({
      message: "Story created",
      story,
    });
  } catch (error) {
    res.status(400).json({
      error: "Please enter all valid fields",
    });
  }
};
exports.deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    await story.remove();
    res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
exports.updateStory = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      story: story,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
