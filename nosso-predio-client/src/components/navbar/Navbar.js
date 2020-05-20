import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
// import BurguerMenu from '../menu/BurguerMenu'


const Navbar = (props) => {
  return (
    
    <nav className="nav-main-box">
      <div className="nav-left-side">
        <NavLink className='nav-link-left' to="/">
        <img className='logo-img' src='https://res.cloudinary.com/juliajforesti/image/upload/v1589992934/nosso-predio/NOSSO_1_ybzmqc.png' alt='Nosso Prédio' />
        </NavLink>
      </div>
        {/* <BurguerMenu /> */}
      <div >
        {!props.user ? (
          <div className="nav-right-side">
              <NavLink className='nav-link-right' to="/signup">Signup</NavLink>
              <NavLink className='nav-link-right' to="/login">Login</NavLink>
          </div>
        ) : (
          <div className='nav-right-side'>
            <button className='logout-btn' onClick={() => props.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
