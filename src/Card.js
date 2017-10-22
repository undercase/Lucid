import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const { text, sentiment } = this.props;
    const arr = text.split(/\b/);
    return (
      <div className="card">
        <div className="date">
          {this.props.date}
        </div>
        <div className="summary">
          {
            arr.map(token => {
              const isPositive = sentiment.positive.some(keyword => keyword === token.toLowerCase());
              const isNegative = sentiment.negative.some(keyword => keyword === token.toLowerCase());
              return (
                <span className={[isPositive && 'positive', isNegative && 'negative'].filter(v => v)}>{token}</span>
              );
            })
          }
        </div>
      </div>
    );
  }
}
