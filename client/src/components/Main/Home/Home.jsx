import React from "react";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

const Home = ({ isRegistered, isLoggedIn, onSignUpExitoso, onLoginExitoso }) => {
  return (
    <div className="home-container">
      <div className="form-container">
        <div className="form-box">
          {isRegistered ? (
            <div>
              <h2 className="title">Login</h2>
              <Login onLogin={onLoginExitoso} />
            </div>
          ) : (
            <div>
              <h2 className="title">Sign up</h2>
              <Signup onSignUp={onSignUpExitoso} />
              <div className="button-container">
                <button className="button" onClick={() => setIsLoggedIn(true)}>
                  Continue without register
                </button>
              </div>
            </div>
          )}
          {isLoggedIn && <Logout />}
        </div>
        </div>
      </div>
  );
};




export default Home;
