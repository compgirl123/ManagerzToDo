import React from 'react';
import Logout from '../Logout/Logout';
import "./Header.scss";

const Header = ({ userData, setIsAuthenticated }) => {
  return (
    <header>
      <div className="header-content">
        <h1 className="userLoggedIn">Welcome {userData.name}</h1>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
