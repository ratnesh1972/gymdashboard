//React Imports
import React from 'react';

//UI Imports
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MemberInfo from '../../components/memberinfo/MemberInfo';
import AlertBox from '../../components/alertbox/AlertBox';
import NewTransactionForm from '../../components/transactionform/TransactionForm';
import TransactionsTable from '../../components/transactionstable/TransactionsTable';


function Member() {
    return (
        <Container sx={{ paddingY: "50px", marginBottom: "50px" }}>
            <AlertBox />
            <MemberInfo />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                    <NewTransactionForm />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <TransactionsTable />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Member
