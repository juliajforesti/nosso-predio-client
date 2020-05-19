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

  handleOnSubmit(e){
    e.preventDefault()
    this.service.buildingInvite(this.state.confirmationCode).then(response => {
      this.setState({
        toggleButton: !this.state.toggleButton,
        confirmationCode: '',
        buildingApiCalled:false,
      })
    })
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
          <h1> Meus condominios </h1> <br />
          <div>
            <div>
              <Link to="/adicionar-condominio">Adicionar Condominio</Link>{" "}
              <br /> <br />
              <button onClick={() => this.handleToggle()}>
                Já tem um convite? Junte-se ao seu condomínio
              </button>{" "}
              <br /> <br />
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
              <input
                type="text"
                value={this.state.search}
                onChange={this.handleChangeSearch}
                placeholder="Buscar pelo nome"
              />
              {this.state.buildings
                .filter((elem) => {
                  return elem.name.toLowerCase().includes(this.state.search);
                })
                .map((building, idx) => {
                  return (
                    <div key={idx} className="building-box">
                      <h1>{building.name}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );

      // IF USER HAS BUILDINGS
    } else {
      this.getUserBuildings();
      return (
        <div>
          <h1> Meus condominios </h1>
          <div>
            <Link to="/adicionar-condominio">Adicionar Condominio</Link> <br />{" "}
            <br />
            <button onClick={() => this.handleToggle()}>
              Já tem um convite? Junte-se ao seu condomínio
            </button>{" "}
            <br /> <br />
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
          <div>
            <br />
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar pelo nome"
            />
          </div>

          <div>
            {this.state.buildings
              .filter((elem) => {
                return elem.name.toLowerCase().includes(this.state.search);
              })
              .map((building, idx) => {
                return (
                  <div key={idx} className="building-box">
                    <h1>{building.name}</h1>
                    <Link to={`/condominio/${building._id}`}>Acessar</Link>
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
