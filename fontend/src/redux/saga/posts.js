import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions/saga/posts";
import api from "../../services/posts.service";

function* getPostsSaga(action) {
  try {
    const posts = yield call(api.getPosts, action.payload); //excute function
    localStorage.setItem("posts", JSON.stringify(posts.data));
    console.log("[getPostsSaga - posts]", posts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPosts.getPostsFailure(error));
  }
}

function* getPostsIdSaga(action) {
  try {
    const posts = yield call(api.getPostsId, action.payload); //excute function
    console.log("[getPostsSaga - posts]", posts);
    yield put(actions.getPostsId.getPostsIdSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPostsId.getPostsIdFailure(error));
  }
}

function* getPostsAllSaga(action) {
  try {
    const posts = yield call(api.getPostsAll, action.payload); //excute function
    console.log("[getPostsSaga - All posts]", posts);
    yield put(actions.getPostsAll.getPostsASuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPostsAll.getPostsAFailure(error));
  }
}
function* createPostsSaga(action) {
  try {
    const posts = yield call(api.createPost, action.payload); //excute function
    console.log("[createPostsSaga - posts]", posts);
    yield put(actions.createPosts.createPostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createPosts.createPostsFailure(error));
  }
}

function* updatePostsSaga(action) {
  try {
    const posts = yield call(api.updatePost, action.payload); //excute function
    console.log(" updatePostsSaga - posts]", posts);
    yield put(actions.updatePosts.updatePostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.updatePosts.updatePostsFailure(error));
  }
}

function* deletePostsSaga(action) {
  try {
    console.log(["action"], action);
    console.log(["action.payload"], action.payload);
    const posts = yield call(api.deletePost, action.payload);
    console.log(" deletePosts - posts]", posts);
    yield put(actions.deletePosts.deletePostsSuccess(posts.data));
  } catch (error) {
    yield put(actions.deletePosts.deletePostsFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.getPosts.getPostsRequest, getPostsSaga);
  yield takeLatest(actions.getPostsId.getPostsIdRequest, getPostsIdSaga);
  yield takeLatest(actions.createPosts.createPostsRequest, createPostsSaga);
  yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostsSaga);
  yield takeLatest(actions.getPostsAll.getPostsARequest, getPostsAllSaga);
  yield takeLatest(actions.deletePosts.deletePostsRequest, deletePostsSaga);
}

export default mySaga;
