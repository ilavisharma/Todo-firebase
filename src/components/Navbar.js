import React from 'react';
import GoogleAuth from './GoogleAuth';

const Navbar = () => {
  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <a className="active item">Home</a>
        <div className="right menu">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
