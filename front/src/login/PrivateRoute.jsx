import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).rol : null;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}`} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

