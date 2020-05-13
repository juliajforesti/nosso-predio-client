import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";
import "./User.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      services: [],
      search: "",
      buildingApiCalled: false,
      serviceApiCalled: false,
    };
    this.service = new MainService();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
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

  getServices() {
    if (!this.state.serviceApiCalled) {
      this.service.getAllServices().then((response) => {
        this.setState({
          serviceApiCalled: true,
          services: response.filter((service) =>
            service.owner.includes(this.props.user._id)
          ),
        });
      });
    } else {
      return;
    }
  }

  render() {
    if (this.props.user.buildings.length < 1) {
      this.getBuildings();
      return (
        <div>
          <h1> Main Page </h1>
          <div>
            <div>
              <Link to="/adicionar-condominio">Adicionar Condominio</Link>
              <input
                type="text"
                value={this.state.search}
                onChange={this.handleChange}
              />
              {console.log(this.state.buildings)}
              {this.state.buildings
                .filter((elem) => {
                  return elem.name.toLowerCase().includes(this.state.search);
                })
                .map((building, idx) => {
                  return (
                    <div className="building-box">
                      <h1 key={idx}>{building.name}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    } else {
      this.getUserBuildings();
      this.getServices();
      return (
        <div>
          <h1> Main Page </h1>
          <div>
            <Link to="/adicionar-condominio">Adicionar Condominio</Link>
          </div>
          <div>
            <br />
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Buscar pelo nome"
            />
          </div>

          <div>
            <h3>Meus Condominios</h3>
            {this.state.buildings
              .filter((elem) => {
                return elem.name.toLowerCase().includes(this.state.search);
              })
              .map((building, idx) => {
                return (
                  <div className="building-box">
                    <h1 key={idx}>{building.name}</h1>
                    <Link to={`/condominio/${building._id}`}>Acessar</Link>
                  </div>
                );
              })}
          </div>

          <div>
            <h3>Meus Serviços</h3>
            {this.props.user.services.length > 0 ? (
              this.state.services.map((service, idx) => {
                return (
                  <div className="building-box">
                    <h2 key={idx}>{service.name}</h2>
                    <Link to={`/condominio/${service.building}/serviço/${service._id}`}>Acessar</Link>
                  </div>
                )
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
