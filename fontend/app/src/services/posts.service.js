import axios from "axios";

const API_URL = "http://localhost:8080/api/posts/";

const getPosts = () => {
  return axios.get(API_URL + "all");
};

const createPost = (payload) => {
  return axios.post(API_URL + "create", payload);
};

const updatePost = (payload) => {
  return axios.post(API_URL + "update", payload);
};

export { getPosts, createPost, updatePost };
