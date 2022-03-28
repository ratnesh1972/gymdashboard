import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../store/actions/authActions';

function Authenticate({ children }) {
    const auth = useSelector(store => store.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser);
        // eslint-disable-next-line 
    }, []);

    if (!auth.isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    return children;
}

export default Authenticate;
