import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";
import "./User.css";
// import BuildingsList from "../building/BuildingsList";
import ServicesList from "../service/ServicesList";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      services: [],
      search: "",
      // filteredBuildings: [],
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

  // getSearchedBuildings() {
  //   this.setState({
  //     filteredBuildings: this.state.buildings.filter((buildings) =>
  //       buildings.name.toLowerCase().includes(this.state.search)
  //     ),
  //   });
  // }

  getUserServices() {
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
    // IF USER DOESNT HAVE BUILDINGS
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
              {/* <BuildingsList buildings={this.state.filteredBuildings} {...this.props}></BuildingsList> */}
            </div>
          </div>
        </div>
      );

      // IF USER HAS BUILDINGS
    } else {
      this.getUserBuildings();
      this.getUserServices();
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
                  <div key={idx} className="building-box">
                    <h1>{building.name}</h1>
                    <Link to={`/condominio/${building._id}`}>Acessar</Link>
                  </div>
                );
              })}
          </div>

          <div>
            <h3>Meus Serviços</h3>
            {this.props.user.services.length > 0 ? (
              <ServicesList
                services={this.state.services}
                {...this.props}
              ></ServicesList>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <h3>Meus Pedidos</h3>
            
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
