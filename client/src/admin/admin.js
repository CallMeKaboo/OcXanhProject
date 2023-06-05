import React, { useContext } from 'react';
import '../css/global-styles.css';
import './admin.css';
// import LoginAdmin from './pages/login/login';
import SideBar from './components/sidebar';
import NavBar from './components/nav';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function AppAdmin() {
    const { logoutAdmin } = useContext(AuthContext);
    window.onpopstate = logoutAdmin;
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <NavBar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AppAdmin;
