import React, { Component } from "react";
import MainService from "../MainService";

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "Produto",
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
      <div className="auth-container">
        <h1 className="auth-title">Adicione seu Serviço/Produto</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-item">
              <label>Nome:</label> <br />
              <input
                onChange={this.handleChange}
                type="text"
                className="form-input"
                name="name"
                value={this.state.name}
                placeholder='Cookies do bem'
              />
            </div>
            <div className="form-item">
              <label>Descrição:</label> <br />
              <input
                onChange={this.handleChange}
                type="text-area"
                name="description"
                value={this.state.description}
                placeholder='Cookies caseiros feitos com muito amor e carinho'
              />
            </div>
            <div className="form-item">
              <label>Categoria:</label> <br />
              <select onChange={this.handleChange} name="category">
                <option value="Produto">Produto</option>
                <option value="Serviço">Serviço</option>
              </select>
            </div>
            <div className="form-item">
              <label>Preço:</label> <br />
              <input
              className="form-input"
                onChange={this.handleChange}
                type="number"
                name="price"
                value={this.state.price}
              />
            </div>

            <div className="form-item">
              <label>Data:</label> <br />
              <input
              className="form-input"
                onChange={this.handleChange}
                type="date"
                name="date"
                value={this.state.date}
              />
            </div>

            <div className="form-item">
              <label>Complemento:</label> <br />
              <input
              className="form-input"
                onChange={this.handleChange}
                type="text"
                name="apartment"
                value={this.state.apartment}
                placeholder='Apt. 103'
              />
            </div>

            <button className="form-button" type="submit">
              Adicionar serviço
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddService;
