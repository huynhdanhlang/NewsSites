import axiosInstance from "./api";

import TokenService from "./token.service";
import { refreshToken } from "../../src/redux/actions/thunk/auth";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        //Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          //Khi người dùng đăng nhập thì refresh token mới
          try {
            const refresh = await axiosInstance.post("/auth/refreshToken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = refresh.data;

            dispatch(refreshToken(accessToken));

            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
