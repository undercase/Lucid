import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="date">
          {this.props.date}
        </div>
        <div className="summary">
          {this.props.summary}
        </div>
      </div>
    );
  }
}
