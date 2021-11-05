const controller = require("../controllers/sendMail.controller");

module.exports = function (app) {
  app.post("/api/sendmail", controller.sendMail);
};
