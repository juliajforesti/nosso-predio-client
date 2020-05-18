import React, { Component } from "react";
import MainService from "../MainService";

class EditBuilding extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props.building;
    const { cep, number } = this.props.building.address;

    this.state = {
      name: name,
      cep: cep,
      number: number,
    };
    this.service = new MainService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const buildingId = this.props.building._id;
    const { name, cep, number } = this.state;
    this.service
      .editBuilding(buildingId, name, cep, number)
      .then((response) => {
        console.log(response);
        this.props.handleClick();
        this.props.getEditedBuilding(response);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFileUpload(e) {
    const uploadData = new FormData();

    console.log(e.target.files[0])

    uploadData.append("image", e.target.files[0]);
    const buildingId = this.props.building._id;

    this.service.editBuildingPhoto(uploadData, buildingId)
    .then((response) => {
      console.log(response)
      this.props.getEditedBuilding(response);
      this.props.handleClick();
    });
  }

  render() {
    return (
      <div>
        <label>Alterar imagem:</label>
        <input type="file" onChange={this.handleFileUpload} />
        <form onSubmit={this.handleFormSubmit}>
          <label>Nome:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
          ></input>
          <label>cep:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="cep"
            value={this.state.cep}
          ></input>
          <label>Número:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="number"
            value={this.state.number}
          ></input>
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
}

export default EditBuilding;
