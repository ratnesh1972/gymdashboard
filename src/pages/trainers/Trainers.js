import React from 'react'
import { Container, Grid } from '@mui/material';
import TrainersTable from '../../components/trainerstable/TrainersTable';
import TrainerForm from '../../components/trainerform/TrainerForm';
import AlertBox from '../../components/alertbox/AlertBox';

const Trainers = () => {

    return (
        <Container sx={{ paddingY: "50px", marginBottom: "50px" }}>
            <AlertBox />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                    <TrainerForm />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <TrainersTable />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Trainers;