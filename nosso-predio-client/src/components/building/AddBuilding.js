import React, { Component } from "react";
import MainService from "../MainService";

class AddBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cep: "",
      number: "",
      border: null,
    };
    this.service = new MainService();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, cep, number } = this.state;
    this.service.addBuilding(name, cep, number).then((response) => {
      if (response.message) {
        //arrumar um jeito melhor de mandar essa mensagem
        this.setState({
          duplicate:
            "Este prédio já está cadastrado, entre em contato com seus vizinhos para conseguir o link de acesso.",
          border: "2px solid red",
        });
        return;
      }
      this.props.history.push("/pagina-principal");
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="auth-container">
        <h1>
        <span className="title-first">Adicione </span>
        <span className="title-second">seu Condomínio </span>
        </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-item">
              <label>Nome:</label> <br />
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                className="form-input"
                value={this.state.name}
              />
            </div>

            <div className="form-item">
              <label>CEP:</label> <br />
              <input
                onChange={this.handleChange}
                type="text"
                name="cep"
                style={{ border: this.state.border }}
                className="form-input"
                value={this.state.cep}
              />
            </div>

            <div className="form-item">
              <label>Número:</label> <br />
              <input
                onChange={this.handleChange}
                type="number"
                style={{ border: this.state.border }}
                name="number"
                className="form-input"
                value={this.state.number}
              />
            </div>

            <button
              style={{ width: "200px", border: this.state.border }}
              className="form-input-submit"
              type="submit"
            >
              Adicionar Condomínio
            </button>
          </form>
          <br />
          {this.state.duplicate ? (
            <div className="add-building-err">
              <p>{this.state.duplicate}</p>
            </div>
          ) : null}
        </div>
        <button onClick={this.props.history.goBack} className="back-btn">Voltar</button>
      </div>
    );
  }
}

export default AddBuilding;
