import React, { Component } from "react";
import MainService from "../MainService";
import { Link } from "react-router-dom";

class BuildingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      search: "",
      buildingApiCalled: false,
      toggleButton: false,
      confirmationCode: "",
    };
    this.service = new MainService();

    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  }

  handleToggle() {
    this.setState({
      toggleButton: !this.state.toggleButton,
    });
  }

  handleChangeCode(e) {
    this.setState({
      confirmationCode: e.target.value,
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.service
      .buildingInvite(this.state.confirmationCode)
      .then((response) => {
        this.setState({
          toggleButton: !this.state.toggleButton,
          confirmationCode: "",
          buildingApiCalled: false,
        });
      });
  }

  getBuildings() {
    if (!this.state.buildingApiCalled) {
      this.service.getAllBuildings().then((response) => {
        this.setState({
          buildings: response,
          buildingApiCalled: true,
        });
      });
    } else {
      return;
    }
  }

  getUserBuildings() {
    if (!this.state.buildingApiCalled) {
      this.service.getAllBuildings().then((buildings) => {
        this.setState({
          buildingApiCalled: true,
          buildings: buildings.filter((building) =>
            building.residents.includes(this.props.user._id)
          ),
        });
      });
    } else {
      return;
    }
  }

  render() {
    // IF USER DOESNT HAVE BUILDINGS
    if (this.props.user.buildings.length < 1) {
      this.getBuildings();
      return (
        <div>
          <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Condomínios</span>
            </h1>
          </div>
          <div className="building-page-btn-box">
            <div className="add-building-box">
              <Link className="add-building-btn" to="/adicionar-condominio">
                Criar Condominio
              </Link>
            </div>
            <div className="invitation-code-box">
              <button
                className="invitation-code-btn"
                onClick={() => this.handleToggle()}
              >
                Já tem um convite? Clique aqui para inserir o código
              </button>

              {this.state.toggleButton ? (
                <form onSubmit={this.handleOnSubmit} type="submit">
                  <input
                    onChange={this.handleChangeCode}
                    value={this.state.confirmationCode}
                    type="text"
                    name="confirmationCode"
                    placeholder="insira seu código de acesso"
                  />
                  <button type="submit">Enviar</button>
                </form>
              ) : (
                <></>
              )}
            </div>
            <button onClick={this.props.history.goBack} className="details-btn">
              Voltar
            </button>
          </div>
        </div>
      );

      // IF USER HAS BUILDINGS
    } else {
      this.getUserBuildings();
      return (
        <div>
          <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Condomínios</span>
            </h1>
          </div>

          <div className="building-page-btn-container">
            <div className="building-page-btn-box">
              <div className="add-building-box">
                <Link
                  className="add-building-btn building-page-btn"
                  to="/adicionar-condominio"
                >
                  Criar Condominio
                </Link>
              </div>
              <div className="invitation-code-box">
                <button
                  className="invitation-code-btn building-page-btn"
                  onClick={() => this.handleToggle()}
                >
                  Já tem um convite? Clique aqui para inserir o código
                </button>

                {this.state.toggleButton ? (
                  <form onSubmit={this.handleOnSubmit} type="submit">
                    <input
                      onChange={this.handleChangeCode}
                      value={this.state.confirmationCode}
                      type="text"
                      name="confirmationCode"
                      placeholder="insira seu código de acesso"
                    />
                    <button type="submit">Enviar</button>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="search-bar-container">
            <input
              className="form-input search-bar"
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar condomínio pelo nome"
            />
            <button onClick={this.props.history.goBack} className="details-btn">
              Voltar
            </button>
          </div>
          <div className="cards-countainer">
            {this.state.buildings
              .filter((elem) => {
                return elem.name.toLowerCase().includes(this.state.search);
              })
              .map((building, idx) => {
                return (
                  <div key={idx} className="card-box">
                    <Link className="card-box-link" to={`/condominio/${building._id}`}>
                        <img
                          className="card-img"
                          src={building.image}
                          alt={building.name}
                        />
                        <h3 className="card-title">{building.name}</h3>
                        <p className="card-text">
                              CEP: {building.address.cep} - Número: {building.address.number}
                        </p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }
}

export default BuildingsPage;
