//React Imports
import * as React from 'react';
//UI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

//Style object for delete modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const DeleteModal = ({ state, handleClose, handleDelete }) => {
    return (
        <Modal
            open={state}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color="primary">
                    Warning!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    Deleting a member will also delete all related transactions details permanently.
                </Typography>
                <Button variant="outlined" color="secondary" onClick={handleClose}>Cancle</Button>
                <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleDelete}>Continue</Button>
            </Box>
        </Modal>
    );
}

export default DeleteModal;