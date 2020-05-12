import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = (props) => {
  return (
    <nav className="nav-main-box">
      <div className='nav-left-side'>
        <NavLink to="/">Nosso Predio</NavLink>
      </div>
      <div className='nav-right-side'>
        {!props.user ? (
          <div>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        ) : (
          <div>
            <button onClick={() => props.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
