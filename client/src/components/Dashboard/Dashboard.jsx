import React, { useState, useEffect} from 'react';
import Axios from "axios";
import Card from "../Card/Card";
import Header from "./Header";

const Dashboard = ({ setIsAuthenticated }) => {
  const [values, setValues] = useState({ name: '', category: '' });
  const [games, setGames] = useState([]);
  const baseUrl = "https://managerztododb.onrender.com";
  //const baseUrl = "http://localhost:3001";

  // useEffect to load data initially and when values.name or values.category change
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
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

  const handleClickButton  = () => {
    Axios.post(`${baseUrl}/add`, {
      name: values.name,
      category: values.category
    }).then((response) => {
      fetchGames();
      alert('Button clicked');
    }).catch((error) => {
      console.error('Network error:', error);
      console.log(values.name);
    });
}

  /*const handleClickButton = () => {
    setValues({ name: '', category: '' });
    Axios.post(`${baseUrl}/add`, {
      name: values.name,
      category: values.category,
    }).then((response) => {
      //setGames([...games, response.data]); // Update the local state with the new entry
      fetchGames();
    });
  }
  */

  return (
    <div className="App">
    <div className="container">
      <h1 className="title">Manager's To Do's</h1>
      <Header setIsAuthenticated={setIsAuthenticated}/>
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
            onDeleteGame={fetchGames} // Pass the callback function
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
