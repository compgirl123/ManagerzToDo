import React, { useState, useEffect} from 'react';
import Axios from "axios";
import Card from "../Card/Card";
import Header from "./Header";
import "./Dashboard.scss";
import { useLocation } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const { userCredentials } = location.state || {};
  const [values, setValues] = useState({ task: '', category: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [warning, setWarning] = useState("");
  const baseUrl = "https://managerztododb.onrender.com";

  /*useEffect(() => {
    fetchTasks();
  }, []);*/

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    /*Axios.get(`${baseUrl}/todos`, {
      params: { name: values.name, category: values.category }
    }).then((response) => {
      setTasks(response.data);
    });*/
    Axios.post(`${baseUrl}/todos`, {
      params: {
      email: userCredentials.email,
      password: userCredentials.password,
      name: values.task,
      category: values.category,
    }})
    .then((response) => {
      setTasks(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
      // Handle error as needed, e.g., set an error state
    });
  }

  const handleChangeValues = (value) => {
    setValues(({
      [value.target.name]: value.target.value,
    }));
  }

  const handleClickButton  = () => {
    if(values.task){
      Axios.post(`${baseUrl}/add`, {
        task: values.task,
        //category: values.category
      }).then((response) => {
        fetchTasks();
      }).catch((error) => {
        console.error('Network error:', error);
        console.log(values.task);
      });
      setValues({
        ...values,
        task: '',
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
            name={task.task}
            category={task.category}
            onDeleteTask={fetchTasks}
            //onEditTask =
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
