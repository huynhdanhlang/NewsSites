const controller = require("../controllers/posts.controller");

module.exports = function (app) {
  app.get("/api/posts/postall", controller.getPostsAll);

  app.get("/api/posts/all/:author", controller.getPosts);

  app.get("/api/posts/postsId/:id", controller.getPostsId);

  app.post("/api/posts/create", controller.createPost);

  app.post("/api/posts/update", controller.updatePost);

  app.post("/api/posts/delete", controller.deletePost);
};
