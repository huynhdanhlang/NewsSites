const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TopicParent = mongoose.model(
  "TopicParent",
  new mongoose.Schema(
    {
      name_topic: {
        type: String,
        required: true,
      },
      name_topic_child: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TopicList",
        },
      ],
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
      isExpanded: {
        type: Boolean,
        default: true,
      },
      canceled: {
        type: Boolean,
        default: false,
      },
      feedback: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  ).plugin(mongoosePaginate)
);

module.exports = TopicParent;
