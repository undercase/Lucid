import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';

import './css/Record.css';

import Card from './Card';

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      writing: false,
      summary: '',
    }
  }

  componentDidMount() {
    this.props.recognition.lang = 'en-US';
  }

  startListening() {
    this.props.resetTranscript();
    this.props.startListening();
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
      body:JSON.stringify({text: dreamtext})
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ summary: nextProps.transcript });
    if (/lucid$/i.test(nextProps.transcript)) {
      this.submit(nextProps.transcript);
    }
  }

  render() {
    const { writing, summary, date } = this.state;
    const { stopListening, listening, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="record">
        <div className="container">
          {
            writing ?
              <div className="card new">
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
                    listening ?
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
              <div className="tell" onClick={() => this.setState({ writing: true })}>Tell us about your dream last
                night.
              </div>
          }
          {
            [0, 0, 0, 0].map((_, i) => (
              <Card date="Yesterday" text="hello world. Hello! world," sentiment={{
                score: 1,
                comparative: 0.1111111111111111,
                positive: [
                  'hello'
                ],
                negative: [
                  'world'
                ]
              }} key={i} />
            ))
          }
        </div>
      </div>
    );
  }
}

const options = {
  autoStart: false
};
export default SpeechRecognition(options)(Record);
