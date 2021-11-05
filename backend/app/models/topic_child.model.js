const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TopicChild = mongoose.model(
  "TopicChild",
  new mongoose.Schema({
    name_topic_child: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }).plugin(mongoosePaginate)
);

module.exports = TopicChild;
