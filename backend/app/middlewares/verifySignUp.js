const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameorEmail = (req, res, next) => {
  //Username

  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: `Xin lỗi! ${req.body.username} đã được dùng!` });
      return;
    }

    //Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: `Xin lỗi! ${req.body.email} đã được dùng!` });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Xin lỗi! Role ${req.body.roles[i]} vai trò đã tồn tại!`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameorEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
