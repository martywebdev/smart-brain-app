import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({element}) => {

    const user = useSelector((state) => state.auth.user);

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet/>
}

export default PublicRoute
