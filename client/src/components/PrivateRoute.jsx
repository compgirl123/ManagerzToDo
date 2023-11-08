import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  return (
     //localStorage.getItem("is_authenticated") ? <Outlet/> : <Navigate to ="/"/>
     localStorage.getItem('is_authenticated') ? <Outlet/> : <Navigate to ="/"/>

  );
};

export default PrivateRoute;
