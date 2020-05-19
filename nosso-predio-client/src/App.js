import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import MainPage from "./components/user/MainPage";
import AddBuilding from "./components/building/AddBuilding";
import BuildingDetails from "./components/building/BuildingDetails";
import BuildingsPage from "./components/building/BuildingsPage";
import AddService from "./components/service/AddService";
import ServiceDetails from "./components/service/ServiceDetails";
import ProfilePage from "./components/user/ProfilePage";
import ServicesPage from "./components/service/ServicesPage";
import OrdersPage from "./components/order/OrdersPage";
import InvitePage from './components/building/InvitePage'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: null,
    };
    this.service = new AuthService();

    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  fetchUser() {
    if (this.state.loggedUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedUser: false,
          });
        });
    }
  }

  getUser(user) {
    this.setState({
      loggedUser: user,
    });
  }

  logout() {
    this.service
      .logout()
      .then((response) => {
        this.setState({
          loggedUser: null,
        });
        this.props.history.push(`/`);
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.fetchUser();
    return (
      <div>
        {this.state.loggedUser ? (
          <div>
            <Navbar
              user={this.state.loggedUser}
              logout={this.logout}
              {...this.props}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoutes
                exact
                path="/pagina-principal"
                component={MainPage}
                user={this.state.loggedUser}
                getUser={this.getUser}
              />
              <ProtectedRoutes
                exact
                path="/adicionar-condominio"
                component={AddBuilding}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/condominio/:id"
                component={BuildingDetails}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/condominio/:id/adicionar-serviço"
                component={AddService}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/condominio/:id/serviço/:servicoId"
                component={ServiceDetails}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/meus-condominios"
                component={BuildingsPage}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/meus-serviços"
                component={ServicesPage}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/meus-pedidos"
                component={OrdersPage}
                user={this.state.loggedUser}
              />
              <ProtectedRoutes
                exact
                path="/convite/:invitationCode"
                component={InvitePage}
                user={this.state.loggedUser}
                getUser={this.getUser}
              />
              <ProtectedRoutes
                exact
                path="/perfil"
                component={ProfilePage}
                user={this.state.loggedUser}
                getUser={this.getUser}
              />
            </Switch>
          </div>
        ) : (
          <div>
            <Navbar
              user={this.state.loggedUser}
              logout={this.logout}
              {...this.props}
            />
            <Switch>
              <Route
                exact
                path="/signup"
                render={(props) => <Signup getUser={this.getUser} {...props} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login getUser={this.getUser} {...props} />}
              />
              <Route component={Home} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
