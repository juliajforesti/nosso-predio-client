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
        this.props.history.push(`/meus-pedidos`);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="order-box">
          <div>
            <label>Quantidade:</label>
            <input
              className="quantity-input"
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <input className="details-btn order-btn" type="submit" value="Pedir" />
        </div>
      </form>
    );
  }
}

export default OrderForm;
