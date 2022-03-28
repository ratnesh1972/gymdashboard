import React from 'react';
import { Container } from '@mui/material';
import NotificationList from '../../components/notificationlist/NotifcationList';
import AlertBox from '../../components/alertbox/AlertBox';

const Notifications = () => {
    return (
        <Container sx={{ paddingY: "50px", marginBottom: "50px" }}>
            <AlertBox />
            <NotificationList />
        </Container>
    )
}

export default Notifications;
