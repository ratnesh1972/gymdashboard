import { FETCHMEMBER, CLEARMEMBER, SETEDIT, CLEAREDIT, UPDATEMEMBER, ADDTRANSACTION, UPDATETRANSACTION, SETCURRENTTRANSACTION, CLEARCURRENTTRANSACTION, DELETETRANSACTION, DELETEMEMBER } from '../types/memberTypes';

const initialState = {
    loading: true,
    member: null,
    transactions: [],
    current_transaction: null
}

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHMEMBER:
            return {
                ...state,
                loading: false,
                member: action.payload.member,
                transactions: [...action.payload.transactions]
            }
        case UPDATEMEMBER:
            return {
                ...state,
                loading: false,
                member: action.payload
            }
        case DELETEMEMBER:
        case CLEARMEMBER:
            return {
                ...state,
                loading: true,
                member: null,
                transactions: [],
                current_transaction: null
            }
        case ADDTRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case UPDATETRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(transaction => {
                    if (transaction._id === action.payload._id) {
                        return action.payload;
                    }
                    return transaction;
                })
            }

        case DELETETRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case SETCURRENTTRANSACTION:
            return {
                ...state,
                current_transaction: state.transactions.filter(trans => trans._id === action.payload)[0]
            }
        case CLEARCURRENTTRANSACTION:
            return {
                ...state,
                current_transaction: null
            }
        case SETEDIT:
            return {
                ...state,
                edit: true
            }
        case CLEAREDIT: {
            return {
                ...state,
                edit: false
            }
        }
        default:
            return state;
    }
}

export default memberReducer;