import api from "./api";

const getAll = () => {
  return api.get("/author/topic/childTopic");
};

const get = (id) => {
  console.log(["oooooo"], id);
  return api.get(`/author/topic/childTopic/${id}`);
};

const getTopic = (author) => {
  console.log(["oooooo"], author);
  return api.get(`/author/topic/childTopic/author/${author}`);
};

const create = (data) => {
  return api.post("/author/topic/childTopic", data);
};

const update = (id, data) => {
  return api.put(`/author/topic/childTopic/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/author/topic/childTopic/${id}`);
};

const removeAll = () => {
  return api.delete("/author/topic/childTopic");
};

const findByName = (params) => {
  return api.get(`/author/topic/childTopic`, { params });
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
