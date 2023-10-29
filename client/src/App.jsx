import React, {useState, useEffect} from 'react'
import './App.css'
import Axios from "axios";
import Card from "./components/card";

function App() {

    //const baseUrl = "http://localhost:3001"
    const baseUrl = "https://managerztododb.onrender.com"

    const [values, setValues] = useState();
    const [games, setGames] = useState([]);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            name: values.name,
            category: values.category,
        }).then((response) =>{
            console.log(response)
            setGames([...games,response.data]);
        });
    }


    useEffect(() => {
      Axios.get(`${baseUrl}/games`)
          .then((response) => {
              setGames(response.data);
          });
    }, [games]); // Empty dependency array to run the effect only once


  return (
    <div className="App">
      <div className="container">
          <h1 className="title">Manager's To Do's</h1>
          <div className="register-box">
              <input className="register-input" type="text" name="name" placeholder="Title" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="category" placeholder="Category" onChange={handleChangeValues} />
              <button className="register-button" onClick={handleClickButton}>Add</button>
          </div>
          <br/>
          <div className="cards">
              {typeof games !== 'undefined' &&
                  games.map((game) => {
                      return <Card
                          key={game.id}
                          id={game.id}
                          name={game.name}
                          category={game.category}
                          >
                      </Card>;
                  })}
          </div>
      </div>
    </div>
  )
}

export default App
