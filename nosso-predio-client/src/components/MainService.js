import axios from "axios";

class MainService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API,
      withCredentials: true,
    });
  }

  getUser(userId) {
    return this.service
      .get(`/user/${userId}`)
      .then((response) => response.data);
  }

  getAllBuildings() {
    return this.service
      .get("/buildings", {})
      .then((buildings) => buildings.data);
  }

  addBuilding(name, cep, number) {
    return this.service
      .post("/add-building", { name, cep, number }, {new: true})
      .then((response) => response.data);
  }

  getBuildingDetails(buildingId) {
    return this.service
      .get(`/building/${buildingId}`)
      .then((response) => response.data);
  }

  addService(name, description, category, price, date, apartment, buildingId) {
    return this.service
      .post(`/building/${buildingId}/add-service`, {
        name,
        description,
        category,
        price,
        date,
        apartment,
      }, {new: true})
      .then((response) => response.data);
  }

  getAllServices() {
    return this.service.get("/services").then((response) => response.data);
  }

  getServiceDetails(buildingId, serviceId) {
    return this.service
      .get(`/building/${buildingId}/service/${serviceId}`)
      .then((response) => response.data);
  }

  getAllOrders() {
    return this.service.get("/orders").then((response) => response.data);
  }

  addOrder(buildingId, serviceId, quantity) {
    return this.service
      .post(`/building/${buildingId}/service/${serviceId}/add-order`, {
        quantity,
      }, {new: true})
      .then((response) => response.data);
  }

  buildingInvite(code) {
    return this.service
      .get(`building-invitation/${code}`, {new: true})
      .then((response) => response.data);
  }

  changeStatus(buildingId, serviceId, orderId, status) {
    return this.service
      .post(
        `/building/${buildingId}/service/${serviceId}/status-order/${orderId}`, {status}, {new: true}
      )
      .then((response) => response.data);
  }

  editBuilding(buildingId, name, cep, number){
    return this.service.post(`/edit-building/${buildingId}`, {name, cep, number})
    .then(response => response.data)
  }
  editService(buildingId, serviceId, name, description, price, category, apartment, date){
    return this.service.post(`/building/${buildingId}/edit-service/${serviceId}`, {name, description, price, category, apartment, date})
    .then(response => response.data)
  }
}

export default MainService;
