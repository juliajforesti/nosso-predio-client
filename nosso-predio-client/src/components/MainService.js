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
      .then((response) => response.data)
      .catch((err) => console.log("errouuuuuuu"));
  }

  getAllServices() {
    return this.service
      .get("/services")
      .then((response) => response.data);
  }

  getServiceDetails(buildingId, serviceId){
    return this.service
    .get(`/building/${buildingId}/service/${serviceId}`)
    .then((response) => response.data);
  }
}

export default MainService;
