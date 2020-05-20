import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";


const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="footer-link" to="/pagina-principal">
          <AiOutlineHome className='footer-icon' />
          Página Principal
        </Link>

        <Link className="footer-link" to="/meus-condominios">
          <FaRegBuilding className='footer-icon' />
          Meus Condomínios
        </Link>

        <Link className="footer-link" to="/perfil">
          <AiOutlineUser className='footer-icon' />
          Perfil
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
