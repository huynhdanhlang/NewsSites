import { RETRIEVE_ALLROLES } from "../../actions/thunk/types";

const initialState = [];

export default function (roles = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ALLROLES:
      return action.payload;

    default:
      return roles;
  }
}
