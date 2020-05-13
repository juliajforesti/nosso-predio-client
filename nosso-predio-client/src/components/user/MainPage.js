import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      search: "",
      apiCalled: false,
    };
    this.service = new MainService();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  }

  getAllBuildings() {
    if (!this.state.apiCalled) {
      this.service.getAllBuildings().then((response) => {
        this.setState({
          buildings: response,
          apiCalled: true,
        });
      });
    } else {
      return;
    }
  }

  // filterBuildings() {
  //   let filteredBuilding = [...this.state.buildings].filter((building) =>
  //     building.cep.includes(this.state.search)
  //   );
  //   this.setState({
  //     buildings: filteredBuilding,
  //   });
  // }

  getUserBuildings() {
    if (!this.state.apiCalled) {
      this.service.getAllBuildings().then((buildings) => {
        this.setState({
          apiCalled: true,
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
    if (this.props.user.buildings.length < 1) {
      this.getAllBuildings();
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
                  return <h1 key={idx}>{building.name}</h1>;
                })}
            </div>
          </div>
        </div>
      );
    } else {
      this.getUserBuildings();
      return (
        <div>
          <h1> Main Page </h1>
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
                return <h1 key={idx}>{building.name}</h1>;
              })}
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
