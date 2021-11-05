const controller = require("../controllers/roles.controller");

module.exports = function (app) {
  app.get("/api/roles", controller.getAllRoles);
};
