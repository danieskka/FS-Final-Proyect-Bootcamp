import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Footer = () => {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await axios.post('/logout');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <footer>
      {isLoggedIn && (
        <button onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </footer>
  );
};

export default Footer;
