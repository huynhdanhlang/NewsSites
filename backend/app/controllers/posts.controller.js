const db = require("../models/index");
const Post = db.post;

exports.getPosts = async (req, res) => {
  try {
    console.log(req.params.author);
    const author = req.params.author;
    const posts = await Post.find({ author: author })
      .populate("author")
      .populate({ path: "name_topic", select: "_id name_topic" })
      .populate({ path: "name_topic_child", select: "_id name_topic" })
      .populate({ path: "author", select: "fullname" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getPostsId = async (req, res) => {
  try {
    console.log(["ksdksjdksjk"], req.body);
    const posts = await Post.findById(req.params.id)
      .populate("author")
      .populate({ path: "name_topic", select: "_id name_topic" })
      .populate({ path: "name_topic_child", select: "_id name_topic" })
      .populate({ path: "author", select: "fullname" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getPostsAll = async (req, res) => {
  try {
    //console.log(req.params.author);
    const posts = await Post.find()
      .populate("author")
      .populate({ path: "name_topic", select: "_id name_topic" })
      .populate({ path: "name_topic_child", select: "_id name_topic" })
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

    const reNews = post
      .populate("author")
      .populate({ path: "author", select: "fullname" }, function (err) {});

    await post.save();
    res.status(200).json(reNews);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    db.mongoose.set("useFindAndModify", false);
    const updtatePost = req.body;

    const post = await Post.findOneAndUpdate(
      {
        _id: updtatePost._id,
      },
      updtatePost,
      {
        new: true,
      }
    )
      .populate("author")
      .populate({ path: "author", select: "fullname" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deletePost = (req, res) => {
  try {
    console.log(["req.body"], req.body.id);
    Post.deleteOne({ _id: req.body.id }, function (err, post) {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
