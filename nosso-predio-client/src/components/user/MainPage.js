import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";
import ServicesList from "../service/ServicesList";
import OrderList from "../order/OrderList";
import "../css/MainPage.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      orders: [],
      activeOrders: [],
      services: [],
      buildingApiCalled: false,
      userApiCalled: false,
      serviceApiCalled: false,
      orderAPICalled: false,
      toggleButton: false,
      confirmationCode: "",
      toggleStatusButton: true,
    };
    this.service = new MainService();

    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
  }

  handleChangeCode(e) {
    this.setState({
      confirmationCode: e.target.value,
    });
  }

  getUserUpdated() {
    if (!this.state.userApiCalled) {
      this.service.getUser(this.props.user._id).then((response) => {
        this.props.getUser(response);
        this.setState({
          userApiCalled: true,
        });
      });
    }
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

  handleToggle() {
    this.setState({
      toggleButton: !this.state.toggleButton,
    });
  }

  handleToggleStatus() {
    this.setState({
      toggleStatusButton: !this.state.toggleStatusButton,
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.service
      .buildingInvite(this.state.confirmationCode)
      .then((response) => {
        this.setState({
          toggleButton: !this.state.toggleButton,
          confirmationCode: "",
          buildingApiCalled: false,
          userApiCalled: false,
        });
      });
  }

  handleStatus(buildingId, serviceId, orderId, status) {
    this.service
      .changeStatus(buildingId, serviceId, orderId, status)
      .then((response) =>
        this.setState({
          orderAPICalled: false,
        })
      );
  }

  activeOrders() {
    const orders = [...this.state.orders];
    this.setState({
      activeOrders: orders.filter((order) => order.status !== "Cancelado"),
    });
  }

  render() {
    this.getUserUpdated();
    // IF USER DOESNT HAVE BUILDINGS
    if (this.props.user.buildings.length < 1) {
      this.getBuildings();
      return (
        <div>
          <div className="main-page-title-box">
            <h1>
              <span className="title-first">Olá</span>
              <span className="title-second"> {this.props.user.name}</span>
            </h1>
          </div>
          <div className="welcome-section">
            <p>Seja bem vindo(a) ao Nosso Prédio! </p>
            <p>Você ainda não faz parte de nenhum condomínio da nossa rede.</p>
          </div>
          <div>
            <div className="add-building-box">
              <Link className="add-building-btn" to="/adicionar-condominio">
                Criar Condominio
              </Link>
            </div>
            <div className="invitation-code-box">
              <button
                className="invitation-code-btn"
                onClick={() => this.handleToggle()}
              >
                Já tem um convite? Clique aqui para inserir o código
              </button>

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
          </div>
        </div>
      );

      // IF USER HAS BUILDINGS
    } else {
      this.getUserBuildings();
      this.getUserServices();
      this.getUserOrders();
      return (
        <div>
          <div className="main-page-title-box">
            <h1>
              <span className="title-first">Olá</span>
              <span className="title-second"> {this.props.user.name}</span>
            </h1>
          </div>
          <div>
            <div className="add-building-box">
              <Link className="add-building-btn" to="/adicionar-condominio">
                Criar Condominio
              </Link>
            </div>
            <div className="invitation-code-box">
              <button
                className="invitation-code-btn"
                onClick={() => this.handleToggle()}
              >
                Já tem um convite? Clique aqui para inserir o código
              </button>

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

            <div className="main-page-section-title-container">
              <Link className="main-page-section-title" to="/meus-condominios">
              <span className="title-third">Meus </span>
              <span className="title-second">Condomínios</span>
              </Link>
            </div>
            {this.props.user.buildings.length > 3
              ? this.state.buildings.slice(0, 3).map((building, idx) => {
                  return (
                    <div key={idx}>
                      <Link to={`/condominio/${building._id}`}>
                        <div className="card-box">
                          <img
                            className="card-img"
                            src={building.image}
                            alt=""
                          />
                          <h3>{building.name}</h3>
                          <p>CEP: {building.address.cep}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              : this.state.buildings.map((building, idx) => {
                  return (
                    <div key={idx}>
                      <Link to={`/condominio/${building._id}`}>
                        <div className="card-box">
                          <img
                            className="card-img"
                            src={building.image}
                            alt=""
                          />
                          <h3>{building.name}</h3>
                          <p>{building.address.cep}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            {this.props.user.buildings.length > 3 ? (
              <div className="see-more-box">
                <Link className="see-more-btn" to="/meus-condominios">
                  Ver mais
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            <div className="main-page-section-title-container">
              <Link className="main-page-section-title" to="/meus-serviços">
              <div className="title-third">Meus </div>
              <div className="title-second">serviços e produtos </div>
              </Link>
            </div>
            <div>
              {this.props.user.services.length > 0 ? (
                <ServicesList
                  services={this.state.services}
                  {...this.props}
                ></ServicesList>
              ) : (
                <></>
              )}
            </div>

            <div className="main-page-section-title-container">
              <Link className="main-page-section-title" to="/meus-pedidos">
              <span className="title-third">Meus </span>
              <span className="title-second">pedidos </span>
              </Link>
            </div>
            <div>
              <div className="see-more-box">
                <button
                  className="see-more-btn"
                  onClick={this.handleToggleStatus}
                >
                  {this.state.toggleStatusButton
                    ? "Mostrar todos os pedidos"
                    : "Mostrar somente pedidos ativos"}
                </button>
              </div>
              {this.state.toggleStatusButton ? (
                <OrderList
                  activeOrders={this.activeOrders}
                  handleStatus={this.handleStatus}
                  orders={this.state.orders.filter(
                    (order) => order.status !== "Cancelado"
                  )}
                  {...this.props}
                />
              ) : (
                <OrderList
                  handleStatus={this.handleStatus}
                  orders={this.state.orders}
                  {...this.props}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
