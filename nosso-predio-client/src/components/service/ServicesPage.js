import React, { Component } from "react";
import MainService from "../MainService";
import ServicesList from "../service/ServicesList";


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
    // IF USER DOESNT HAVE SERVICES
    this.getUserServices();
    if (this.props.user.services.length < 1) {
      return (
        <div>
        <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Serviços e Produtos</span>
            </h1>
          </div>
          <div>
            <h1 className="add-building-err">Você ainda não tem nenhum serviço, entre em um de seus condominios e crie um!</h1>
          </div>

          <button onClick={this.props.history.goBack} className="details-btn">Voltar</button>

        </div>
      );
      // IF USER HAS SERVICES
    } else {
      return (
        <div>
        <div className="main-page-title-box">
            <h1>
              <span className="title-first">Meus </span>
              <span className="title-second">Serviços e Produtos</span>
            </h1>
          </div>
          <div className='search-bar-container'>
            <input
              type="text"
              className="form-input search-bar"
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder="Buscar serviço pelo nome"
            />

          <button onClick={this.props.history.goBack} className="details-btn">Voltar</button>

          </div>

          <div>
          <ServicesList
              servicePage={true}  
                services={this.state.services
                    .filter((elem) => {
                      return elem.name.toLowerCase().includes(this.state.search);
                    })}
                {...this.props}
              ></ServicesList>
          </div>

        </div>
      );
    }
  }
}

export default ServicesPage;
