import React from "react";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

const Home = ({ isRegistered, isLoggedIn, onSignUpExitoso, onLoginExitoso }) => {
  return (
    <div>
      {isRegistered ? (
        <div>
          <h2>Iniciar sesión</h2>
          <Login onLogin={onLoginExitoso} />
        </div>
      ) : (
        <div>
          <h2>Registro</h2>
          <Signup onSignUp={onSignUpExitoso} />
          <button onClick={() => setIsLoggedIn(true)}>Navegar sin registrarse</button>
        </div>
      )}
      {isLoggedIn && <Logout />}
    </div>
  );
};

export default Home;
