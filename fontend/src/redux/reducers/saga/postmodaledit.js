import { getTypes, showModalEdit, hideModalEdit } from "../../actions/saga/posts";
import { initialState } from "./const";

export default function modalReducers(state = initialState.modaledit, action) {
  switch (action.type) {
    case getTypes(showModalEdit):
      return {
        isShowEdit: true,
      };
    case getTypes(hideModalEdit):
      return {
        isShowEdit: false,
      };
    default:
      return state;
  }
}
