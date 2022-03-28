import { LOGIN, LOGOUT, LOADUSER, UNLOADUSER } from '../types/authTypes';

const initialState = {
    isLoggedIn: false,
    user: {},
    loading: true
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADUSER:
            return {
                isLoggedIn: true,
                user: action.payload,
                loading: false
            }
        case UNLOADUSER:
            return {
                isLoggedIn: false,
                user: {},
                loading: true
            }
        case LOGIN:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                isLoggedIn: true,
                loading: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                isLoggedIn: false,
                user: {},
                loading: true
            }
        default: return state
    }
}

export default alertReducer;