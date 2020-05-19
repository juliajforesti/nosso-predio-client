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
        <div>
          <div className="home-link-box">
            <Link className="home-link" to="/signup">
              Clique aqui para se cadastrar!
            </Link>
          </div>
          <div className="home-link-box">
            <Link className="home-link" to="/login">
              Já tem cadastro? Entre aqui!
            </Link>
          </div>
        </div>
      )}

      <div className="home-about-box">
        <h2>Sobre</h2>
        <hr />
        <p className="home-about-text">
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
        <hr />
        <div className="home-about-text-container">
          <div className="home-about-text">
          <img src='https://res.cloudinary.com/juliajforesti/image/upload/v1589924085/nosso-predio/bf542bbc-bdbe-46a2-a6bc-e8d39c4f2d5f_2_zc0fhb.jpg' alt=''/>
            <h3>Gabriel Bohn</h3>
            <img src="" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
          </div>
          <div className="home-about-text">
            <img src='https://res.cloudinary.com/juliajforesti/image/upload/v1589924069/nosso-predio/IMG_2847_r8kbbo.jpg' alt=''/>
            <h3>Julia Foresti</h3>
            <img src="" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
