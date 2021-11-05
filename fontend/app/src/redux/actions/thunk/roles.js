import { RETRIEVE_ALLROLES } from "./types";
import RoleService from "../../../services/roles.service";

export const retrieveAllRoles = () => async (dispatch) => {
  try {
    const res = await RoleService.getAllRoles();

    dispatch({
      type: RETRIEVE_ALLROLES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
