//Header.js
import React from 'react';
import './Header.css'; // Import your CSS file

const Header = () => {
  return (
    <div className="header" style={{ color: '#fff', fontFamily: 'cursive', fontSize: '1.5rem' }}> {/* Add the className attribute */}
      <h1>Qoala Thai ID OCR App</h1>
    </div>
  );
};

export default Header;
