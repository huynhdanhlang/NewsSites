const mongoose = require("mongoose");

const TopicList = mongoose.model(
  "TopicList",
  mongoose.Schema({
    name_topic: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = TopicList;
