import {
  getTypes,
  showMailPopup,
  hideMailPopup,
} from "../../actions/saga/topic";
import { initialState } from "./const";

export default function modalReducers(state = initialState.sendmail, action) {
  switch (action.type) {
    case getTypes(showMailPopup):
      return {
        isShowPopup: true,
      };
    case getTypes(hideMailPopup):
      return {
        isShowPopup: false,
      };
    default:
      return state;
  }
}
