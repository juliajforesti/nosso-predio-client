import React, { Component } from "react";
import AuthService from "../auth/AuthService";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      toggleEdit: false,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

    this.service = new AuthService();
  }

  handleClick() {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  }
  handleFormSubmit(e) {
    console.log(this.props)
    e.preventDefault();
    const { email, name } = this.state;
    const userId = this.props.user._id;
    this.service.edit(email, name, userId)
      .then((response) => {
        this.props.getUser(response)
        this.setState({
          toggleEdit: !this.state.toggleEdit,
        })
    }
    );
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    const { password } = this.state;
    const userId = this.props.user._id;
    this.service.editPassword(password, userId).then((response) =>
      this.setState({
        toggleEdit: !this.state.toggleEdit,
      })
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div>
          <h1>Meu Perfil</h1>
        </div>
        <div>
          <button onClick={this.handleClick}>Editar</button>
          {!this.state.toggleEdit ? (
            <div>
              <h3>Nome: {user.name}</h3>
              <h3>Email: {user.email}</h3>
              <img src={user.image} alt={user.name} />
            </div>
          ) : (
            <div>
              <form onSubmit={this.handleFormSubmit}>
                <label>Nome:</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={this.state.name}
                ></input>
                <label>Email:</label>
                <input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={this.state.email}
                ></input>
                <button type="submit">Salvar</button>
              </form>

              <form onSubmit={this.handlePasswordSubmit}>
                <label>Senha:</label>
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={this.state.password}
                ></input>
                <button type="submit">Salvar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProfilePage;
