import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

function RequireAuth() {
    const { admin } = useContext(AuthContext);
    // console.log(admin);  
    const location = useLocation();

    return admin ? <Outlet /> : <Navigate to={'/admin'} state={{ from: location }} replace />;
}

export default RequireAuth;
