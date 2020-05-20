// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import "../css/Auth.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      errorMessage: null,
      passwordCheck: null,
      passwordCounter: 0,
    };
    this.service = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    if (name === "password") {
      this.checkPasswordLength();
    }
  }

  checkPasswordLength() {
    console.log(this.state.password.length);
    if (this.state.password.length+1 > 5) {
      this.setState({
        passwordCheck: "2px solid green",
      });
    } else {
      this.setState({
        passwordCheck: "2px solid red",
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, password, name } = this.state;
    this.service
      .signup(email, password, name)
      .then((response) => {
        this.setState({
          email: "",
          password: "",
          name: "",
        });
        this.props.getUser(response);
        this.props.history.push("/pagina-principal");
      })
      .catch((err) => {
        this.setState({
          errorMessage: "Email já cadastrado",
        });
      });
  }

  responseGoogle(response) {
    this.service
      .googleLogin()
      .then((resp) => console.log("RESP:", resp))
      .catch((err) => console.log(err));
    console.log("RESPONSE:", response);
  }

  render() {
    return (
      <div className="auth-container">
        <h2 className="auth-title">Cadastrar</h2>
        <p className="auth-alternative">
          Já tem uma conta?
          <Link className="auth-alternative" to={"/login"}>
            {" "}
            Entre <strong> aqui! </strong>
          </Link>
        </p>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-item">
            <label>Nome:</label> <br />
            <input
              className="form-input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label>Email:</label> <br />
            <input
              className="form-input"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label>Senha:</label> <br />
            <input
              className="form-input"
              type="password"
              name="password"
              style={{ border: this.state.passwordCheck }}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <p className="password-warning">
              Crie uma senha com no mínimo 6 caracteres
            </p>
          </div>
          {this.state.password.length < 6 ? (
            <input
              disabled
              className="form-input-submit"
              type="submit"
              value="Cadastrar"
            />
          ) : (
            <input
              className="form-input-submit"
              type="submit"
              value="Cadastrar"
            />
          )}
        </form>

        <div className="auth-google">
          <p className="auth-alternative">
            Ou então entre com sua conta Google
          </p>
          <div className="social-login-container">
            <a
              className="social-login form-input-submit"
              href="http://nosso-predio.herokuapp.com/api/auth/google"
            >
              GOOGLE
            </a>
          </div>
        </div>
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default Signup;
