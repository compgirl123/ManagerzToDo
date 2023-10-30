import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Card from "./components/card";

function App() {
  const baseUrl = "https://managerztododb.onrender.com";

  const [values, setValues] = useState({ name: '', category: '' });
  const [games, setGames] = useState([]);

  // useEffect to load data initially and when values.name or values.category change
  useEffect(() => {
    fetchGames();
  }, [games]);

  const fetchGames = () => {
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
      setGames([...games, response.data]); // Update the local state with the new entry
    });
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Manager's To Do's</h1>
        <div className="register-box">
          <input className="register-input" type="text" name="name" placeholder="Title" value={values.name} onChange={handleChangeValues} />
          <input className="register-input" type="text" name="category" placeholder="Category" value={values.category} onChange={handleChangeValues} />
          <button className="register-button" onClick={handleClickButton}>Add</button>
        </div>
        <br />
        <div className="cards">
          {games.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              category={game.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
