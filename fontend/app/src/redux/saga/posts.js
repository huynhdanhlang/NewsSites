import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions/posts";
import * as api from "../../services/posts.service";

function* getPostsSaga(action) {
  try {
    const posts = yield call(api.getPosts); //excute function
    console.log("[getPostsSaga - posts]", posts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPosts.getPostsFailure(error));
  }
}

function* createPostsSaga(action) {
  try {
    const posts = yield call(api.createPost,action.payload); //excute function
    console.log("[createPostsSaga - posts]", posts);
    yield put(actions.createPosts.createPostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createPosts.createPostsFailure(error));
  }
}

function* updatePostsSaga(action) {
  try {
    const posts = yield call(api.updatePost,action.payload); //excute function
    console.log(" updatePostsSaga - posts]", posts);
    yield put(actions.updatePosts.updatePostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.updatePosts.updatePostsFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.getPosts.getPostsRequest, getPostsSaga);
  yield takeLatest(actions.createPosts.createPostsRequest, createPostsSaga);
  yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostsSaga);
}

export default mySaga;
