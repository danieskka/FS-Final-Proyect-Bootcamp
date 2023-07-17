import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Favorites from "./Favorites";
import { AuthContext } from "../../context/authContext";

const Main = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);

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