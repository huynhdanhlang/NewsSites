//Merge reducers in one

import { combineReducers } from "redux";

import auth from "./thunk/auth";

import message from "./thunk/message";
import posts from "./saga/posts";
import modal from "./saga/postsmodal";
import modaledit from "./saga/postmodaledit";
import childTopic from "./thunk/childTopic";
import parentTopic from "./thunk/parentTopic";
import authortutorial from "./saga/authortutorial";

export default combineReducers({
  auth,
  message,
  posts,
  modal,
  modaledit,
  authortutorial,
  childTopic,
  parentTopic,
});
