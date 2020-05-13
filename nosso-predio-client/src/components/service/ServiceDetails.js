import React, { Component } from 'react';
import MainService from "../MainService";
import { Link } from "react-router-dom";



class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      service: {},
      apiCalled: false
    }
    this.service = new MainService();

  }
  getServiceDetails(){
    if (!this.state.apiCalled){
      const {params} = this.props.match
      this.service.getServiceDetails(params.id, params.servicoId)
      .then(response => {
        this.setState({
          service: response,
          apiCalled: true,
        })
      })
    }
  }

  render() { 
    this.getServiceDetails();
    return (  
      <div>
        <Link to={`/condominio/${this.state.service.building}/adicionar-serviço`}>Adicionar Serviço/Produto</Link>
        <br/>
        {this.state.service.name}
      </div>
    );
  }
}

export default ServiceDetails;