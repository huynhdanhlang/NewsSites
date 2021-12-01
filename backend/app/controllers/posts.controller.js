const db = require("../models/index");
const Post = db.post;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
exports.getPosts = async (req, res) => {
  const { page, size, author } = req.body;
  console.log("poststs", author);
  const condition = {author: author};
  const { limit, offset } = getPagination(page, size);
  const options = {
    offset,
    limit,
    populate: {
      path: "author name_topic_child name_topic",
      select: "name_topic fullname email _id",
    },
  };

  Post.paginate(condition, options)
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        posts: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Lỗi trong khi lấy bài đăng",
      });
    });
  // try {
  //   console.log(req.params.author);
  //   const author = req.params.author;
  //   const posts = await Post.find({ author: author })
  //     .populate("author")
  //     .populate({ path: "name_topic", select: "_id name_topic" })
  //     .populate({ path: "name_topic_child", select: "_id name_topic" })
  //     .populate({ path: "author", select: "fullname email" });
  //   res.status(200).json(posts);
  // } catch (error) {
  //   res.status(500).json({ error: error });
  // }
};

exports.getPostsId = async (req, res) => {
  try {
    console.log(["ksdksjdksjk"], req.params.id);
    const posts = await Post.find({
      $or: [
        { _id: req.params.id },
        { name_topic: req.params.id },
        { name_topic_child: req.params.id },
      ],
    })
      .populate("author")
      .populate({ path: "name_topic", select: "_id name_topic" })
      .populate({ path: "name_topic_child", select: "_id name_topic" })
      .populate({ path: "author", select: "fullname email" });
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
      .populate({ path: "author", select: "fullname email" });
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
      .populate({ path: "name_topic", select: "_id name_topic" })
      .populate({ path: "name_topic_child", select: "_id name_topic" })
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
