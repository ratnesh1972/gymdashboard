import axios from "axios";
import {
  FETCHTRAINERS,
  ADDTRAINER,
  SETCURRENTTRAINER,
  CLEARCURRENTTRAINER,
  UPDATETRAINER,
  DELETETRAINER,
} from "../types/trainersTypes";
import { SETALERT } from "../types/alertTypes";
import authHeaders from '../authHeaders';

export const fetchTrainers = async (dispatch) => {
  try {
    const config = authHeaders();
    const res = await axios.get("https://gymdashboardbackend.herokuapp.com/trainers", config);
    dispatch({ type: FETCHTRAINERS, payload: res.data });
  } catch (error) {
    dispatch({
      type: SETALERT,
      payload: { type: "error", msg: error.message },
    });
  }
};

export const addTrainer = (trainer) => {
  const addTrainerThunk = async (dispatch) => {
    try {
      const config = authHeaders();
      const res = await axios.post(
        "https://gymdashboardbackend.herokuapp.com/trainers",
        trainer,
        config
      );
      dispatch({ type: ADDTRAINER, payload: res.data });
      dispatch({
        type: SETALERT,
        payload: { type: "success", msg: "Trainer Added Successfully!" },
      });
    } catch (error) {
      dispatch({
        type: SETALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
  return addTrainerThunk;
};

export const updateTrainer = (trainer, id) => {
  const updateTrainerThunk = async (dispatch) => {
    try {
      const config = authHeaders();
      const res = await axios.put(
        `https://gymdashboardbackend.herokuapp.com/trainers/${id}`,
        trainer,
        config
      );
      dispatch({ type: UPDATETRAINER, payload: res.data });
      dispatch({
        type: SETALERT,
        payload: { type: "success", msg: "Trainer Updated Successfully!" },
      });
    } catch (error) {
      dispatch({
        type: SETALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
  return updateTrainerThunk;
};

export const setCurrentTrainer = (trainer_id) => {
  const setCurrentTrainerThunk = async (dispatch) => {
    try {
      dispatch({ type: SETCURRENTTRAINER, payload: trainer_id });
    } catch (error) {
      dispatch({
        type: SETALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
  return setCurrentTrainerThunk;
};

export const clearCurrentTrainer = (dispatch) => {
  try {
    dispatch({ type: CLEARCURRENTTRAINER });
  } catch (error) {
    dispatch({
      type: SETALERT,
      payload: { type: "error", msg: error.message },
    });
  }
};

export const deleteTrainer = (trainer) => {
  const deleteTrainerThunk = async (dispatch) => {
    try {
      const config = authHeaders();
      await axios.delete(
        `https://gymdashboardbackend.herokuapp.com/trainers/${trainer}`, config
      );
      dispatch({ type: DELETETRAINER, payload: trainer });
      dispatch({
        type: SETALERT,
        payload: { type: "success", msg: "Trainer Deleted Successfully!" },
      });
    } catch (error) {
      dispatch({
        type: SETALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
  return deleteTrainerThunk;
};
