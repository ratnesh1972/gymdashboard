import { combineReducers } from 'redux';
import trainersReducer from './trainersReducer';
import alertReducer from './alertReducer';
import membersReducer from './membersReducer';
import memberReducer from './memberReducer';
import notificationsReducer from './notificationsReducer';
import authReducer from './authReducer';
import totalinfoReducer from './totalinfoReducer';

const allReducers = combineReducers({
    totalinfo: totalinfoReducer,
    trainers: trainersReducer,
    alerts: alertReducer,
    members: membersReducer,
    member: memberReducer,
    notifications: notificationsReducer,
    auth: authReducer
});

export default allReducers;