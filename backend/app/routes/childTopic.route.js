module.exports = function (app) {
  const childTopic = require("../controllers/topic_child.controller");

  var router = require("express").Router();

  // Create a new ChildTopic
  router.post("/", childTopic.create);

  // Retrieve all ChildTopics
  router.get("/", childTopic.findAll);

  // Retrieve all published ChildTopics
  // router.get("/published", childTopic.findAllPublished);

  // Retrieve a single TopicChild with auhtor
  router.get("/author/:author", childTopic.findAllAuthor);
  // Retrieve a single ChildTopic with id
  router.get("/:id", childTopic.findOne);

  // Update a ChildTopic with id
  router.put("/:id", childTopic.update);

  // Delete a ChildTopic with id
  router.delete("/:id", childTopic.delete);

  // Create a new ChildTopic
  // router.delete("/", childTopic.deleteAll);

  app.use("/api/author/topic/childTopic", router);
};
