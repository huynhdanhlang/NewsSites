const controller = require("../controllers/sendMail.controller");

module.exports = function (app) {
  app.post("/api/send/mail", controller.sendMail);
};
