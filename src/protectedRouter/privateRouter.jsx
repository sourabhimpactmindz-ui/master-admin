import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () =>  {
  if(localStorage.getItem('accessToken')){
    return <Outlet></Outlet>
  }else{
    return <Navigate to='/' replace />
  }
  
}

export default PrivateRouter