import { getTypes, getPosts, createPosts, updatePosts } from "../../actions/saga/posts";
import { initialState } from "./const";

export default function postsReducers(state = initialState.posts, action) {
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
    default:
      return state;
  }
}
