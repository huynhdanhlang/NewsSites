const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
      name_topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicParent",
        required: true,
      },
      name_topic_child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicList",
        required: true,
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
      canceled: {
        type: Boolean,
        default: false,
      },
      feedback: {
        type: String,
        default: "",
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
  ).plugin(mongoosePaginate)
);

module.exports = Post;
