import {
  CREATE_DATA,
  RETRIEVE_DATA,
  UPDATE_DATA,
  DELETE_DATA,
} from "./actionTypes";

import CRUDService from "../services/crudServices";

export const createDemo = (title, body) => async (dispatch) => {
  try {
    const res = await CRUDService.create({ title, body });

    dispatch({
      type: CREATE_DATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveDemo = () => async (dispatch) => {
  try {
    const res = await CRUDService.getAll();
    dispatch({
      type: RETRIEVE_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateDemo = (id, data) => async (dispatch) => {
  try {
    const res = await CRUDService.update(id, data);

    dispatch({
      type: UPDATE_DATA,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDemo = (id) => async (dispatch) => {
  try {
    await CRUDService.remove(id);

    dispatch({
      type: DELETE_DATA,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
