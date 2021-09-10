import {
  CREATE_PARENTTOPIC,
  UPDATE_PARENTTOPIC,
  RETRIEVE_PARENTTOPIC,
  DELETE_PARENTTOPIC,
  DELETE_ALL_PARENTTOPIC,
} from "../../actions/thunk/types";

const initialState = [];

export default function (parentTopic = initialState, action) {
  switch (action.type) {
    case CREATE_PARENTTOPIC:
      return [...parentTopic, action.payload];

    case RETRIEVE_PARENTTOPIC:
      return action.payload;

    case UPDATE_PARENTTOPIC:
      return parentTopic.map((child) => {
        if (child._id === action.payload._id) {
          return {
            ...child,
            ...action.payload,
          };
        } else {
          return child;
        }
      });

    case DELETE_PARENTTOPIC:
      return parentTopic.filter(({ _id }) => _id !== action.payload._id);

    case DELETE_ALL_PARENTTOPIC:
      return [];

    default:
      return parentTopic;
  }
}
