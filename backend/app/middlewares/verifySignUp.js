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
      res.status(400).send({ message: `Failed! ${req.body.email} already in use!` });
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
        res.status(400).send({ message: `Failed! ${req.body.email} already in use!` });
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
          message: `Failed! Role ${req.body.roles[i]} already exists!`,
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
