//React Imports
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//UI Imports
import Typography from '@mui/material/Typography';
import CustomCard from '../customcard/CustomCard';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

//Icon Imports
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';

//Action Imports
import { fetchMember } from '../../store/actions/memberActions';


const MemberInfo = () => {
    const { id } = useParams();
    const { member, loading } = useSelector(store => store.member);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        if (!member) {
            dispatch(fetchMember(id));
        } else {
            if (member._id !== id) {
                dispatch(fetchMember(id));
            }
        }
        // eslint-disable-next-line
    }, [id, member])

    return (
        <Box sx={{ paddingBottom: '30px' }}>
            <CustomCard variant="outlined">
                <Typography variant="h6" pb="24px">{member !== null && member.name.split(" ")[0]}'s Profile</Typography>
                {loading ? (<Skeleton variant="rectangular" width='100%' height='200px' />)
                    :
                    (<Grid container spacing={3}>
                        <Grid item md={4} xs={12} display="flex">
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><MilitaryTechIcon size="small" sx={{ marginRight: "8px" }} /> Status : </Typography> <Chip icon={member.status === 'Active' ? <CheckIcon /> : <CloseIcon />} label={member.status} size="small" color={member.status === 'Active' ? 'success' : 'error'} />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><MarkEmailUnreadIcon size="small" sx={{ marginRight: "8px" }} /> Email : {member.email}</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><PhoneAndroidIcon size="small" sx={{ marginRight: "8px" }} /> Phone : {member.phone}</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><HomeIcon size="small" sx={{ marginRight: "8px" }} /> Address : {member.address}</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><ContactPageIcon size="small" sx={{ marginRight: "8px" }} /> Age : {member.age}</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><MonitorWeightIcon size="small" sx={{ marginRight: "8px" }} /> Weight : {member.weight} Kg.</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><AccessibilityNewIcon size="small" sx={{ marginRight: "8px" }} /> Height : {member.height} Cm.</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><GroupIcon size="small" sx={{ marginRight: "8px" }} /> Reference : {member.reference === '' ? 'N/A' : member.reference}</Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="body1" mr="10px" display="flex" alignItems="center" color={theme.palette.text.secondary}><HowToRegIcon size="small" sx={{ marginRight: "8px" }} /> Registered Date : {new Date(member.reg_date).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                    )
                }
            </CustomCard >
        </Box>
    )
}

export default MemberInfo
