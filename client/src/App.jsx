import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
//import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/signup" element={<SignUp />} />
          {isAuthenticated ? (
            <Route element={<Dashboard setIsAuthenticated={setIsAuthenticated}/>} path="/dashboard"/>
          ) : (
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
