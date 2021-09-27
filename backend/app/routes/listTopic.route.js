module.exports = function (app) {
  const listTopic = require("../controllers/listTopic.controller");

  var router = require("express").Router();

  router.delete("/:id", listTopic.delete);

  app.use("/api/author/topic/topicParent/listTopic", router);
};
