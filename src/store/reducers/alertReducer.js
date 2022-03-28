import { SETALERT, CLEARALERT } from '../types/alertTypes';

const initialState = {
    type: '',
    msg: ''
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETALERT: return action.payload
        case CLEARALERT: return { type: '', msg: '' }
        default: return state
    }
}

export default alertReducer;