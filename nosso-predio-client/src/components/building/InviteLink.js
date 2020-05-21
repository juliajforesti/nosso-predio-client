import React, { Component } from "react";
import "../css/InviteLink.css";

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
      <div className="invite-container">
        <button className="details-btn" onClick={this.props.btn}>
          Editar
        </button>
        <div className="code-container">
          <p style={{ textAlign: "center" }}>
            Código de acesso: <strong>{this.props.code}</strong>
          </p>
        </div>
        <div>
          <button
            className="code-link form-input-submit"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://nosso-predio.herokuapp.com/convite/${this.props.code}`
              );
              this.copyCodeToClipboard();
            }}
          >
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
