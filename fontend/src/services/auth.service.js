import api from "./api";
import TokenService from "../services/token.service";

const register = (fullname, username, email, password, roles) => {
  return api.post("/auth/signup", {
    fullname,
    username,
    email,
    password,
    roles,
  });
};

const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(["response"], response);
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
