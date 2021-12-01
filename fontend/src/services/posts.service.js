import api from "./api";

const getPosts = (payload) => {
  console.log(["fsfs"], payload);
  return api.post("/posts/all/",  payload );
};
const getPostsId = (payload) => {
  return api.get("/posts/postsId/" + payload);
};
const getPostsAll = () => {
  return api.get("/posts/postall/");
};

const createPost = (payload) => {
  return api.post("/posts/create", payload);
};

const updatePost = (payload) => {
  return api.post("/posts/update", payload);
};

const deletePost = (payload) => {
  console.log(["delete_payload"], payload);
  return api.post("/posts/delete", payload);
};

export default {
  getPosts,
  getPostsId,
  createPost,
  updatePost,
  getPostsAll,
  deletePost,
};
