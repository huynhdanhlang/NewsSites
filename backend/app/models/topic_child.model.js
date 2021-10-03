const mongoose = require("mongoose");

const TopicChild = mongoose.model(
  "TopicChild",
  mongoose.Schema({
    name_topic_child: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);

module.exports = TopicChild;
