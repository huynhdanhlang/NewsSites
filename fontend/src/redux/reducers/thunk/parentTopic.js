import {
  CREATE_PARENTTOPIC,
  UPDATE_PARENTTOPIC,
  RETRIEVE_PARENTTOPIC,
  DELETE_PARENTTOPIC,
  DELETE_ALL_PARENTTOPIC,
  RETRIEVE_PARENTTOPICAUTHOR,
} from "../../actions/thunk/types";

const initialState = [];

export default function (parentTopic = initialState, action) {
  switch (action.type) {
    case CREATE_PARENTTOPIC:
      return [...parentTopic, action.payload];

    case RETRIEVE_PARENTTOPIC:
      return action.payload;
    case RETRIEVE_PARENTTOPICAUTHOR:
      return action.payload;

    case UPDATE_PARENTTOPIC:
      try {
        return parentTopic.parentTopic.map((parent) => {
          if (parent._id === action.payload._id) {
            return {
              ...parent,
              ...action.payload,
            };
          } else {
            return parent;
          }
        });
      } catch (error) {
        try {
          return parentTopic.map((parent) => {
            if (parent._id === action.payload._id) {
              return {
                ...parent,
                ...action.payload,
              };
            } else {
              return parent;
            }
          });
        } catch (error) {}
      }

    case DELETE_PARENTTOPIC:
      return parentTopic.filter(({ _id }) => _id !== action.payload._id);

    case DELETE_ALL_PARENTTOPIC:
      return [];

    default:
      return parentTopic;
  }
}
