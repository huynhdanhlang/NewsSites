import {
  CREATE_CHILDTOPIC,
  RETRIEVE_CHILTOPIC,
  UPDATE_CHILDTOPIC,
  DELETE_CHILDTOPIC,
  DELETE_ALL_CHILDTOPIC,
  RETRIEVE_CHILDTOPICAUTHOR,
} from "../../actions/thunk/types";

const initialState = [];

export default function (childTopic = initialState, action) {
  switch (action.type) {
    case CREATE_CHILDTOPIC:
      return [...childTopic, action.payload];

    case RETRIEVE_CHILTOPIC:
      return action.payload;
    case RETRIEVE_CHILDTOPICAUTHOR:
      return action.payload;

    case UPDATE_CHILDTOPIC:
      return childTopic.map((child) => {
        if (child._id === action.payload._id) {
          return {
            ...child,
            ...action.payload,
          };
        } else {
          return child;
        }
      });

    case DELETE_CHILDTOPIC:
      return childTopic.filter(({ _id }) => _id !== action.payload._id);

    case DELETE_ALL_CHILDTOPIC:
      return [];

    default:
      return childTopic;
  }
}
