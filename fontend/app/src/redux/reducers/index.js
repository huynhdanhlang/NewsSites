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
import sendmail from "./saga/sendmail";
import dialog from "./saga/dialog";

export default combineReducers({
  auth,
  message,
  posts,
  modal,
  modaledit,
  sendmail,
  authortutorial,
  dialog,
  childTopic,
  parentTopic,
});
