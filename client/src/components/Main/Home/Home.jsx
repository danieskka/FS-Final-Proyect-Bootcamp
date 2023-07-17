import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import Signup from './Signup/Signup';
import Login from './Login/Login';

const Home = ({ isRegistered, onSignUpExitoso }) => {
  
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLoginExitoso = () => {
    setIsLoggedIn(true);
  };

  return (
    <section className="home-container">
      <div className="form-container">
        <article className="form-box">
          {isRegistered ? (
            <div>
              <h2 className="title">Login</h2>
              <Login onLogin={handleLoginExitoso} />
            </div>
          ) : (
            <div>
              <h2 className="title">Sign up</h2>
              <Signup onSignUp={onSignUpExitoso} />
              <div className="button-container">
                <button
                  className="button"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Continue without register
                </button>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Home;