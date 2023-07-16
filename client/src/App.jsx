import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/authContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />
        <Main />
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;