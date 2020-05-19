import React, { Component } from "react";
import MainService from "../MainService";
import ServicesList from "../service/ServicesList";
import { Link } from "react-router-dom";


class ServicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      search: "",
      serviceApiCalled: false,
    };
    this.service = new MainService();

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
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

  render() {
    // IF USER DOESNT HAVE BUILDINGS
    this.getUserServices();
    if (this.props.user.services.length < 1) {
      return (
        <div>
          <h1> Meus serviços/produtos </h1> <br />
          <div>
            <h1>Você ainda não tem nenhum serviço, entre em um dos seus condominios e crie um!</h1>
          </div>
          <Link to='/pagina-principal'><button>Voltar</button></Link>
        </div>
      );

      // IF USER HAS BUILDINGS
    } else {
      return (
        <div>
          <h1> Meus serviços/produtos </h1>
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
          <ServicesList
                services={this.state.services
                    .filter((elem) => {
                      return elem.name.toLowerCase().includes(this.state.search);
                    })}
                {...this.props}
              ></ServicesList>
          </div>
          <Link to='/pagina-principal'><button>Voltar</button></Link>
        </div>
      );
    }
  }
}

export default ServicesPage;
