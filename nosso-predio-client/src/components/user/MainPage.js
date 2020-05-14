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
      services: [],
      search: "",
      buildingApiCalled: false,
      serviceApiCalled: false,
      orderAPICalled: false,
      toggleButton: false,
      confirmationCode: '',
    };
    this.service = new MainService();

    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  }

  handleChangeCode(e) {
    this.setState({
      confirmationCode: e.target.value,
    });
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
            order.origin.includes(this.props.user._id)
          ),
          orderAPICalled: true,
        });
      });
    }
  }

  handleToggle(){
    this.setState({
      toggleButton: !this.state.toggleButton
    })
  }

  handleOnSubmit(e){
    e.preventDefault()
    this.service.buildingInvite(this.state.confirmationCode).then(response => {
      this.setState({
        toggleButton: !this.state.toggleButton,
        confirmationCode: '',
      })
    })
  }

  render() {
    // IF USER DOESNT HAVE BUILDINGS
    if (this.props.user.buildings.length < 1) {
      this.getBuildings();
      return (
        <div>
          <h1> Main Page </h1> <br/>
          <div>
            <div>
              <Link to="/adicionar-condominio">Adicionar Condominio</Link> <br/> <br/>
              <button onClick={()=>this.handleToggle()}>Já tem um convite? Junte-se ao seu condomínio</button> <br/> <br/>
              {this.state.toggleButton ? (
                <form onSubmit={this.handleOnSubmit} type= 'submit'>
                  <input onChange={this.handleChangeCode} value={this.state.confirmationCode} type='text' name='confirmationCode' placeholder='insira seu código de acesso'/>
                  <button type='submit' >Enviar</button>
                </form>
              ) : (
                <></>
              )
              }

              <input
                type="text"
                value={this.state.search}
                onChange={this.handleChangeSearch}
                placeholder='Buscar pelo nome'
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
        <div>
          <h1> Main Page </h1>
          <div>
            <Link to="/adicionar-condominio">Adicionar Condominio</Link>  <br/> <br/>
            <button onClick={()=>this.handleToggle()}>Já tem um convite? Junte-se ao seu condomínio</button> <br/> <br/>
              {this.state.toggleButton ? (
                <form onSubmit={this.handleOnSubmit} type= 'submit'>
                  <input onChange={this.handleChangeCode} value={this.state.confirmationCode} type='text' name='confirmationCode' placeholder='insira seu código de acesso'/>
                  <button type='submit' >Enviar</button>
                </form>
              ) : (
                <></>
              )
              }
          </div>
          <div>
            <br />
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar pelo nome"
            />
          </div>

          <div>
            <h3>Meus Condominios</h3>
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
            <OrderList orders={this.state.orders} {...this.props} />
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
