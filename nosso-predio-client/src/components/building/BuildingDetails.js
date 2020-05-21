import React, { Component } from "react";
import MainService from "../MainService";
import { Link } from "react-router-dom";
import ServicesList from "../service/ServicesList";
import EditBuilding from "./EditBuilding";
import InviteLink from "./InviteLink";
import '../css/DetailsPage.css';

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
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
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
          {/* <img className='details-page-img' src={this.state.building.image} alt={this.state.building.name} /> */}
          <h1 className='details-page-title'>
          {this.state.building.name}
          </h1>
          {this.props.user._id === this.state.building.owner ? (
            <div>
            <InviteLink code={this.state.building.confirmationCode} />
            <button className='details-btn' onClick={this.handleClick}>Editar</button>
              {this.state.toggleEdit ? (
                <EditBuilding
                  getEditedBuilding={this.getEditedBuilding}
                  building={this.state.building}
                  handleClick={this.handleClick}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <h2 className='details-section-title'>Serviços/Produtos disponíveis</h2>
        <div className='search-bar-container'>
            <input
              className="form-input"
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar serviço pelo nome"
            />
          </div>
        <div className='details-btn'>
          <Link className='details-link' to={`/condominio/${this.state.building._id}/adicionar-serviço`}>
            Adicionar Serviço/Produto
          </Link>
        </div>
        <div className='services-list-container'>
          <ServicesList services={this.state.services.filter((elem) => {
                  return elem.name.toLowerCase().includes(this.state.search);
                })} {...this.props} />
                <button onClick={this.props.history.goBack} className="details-btn">Voltar</button>
        </div>
      </div>
    );
  }
}

export default BuildingDetails;
