import React from 'react';
import Logout from '../Logout/Logout';
import "./Header.scss";

const Header = ({ setIsAdding, setIsAuthenticated }) => {

  return (
    <header>
      <div className="logout">
        <Logout setIsAuthenticated={setIsAuthenticated} style={{ marginTop: '30px', marginBottom: '18px' }} />
      </div>
    </header>
  );
};

export default Header;
