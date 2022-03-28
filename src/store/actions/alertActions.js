import { SETALERT, CLEARALERT } from '../types/alertTypes';

export const setAlert = (alert) => {
    const setAlertThunk = (dispatch) => {
        dispatch({ type: SETALERT, payload: alert });
        setTimeout(dispatch({ type: CLEARALERT }), 3000);
    }
    return setAlertThunk;
}

export const clearAlert = (dispatch) => {
    dispatch({ type: CLEARALERT });
}