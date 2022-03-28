import { FETCHNOTIFICATIONS } from '../types/notificationsTypes';
import { SETALERT } from '../types/alertTypes';
import authHeaders from '../authHeaders';

import axios from 'axios';

export const fetchNotifications = async (dispatch) => {
    try {
        const config = authHeaders();
        const res = await axios.get('https://gymdashboardbackend.herokuapp.com/transactiondetails/notifications', config);
        dispatch({ type: FETCHNOTIFICATIONS, payload: res.data });
    } catch (error) {
        dispatch({ type: SETALERT, payload: { type: 'error', msg: error.message } });
    }

}