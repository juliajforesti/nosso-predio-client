import React, { Component } from "react";
import MainService from "../MainService";
import { Link } from "react-router-dom";
import ServicesList from "../service/ServicesList";
import EditBuilding from './EditBuilding'

class BuildingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: {},
      services: [],
      search: "",
      buildingApiCalled: false,
      serviceApiCalled: false,
      toggleEdit: false,
    };
    this.service = new MainService();
    this.handleClick = this.handleClick.bind(this);
    this.getEditedBuilding = this.getEditedBuilding.bind(this);


  }
  handleClick() {
    this.setState({ 
      toggleEdit: !this.state.toggleEdit,
    });
  }

  getBuildingDetails() {
    if (!this.state.buildingApiCalled) {
      const { params } = this.props.match;
      this.service.getBuildingDetails(params.id).then((response) => {
        console.log(response)
        this.setState({
          building: response,
          buildingApiCalled: true,
        });
      });
    }
  }
  getEditedBuilding(newBuilding) {
    this.setState({
      building: newBuilding,
    });
  }

  getBuildingServices() {
    if (!this.state.serviceApiCalled) {
      this.service.getAllServices().then((response) => {
        this.setState({
          serviceApiCalled: true,
          services: response.filter((service) =>
            service.building.includes(this.state.building._id)
          ),
        });
      });
    } else {
      return;
    }
  }


  render() {
    this.getBuildingDetails();
    this.getBuildingServices();
    return (
      <div>
        <div>
          <h1>{this.state.building.name}</h1>
          {this.props.user._id === this.state.building.owner ? (
            <button onClick={this.handleClick}>Editar</button>
          ) : (<></>)}
          {this.state.toggleEdit ? (
            <EditBuilding getEditedBuilding={this.getEditedBuilding} building={this.state.building} handleClick={this.handleClick} />
          ) : (<></>)}
        </div>
        {this.state.building.owner === this.props.user._id ? (
          <p>
            Link para convidar outros:{" "}
            {`http://localhost:3000/${this.state.building.confirmationCode}`}
          </p>
        ) : (
          <></>
        )}
        <div>
          <Link to={`/condominio/${this.state.building._id}/adicionar-serviço`}>
            Adicionar Serviço/Produto
          </Link>
        </div>
        <h2>Serviços/Produtos disponíveis</h2>
        <ServicesList services={this.state.services} {...this.props} />
      </div>
    );
  }
}

export default BuildingDetails;
