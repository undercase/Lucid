import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/SignUp.css';

export default class SignUp extends Component {
  render() {
    return (
      <div className="signup">
        <h1>Sign up with <Link to="/">Lucid</Link></h1>
        <div className="grid">
          <div className="left">
            <h2>Enhance your sleep</h2>
            <p>Lucid is the next generation of sleep; combining a revolutionary sleep-tracking system and emotional analysis, lucid helps you track & analyze your dreams. Get started for free and see how your dreams are influencing your daily life.</p>
          </div>
          <div className="right">
            <form>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <div className="ghost button">Sign Up</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

