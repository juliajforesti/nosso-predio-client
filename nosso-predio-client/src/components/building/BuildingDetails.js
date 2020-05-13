import React, { Component } from 'react';
import MainService from "../MainService";
import { Link } from "react-router-dom";



class BuildingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      building: {},
      apiCalled: false
    }
    this.service = new MainService();

  }
  getBuildingDetails(){
    if (!this.state.apiCalled){
      const {params} = this.props.match
      this.service.getBuildingDetails(params.id)
      .then(response => {
        this.setState({
          building: response,
          apiCalled: true,
        })
      })
    }
  }

  render() { 
    this.getBuildingDetails();
    return (  
      <div>
        <Link to={`/condominio/${this.state.building._id}/adicionar-serviço`}>Adicionar Serviço/Produto</Link>
        {this.state.building.name}
      </div>
    );
  }
}
 
export default BuildingDetails;