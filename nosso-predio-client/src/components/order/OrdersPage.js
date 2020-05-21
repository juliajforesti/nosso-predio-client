import React, { Component } from "react";
import MainService from "../MainService";
import OrderList from "./OrderList";


class OrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orders: [],
        activeOrders:[],
      search: "",
      orderAPICalled: false,
      toggleStatusButton: true,
    };
    this.service = new MainService();

    this.handleStatus = this.handleStatus.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
  }

  getUserOrders() {
    if (!this.state.orderAPICalled) {
      this.service.getAllOrders().then((response) => {
        this.setState({
          orders: response.filter((order) =>
            order.origin._id.includes(this.props.user._id)
          ),
          orderAPICalled: true,
        });
      });
    }
  }

  handleToggleStatus(){
    this.setState({
      toggleStatusButton: !this.state.toggleStatusButton
    })
  }

  handleStatus(buildingId, serviceId, orderId, status) {
    this.service
      .changeStatus(buildingId, serviceId, orderId, status)
      .then((response) => this.setState({
        orderAPICalled: false
      })
      );
  }

  activeOrders(){
    const orders = [...this.state.orders]
    this.setState({
      activeOrders: orders.filter(order => order.status !== "Cancelado")
    })
  }

  render() {
    // IF USER DOESNT HAVE ORDERS
    this.getUserOrders();
    if (this.state.orders.length < 1) {
      return (
        <div>
        <div>
        <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Pedidos</span>
            </h1>
          </div>
          <div>
            <h1 className="add-building-err">Você ainda não fez nenhum pedido, acesse um de seus condominios e peça!</h1>
          </div>
          <div className="search-bar-container">
          <button onClick={this.props.history.goBack} className="details-btn">Voltar</button>
        </div>
          </div>
        </div>
      );

      // IF USER HAS ORDERS
    } else {
      return (
        <div>
          <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Pedidos</span>
            </h1>
          </div>
          <div className="search-bar-container">
          <button className="details-btn" onClick={this.handleToggleStatus}>
              {this.state.toggleStatusButton ? ('Mostrar todos os pedidos') : ('Mostrar somente pedidos ativos')}
              </button>
              {this.state.toggleStatusButton ? (
                <OrderList activeOrders={this.activeOrders} handleStatus={this.handleStatus} orders={this.state.orders.filter(order => order.status !== "Cancelado")} {...this.props} />
              ):(
                <OrderList handleStatus={this.handleStatus} orders={this.state.orders} {...this.props}/>
              )}
          </div>
        <div className="search-bar-container">
          <button onClick={this.props.history.goBack} className="details-btn">Voltar</button>
        </div>
        </div>
      );
    }
  }
}

export default OrdersPage;
