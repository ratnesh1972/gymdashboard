//UI Imports
import TextField from '@mui/material/TextField';
import { styled } from '@mui/styles';

const CustomField = styled(TextField)(({ theme }) => ({
    '& fieldset': {
        border: "1px solid rgba(145, 158, 171, 0.32)",
    },
    '& .MuiInputBase-root': {
        borderRadius: "8px",
    },
}))

export default CustomField;