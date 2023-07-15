import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Favorites from "./Favorites";

const Main = () => {
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUpExitoso = () => {
    setIsRegistered(true);
  };

  const handleLoginExitoso = () => {
    setIsLoggedIn(true);
  };

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isRegistered={isRegistered}
              isLoggedIn={isLoggedIn}
              onSignUpExitoso={handleSignUpExitoso}
              onLoginExitoso={handleLoginExitoso}
            />
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  );
};

export default Main;