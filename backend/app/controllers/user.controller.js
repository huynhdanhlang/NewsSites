
exports.allAcess = (req, res) => {
  res.status(200).send("Public content");
};

exports.userBoard = (req, res) => {
  console.log("userId",req.userId);
  res.status(200).send("User content");
};

exports.authorBoard = (req, res) => {
  res.status(200).send("Author content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin content");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator content");
};
