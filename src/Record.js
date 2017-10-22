import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpeechRecognition from 'react-speech-recognition';
import { Line } from 'react-chartjs-2';

import './css/Record.css';

import Card from './Card';

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      writing: false,
      summary: 'Edit this text or press the microphone button',
      lastSentiment: '',
      started: false,
      dreams: []
    }
    fetch('/dreams', {
      method: 'GET',
      credentials: 'same-origin',
    }).then(res => res.json()).then(dreams => {
      let card_arr = Array.from(dreams).map(function (dream, i) {
        return <Card date={dream.date} text={dream.text} sentiment={dream.sentiment} key={i} />
      });
      this.setState({
        dreams: card_arr.reverse()
      })
    });
  }

  componentDidMount() {
    this.props.recognition.lang = 'en-US';
  }

  startListening() {
    this.props.resetTranscript();
    this.props.startListening();
    this.setState({
      started: true
    });
  }

  submit(dreamtext) {
    this.setState({ writing: false })
    console.log('sending dreamtext', dreamtext);
    fetch('/dream', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({ text: dreamtext })
    }).then(res => res.json())
      .then(data => {
        let dreams = this.state.dreams.slice();
        dreams.unshift(<Card date="Today" sentiment={data.sentiment} text={data.text} />);
        this.setState({
          dreams
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.started) {
      this.setState({ summary: nextProps.transcript });
      if (/lucid$/i.test(nextProps.transcript)) {
        if (this.state.started) {
          this.props.stopListening();
          this.props.resetTranscript();
          this.setState({
            started: false
          });
          this.submit(nextProps.transcript.replace("lucid", ""));
        }
        this.setState({
          summary: 'Edit this text or press the microphone button',
        });
      }
    } else {
      this.setState({
        summary: 'Edit this text or press the microphone button',
      });
    }
  }

  clickOutside = () => {
    if (this.state.writing) {
      this.setState({
        writing: false
      });
    }
  }

  clickInside = (e) => {
    e.stopPropagation();
  }

  render() {
    const { writing, summary, date } = this.state;
    const { stopListening, listening, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="record" onClick={this.clickOutside}>
        <div className="nav">
          <div className="wrapper">
            <div className="left">
              <Link to="/">
                <h3>Lucid</h3>
              </Link>
            </div>
            <div className="right">
              <Link to="/logout">
                <h4>Learn More</h4>
              </Link>
              <Link to="/about">
                <h4 className="outlined">Sign Out</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Dream Log</h1>
          {
            writing ?
              <div className="card new" onClick={this.clickInside}>
                {
                  date &&
                  <div className="date">
                    {date}
                  </div>
                }
                <div className="summary">
                  <div contentEditable={!listening} className="input"
                       onChange={({ target }) => this.setState({ summary: target.value })}>{summary}</div>
                  {
                    this.state.started ?
                      <div className="listening stop" onClick={stopListening}>
                        <i class="fa fa-microphone" aria-hidden="true" />
                      </div> :
                      <div className="listening start" onClick={() => this.startListening()}>
                        <i class="fa fa-microphone" aria-hidden="true" />
                      </div>
                  }
                </div>
                <div className="save"></div>
              </div> :
              <div className="tell" onClick={() => this.setState({ writing: true })}>What did you dream about last night?</div>
          }
          <div className="chart">
            <Line data={{
              labels: ["2 Months Ago", "1 Month Ago", "Two Weeks Ago", "Today"],
              datasets: [{
                label: "Happiness",
                data: [-4, 7, -2, 12],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            }} options={{
              scales: {
                yAxes: [{
                  ticks: {
                  }
                }]
              }
            }} width="600" height="250" />
          </div>
          {this.state.dreams}
        </div>
      </div>
    );
  }
}

const options = {
  autoStart: false
};
export default SpeechRecognition(options)(Record);
