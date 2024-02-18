import React from 'react';
import Logout from '../Logout/Logout';
import "./Header.scss";

const Header = ({ userData, setIsAuthenticated }) => {
  return (
    <header>
      <div className="header-content">
        <h2 className="userLoggedIn">Welcome {userData.name}</h2>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
