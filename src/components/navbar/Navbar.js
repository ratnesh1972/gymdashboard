//React Imports
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//UI Imports
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

//Icon Imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

//Actions Imports
import { logout } from '../../store/actions/authActions';

const FixedBottomNavigation = () => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
        // eslint-disable-next-line 
    }, [value]);

    return (

        <Box ref={ref} >
            <Paper elevation={8} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Dashboard" value="dashboard" icon={<DashboardIcon />} onClick={() => navigate('/')} />
                    <BottomNavigationAction label="Trainers" value="trainers" icon={<FitnessCenterIcon />} onClick={() => navigate('/trainers')} />
                    <BottomNavigationAction label="Notifications" value="notifications" icon={<NotificationsIcon onClick={() => navigate('/notifications')} />} />
                    <BottomNavigationAction label="Logout" value="logout" icon={<LogoutIcon onClick={() => dispatch(logout)} />} />
                </BottomNavigation>
            </Paper>
        </Box >
    );
}

export default FixedBottomNavigation;

