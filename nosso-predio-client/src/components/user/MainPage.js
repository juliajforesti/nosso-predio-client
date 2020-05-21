import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";
import ServicesList from "../service/ServicesList";
import OrderList from "../order/OrderList";
import "../css/MainPage.css";
import { GoChevronRight } from "react-icons/go";

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
        <div >
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
          <div>
            <div className="main-page-top">
              <div className="main-page-title-box desktop-title-box">
                <h1>
                  <span className="title-first">Olá</span>
                  <span className="title-second"> {this.props.user.name}</span>
                </h1>
              </div>
                <div className='desktop-box-btn'>
                  <div className="add-building-box desktop-btn">
                    <Link
                      className="add-building-btn"
                      to="/adicionar-condominio"
                    >
                      Criar Condominio
                    </Link>
                  </div>
                  <div className="invitation-code-box desktop-btn">
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

            <div className="main-page-section-title-container">
              <Link className="main-page-section-title" to="/meus-condominios">
                <span className="title-third">Meus </span>
                <span className="title-second">Condomínios</span>
              </Link>
            </div>
            <div className="section-card-container">
              <div className="card-container">
                {this.props.user.buildings.length > 3
                  ? this.state.buildings.slice(0, 3).map((building, idx) => {
                      return (
                        <div key={idx} className="card-box">
                          <Link
                            className="card-box-link"
                            to={`/condominio/${building._id}`}
                          >
                            <img
                              className="card-img"
                              src={building.image}
                              alt=""
                            />
                            <h3 className="card-title">{building.name}</h3>
                            <p className="card-text">
                              CEP: {building.address.cep}
                            </p>
                          </Link>
                        </div>
                      );
                    })
                  : this.state.buildings.map((building, idx) => {
                      return (
                        <div key={idx} className="card-box">
                          <Link
                            className="card-box-link"
                            to={`/condominio/${building._id}`}
                          >
                            <img
                              className="card-img"
                              src={building.image}
                              alt=""
                            />
                            <h3 className="card-title">{building.name}</h3>
                            <p className="card-text">
                              CEP: {building.address.cep}
                            </p>
                          </Link>
                        </div>
                      );
                    })}
              </div>
              {this.props.user.buildings.length > 3 ? (
                <div className="see-more-box">
                  <Link className="see-more-btn" to="/meus-condominios">
                    Ver mais
                  </Link>
                  <Link
                    className="see-more-btn mobile-hidden"
                    to="/meus-condominios"
                  >
                    <GoChevronRight className="next-icon" />
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="main-page-section-title-container">
              <Link className="main-page-section-title" to="/meus-serviços">
                <span className="title-third">Meus </span>
                <span className="title-second">serviços e produtos </span>
              </Link>
            </div>
            <div className="section-card-container">
              {this.props.user.services.length > 0 ? (
                <ServicesList
                  services={this.state.services.slice(0, 3)}
                  {...this.props}
                ></ServicesList>
              ) : (
                <></>
              )}
              {this.props.user.services.length > 3 ? (
                <div className="see-more-box">
                <Link className="see-more-btn" to="/meus-serviços">
                  Ver mais
                </Link>
                <Link
                  className="see-more-btn mobile-hidden"
                  to="/meus-serviços"
                >
                  <GoChevronRight className="next-icon" />
                </Link>
              </div>
              ):(
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
              <div className="section-card-container">
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
              {this.props.user.services.length > 3 ? (
                <div className="see-more-box">
                  <Link className="see-more-btn" to="/meus-pedidos">
                    Ver mais
                  </Link>
                  <Link
                    className="see-more-btn mobile-hidden"
                    to="/meus-pedidos"
                  >
                    <GoChevronRight className="next-icon" />
                  </Link>
                </div>
              ):(
                <></>
              )}

              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
