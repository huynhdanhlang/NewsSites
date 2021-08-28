//Merge reducers in one

import { combineReducers } from "redux";

import auth from "./auth";

import message from "./message";
import posts from "./posts";
import modal from "./postsmodal";

export default combineReducers({
  auth,
  message,
  posts,
  modal,
});
