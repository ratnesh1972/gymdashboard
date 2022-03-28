import { FETCHTOTALINFO } from '../types/totalinfoTypes';
import { SETALERT } from '../types/alertTypes';
import authHeaders from '../authHeaders';

import axios from 'axios';

export const fetchTotalInfo = async (dispatch) => {
    try {
        const config = authHeaders();
        const res = await axios.get('https://gymdashboardbackend.herokuapp.com/transactiondetails/totalinfo', config);
        dispatch({ type: FETCHTOTALINFO, payload: res.data });
    } catch (error) {
        dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
    }

}