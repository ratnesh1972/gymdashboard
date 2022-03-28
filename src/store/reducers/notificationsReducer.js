import { FETCHNOTIFICATIONS } from '../types/notificationsTypes';

const initialState = {
    data: [],
    loading: true
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHNOTIFICATIONS: return {
            data: [...action.payload],
            loading: false
        };
        default: return state;
    }
}

export default notificationsReducer;