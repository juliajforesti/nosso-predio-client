import axios from "axios";

class MainService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAllBuildings() {
    return this.service
      .get("/buildings", {})
      .then((buildings) => buildings.data)
  }

  // addBuilding(){
  //   return this.service
  //   .post('/add-building', {name, cep, number})
  //   .then(response => )
  // }



}




export default MainService;
