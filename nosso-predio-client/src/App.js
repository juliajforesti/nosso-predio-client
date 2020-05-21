import React, { Component } from "react";
import "./components/css/Home.css";
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
import InvitePage from "./components/building/InvitePage";
import RedirectToMain from "./components/RedirectToMain";
import 'bulma/css/bulma.css';
import Footer from './components/footer/Footer'
import { Helmet } from 'react-helmet'

const TITLE = 'Nosso Prédio'

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
      .catch((err) => {});
  }

  render() {
    this.fetchUser();
    return (

      <div className="app-outer-container">
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

        {this.state.loggedUser ? (
          <div>
            <Navbar
              user={this.state.loggedUser}
              logout={this.logout}
            />

            <div className="app-container">
              <Switch>
                <Route exact path="/" render={(props) => <Home user={this.state.loggedUser} {...props} />}/>
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
                {/* this route will catch any route that wasnt matched in previous routes */}
                <Route component={RedirectToMain} />
              </Switch>
            </div>
            <Footer/>
          </div>
        ) : (
          <div>
            <Navbar
              user={this.state.loggedUser}
              logout={this.logout}
              {...this.props}
            />
            <div className="app-container">
              <Switch>
                <Route exact path="/"  render={(props) => <Home user={this.state.loggedUser} {...props} />} />
                <Route
                  exact
                  path="/signup"
                  render={(props) => (
                    <Signup getUser={this.getUser} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <Login getUser={this.getUser} {...props} />
                  )}
                />
                <Route component={RedirectToMain} />
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
