import React from 'react'
import { Container, Grid } from '@mui/material';
import InfoCards from '../../components/infocards/InfoCards';
import MembersTable from '../../components/memberstable/MembersTable';
import AlertBox from '../../components/alertbox/AlertBox';
import MemberForm from '../../components/memberform/MemberForm';


const Dashboard = () => {
    return (
        <Container sx={{ paddingY: "50px", marginBottom: "50px" }}>
            <AlertBox />
            <InfoCards />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                    <MemberForm />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <MembersTable />
                </Grid>
            </Grid>

        </Container>
    )
}

export default Dashboard
