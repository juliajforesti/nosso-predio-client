import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="nav-main-box">
      <div className="nav-left-side">
        <NavLink className='nav-link' to="/">Nosso Predio</NavLink>
      </div>
      <div >
        {!props.user ? (
          <div className="nav-right-side">
              <NavLink className='nav-link' to="/signup">Signup</NavLink>
              <NavLink className='nav-link' to="/login">Login</NavLink>
          </div>
        ) : (
          <div className='nav-link'>
            <NavLink className='nav-link' to='/perfil'>Perfil</NavLink>
            <button className='nav-link' onClick={() => props.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
