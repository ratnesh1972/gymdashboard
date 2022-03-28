import axios from 'axios';
import { FETCHMEMBER, ADDTRANSACTION, SETCURRENTTRANSACTION, UPDATETRANSACTION, DELETETRANSACTION, CLEARCURRENTTRANSACTION } from '../types/memberTypes';
import { SETALERT } from '../types/alertTypes';
import authHeaders from '../authHeaders';

export const fetchMember = (member) => {
    const fetchMemberThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            const res = await axios.get(`https://gymdashboardbackend.herokuapp.com/members/${member}`, config);
            const trans = await axios.get(`https://gymdashboardbackend.herokuapp.com/transactions/member/${member}`, config);
            dispatch({ type: FETCHMEMBER, payload: { member: res.data, transactions: trans.data } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.response.data.msg } });
        }
    }
    return fetchMemberThunk;
}

export const addTransaction = (transaction) => {
    const addTransactionThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            const res = await axios.post(`https://gymdashboardbackend.herokuapp.com/transactions`, transaction, config);
            dispatch({ type: ADDTRANSACTION, payload: res.data });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Transaction Added Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return addTransactionThunk;
}

export const updateTransaction = (transaction, id) => {
    const updateTransactionThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            const res = await axios.put(`https://gymdashboardbackend.herokuapp.com/transactions/${id}`, transaction, config);
            dispatch({ type: UPDATETRANSACTION, payload: res.data });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Transaction Updated Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return updateTransactionThunk;
}

export const deleteTransaction = (id) => {
    const deleteTransactionThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            await axios.delete(`https://gymdashboardbackend.herokuapp.com/transactions/${id}`, config);
            dispatch({ type: DELETETRANSACTION, payload: id });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Transaction deleted Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return deleteTransactionThunk;
}

export const setCurrentTransaction = (transaction_id) => {
    const setCurrentTransactionThunk = async (dispatch) => {
        try {
            dispatch({ type: SETCURRENTTRANSACTION, payload: transaction_id });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return setCurrentTransactionThunk;
}

export const clearCurrentTransaction = (dispatch) => {
    try {
        dispatch({ type: CLEARCURRENTTRANSACTION });
    } catch (error) {
        dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
    }
}
