//UI Imports
import Button from '@mui/material/Button';
import { styled } from '@mui/styles';

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "16px",
    padding: "8px 16px",
}));

export default CustomButton;