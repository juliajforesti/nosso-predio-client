// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import "./Auth.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      errorMessage: null,
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
        <p>
          Já tem uma conta?
          <Link to={"/login"}> Entre aqui!</Link>
        </p>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-item">
            <label>Nome:</label> <br />
            <input
              className=""
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label>Email:</label> <br />
            <input
              className=""
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-item">
            <label>Senha:</label> <br />
            <input
              className=""
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <p className='password-warning'>Crie uma senha com no mínimo 6 caracteres</p>
          </div>
          {this.state.password.length < 6 ? (
            <input
              disabled
              className="auth-button"
              type="submit"
              value="Signup"
            />
          ) : (
            <input className="auth-button" type="submit" value="Signup" />
          )}
        </form>

        <div className='auth-google'>
        <p className='auth-alternative'>Ou então entre com sua conta Google/Facebook</p>
        <a href="http://localhost:5000/api/auth/google">GOOGLE</a>
        <a href="http://localhost:5000/api/auth/facebook">FACEBOOK</a>
          />
        </div>
        <p>{this.state.errorMessage}</p>

      </div>
    );
  }
}

export default Signup;
