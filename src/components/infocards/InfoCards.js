//React Imports
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//UI Imports
import CustomCard from '../customcard/CustomCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

//Icon Imports
import MoneyIcon from '@mui/icons-material/Money';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

//Action Imports
import { fetchTotalInfo } from '../../store/actions/totalinfoActions';


const InfoCards = () => {
    const theme = useTheme();
    const { data, loading } = useSelector(store => store.totalinfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTotalInfo);
        // eslint-disable-next-line
    }, [])
    return (
        <Box sx={{ paddingBottom: '30px' }}>
            <Grid container spacing={3}>
                <Grid item md={4} sm={12} xs={12} xl={4}>
                    <CustomCard variant="outlined">
                        <Typography variant="body1" display="flex" alignItems="center" pb="24px" fontWeight="bold" color={theme.palette.text.secondary}>
                            <CreditCardIcon fontSize="medium" sx={{ marginRight: "12px" }} /> Total Charged
                            </Typography>
                        {loading ? (<Skeleton variant="rectangular" width='100%' height='10px' />)
                            :
                            <Typography variant="h4">
                                Rs. {data.total_charged}
                            </Typography>
                        }
                    </CustomCard>
                </Grid>
                <Grid item md={4} sm={12} xs={12} xl={4}>
                    <CustomCard variant="outlined">
                        <Typography variant="body1" display="flex" alignItems="center" pb="24px" fontWeight="bold" color={theme.palette.text.secondary} >
                            <MoneyIcon fontSize="medium" sx={{ marginRight: "12px" }} /> Total Paid
                            </Typography>
                        {loading ? (<Skeleton variant="rectangular" width='100%' height='10px' />)
                            :
                            <Typography variant="h4">
                                Rs. {data.total_paid}
                            </Typography>
                        }
                    </CustomCard>
                </Grid>
                <Grid item md={4} sm={12} xs={12} xl={4}>
                    <CustomCard variant="outlined">
                        <Typography variant="body1" display="flex" alignItems="center" pb="24px" fontWeight="bold" color={theme.palette.text.secondary}>
                            <AccountBalanceIcon fontSize="medium" sx={{ marginRight: "12px" }} /> Total Balance
                            </Typography>
                        {loading ? (<Skeleton variant="rectangular" width='100%' height='10px' />)
                            :
                            <Typography variant="h4">
                                Rs. {data.total_balance}
                            </Typography>
                        }
                    </CustomCard>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoCards;