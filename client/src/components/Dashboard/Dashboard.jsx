import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import Header from './Header';
import './Dashboard.scss';
import { useLocation } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [values, setValues] = useState({ name: '' });
  const [tasks, setTasks] = useState([]);
  const [warning, setWarning] = useState('');
  const baseUrl = 'https://managerztododb.onrender.com';

  useEffect(() => {
    fetchTasks();
    console.log(userData);
  }, []);

  const fetchTasks = () => {
    Axios.post(`${baseUrl}/todos`, {
      email: userData.email,
      password: userData.password,
    })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleChangeValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickButton = async () => {
    if (values.name.trim()) {
      try {
        await Axios.post(`${baseUrl}/add`, {
          name: values.name,
          id: userData.id,
          email: userData.email,
          password: userData.password,
        });

        await fetchTasks();

        console.log(tasks);
        setValues((prevValues) => ({ ...prevValues, name: "" }));
        setWarning("");
      } catch (error) {
        console.error("Network error:", error);
      }
    } else {
      setWarning("Input box must not be empty");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <div className="register-box">
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Add Task"
            value={values.name}
            onChange={handleChangeValues}
          />
          <button className="register-button" onClick={handleClickButton}>
            Add
          </button>
        </div>
        <br />
        <div className="cards">
          <p style={{ color: 'red', paddingBottom: '10px' }}>{warning}</p>
          {tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              name={task.name}
              category={task.category}
              onDeleteTask={fetchTasks}
              // onEditTask =
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
