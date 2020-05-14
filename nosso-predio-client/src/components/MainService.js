import axios from "axios";

class MainService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
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
      .post("/add-building", { name, cep, number })
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
      })
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
      })
      .then((response) => response.data);
  }

  buildingInvite(code) {
    return this.service
      .get(`building-invitation/${code}`)
      .then((response) => response.data);
  }

  changeStatus(buildingId, serviceId, orderId, status) {
    return this.service
      .post(
        `/building/${buildingId}/service/${serviceId}/status-order/${orderId}`, {status}
      )
      .then((response) => response.data);
  }
}

export default MainService;
