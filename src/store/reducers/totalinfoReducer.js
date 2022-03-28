import { FETCHTOTALINFO } from '../types/totalinfoTypes';

const initialState = {
    data: [],
    loading: true
};

const totalinfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHTOTALINFO: return {
            data: action.payload,
            loading: false
        };
        default: return state;
    }
}

export default totalinfoReducer;