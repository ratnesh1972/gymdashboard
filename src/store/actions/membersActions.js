import axios from 'axios';
import { FETCHMEMBERS, ADDMEMBER, SETCURRENTMEMBER, CLEARCURRENTMEMBER, UPDATEMEMBER, DELETEMEMBER } from '../types/membersTypes';
import { SETALERT } from '../types/alertTypes';
import authHeaders from '../authHeaders';

export const fetchMembers = async (dispatch) => {
    try {
        const config = authHeaders();
        const res = await axios.get('https://gymdashboardbackend.herokuapp.com/members', config);
        dispatch({ type: FETCHMEMBERS, payload: res.data });
    } catch (error) {
        dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
    }

}

export const addMember = (member) => {
    const addMemberThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            const res = await axios.post('https://gymdashboardbackend.herokuapp.com/members', member, config);
            dispatch({ type: ADDMEMBER, payload: res.data });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Member Added Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return addMemberThunk;
}

//Action to update member
export const updateMember = (member, id) => {
    const updateMemberThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            const res = await axios.put(`https://gymdashboardbackend.herokuapp.com/members/${id}`, member, config);
            dispatch({ type: UPDATEMEMBER, payload: res.data });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Member Updated Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return updateMemberThunk;
}

export const deleteMember = (id) => {
    const deleteMemberThunk = async (dispatch) => {
        try {
            const config = authHeaders();
            await axios.delete(`https://gymdashboardbackend.herokuapp.com/members/${id}`, config);
            dispatch({ type: DELETEMEMBER, payload: id });
            dispatch({ type: SETALERT, payload: { type: 'success', msg: 'Member Deleted Successfully!' } });
        } catch (error) {
            dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
        }
    }
    return deleteMemberThunk;
}

export const setCurrentMember = (id) => {
    const setCurrentMemberThunk = async (dispatch) => {
        try {
            dispatch({ type: SETCURRENTMEMBER, payload: id });
        } catch (error) {
            dispatch({
                type: SETALERT,
                payload: { type: "error", msg: error.message },
            });
        }
    };
    return setCurrentMemberThunk;
};

export const clearCurrentMember = (dispatch) => {
    try {
        dispatch({ type: CLEARCURRENTMEMBER });
    } catch (error) {
        dispatch({
            type: SETALERT,
            payload: { type: "error", msg: error.message },
        });
    }
};
