import axios from 'axios';
import { LOGIN, LOGOUT, LOADUSER, UNLOADUSER } from '../types/authTypes';
import { SETALERT } from '../types/alertTypes';
import authHeaders from '../authHeaders';

export const login = (user) => {
    const loginThunk = async (dispatch) => {
        try {
            const res = await axios.post('https://gymdashboardbackend.herokuapp.com/users/signin', user);
            dispatch({ type: LOGIN, payload: res.data });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'You are logged in!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: `${error.response.data.msg}, Please retry.` } });
        }
    }
    return loginThunk;
}

export const loadUser = async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const config = authHeaders();
            const res = await axios.get('https://gymdashboardbackend.herokuapp.com/users', config);
            dispatch({ type: LOADUSER, payload: res.data });
        } catch (error) {
            dispatch({ type: UNLOADUSER });
            dispatch({ type: SETALERT, payload: { type: 'error', msg: `${error.response.data.msg}, Please login again.` } });
        }
    }
}

export const logout = (dispatch) => {
    dispatch({ type: LOGOUT });
}