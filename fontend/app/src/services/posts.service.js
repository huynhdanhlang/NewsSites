import api from "./api";


const getPosts = (payload) => {
  return api.get("/posts/all/" + payload);
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

export { getPosts, createPost, updatePost, getPostsAll };
