import React, { Component } from "react";
import AuthService from "../auth/AuthService";
import "../css/Profile.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      toggleEdit: false,
      name: user.name,
      email: user.email,
      password: "qualquer-coisa",
      passwordConfirmation: "",
      passwordCheck: null,
      passwordMessage: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.service = new AuthService();
  }

  handleClick() {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, name } = this.state;
    const userId = this.props.user._id;
    this.service.edit(email, name, userId).then((response) => {
      this.props.getUser(response);
      this.setState({
        toggleEdit: !this.state.toggleEdit,
      });
    });
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    const { password, passwordConfirmation } = this.state;
    const userId = this.props.user._id;
    if (password === passwordConfirmation) {
      this.service.editPassword(password, userId).then((response) =>
        this.setState({
          toggleEdit: !this.state.toggleEdit,
        })
      );
    } else {
        this.setState({
          passwordCheck: "2px solid red",
          passwordMessage: "As senhas não são iguais."
        });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFileUpload(e) {
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    this.service.editPhoto(uploadData, this.props.user._id).then((response) => {
      this.props.getUser(response);
      this.setState({
        toggleEdit: !this.state.toggleEdit,
      });
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="profile-container">
        <div className="title-container">
          <h1 className="profile-title">Meu Perfil</h1>
        </div>
        <div className='profile-info-img'>
          <img className="profile-img" src={user.image} alt={user.name} />
        <div className="edit-container">
          <button className="edit-btn" onClick={this.handleClick}>
          
          {!this.state.toggleEdit ? "Editar" : "Voltar"}
            
          </button>
          {!this.state.toggleEdit ? (
            <div className="profile-info">
              <h3 className='profile-fields'>Nome: {user.name}</h3>
              <h3 className='profile-fields'>Email: {user.email}</h3>
              <h3 className='profile-fields'>Condomínios: {user.buildings.length}</h3>
              <h3 className='profile-fields'>Serviços: {user.services.length}</h3>
              <h3 className='profile-fields'>Pedidos: {user.orders.length}</h3>
            </div>
          ) : (
            <div className="profile-info">
              <form className="edit-form" onSubmit={this.handleFormSubmit}>
                <label>Nome:</label>
                <input
                  onChange={this.handleChange}
                  className="form-input"
                  type="text"
                  name="name"
                  value={this.state.name}
                ></input>
                <label>Email:</label>
                <input
                  onChange={this.handleChange}
                  className="form-input"
                  type="email"
                  name="email"
                  value={this.state.email}
                ></input>
                <div className='profile-info-img'>
                <button className="form-input-submit" type="submit">Salvar</button>
                </div>
              </form>
              <form className="edit-password-container" onSubmit={this.handlePasswordSubmit}>
                  <label>Senha:</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    style={{ border: this.state.passwordCheck }}
                    className="form-input"
                    value={this.state.password}
                  ></input>
                  <label>Confirme sua senha:</label>
                  <input
                    onChange={this.handleChange}
                    className="form-input"
                    type="password"
                    style={{ border: this.state.passwordCheck }}
                    name="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                  ></input>
                  {this.state.passwordMessage ?
                  <p>{this.state.passwordMessage}</p> :
                  null
                  }
                  <div className='profile-info-img'>
                  <button className="form-input-submit" type="submit">Alterar senha</button>
                  </div>
                </form>
              <div className="edit-building-img">
                <label for="file-select" className="input-file">Alterar foto de perfil</label>
                <input 
                id="file-select"
                className="input-file"
                onChange={this.handleFileUpload} 
                type="file" 
                />
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
