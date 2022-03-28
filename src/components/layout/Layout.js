import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import TopBar from '../topbar/TopBar';
//Layout component puts Navbar in each page.
const Layout = () => {
    return (
        <>
            <TopBar />
            <Outlet />
            <Navbar />
        </>
    )
}

export default Layout;
