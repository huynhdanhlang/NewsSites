import {
  getTypes,
  showAuthorTutorial,
  hideAuthorTutorial,
} from "../../actions/saga/posts";
// import { initialState } from "./const";
let authortutorial = JSON.parse(localStorage.getItem("authorTutorial"));
authortutorial = authortutorial
  ? authortutorial.isShowTutorial
  : {
      isShowTutorial: false,
    };
let initialState =
  authortutorial === true
    ? {
        authortutorial: {
          isShowTutorial: true,
        },
      }
    : {
        authortutorial: {
          isShowTutorial: false,
        },
      };

console.log(["jsdjasdsa"], initialState);
export default function modalReducers(
  state = initialState.authortutorial,
  action
) {
  switch (action.type) {
    case getTypes(showAuthorTutorial):
      return {
        isShowTutorial: true,
      };
    case getTypes(hideAuthorTutorial):
      return {
        isShowTutorial: false,
      };
    default:
      return state;
  }
}
