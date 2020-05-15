import React, { Component } from "react";
import MainService from "../MainService";

class EditService extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      description,
      category,
      price,
      date,
      apartment,
    } = this.props.service;
    this.state = {
      name: name,
      description: description,
      category: category,
      price: price,
      date: date,
      apartment: apartment,
    };
    this.service = new MainService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const buildingId = this.props.service.building._id;
    const serviceId = this.props.service._id;

    const { name, description, price, category, apartment, date } = this.state;
    this.service
      .editService(
        buildingId,
        serviceId,
        name,
        description,
        price,
        category,
        apartment,
        date
      )
      .then((response) => {
        console.log(response);
        this.props.handleClick();
        this.props.getEditedService(response);
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
        <form onSubmit={this.handleFormSubmit}>
          <label>Nome:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
          ></input>
          <label>Descrição:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={this.state.description}
          ></input>
          <label>Preço:</label>
          <input
            onChange={this.handleChange}
            type="number"
            name="price"
            value={this.state.price}
          ></input>
          <label>Categoria:</label>
          {this.props.service.category === 'Produto' ? (
          <select
            onChange={this.handleChange}
            name="category"
          >
            <option value='Produto'>Produto</option>
            <option value='Serviço'>Serviço</option>
          </select>

          ) : (
          <select
            onChange={this.handleChange}
            name="category"
          >
            <option value='Serviço'>Serviço</option>
            <option value='Produto'>Produto</option>
          </select>
          )}
          <label>Complemento:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="apartment"
            value={this.state.apartment}
          ></input>
          <label>Data:</label>
          <input
            onChange={this.handleChange}
            type="date"
            name="date"
            value={this.state.date}
          ></input>
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
}

export default EditService;
