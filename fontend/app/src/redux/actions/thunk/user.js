import { RETRIEVE_ALLUSER } from "./types";
import UserService from "../../../services/user.service";

export const retrieveUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("error");
    const res = await UserService.getAllUser();

    dispatch({
      type: RETRIEVE_ALLUSER,
      payload: res.data,
    });
  } catch (error) {
    const _alluser =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("error", JSON.stringify(true));
    localStorage.setItem("isAllow", JSON.stringify(_alluser));
  }
};

export const findByNameUser = (params) => async (dispatch) => {
  try {
    const res = await UserService.findByName(params);

    dispatch({
      type: RETRIEVE_ALLUSER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
