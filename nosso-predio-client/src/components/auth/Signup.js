// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

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
    console.log(response);
  }

  render() {
    return (
      <div className="">
        <h1>Cadastrar</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="">
            <div className="">
              <label>Nome:</label>
              <input
                className=""
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="">
            <div className="">
              <label>Email:</label>
              <input
                className=""
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="">
            <div className="">
              <label>Senha:</label>
              <input
                className=""
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {this.state.password.length < 6 ? (
            <input disabled className="button" type="submit" value="Signup" />
          ) : (
            <input className="button" type="submit" value="Signup" />
          )}
        </form>
        <div>
          <GoogleLogin
            clientId="109485928712-4bupqc5nh8sos95nu8k7ssc41o7sf8eu.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <p>Crie uma senha com no mínimo 6 caracteres</p>
        <p>{this.state.errorMessage}</p>
        <p>
          Já tem uma conta?
          <Link to={"/login"}> Entre</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
