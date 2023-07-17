import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const cookie = Cookies.get("access-token");
      if(cookie) {
        const token = decodeToken(cookie);
        setIsLoggedIn(token.isLogged);
      } else {
        setIsLoggedIn(false)
      }
  }, [id])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setId }}>
        <Header />
        <Main />
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;