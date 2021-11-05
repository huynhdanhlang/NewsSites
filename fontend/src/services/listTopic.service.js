import api from "./api";

const remove = (id) => {
  return api.delete(`/author/topic/topicParent/listTopic/${id}`);
};

export default {
  remove,
};
