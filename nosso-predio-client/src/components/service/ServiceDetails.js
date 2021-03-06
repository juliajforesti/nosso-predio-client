import React, { Component } from "react";
import MainService from "../MainService";
import OrderList from "../order/OrderList";
import OrderForm from "../order/OrderForm";
import EditService from "./EditService";
import '../css/DetailsPage.css'

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {},
      orders: [],
      serviceAPICalled: false,
      orderAPICalled: false,
      toggleEdit: false,
      dataFormated: '',
    };
    this.service = new MainService();
    this.handleStatus = this.handleStatus.bind(this);
    this.getEditedService = this.getEditedService.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeDeleteStatus = this.changeDeleteStatus.bind(this);
  }

  handleClick() {
    this.setState({
      toggleEdit: !this.state.toggleEdit,
    });
  }

  getServiceDetails() {
    if (!this.state.serviceAPICalled) {
      const { params } = this.props.match;
      this.service
        .getServiceDetails(params.id, params.servicoId)
        .then((response) => {
          this.setState({
            service: response,
            serviceAPICalled: true,
          });
          this.formatData()
        });
    }
  }

  getServiceOrders() {
    if (!this.state.orderAPICalled) {
      this.service.getAllOrders().then((response) => {
        this.setState({
          orders: response.filter((order) =>
            order.service._id.includes(this.state.service._id)
          ),
          orderAPICalled: true,
        });
      });
    }
  }

  handleStatus(buildingId, serviceId, orderId, status) {
    this.service
      .changeStatus(buildingId, serviceId, orderId, status)
      .then((response) => {});
  }

  getEditedService(newService) {
    this.setState({
      service: newService,
    });
  }

  changeDeleteStatus() {
    this.setState({
      deleteToggle: !this.state.deleteToggle,
    });
  }

  deleteService() {
    const buildingId = this.state.service.building;
    const serviceId = this.state.service._id;
    this.service.deleteService(buildingId, serviceId).then((response) => {
      this.props.history.push("/pagina-principal");
    });
  }

  formatData() {
      const newArr = this.state.service.date.split("-");
      let month = newArr[1];
      let day = newArr[2];
    this.setState({
      dataFormated: `${day}/${month}`
    })
  }

  render() {
    this.getServiceDetails();
    this.getServiceOrders();
    return (
      <div>
        <h1 className="details-page-title">{this.state.service.name}</h1>
        <div className="details-section-2-container">
          <img
            className="details-page-img"
            src={this.state.service.image}
            alt={this.state.service.name}
          />
          <div className="details-section-2">
            <h5 className="item-title">Tipo:</h5>
            <p>{this.state.service.category}</p>
            <h5 className="item-title">Data:</h5>
            <h4>{this.state.dataFormated}</h4>
            <h5 className="item-title">Descrição:</h5>
            <p>{this.state.service.description}</p>
            <h5 className="item-title">Preço:</h5>
            {this.state.service.price === 0 ? (
                  <p className="card-text">Grátis</p>
                ) : (
                  <p className="card-text">R${this.state.service.price}</p>
                )}
            <h5 className="item-title">Apartamento/complemento:</h5>
            <p>{this.state.service.apartment}</p>
          </div>
        </div>
        {this.state.service.owner === this.props.user._id ? (
          <div className='service-owner-box'>
            <button className="details-btn" onClick={this.handleClick}>
              Editar
            </button>
            <button
              className="details-btn"
              style={{ backgroundColor: "red" }}
              onClick={() => this.deleteService()}
            >

              Deletar {this.state.service.category.toLowerCase()}
            </button> 


            {!this.state.toggleEdit ? (
              <>
              </>
            ) : (
              <EditService
                handleClick={this.handleClick}
                getEditedService={this.getEditedService}
                service={this.state.service}
              />
            )}
            <h3 className='service-owner-h3'>Pedidos:</h3>
            <OrderList
              handleStatus={this.handleStatus}
              building={this.state.service.building}
              orders={this.state.orders}
              {...this.props}
            />
          </div>
        ) : (
          <div className="order-container">
            <h3>Faça seu pedido!</h3>
            <div className='order-form' >
            <OrderForm {...this.props} service={this.state.service._id} />
            </div>
          </div>
        )}
        <button onClick={this.props.history.goBack} className="details-btn">
          Voltar
        </button>
      </div>
    );
  }
}

export default ServiceDetails;
