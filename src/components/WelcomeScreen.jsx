import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="it-tat-logo">
          <div className="logo-circle">
            <span className="logo-text">IT TAT</span>
          </div>
        </div>
        <h1 className="welcome-text">Welcome to ModME IT TAT</h1>
      </div>
    </div>
  );
};

export default WelcomeScreen;