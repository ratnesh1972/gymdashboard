import React from 'react'
import { Container } from '@mui/material';
import TrainersTable from './TrainersTable';
import TrainerForm from './TrainerForm';
import AlertBox from '../layout/AlertBox';

const Trainers = () => {

    return (
        <Container sx={{ marginBottom: '50px' }}>
            <AlertBox />
            <TrainerForm />
            <TrainersTable />
        </Container>
    )
}

export default Trainers;
