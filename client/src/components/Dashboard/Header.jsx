import React from 'react';
import Logout from '../Logout/Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>Employee Management Software</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
