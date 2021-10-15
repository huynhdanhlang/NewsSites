import api from "./api";

const getPublicContent = () => {
  return api.get("/test/all");
};

// const getUserBoard = () => {
//   return api.get("/test/user");
// };

const getAuthorBoard = () => {
  return api.get("/test/author");
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getAllUser = () => {
  return api.get("/test/admin");
};

const update = (data) => {
  return api.post("/user/update", data);
};

const findByName = (name) => {
  return api.get(`/user?name=${name}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUser,
  update,
  findByName,
  getPublicContent,
  getAuthorBoard,
  getModeratorBoard,
};
