//Merge reducers in one

import { combineReducers } from "redux";

import auth from "./thunk/auth";

import message from "./thunk/message";
import posts from "./saga/posts";
import modal from "./saga/postsmodal";

export default combineReducers({
  auth,
  message,
  posts,
  modal,
});
