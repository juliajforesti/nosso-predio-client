import React, { Component } from "react";
import MainService from "../MainService";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
    this.service = new MainService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      quantity: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { quantity } = this.state;
    const { service, building } = this.props;

    this.service
      .addOrder(building, service, quantity)
      .then((response) => {
        this.setState({
          quantity: 0,
        });
        this.props.history.push(`/condominio/${building}/serviço/${service}`);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="">
          <div className="">
            <label>Quantidade:</label>
            <input
              className=""
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <input className="button" type="submit" value="Pedir" />
      </form>
    );
  }
}

export default OrderForm;
