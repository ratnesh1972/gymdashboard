//React Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
//UI Imports
import CustomCard from '../customcard/CustomCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

//Action Imports
import { fetchNotifications } from '../../store/actions/notificationsActions';

const NotifcationList = () => {

    const { data, loading } = useSelector(store => store.notifications)
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchNotifications);
        // eslint-disable-next-line
    }, []);

    return (
        <CustomCard variant="outlined">
            <Typography variant="h6" pb="24px">Notifications</Typography>
            {loading ? (<Skeleton variant="rectangular" width='100%' height='100px' />)
                :
                (
                    <List>
                        {
                            data.map((transaction, index) => {
                                const { member, credit, start_date, end_date } = transaction;
                                const gymPackage = transaction.package;
                                const startDate = new Date(start_date).toLocaleDateString();
                                const endDate = new Date(end_date).toLocaleDateString();
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar sx={{}}>{member.name[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${member.name} - Rs.${credit} Pending`} secondary={`For ${gymPackage} month package, started on ${startDate} ended on ${endDate}`} />
                                    </ListItem>
                                )
                            }
                            )
                        }
                    </List>
                )
            }
            {data.length === 0 && <Typography textAlign="center" color={theme.palette.text.secondary}>No Notifications</Typography>}
        </CustomCard>
    )
}

export default NotifcationList;
