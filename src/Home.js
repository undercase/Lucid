import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="sky">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className="wrapper">
          <div id='title'>
            <h1>Lucid</h1>
            <h2><span className="flashing">productive</span> sleep</h2>
            <div className="ghost button">start dreaming</div>
          </div>
        </div>
        <div className="bottom">
          <h6>Already dreaming? Click here to sign in</h6>
        </div>
      </div>
    );
  }
}
