import React, { Component } from "react";
import axios from 'axios';

class AddBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cep: "",
      number: "",
      residents: props.user._id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:5000/api/add-building', {name: this.state.name, cep: this.state.cep, number: this.state.number}, {withCredentials: true} )
    .then(response => {
      this.props.history.push('/pagina-principal')
    })
  }

  handleChange(e){
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <h1>Adicione seu Condomínio</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Nome:</label>
            <input onChange={this.handleChange} type="text" name="name" value={this.state.name} />
            <label>CEP:</label>
            <input onChange={this.handleChange} type="text" name="cep" value={this.state.cep} />
            <label>Número:</label>
            <input onChange={this.handleChange} type="number" name="number" value={this.state.number} />
            <button type='submit' >Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBuilding;
