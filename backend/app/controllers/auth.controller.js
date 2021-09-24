const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

var jwt = require("jsonwebtoken");
var bycrypt = require("bcryptjs");

exports.singup = (req, res) => {
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: bycrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // console.log(req.body.roles);
    //Nếu người dùng có vai trò trong request đăng ký thì tìm các và trò đó và gán vào roles người dùng
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Người dùng đã được tạo thành công!" });
          });
        }
      );
    }
    // else {
    //   res.send({ message: "Người dùng không có vai trò!" });
    //Nếu người đăng ký chưa có vai trò trong request thì mặc định là vai trò user
    // Tìm vai trò có tên "user" và gán nó cho roles của người dùng
    // Role.findOne({ name: "user" }, (err, role) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }
    //   user.roles = [role._id];
    //   user.save((err) => {
    //     if (err) {
    //       res
    //         .status(500)
    //         .send({ message: err + });
    //       return;
    //     }
    //     res.send({ message: "Người dùng đã được tạo thành công!" });
    //   });
    // });
    // }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Người dùng không tồn tại" });
      }

      var passIsValid = bycrypt.compareSync(req.body.password, user.password);

      if (!passIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mật khẩu không chính xác!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);
      console.log(["refresh token"], refreshToken);

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  console.log(["new refresh token"], requestToken);
  if (requestToken == null) {
    return res.status(403).json({ message: "Yêu cầu làm mới token!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res
        .status(403)
        .json({ message: "Làm mới token không có trong database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res
        .status(403)
        .json({ message: "Làm mới token hết hạn.Làm ơn đăng nhập lại!" });

      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    return res.status(500).send({ message: err });
  }
};
