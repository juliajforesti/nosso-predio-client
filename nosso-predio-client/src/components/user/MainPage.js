import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      buildings: [],
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)

  }

  getAllBuildings() {
    axios.get('http://localhost:5000/api/buildings')
    .then(buildings => {
      this.setState({
        buildings: buildings.data
      })
    })
  }

  handleChange(e){
    this.setState({
      search: e.target.value
    })
  }

  filterBuildings() {
    let filteredBuilding = [...this.state.buildings].filter(building => building.cep.includes(this.state.search))
    this.setState({
      buildings: filteredBuilding
    })
  }

  render() { 

    return (  
      <div>
        <h1> Main Page </h1>
        <div>
          {this.props.user.buildings.length < 1 ? (
            <div>
            <Link to='/adicionar-condominio'>Adicionar Condominio</Link>
            <input type='text' value={this.state.search} onChange={this.handleChange} />
            {this.state.buildings.map(building => {
              return <h1>{building.name}</h1>
            })}
            </div>
          ) : (
            <div>
            {this.props.user.buildings.map(building => {
              return <h1>{building.name}</h1>
            })}
            </div>
          )}
        </div>
      </div>

    );
  }
}

export default MainPage;

