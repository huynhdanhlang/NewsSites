import api from "./api";

const getAll = () => {
  return api.get("/author/topic/topicParent");
};

const get = (id) => {
  console.log(["oooooo"], id);
  return api.get(`/author/topic/topicParent/${id}`);
};

const getTopic = (author) => {
  console.log(["oooooo"], author);
  return api.get(`/author/topic/topicParent/author/${author}`);
};

const create = (data) => {
  return api.post("/author/topic/topicParent", data);
};

const update = (id, data) => {
  return api.put(`/author/topic/topicParent/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/author/topic/topicParent/${id}`);
};

const removeAll = () => {
  return api.delete("/author/topic/topicParent");
};

const findByName = (name) => {
  return api.get(`/author/topic/topicParent?name=${name}`);
};

export default {
  getAll,
  get,
  getTopic,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
