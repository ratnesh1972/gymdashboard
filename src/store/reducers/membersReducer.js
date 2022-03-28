import { FETCHMEMBERS, ADDMEMBER, SETCURRENTMEMBER, UPDATEMEMBER, DELETEMEMBER, CLEARCURRENTMEMBER } from '../types/membersTypes';

const initialState = {
    data: [],
    loading: true,
    current_member: null
};

const membersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHMEMBERS:
            return {
                ...state,
                data: [...action.payload],
                loading: false
            };
        case ADDMEMBER:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case UPDATEMEMBER:
            return {
                ...state,
                data: state.data.map(member => {
                    if (member._id === action.payload._id) {
                        return action.payload
                    }
                    return member
                })
            }
        case DELETEMEMBER:
            return {
                ...state,
                data: state.data.filter(member => member._id !== action.payload)
            }
        case SETCURRENTMEMBER:
            return {
                ...state,
                current_member: state.data.filter(member => member._id === action.payload)[0]
            }
        case CLEARCURRENTMEMBER:
            return {
                ...state,
                current_member: null
            }
        default:
            return state;
    }
}

export default membersReducer;