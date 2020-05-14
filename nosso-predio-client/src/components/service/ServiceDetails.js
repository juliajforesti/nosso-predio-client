import React, { Component } from "react";
import MainService from "../MainService";
import { Link } from "react-router-dom";
import OrderList from "../order/OrderList";
import OrderForm from "../order/OrderForm";

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {},
      orders: [],
      serviceAPICalled: false,
      orderAPICalled: false,
    };
    this.service = new MainService();
    this.handleStatus = this.handleStatus.bind(this);
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
        });
    }
  }

  getServiceOrders() {
    if (!this.state.orderAPICalled) {
      this.service.getAllOrders().then((response) => {
        this.setState({
          orders: response.filter((order) =>
            order.service.includes(this.state.service._id)
          ),
          orderAPICalled: true,
        });
      });
    }
  }
  handleStatus(buildingId, serviceId, orderId, status) {
    this.service
      .changeStatus(buildingId, serviceId, orderId, status)
      .then((response) =>
        console.log(response));
  }  

  render() {
    this.getServiceDetails();
    this.getServiceOrders();
    return (
      <div>
        <Link
          to={`/condominio/${this.state.service.building}/adicionar-serviço`}
        >
          Adicionar Serviço/Produto
        </Link>
        <br />
        {this.state.service.name}
        {this.state.service.owner === this.props.user._id ? (
          <div>
            <h3>Pedidos:</h3>
            <OrderList
              handleStatus={this.handleStatus}
              building={this.state.service.building}
              orders={this.state.orders}
              {...this.props}
            />
          </div>
        ) : (
          <div>
            <h3>Faça seu pedido</h3>
            <OrderForm {...this.props} service={this.state.service._id} />
          </div>
        )}
      </div>
    );
  }
}

export default ServiceDetails;
