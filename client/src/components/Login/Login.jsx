import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios"
import "./Login.scss";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    const userCredentials = { email, password };
    Axios.post(`https://managerztododb.onrender.com/login`, {
       email: userCredentials.email,
       password: userCredentials.password
    }).then((response) => {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false
          });
        },
      });
    }).catch((error) => {
      console.error('Network error:', error);
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            timer: 1500,
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
          <div className="input-group success">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div class="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="qwerty"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input style={{ marginTop: '12px' }} type="submit" value="Login" className="login-button" />
        </form>
      </div>
    </div>

  );
};

export default Login;
