import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRouter = () => {
    const token = localStorage.getItem('accessToken')

    return token ? <Navigate to="/admin/dashboard" replace /> : <Outlet />
}

export default PublicRouter;