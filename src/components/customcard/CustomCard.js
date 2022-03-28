//UI Imports
import Card from '@mui/material/Card';
import { styled } from '@mui/styles';

const CustomCard = styled(Card)(({ theme }) => ({
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: theme.palette.mode === 'light' ? "rgba(145,158,171,0.20) 0px 0px 2px 0px, rgba(145,158,171,0.12) 0px 12px 24px -4px" : "rgba(0,0,0,0.20) 0px 0px 2px 0px, rgba(0,0,0,0.12) 0px 12px 24px -4px",
    borderRadius: "16px",
    padding: "24px",
    border: "none"
}))

export default CustomCard;