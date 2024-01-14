import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = ({user}) => {
    if (!user) {
        return <Navigate to="/login" replace />;
      }
    else {
      return <Outlet />;
    }
}

export default Protected