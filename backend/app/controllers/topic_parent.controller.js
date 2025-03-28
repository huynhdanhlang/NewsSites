const db = require("../models");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const TopicParent = db.topic_parent;
const TopicList = db.topicList;
// Create and Save a new TopicParent
exports.create = (req, res) => {
  console.log(["req.body"], req.body);

  const topicId = [];
  req.body.name_topic_child.map((topic) => {
    const child_topic = new TopicList({
      name_topic: topic.name_topic,
      author: topic.author,
    });
    topicId.push(child_topic._id);
    child_topic.save((err, child_topic) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
  });
  console.log(["topicId"], topicId);
  const topic_parent = new TopicParent({
    name_topic: req.body.name_topic,
    author: req.body.author,
  });

  topic_parent.save((err, topic_parent) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // console.log(req.body.roles);
    //Nếu người dùng có vai trò trong request đăng ký thì tìm các và trò đó và gán vào roles người dùng
    if (topicId) {
      TopicList.find(
        {
          _id: { $in: topicId },
        },
        (err, name_topic_child) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("ddfff", name_topic_child);
          topic_parent.name_topic_child = name_topic_child.map(
            (topic) => topic._id
          );
          topic_parent.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Chủ đề được tạo thành công!" });
          });
        }
      );
    }
  });
};

// Retrieve all TopicParent from the database.
exports.findAll = (req, res) => {
  const { page, size, name_topic } = req.query;
  console.log(["sfbjsbs"], page, size, name_topic);

  var condition = name_topic
    ? {
        name_topic: {
          $regex: new RegExp(name_topic),
          $options: "i",
        },
      }
    : {};
  const { limit, offset } = getPagination(page, size);
  const options = {
    offset,
    limit,
    populate: {
      path: "author name_topic_child",
      select: "isChecked name_topic email",
    },
    // populate: { path: "name_topic_child", select: "isChecked name_topic" },
  };
  // TopicParent.find(condition);
  // const topic =
  TopicParent.paginate(condition, options)
    .then((data) => {
      console.log(["data"], data);
      res.send({
        totalItems: data.totalDocs,
        parentTopic: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Lỗi trong khi lấy chủ đề",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(["id", id]);

  TopicParent.findById(id)
    .populate("name_topic_child")
    .populate({ path: "name_topic_child", select: "isChecked name_topic" })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Không tìm thấy chủ đề với id=" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Lỗi lấy chủ đề với id=" + id });
    });
};

// Find a single TopicAuthor with an author
exports.findAllAuthor = async (req, res) => {
  try {
    console.log(["req.params.author"], req.params.author);
    const author = req.params.author;
    const topicauthor = await TopicParent.find({ author: author })
      .populate("author")
      .populate({ path: "author", select: "fullname" });
    res.status(200).json(topicauthor);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update a TopicParent by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Dữ liệu cập nhật bị rỗng" });
  }

  req.body["name_topic_child"].map(async (topic, index) => {
    console.log(["req.body"], req.body);
    if (topic._id === null) {
      const child_topic = new TopicList({
        name_topic: topic.name_topic,
      });
      req.body["name_topic_child"][index]._id = child_topic._id;
      child_topic.save((err, child_topic) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    } else {
      console.log(["topic"], topic);
      await TopicList.findByIdAndUpdate(topic._id, topic, {
        useFindAndModify: false,
      });
    }
  });
  console.log(["req.body"], req.body);
  const id = req.params.id;

  TopicParent.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Không thể cập nhật chủ đề với id=${id}. Có thể chủ đề không tìm thấy`,
        });
      } else {
        res.send({ message: "Chủ đề cập nhật thành công" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Lỗi cập nhật chủ đề với id=" + id + err });
    });
};

// Delete a TopicParent with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  const listTopic = await TopicParent.findByIdAndRemove(id, {
    useFindAndModify: false,
  }).then((data) => {
    if (!data) {
      res.status(400).send({
        message: `Không thể xóa chủ đề với id=${id}. Có thể chủ đề không tìm thấy`,
      });
    } else {
      res.send({ message: "Chủ đề đã xóa thành công" });
      return data["name_topic_child"];
    }
  });

  await TopicList.deleteMany({ _id: { $in: listTopic } });
  console.log(["listTopic"], listTopic);
};

// Delete all TopicParent from the database.
// exports.deleteAll = (req, res) => {
//   TopicParent.deleteMany({})
//     .then((data) => {
//       res.send({ message: `${data.deletedCount} chủ đề đã xóa thành công` });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ message: err.message || "Có lỗi trong khi xóa tất cả chủ đề" });
//     });
// };

// Find all published TopicParent
exports.findAllPublished = (req, res) => {};
