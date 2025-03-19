import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLogin = localStorage.getItem('login') === 'true';

    if (!isLogin) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            <Outlet />
        </>
    )
};

export default PrivateRoute;
