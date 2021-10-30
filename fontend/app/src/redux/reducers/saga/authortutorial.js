import {
  getTypes,
  showAuthorTutorial,
  hideAuthorTutorial,
} from "../../actions/saga/posts";
import { initialState } from "./const";

export default function modalReducers(
  state = initialState.authortutorial,
  action
) {
  switch (action.type) {
    case getTypes(showAuthorTutorial):
      return {
        isShowTutorial: true,
      };
    // case getTypes(hideAuthorTutorial):
    //   return {
    //     isShowTutorial: false,
    //   };
    default:
      return state;
  }
}
