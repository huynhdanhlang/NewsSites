import api from "./api";

const getAll = () => {
  return api.get("/author/topic/childTopic");
};

const get = id => {
  console.log(['oooooo'],id);
  return api.get(`/author/topic/childTopic/${id}`);
};

const create = data => {
  return api.post("/author/topic/childTopic", data);
};

const update = (id, data) => {
  return api.put(`/author/topic/childTopic/${id}`, data);
};

const remove = id => {
  return api.delete(`/author/topic/childTopic/${id}`);
};

const removeAll = () => {
  return api.delete("/author/topic/childTopic");
};

const findByName = name => {
  return api.get(`/author/topic/childTopic?name=${name}`);
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
