module.exports = function (app) {
  const topicParent = require("../controllers/topic_parent.controller");

  var router = require("express").Router();

  // Create a new TopicParent
  router.post("/", topicParent.create);

  // Retrieve all TopicParents
  router.get("/", topicParent.findAll);

  // Retrieve all published TopicParents
  // router.get("/published", topicParent.findAllPublished);

  // Retrieve a single TopicParent with id
  router.get("/:id", topicParent.findOne);

  // Update a TopicParent with id
  router.put("/:id", topicParent.update);

  // Delete a TopicParent with id
  router.delete("/:id", topicParent.delete);

  // Create a new TopicParent
  router.delete("/", topicParent.deleteAll);

  app.use("/api/author/topic/topicParent", router);
};
