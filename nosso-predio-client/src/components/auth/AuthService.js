import axios from "axios";


class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API,
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
      .then((response) => response.data)
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

  edit(email, name, userId){
    return this.service
    .post(`/edit-user/${userId}`, {email, name}, {new: true})
    .then((response) => response.data)
  }

  editPassword( password, userId){
    return this.service
    .post(`/edit-password/${userId}`, {password}, {new: true})
    .then((response) => response.data)
  }

  editPhoto(image, userId){
    return this.service
    .post(`/edit-photo/${userId}`, image, {new: true})
    .then((response) => response.data)
  }

}

export default AuthService;
