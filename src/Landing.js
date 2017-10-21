import React, { Component } from 'react';

import './css/Landing.css';


export default class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sky">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className="wrapper">
          <div className='title'>
            <h1>Lucid</h1>
            <h2><span className="flashing">productive</span> sleep</h2>
            <div className="ghost button">start dreaming</div>
          </div>
        </div>
      </div>
    );
  }
}
