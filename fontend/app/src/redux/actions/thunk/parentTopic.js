import {
  CREATE_PARENTTOPIC,
  UPDATE_PARENTTOPIC,
  RETRIEVE_PARENTTOPIC,
  DELETE_PARENTTOPIC,
  DELETE_ALL_PARENTTOPIC,
} from "./types";

import ParentTopicService from "../../../services/parentTopic.service";

export const createcParentTopic =
  (name_topic_parent, name_topic_child, approved, canceled) =>
  async (dispatch) => {
    try {
      const res = await ParentTopicService.create({
        name_topic_parent,
        name_topic_child,
        approved,
        canceled,
      });

      dispatch({
        type: CREATE_PARENTTOPIC,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const retrieveParentTopic = () => async (dispatch) => {
  try {
    const res = await ParentTopicService.getAll();

    dispatch({
      type: RETRIEVE_PARENTTOPIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateParentTopic = (id, data) => async (dispatch) => {
  try {
    const res = await ParentTopicService.update(id, data);

    dispatch({
      type: UPDATE_PARENTTOPIC,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteParentTopic = (id) => async (dispatch) => {
  try {
    await ParentTopicService.remove(id);

    dispatch({
      type: DELETE_PARENTTOPIC,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllParenttopic = () => async (dispatch) => {
  try {
    const res = await ParentTopicService.removeAll();

    dispatch({
      type: DELETE_ALL_PARENTTOPIC,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findByNameParentTopic = (name) => async (dispatch) => {
  try {
    const res = await ParentTopicService.findByName(name);

    dispatch({
      type: RETRIEVE_PARENTTOPIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
