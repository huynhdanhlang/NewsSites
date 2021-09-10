//Merge reducers in one

import { combineReducers } from "redux";

import auth from "./thunk/auth";

import message from "./thunk/message";
import posts from "./saga/posts";
import modal from "./saga/postsmodal";
import childTopic from "./thunk/childTopic";
import parentTopic from "./thunk/parentTopic";

export default combineReducers({
  auth,
  message,
  posts,
  modal,
  childTopic,
  parentTopic,
});
