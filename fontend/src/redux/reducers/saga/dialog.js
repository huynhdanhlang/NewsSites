import { getTypes, showDialog, hideDialog } from "../../actions/saga/posts";
import { initialState } from "./const";

export default function modalReducers(state = initialState.dialog, action) {
  switch (action.type) {
    case getTypes(showDialog):
      return {
        isShowDialog: true,
      };
    case getTypes(hideDialog):
      return {
        isShowDialog: false,
      };
    default:
      return state;
  }
}
