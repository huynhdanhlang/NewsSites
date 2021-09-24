const mongoose = require("mongoose");

const TopicParent = mongoose.model(
  "TopicParent",
  mongoose.Schema(
    {
      name_topic_parent: {
        type: String,
        required: true,
      },
      name_topic_child: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TopicList",
        },
      ],
      approved: {
        type: Boolean,
        default: false,
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
