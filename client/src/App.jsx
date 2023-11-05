import React, { useState, useEffect } from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
      {console.log('Value of isAuthenticated: ' + isAuthenticated)}
    </>
  );
}

export default App;
