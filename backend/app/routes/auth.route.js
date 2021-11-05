const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,Origin,Content-Type,Accept"
    );
    next();
  });

  var middlewares = [
    verifySignUp.checkDuplicateUsernameorEmail,
    // verifySignUp.checkRolesExisted,
  ];
  app.post("/api/auth/signup", middlewares, controller.singup);

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
};
