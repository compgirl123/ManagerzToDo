import React from 'react';
import Logout from '../Logout/Logout';
import "./Header.scss";

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1 className="managerHeader">Manager's To Do's</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }} className="logout">
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
