const db = require("../models");

const TopicList = db.topicList;

exports.delete = (req, res) => {
  const id = req.params.id;

  TopicList.findByIdAndRemove(id, { useFindAndModify: false }).then((data) => {
    if (!data) {
      res.status(400).send({
        message: `Không thể xóa chủ đề với id=${id}. Có thể chủ đề không tìm thấy`,
      });
    } else {
      res.send({ message: "Chủ đề đã xóa thành công" });
    }
  });
};
