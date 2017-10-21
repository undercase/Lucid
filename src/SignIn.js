import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/SignIn.css';

export default class SignIn extends Component {
  render() {
    return (
      <div className="signin">
        <Link to="/">
          <h1>Lucid</h1>
        </Link>
        <form>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="ghost button">Submit</div>
        </form>
      </div>
    );
  }
}

