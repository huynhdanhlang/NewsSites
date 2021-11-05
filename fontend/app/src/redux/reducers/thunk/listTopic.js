import { DELETE_LISTTOPIC } from "../../actions/thunk/types";

const initialState = [];
export default function (listTopic = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_LISTTOPIC:
      return listTopic.filter(({ _id }) => _id !== payload._id);
    default:
      return listTopic;
  }
}
