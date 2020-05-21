import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";

const Navbar = (props) => {
  return (
    <nav className="nav-main-box">
      <div className="nav-left-side">
        <NavLink className="nav-link-left" to="/">
          <img
            className="logo-img"
            src="https://res.cloudinary.com/juliajforesti/image/upload/v1589992934/nosso-predio/NOSSO_1_ybzmqc.png"
            alt="Nosso Prédio"
          />
        </NavLink>
        {props.user ? (
          <div className='nav-link-icon-container'>
            <NavLink className="nav-link-icon" to="/pagina-principal">
              <AiOutlineHome className="nav-icon" />
              Página Principal
            </NavLink>

            <NavLink className="nav-link-icon" to="/meus-condominios">
              <FaRegBuilding className="nav-icon" />
              Meus Condomínios
            </NavLink>

            <NavLink className="nav-link-icon" to="/perfil">
              <AiOutlineUser className="nav-icon" />
              Perfil
            </NavLink>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* <BurguerMenu /> */}
      <div>
        {!props.user ? (
          <div className="nav-right-side">
            <NavLink className="nav-link-right" to="/signup">
              Signup
            </NavLink>
            <NavLink className="nav-link-right" to="/login">
              Login
            </NavLink>
          </div>
        ) : (
          <div className="nav-right-side">
            <button className="logout-btn" onClick={() => props.logout()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
