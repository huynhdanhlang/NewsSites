const mongoose = require("mongoose");

const TopicParent = mongoose.model(
  "TopicParent",
  mongoose.Schema(
    {
      name_topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicChild",
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
      isExpanded:{
        type: Boolean,
        default: true,
      },
      canceled: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = TopicParent;
