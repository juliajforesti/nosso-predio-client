// auth/Login.js

import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.service = new AuthService();

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleChange(e){
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(e){
    e.preventDefault()
    const {email, password} = this.state;
    this.service
    .login(email, password)
    .then(response => {
      this.setState({
        email: '',
        password: '',
      })
      this.props.getUser(response)
      this.props.history.push('/pagina-principal')
    })
    .catch(err => console.log(err))
  }

  render() { 
    return (  
      <div className="">
      <h1>Entrar</h1>
        <form onSubmit={this.handleFormSubmit}>
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
          <input className="button" type="submit" value="Entrar" />
        </form>
        <p>
          Não tem uma conta?
          <Link to={"/signup"}> Cadastre-se</Link>
        </p>
      </div>
    );
  }
}

export default Login;