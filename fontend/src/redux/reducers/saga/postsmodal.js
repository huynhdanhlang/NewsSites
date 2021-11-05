import { getTypes, showModal, hideModal } from "../../actions/saga/posts";
import { initialState } from "./const";

export default function modalReducers(state = initialState.modal, action) {
  switch (action.type) {
    case getTypes(showModal):
      return {
        isShow: true,
      };
    case getTypes(hideModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
