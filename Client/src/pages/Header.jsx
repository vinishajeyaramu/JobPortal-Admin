import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white h-16 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <a href="https://superlabs.co/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="superlabs-logo" className="w-32 h-auto" />
        </a>
      </div>

     
    </nav>
  );
};

export default Navbar;