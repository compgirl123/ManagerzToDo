import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
   alert(localStorage.getItem('is_authenticated'));
  return (
     //localStorage.getItem("is_authenticated") ? <Outlet/> : <Navigate to ="/"/>

     localStorage.getItem('is_authenticated') ? <Outlet/> : <Navigate to ="/"/>

  );
};

export default PrivateRoute;
