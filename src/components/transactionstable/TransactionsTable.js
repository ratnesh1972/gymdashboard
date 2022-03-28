//React Imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';

//UI Imports
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import CustomCard from '../customcard/CustomCard';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
//Icon Imports
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Action Imports
import { setCurrentTransaction, deleteTransaction, clearCurrentTransaction } from '../../store/actions/memberActions';

const TransactionsTable = () => {

    const { loading, transactions, current_transaction } = useSelector(store => store.member);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleTransactionEdit = (transaction_id) => {
        dispatch(setCurrentTransaction(transaction_id));
    }

    const handleTransactionDelete = (transaction_id) => {
        if (current_transaction !== null) {
            if (current_transaction._id === transaction_id) dispatch(clearCurrentTransaction)
        }
        dispatch(deleteTransaction(transaction_id));
    }

    const getTotalCredit = () => {
        let total = 0;
        transactions.forEach(transaction => total += transaction.credit);
        return `Total Rs. ${total} Pending`;
    }

    //check the payment status of transaction based upon transactions data.
    const checkStatus = (id) => {
        console.log('I am coming in checkstatus', transactions);
        const data = transactions.filter(transaction => (id === transaction._id))[0];
        console.log(data.credit);
        return (data.credit > 0 ? true : false);
    };

    const columns = [
        {
            field: 'member',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={checkStatus(params.row._id) ? "Pending" : "Paid"}
                    size="small"
                    color={checkStatus(params.row._id) ? "error" : "success"}
                />
            )
        },
        {
            field: 'trainer',
            headerName: 'Trainer',
            flex: 1,
            renderCell: (params) => `${params.value}`
        },
        {
            field: 'package',
            headerName: 'Package',
            flex: 1,
            renderCell: (params) => `${params.value} Months`
        },
        {
            field: 'slot',
            headerName: 'Time Slot',
            flex: 1
        },
        {
            field: 'start_date',
            headerName: 'Start Date',
            flex: 1,
            renderCell: (params) => new Date(params.value).toLocaleDateString()
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            flex: 1,
            renderCell: (params) => new Date(params.value).toLocaleDateString()
        },
        {
            field: 'fees',
            headerName: 'Fees',
            flex: 1
        },
        {
            field: 'paid',
            headerName: 'Paid',
            flex: 1
        },
        {
            field: 'credit',
            headerName: 'Credit',
            flex: 1
        },
        {
            field: 'recieved_by',
            headerName: 'Recieved By',
            flex: 1
        },
        {
            field: 'recieved_date',
            headerName: 'Recieved Date',
            flex: 1,
            renderCell: (params) => params.value !== null ? new Date(params.value).toLocaleDateString() : ''
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon color="warning" />} onClick={() => handleTransactionEdit(params.row._id)} label="Edit" />,
                <GridActionsCellItem icon={<DeleteIcon color="error" />} onClick={() => handleTransactionDelete(params.row._id)} label="Delete" />
            ]
        }
    ]

    return (
        <CustomCard variant="outlined">
            <Typography variant="h6" pb="8px">Transactions</Typography>
            <Typography variant="body1" pb="24px" color={theme.palette.text.secondary}>{getTotalCredit()}</Typography>
            <Box sx={{ width: '100%' }} >
                <Box sx={{ overflow: 'auto' }}>
                    {loading ? (<Skeleton variant="rectangular" width='auto' />)
                        :
                        (
                            <DataGrid
                                columns={columns}
                                rows={transactions}
                                getRowId={(row) => row._id}
                                autoHeight
                                components={{ Toolbar: GridToolbar }}
                                sx={{ width: { xs: '1200px', md: '1200px' } }}
                            />
                        )
                    }
                </Box>
            </Box>
        </CustomCard>
    )
}
export default TransactionsTable
