const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      attachment: String,
      likeCount: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Post;
