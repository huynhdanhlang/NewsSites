import axios from "axios";

const API_URL = "http://localhost:8080/api/posts/";

const getPosts = () => {
  axios.get(API_URL + "all");
};

const createPost = () => {
  axios.get(API_URL + "create");
};

const updatePost = () => {
  axios.get(API_URL + "update");
};

export { getPosts, createPost, updatePost };
