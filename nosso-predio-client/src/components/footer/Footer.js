import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";


const Footer = (props) => {
  return (
    <footer className="footer">
      <div className='footer-left'>
        <p className='footer-title'> Nosso Prédio </p>
        <p className='footer-by'>por </p>
        <p className='footer-by'>Gabriel Bohn e Júlia Foresti</p>
      </div>
      <div className='footer-right'>
        <Link className='footer-link' to="/">Nosso Predio</Link>
        <Link className='footer-link' to="/pagina-principal">Página Principal</Link>
        <Link className='footer-link' to="/meus-condominios">Meus Condomínios</Link>
        <Link className='footer-link' to="/perfil">Perfil</Link>


      </div>
    </footer>
  );
};

export default Footer;
