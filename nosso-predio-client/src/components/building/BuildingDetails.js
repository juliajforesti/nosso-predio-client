import React, { Component } from "react";
import MainService from "../MainService";
import { Link } from "react-router-dom";
import ServicesList from "../service/ServicesList";

class BuildingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: {},
      services: [],
      search: "",
      buildingApiCalled: false,
      serviceApiCalled: false,
    };
    this.service = new MainService();
  }

  getBuildingDetails() {
    if (!this.state.buildingApiCalled) {
      const { params } = this.props.match;
      this.service.getBuildingDetails(params.id).then((response) => {
        this.setState({
          building: response,
          buildingApiCalled: true,
        });
      });
    }
  }

  getUserServices() {
    if (!this.state.serviceApiCalled) {
      this.service.getAllServices().then((response) => {
        console.log(response)
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
    this.getUserServices();
    return (
      <div>
        <div>
          <h1>{this.state.building.name}</h1>
        </div>
        {
          this.state.building.owner === this.props.user._id ? (
          <p>Link para convidar outros: {`http://localhost:3000/${this.state.building.confirmationCode}`}</p>
          ) : (
            <></>
          )
        }
        <div>
          <Link to={`/condominio/${this.state.building._id}/adicionar-serviço`}>
            Adicionar Serviço/Produto
          </Link>
        </div>
        <ServicesList services={this.state.services} {...this.props} />
      </div>
    );
  }
}

export default BuildingDetails;
