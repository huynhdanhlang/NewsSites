const mongoose = require("mongoose");

const TopicList = mongoose.model(
  "TopicList",
  mongoose.Schema({
    topic: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = TopicList;
