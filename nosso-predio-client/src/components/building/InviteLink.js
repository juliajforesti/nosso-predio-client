import React, { Component } from "react";
import '../css/InviteLink.css'

export default class InviteLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copySuccess: false,
    };
  }

  copyCodeToClipboard = () => {
    this.setState({
      copySuccess: true,
    });
  };

  render() {
    return (
      <div className='invite-container'>
        <div className='code-container'>
          <p>Código de acesso: {this.props.code}</p>
        </div>
        <div>
          <button className='code-link' onClick={() => {
            navigator.clipboard.writeText(`http://nosso-predio.herokuapp.com/convite/${this.props.code}`);
            this.copyCodeToClipboard();
          }}>
            Copiar link
          </button>
          {this.state.copySuccess ? (
            <div style={{ color: "green" }}>Copiado!</div>
          ) : null}
        </div>
      </div>
    );
  }
}
