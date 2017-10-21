import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';

import './css/Record.css';

import Card from './Card';

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentWillReceiveProps(nextProps) {
    this.setState({ summary: nextProps.transcript });
  }

  render() {
    const { writing, summary } = this.state;
    const { stopListening, listening, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="record">
        <div className="container">
          {
            writing ?
              <div className="card">
                <div className="summary">
                  <textarea className="input"
                            onChange={({ target }) => this.setState({ summary: target.value })}>{summary}</textarea>
                  {
                    listening ?
                      <div className="listening" onClick={stopListening}>
                        <i class="fa fa-microphone" aria-hidden="true" />
                      </div> :
                      <div className="listening" onClick={() => this.startListening()}>
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
              <Card date="Yesterday" summary="Summary" key={i} />
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
