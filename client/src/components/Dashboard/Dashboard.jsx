import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import Header from './Header';
import './Dashboard.scss';
import { useLocation } from 'react-router-dom';
import Filters from './Filters';
import Categories from '../Jsons/categories.json';

const Dashboard = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [values, setValues] = useState({ name: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tasks, setTasks] = useState([]);
  const [warning, setWarning] = useState('');
  const baseUrl = 'https://managerztododb.onrender.com';
  const categoryNames = Categories.map(category => category.category);

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

  const getColorByCategory = (selectedCategory) => {
    const category = Categories.find(cat => cat.category === selectedCategory);
    return category ? category.color : null;
  };

  const handleChangeValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (category) => {
    console.log(category);
    console.log(getColorByCategory(category));
    setSelectedCategory(category);
  };

  const handleClickButton = async () => {
    if (values.name.trim()) {
      console.log(selectedCategory);
      try {
        await Axios.post(`${baseUrl}/add`, {
          name: values.name,
          category: selectedCategory,
          id: userData.id,
          email: userData.email,
          password: userData.password,
        });
        console.log(selectedCategory);

        await fetchTasks();

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
      <Header setIsAuthenticated={setIsAuthenticated} userData={userData} />
        <h1 className="managerHeader">Manager's To Do's</h1>
        <br/>
        <div className="register-box">
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Add Task"
            value={values.name}
            onChange={handleChangeValues}
          />
          <Filters
            options={categoryNames}
            defaultLabel="Choose Task Category"
            className="register-input"
            handleOptionChange={handleCategoryChange}
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
            color = {getColorByCategory(task.category)}
          />
        ))}
    </div>
  </div>
  );
};

export default Dashboard;
