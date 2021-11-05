import {
  getTypes,
  getPosts,
  createPosts,
  updatePosts,
  getPostsAll,
  deletePosts,
  getPostsId,
} from "../../actions/saga/posts";

const postView = JSON.parse(localStorage.getItem("postView"));

const initialState = postView
  ? { isLoading: true, data: [postView] }
  : { isLoading: false, data: [] };

export default function postsReducers(state = initialState, action) {
  switch (action.type) {
    case getTypes(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getTypes(getPosts.getPostsSuccess):
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getTypes(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getTypes(getPostsId.getPostsIdRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getTypes(getPostsId.getPostsIdSuccess):
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getTypes(getPostsId.getPostsIdFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getTypes(getPostsAll.getPostsARequest):
      return {
        ...state,
        isLoading: true,
      };
    case getTypes(getPostsAll.getPostsASuccess):
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getTypes(getPostsAll.getPostsAFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getTypes(createPosts.createPostsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getTypes(updatePosts.updatePostsSuccess):
      return {
        ...state,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getTypes(deletePosts.deletePostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}
