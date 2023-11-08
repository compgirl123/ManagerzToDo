import React, { useState, useEffect} from 'react';
import Axios from "axios";
import Card from "../Card/Card";
import Header from "./Header";
import "./Dashboard.scss";

const Dashboard = ({ setIsAuthenticated }) => {
  const [values, setValues] = useState({ name: '', category: '' });
  const [tasks, setTasks] = useState([]);
  const [warning, setWarning] = useState("");
  const baseUrl = "https://managerztododb.onrender.com";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    Axios.get(`${baseUrl}/games`, {
      params: { name: values.name, category: values.category }
    }).then((response) => {
      setTasks(response.data);
    });
  }

  const handleChangeValues = (value) => {
    /*setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));*/
    setValues(({
      [value.target.name]: value.target.value,
    }));
  }

  const handleClickButton  = () => {

    if(values.name){
      Axios.post(`${baseUrl}/add`, {
        name: values.name,
        //category: values.category
      }).then((response) => {
        fetchTasks();
      }).catch((error) => {
        console.error('Network error:', error);
        console.log(values.name);
      });
      setValues({
        ...values,
        name: '',
      });
    }
    else{
      setWarning("Input box must not be empty");
    }
}

  return (
  <div className="app">
    <div className="container">
      <Header setIsAuthenticated={setIsAuthenticated}/>
      <div className="register-box">
        <input className="register-input" type="text" name="name" placeholder="Add Task" value={values.name} onChange={handleChangeValues}/>
        {/*<input className="register-input" type="text" name="category" placeholder="Category" value={values.category} onChange={handleChangeValues} />*/}
        <button className="register-button" onClick={handleClickButton}>Add</button>
      </div>
      <br />
      <div className="cards">
      <p style={{color:'red', paddingBottom:'10px'}}>{warning}</p>
        {tasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            name={task.name}
            category={task.category}
            onDeleteTask={fetchTasks}
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
