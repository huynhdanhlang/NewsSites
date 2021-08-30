const db = require("../models/index");
const Post = db.post;
exports.getPosts = async (req, res) => {
  try {
    console.log(req.params.author);
    const author = req.params.author;
    const posts = await Post.find({ author: author })
      .populate("author")
      .populate({ path: "author", select: "fullname" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = req.body;

    const post = new Post(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updtatePost = req.body;

    const post = await Post.findOneAndUpdate(
      {
        _id: updtatePost._id,
      },
      updtatePost,
      {
        new: true,
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
