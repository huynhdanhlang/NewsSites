//ActionsCreater
import { createActions, createAction } from "redux-actions";

const getTypes = (reduxAction) => {
  return reduxAction().type;
};

const getPosts = createActions({
  getPostsRequest: (payload) => payload,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (error) => error,
});

const getPostsId = createActions({
  getPostsIdRequest: (payload) => payload,
  getPostsIdSuccess: (payload) => payload,
  getPostsIdFailure: (error) => error,
});

const getPostsAll = createActions({
  getPostsARequest: undefined,
  getPostsASuccess: (payload) => payload,
  getPostsAFailure: (error) => error,
});
//Cac ham trong createActions la obj tra ve dang:

/*
  getTypes(getPosts.getPostsSuccess)
  ==>  return 
          {
            type: "getPostsSuccess",
            payload:{
              name:"test"
            }
          }
*/

const showModal = createAction("SHOW_CREATE_POST_MODAL");
const hideModal = createAction("HIDE_CREATE_POST_MODAL");

const showModalEdit = createAction("SHOW_EDIT_POST_MODAL");
const hideModalEdit = createAction("HIDE_EDIT_POST_MODAL");

const createPosts = createActions({
  createPostsRequest: (payload) => payload,
  createPostsSuccess: (payload) => payload,
  createPostsFailure: (error) => error,
});

const updatePosts = createActions({
  updatePostsRequest: (payload) => payload,
  updatePostsSuccess: (payload) => payload,
  updatePostsFailure: (error) => error,
});

const deletePosts = createActions({
  deletePostsRequest: (payload) => payload,
  deletePostsSuccess: (payload) => payload,
  deletePostsFailure: (error) => error,
});

export {
  getPosts,
  getPostsId,
  createPosts,
  updatePosts,
  getPostsAll,
  deletePosts,
  getTypes,
  hideModal,
  showModal,
  hideModalEdit,
  showModalEdit,
};
