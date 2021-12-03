const controller = require("../controllers/posts.controller");

module.exports = function (app) {
  app.post("/api/posts/postall", controller.getPostsAll);

  app.post("/api/posts/all", controller.getPosts);

  app.get("/api/posts/postsId/:id", controller.getPostsId);

  app.post("/api/posts/create", controller.createPost);

  app.post("/api/posts/update", controller.updatePost);

  app.post("/api/posts/delete", controller.deletePost);
};
