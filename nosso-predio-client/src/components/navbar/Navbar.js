import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="nav-main-box">
      <div className="nav-left-side">
        <NavLink className='nav-link-left' to="/">Nosso Predio</NavLink>
      </div>
      <div >
        {!props.user ? (
          <div className="nav-right-side">
              <NavLink className='nav-link-right' to="/signup">Signup</NavLink>
              <NavLink className='nav-link-right' to="/login">Login</NavLink>
          </div>
        ) : (
          <div className='nav-right-side'>
            <NavLink className='nav-link-right' to='/perfil'>Perfil</NavLink>
            <button className='nav-link-right' onClick={() => props.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
