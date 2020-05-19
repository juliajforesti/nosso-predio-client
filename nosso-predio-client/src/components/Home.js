import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Home = (props) => {
  return (
    <div>
      <div className="home-title">
        <h1>Nosso Prédio</h1>
      </div>
      {props.user ? (
        <div className="home-link-box">
          <Link className="home-link" to="/pagina-principal">
            Pagina principal
          </Link>
        </div>
      ) : (
        <div className="home-link-box">
          <Link className="home-link" to="/signup">
            Clique aqui para se cadastrar!
          </Link>
          <br />
          <Link className="home-link" to="/login">
            Já tem cadastro? Entre aqui!
          </Link>
          <br />
        </div>
      )}

      <div className="home-about-box">
        <h2>Sobre</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras
          adipiscing enim eu turpis egestas. Ullamcorper morbi tincidunt ornare
          massa eget egestas purus. Sapien faucibus et molestie ac feugiat sed
          lectus vestibulum mattis. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque elit.
        </p>
      </div>
      <div className="home-about-box">
        <h2>Quem somos</h2>
        <h3>Gabriel Bohn</h3>
        <img src='' alt='' />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras
          adipiscing enim eu turpis egestas. Ullamcorper morbi tincidunt ornare
          massa eget egestas purus.
        </p>
        <h3>Julia Foresti</h3>
        <img src='' alt='' />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras
          adipiscing enim eu turpis egestas. Ullamcorper morbi tincidunt ornare
          massa eget egestas purus.
        </p>
      </div>
    </div>
  );
};

export default Home;
