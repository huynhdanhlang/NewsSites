import api from "./api";

const getAll = () => {
  return api.get("/childTopic");
};

const get = (id) => {
  return api.get(`/childTopic/${id}`);
};

const create = (data) => {
  return api.post("/childTopic", data);
};

const update = (id, data) => {
  return api.put(`/childTopic/${id}`, data);
};

const remove = (id, data) => {
  return api.put(`/childTopic/${id}`, data);
};

const removeAll = () => {
  return api.delete("/childTopic");
};

const findByName = (name) => {
  return api.get(`/childTopic?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
