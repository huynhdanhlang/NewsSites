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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      canceled: {
        type: Boolean,
        default: false,
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
