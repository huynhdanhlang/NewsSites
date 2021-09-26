import { DELETE_LISTTOPIC } from "./types";

import ListTopic from "../../../services/listTopic.service";

export const deleteTopicTag = (id) => async (dispatch) => {
  try {
    await ListTopic.remove(id);

    dispatch({
      type: DELETE_LISTTOPIC,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
