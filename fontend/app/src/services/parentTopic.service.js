import api from "./api";

const getAll = () => {
  return api.get("/parentTopic");
};

const get = (id) => {
  return api.get(`/parentTopic/${id}`);
};

const create = (data) => {
  return api.post("/parentTopic", data);
};

const update = (id, data) => {
  return api.put(`/parentTopic/${id}`, data);
};

const remove = (id, data) => {
  return api.put(`/parentTopic/${id}`, data);
};

const removeAll = () => {
  return api.delete("/parentTopic");
};

const findByName = (name) => {
  return api.get(`/parentTopic?name=${name}`);
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
