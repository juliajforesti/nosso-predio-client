import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  signup(email, password, name) {
    return this.service
      .post("/signup", { email, password, name })
      .then((response) => (
        response.data
        ));
  }

  login(email, password) {
    return this.service
      .post("/login", { email, password })
      .then((response) => response.data);
  }

  logout() {
    return this.service
    .get("/logout", {})
    .then((response) => response.data);
  }

  loggedin() {
    return this.service
    .get('/loggedin', {})
    .then((response) => response.data)
  }

  edit(email, name, password, userId){
    return this.service
    .post(`/edit-user/${userId}`, {email, name, password})
    .then((response) => response.data)
  }

}

export default AuthService;
