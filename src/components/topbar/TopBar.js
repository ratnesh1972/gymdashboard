import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import logo from '../../assets/images/logo.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import ColorModeContext from '../../store/context/ColorModeContext';

const TopBar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <div style={{ background: "#1f1f1f" }}>
            <Container sx={{ marginTop: "0px", paddingY: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <img src={logo} width="80" alt="Logo of TGF" />
                <div>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: "#fff" }} /> : <Brightness4Icon sx={{ color: "#fff" }} />}
                    </IconButton>
                </div>
            </Container>
        </div>
    )
}

export default TopBar
