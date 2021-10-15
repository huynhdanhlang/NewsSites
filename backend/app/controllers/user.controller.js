const db = require("../models/index");
const User = db.user;
var bycrypt = require("bcryptjs");

exports.allAcess = (req, res) => {
  res.status(200).send("Trang người dùng");
};
// exports.userBoard = (req, res) => {
//   console.log("userId", req.userId);
//   res.status(200).send("Trang người dùng");
// };

exports.authorBoard = (req, res) => {
  res.status(200).send("Trang tác giả");
};

exports.adminBoard = (req, res) => {
  User.find()
    .populate("roles")
    .then((data) => {
      console.log(["data"], data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Lỗi trong khi lấy chủ đề",
      });
    });
};

exports.updateUser = async (req, res) => {
  try {
    db.mongoose.set("useFindAndModify", false);
    // console.log(["user"], req.body);
    const updateUser = req.body;
    console.log(["updateUser"], updateUser);

    updateUser.password = bycrypt.hashSync(req.body.password, 8);


    const user = await User.findOneAndUpdate(
      {
        _id: updateUser._id,
      },
      updateUser,
      {
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Trang kiểm duyệt");
};
