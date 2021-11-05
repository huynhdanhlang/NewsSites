import { RETRIEVE_ALLUSER } from "../../actions/thunk/types";

const initialState = [];

export default function (user = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ALLUSER:
      return action.payload;

    default:
      return user;
  }
}
