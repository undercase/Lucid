import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';

import './css/Record.css';

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
              <div className="card" key={i}>
                <div className="date">
                  Yesterday
                </div>
                <div className="summary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip
                  ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit
                  anim id est laborum.
                </div>
              </div>
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