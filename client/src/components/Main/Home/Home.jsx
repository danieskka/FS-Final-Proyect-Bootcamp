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
          <h1>Welcome to the Wizarding World of Harry Potter</h1>
          <article>
          <p>As the tale usually says... You will be able only to go through this website if you are not a muggle, otherwise you may not even know what is this term used for i am afraid</p>
          <p>Else you are a Wizard or an apprentice please follow me and sign up bellow in order to navigate through the magic that awaits underneath...</p>
        </article>
        <article className="form-box">
          { 1==1 ? (
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