import api from "./api";

const getAllRoles = () => {
  return api.get("/roles");
};

export default {
  getAllRoles,
};
