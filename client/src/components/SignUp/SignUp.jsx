import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios"
import "./SignUp.scss";

const SignUp = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = e => {
    e.preventDefault();
    const userCredentials = { name, email, password };
    Axios.post(`https://managerztododb.onrender.com/signup`, {
       name: userCredentials.name,
       email: userCredentials.email,
       password: userCredentials.password
    }).then((response) => {
    Swal.fire({
        timer: 500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
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
      <h1 className="title-SignUp">Admin Sign Up</h1>
        <form onSubmit={handleSignUp} className="form">
          <div className="input-group">
            <label htmlFor="email">Name</label>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
          <input style={{ marginTop: '12px' }} type="submit" value="Sign Up" className="SignUp-button" />
          </div>
        </form>
      </div>
    </div>

  );
};

export default SignUp;
