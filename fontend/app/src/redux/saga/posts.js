import { takeLatest, call, put } from "redux-saga/effects";
import { getPosts } from "../actions/posts";
import * as api from "../../services/posts.service";

function* getPostsSaga(action) {
  const posts = yield call(api.getPosts); //excute function
  console.log("[posts]", posts);

  yield put(getPosts.getPostsSuccess(posts));
}

function* mySaga() {
  yield takeLatest(getPosts.getPostsRequest, getPostsSaga);
}

export default mySaga;
