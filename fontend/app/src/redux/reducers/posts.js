import { getTypes, getPosts } from "../actions/posts";

const initialState = {
  isLoading: false,
  data: [],
};

export default function postsReducers(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getTypes(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getTypes(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case getTypes(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
