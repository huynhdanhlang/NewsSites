const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Chưa xác thực!! Truy cập hết hạn!" });
  }

  return res.sendStatus(401).send({ message: "Chưa xác thực!" });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Chưa có token được cung cấp" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  console.log(["isAdmin"], req.userId);
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(["userId", user]);
    try {
      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res
            .status(403)
            .send({ message: "Bạn không có quyền truy cập vào trang này!" });
          return;
        }
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

isModerator = (req, res, next) => {
  console.log(["isModerator"], req.userId);
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    try {
      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log(["roles"], roles);
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
          res
            .status(403)
            .send({ message: "Bạn không có quyền truy cập vào trang này!" });
          return;
        }
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

isAuthor = (req, res, next) => {
  console.log(["isAuthor"], req.userId);
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    try {
      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "author") {
              next();
              return;
            }
          }
          res
            .status(403)
            .send({ message: "Bạn không có quyền truy cập vào trang này!" });
          return;
        }
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isAuthor,
};
module.exports = authJwt;
