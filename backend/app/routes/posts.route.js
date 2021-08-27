const controller = require("../controllers/posts.controller");

module.exports = function (app) {
  app.get("/api/posts/all", controller.getPosts);

  app.post("/api/posts/create", controller.createPost);

  app.post("/api/posts/update", controller.updatePost);
};
