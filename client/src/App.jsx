import React, { useState, useEffect } from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';

import Login from './components/Login/Login';

function App() {
  const baseUrl = "https://managerztododb.onrender.com";
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  //const baseUrl = "localhost:3001";
  const [values, setValues] = useState({ name: '', category: '' });
  const [games, setGames] = useState([]);

  // useEffect to load data initially and when values.name or values.category change
  /*useEffect(() => {
    fetchGames();
  }, []);*/

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  /*const fetchGames = () => {
    console.log('Fetching games...'); // Add this line
    Axios.get(`${baseUrl}/games`, {
      params: { name: values.name, category: values.category }
    }).then((response) => {
      setGames(response.data);
    });
  }

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  const handleClickButton = () => {
    setValues({ name: '', category: '' });
    Axios.post(`${baseUrl}/register`, {
      name: values.name,
      category: values.category,
    }).then((response) => {
      //setGames([...games, response.data]); // Update the local state with the new entry
      alert("TEST")
      fetchGames();
    });
  }*/

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
