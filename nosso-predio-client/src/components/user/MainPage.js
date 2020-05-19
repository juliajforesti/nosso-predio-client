import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainService from "../MainService";
import "./User.css";
// import BuildingsList from "../building/BuildingsList";
import ServicesList from "../service/ServicesList";
import OrderList from "../order/OrderList";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      orders: [],
      activeOrders: [],
      services: [],
      search: "",
      buildingApiCalled: false,
      serviceApiCalled: false,
      orderAPICalled: false,
      toggleButton: false,
      confirmationCode: "",
      toggleStatusButton: true,
    };
    this.service = new MainService();

    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  }

  handleChangeCode(e) {
    this.setState(
      {
        confirmationCode: e.target.value,
      },
      () => this.getBuildings()
    );
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
    // IF USER DOESNT HAVE BUILDINGS
    if (this.props.user.buildings.length < 1) {
      this.getBuildings();
      return (
        <div className="app">
          <div className="main-page-title-box">
            <h1> Olá {this.props.user.name}! </h1> <br />
          </div>
          <div>
            <div>
              <Link to="/adicionar-condominio">Adicionar Condominio</Link>{" "}
              <br /> <br />
              <button onClick={() => this.handleToggle()}>
                Já tem um convite? Junte-se ao seu condomínio
              </button>{" "}
              <br /> <br />
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
              <input
                type="text"
                value={this.state.search}
                onChange={this.handleChangeSearch}
                placeholder="Buscar pelo nome"
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
      this.getUserOrders();
      return (
        <div className="app">
          <div className="main-page-title-box">
            <h1> Olá {this.props.user.name}! </h1>
          </div>
          <div>
            <div className="add-building-box">
              <Link className="add-building-btn" to="/adicionar-condominio">Criar Condominio</Link>
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

          <div>
            <h3>Meus Condominios</h3>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar pelo nome"
            />
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
            <button onClick={this.handleToggleStatus}>
              {this.state.toggleStatusButton
                ? "Mostrar todos os pedidos"
                : "Mostrar somente pedidos ativos"}
            </button>
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
      );
    }
  }
}

export default MainPage;
