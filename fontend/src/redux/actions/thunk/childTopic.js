import {
  CREATE_CHILDTOPIC,
  RETRIEVE_CHILTOPIC,
  UPDATE_CHILDTOPIC,
  DELETE_CHILDTOPIC,
  DELETE_ALL_CHILDTOPIC,
  RETRIEVE_CHILDTOPICAUTHOR,
} from "./types";

import ChildTopicService from "../../../services/childTopic.service";

export const createcChildTopic =
  (name_topic_child, author) => async (dispatch) => {
    try {
      const res = await ChildTopicService.create({
        name_topic_child,
        author,
      });

      dispatch({
        type: CREATE_CHILDTOPIC,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const retrieveChildTopic = () => async (dispatch) => {
  try {
    const res = await ChildTopicService.getAll();

    dispatch({
      type: RETRIEVE_CHILTOPIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const retrieveChildTopicAuthor = (author) => async (dispatch) => {
  try {
    const res = await ChildTopicService.getTopic(author);

    dispatch({
      type: RETRIEVE_CHILDTOPICAUTHOR,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateChildTopic = (id, data) => async (dispatch) => {
  try {
    const res = await ChildTopicService.update(id, data);

    dispatch({
      type: UPDATE_CHILDTOPIC,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteChildTopic = (id) => async (dispatch) => {
  try {
    await ChildTopicService.remove(id);

    dispatch({
      type: DELETE_CHILDTOPIC,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllChildtopic = () => async (dispatch) => {
  try {
    const res = await ChildTopicService.removeAll();

    dispatch({
      type: DELETE_ALL_CHILDTOPIC,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findByNameChildTopic = (params) => async (dispatch) => {
  try {
    console.log("dbfsbhfsb", params);
    const res = await ChildTopicService.findByName(params);
    console.log(["oooooo"], res);
    dispatch({
      type: RETRIEVE_CHILTOPIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
