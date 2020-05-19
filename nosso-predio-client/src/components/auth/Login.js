// auth/Login.js

import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import "./Auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
    };
    this.service = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.service
      .login(email, password)
      .then((response) => {
        this.setState({
          email: "",
          password: "",
        });
        this.props.getUser(response);
        this.props.history.push("/pagina-principal");
      })
      .catch((err) => {
        this.setState({
          errorMessage: "Email e/ou senha incorretos",
        });
      });
  }

  render() {
    return (
      <div className="auth-container">
        <h2 className="auth-title">Entrar</h2>
        <p>
          Não tem uma conta?
          <Link to={"/signup"}> Cadastre-se</Link>
        </p>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-item">
            <label>Email:</label> <br/>
            <input
              className=""
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label>Senha:</label> <br/>
            <input
              className=""
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input className="auth-button" type="submit" value="Entrar" />
        </form>
        <div>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default Login;
