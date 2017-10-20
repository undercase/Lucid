import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home.js';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    );
  }
}
