import React, { Component } from "react";
import MainService from "../MainService";

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      price: "",
      date: "",
      apartment: "",
    };
    this.service = new MainService();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { params } = this.props.match;
    const buildingId = params.id;
    const { name, description, category, price, date, apartment } = this.state;

    this.service
      .addService(
        name,
        description,
        category,
        price,
        date,
        apartment,
        buildingId
      )
      .then((response) => {
        this.props.history.push(`/condominio/${buildingId}`);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h1>Adicione seu Serviço/Produto</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Nome:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
            />
            <label>Descrição:</label>
            <input
              onChange={this.handleChange}
              type="text-area"
              name="description"
              value={this.state.description}
            />
            <label>Categoria:</label>
            <select onChange={this.handleChange} name="category">
              <option value="Produto">Produto</option>
              <option value="Serviço">Serviço</option>
            </select>
            
            <label>Preço:</label>
            <input
              onChange={this.handleChange}
              type="number"
              name="price"
              value={this.state.price}
            />
            <label>Data:</label>
            <input
              onChange={this.handleChange}
              type="date"
              name="date"
              value={this.state.date}
            />
            <label>Complemento:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="apartment"
              value={this.state.apartment}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddService;
