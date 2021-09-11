const mongoose = require("mongoose");

const TopicChild = mongoose.model(
  "TopicChild",
  mongoose.Schema({
    name_topic_child: {
      type: String,
      required: true,
    },
  })
);

module.exports = TopicChild;
