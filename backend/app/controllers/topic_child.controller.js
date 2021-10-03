const db = require("../models");

const TopicChild = db.topic_child;

// Create and Save a new TopicChild
exports.create = (req, res) => {
  const topic_child = new TopicChild(req.body);

  topic_child
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Lỗi tạo chủ đề",
      });
    });
};

// Retrieve all TopicChild from the database.
exports.findAll = (req, res) => {
  console.log(["sfbjsbs"], req.query.name);
  const name_topic_child = req.query.name;
  var condition = name_topic_child
    ? {
        name_topic_child: {
          $regex: new RegExp(name_topic_child),
          $options: "i",
        },
      }
    : {};

  TopicChild.find(condition)
    .then((data) => {
      res.send(data);
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

  TopicChild.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Không tìm thấy chủ đề với id=" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Lỗi lấy chủ đề với id=" + id });
    });
};

// Find a single TopicChild with an author
exports.findAllAuthor = async (req, res) => {
  try {
    console.log(["req.params.author"],req.params.author);
    const author = req.params.author;
    const topicchild = await TopicChild.find({ author: author })
      .populate("author")
      .populate({ path: "author", select: "fullname" });
    res.status(200).json(topicchild);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update a TopicChild by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Dữ liệu cập nhật bị rỗng" });
  }

  const id = req.params.id;

  TopicChild.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
      res.status(500).send({ message: "Lỗi cập nhật chủ đề với id=" + id });
    });
};

// Delete a TopicChild with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TopicChild.findByIdAndRemove(id).then((data) => {
    if (!data) {
      res.status(400).send({
        message: `Không thể xóa chủ đề với id=${id}. Có thể chủ đề không tìm thấy`,
      });
    } else {
      res.send({ message: "Chủ đề đã xóa thành công" });
    }
  });
};

// Delete all TopicChild from the database.
exports.deleteAll = (req, res) => {
  TopicChild.deleteMany({})
    .then((data) => {
      res.send({ message: `${data.deletedCount} chủ đề đã xóa thành công` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Có lỗi trong khi xóa tất cả chủ đề" });
    });
};

// Find all published TopicChild
exports.findAllPublished = (req, res) => {};
