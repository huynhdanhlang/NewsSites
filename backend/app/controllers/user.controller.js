exports.allAcess = (req, res) => {
  res.status(200).send("Trang người dùng khách");
};

exports.userBoard = (req, res) => {
  console.log("userId", req.userId);
  res.status(200).send("Trang người dùng");
};

exports.authorBoard = (req, res) => {
  res.status(200).send("Trang tác giả");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Trang quản trị");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Trang kiểm duyệt");
};
