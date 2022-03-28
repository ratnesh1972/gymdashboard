//React Redux Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//UI Imports
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
//Action Imports
import { clearAlert } from '../../store/actions/alertActions';


const AlertBox = () => {

    const { type, msg } = useSelector(store => store.alerts);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const alertVal = msg !== '' ? true : false;
        setOpen(alertVal);
    }, [msg])

    const handleClose = () => setOpen(false);

    return (
        <Snackbar anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={Fade}
            TransitionProps={{ onExited: () => dispatch(clearAlert) }}
        >
            <Alert severity={type ? type : 'success'} variant="filled" sx={{ width: '100%' }} onClose={handleClose}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default AlertBox;
