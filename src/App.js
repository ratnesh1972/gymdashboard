import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import ColorModeContext from './store/context/ColorModeContext';
//UI Imports
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Member from './pages/member/Member';
import Trainers from './pages/trainers/Trainers';
import Notifications from './pages/notifications/Notifications';
import Login from './components/auth/Login';
import Authenticate from './components/auth/Authenticate';
import { useState } from 'react';
import './styles/custom.css';

//Function to get palette values depending on mode value.
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? {
      primary: {
        main: '#FF2626'
      },
      secondary: {
        main: '#1f1f1f'
      },
      background: {
        default: "#FFFFFF",
        paper: "#FFFFFF"
      }
    } :
      {
        text: {
          primary: "#fff",
          secondary: "rgba(255, 255, 255, 0.7)"
        },
        primary: {
          main: '#FF2626'
        },
        secondary: {
          main: '#F5F5F5'
        },
        background: {
          default: "#121212",
          paper: "#1f1f1f"
        }
      })
  },
  typography: {
    fontFamily: "DM Sans, sans- serif",
  }
});

const App = () => {

  const [mode, setMode] = useState('dark');

  //Returns an object with function to toggle mode
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
  }), []);

  //Returns a theme object, and change values only when mode value changes.
  const theme = useMemo(() =>
    createTheme(getDesignTokens(mode))
    , [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Routes>
            <Route path="/" element={<Authenticate><Layout /></Authenticate>}>
              <Route index element={< Dashboard />} />
              <Route path="/member/:id" element={<Member />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
