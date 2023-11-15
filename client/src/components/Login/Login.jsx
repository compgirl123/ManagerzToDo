import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Axios from "axios"
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userCredentials = { email, password };
    //setUserCredentials(userCredentials);
    Axios.post(`https://managerztododb.onrender.com/login`, {
       email: userCredentials.email,
       password: userCredentials.password
    }).then((response) => {
      console.log("DANNY");
      console.log(response);
    Swal.fire({
        timer: 500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setUserCredentials(response);
          //setIsAuthenticated(true);
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false
          });
          navigate("/dashboard", { state: { userCredentials } });
        },
      });
    }).catch((error) => {
      console.log("potatoes");
      console.error('Network error:', error);
      Swal.fire({
        timer: 500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            timer: 500,
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    });
  };

  return (
    <div className="full-screen">
      <div className="small-container">
      <h1 className="title-login">Admin Login</h1>
        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input style={{ marginTop: '12px' }} type="submit" value="Login" className="login-button" />
            <p style={{textAlign:'center', marginTop: '5px'}}>Don't have an account? <a href="/signup">Sign up Here</a></p>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;
