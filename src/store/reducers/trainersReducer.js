import {
  FETCHTRAINERS,
  SETERROR,
  ADDTRAINER,
  SETCURRENTTRAINER,
  UPDATETRAINER,
  DELETETRAINER,
  CLEARCURRENTTRAINER,
} from "../types/trainersTypes";

const initialState = {
  data: [],
  error: "",
  loading: true,
  current_trainer: null,
};

const trainersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHTRAINERS:
      return {
        ...state,
        error: "",
        data: [...action.payload],
        loading: false,
      };
    case ADDTRAINER:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATETRAINER:
      return {
        ...state,
        data: state.data.map((trainer) => {
          if (trainer._id === action.payload._id) {
            return action.payload;
          }
          return trainer;
        }),
      };
    case DELETETRAINER:
      return {
        ...state,
        data: state.data.filter((trainer) => trainer._id !== action.payload),
      };
    case SETCURRENTTRAINER:
      return {
        ...state,
        current_trainer: state.data.filter(
          (trainer) => trainer._id === action.payload
        )[0],
      };
    case CLEARCURRENTTRAINER:
      return {
        ...state,
        current_trainer: null,
      };
    case SETERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trainersReducer;
