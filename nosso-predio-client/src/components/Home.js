import React from "react";
import { Link } from "react-router-dom";
import "../components/css/Home.css";

const Home = (props) => {
  return (
    <div>
      <div className="home-title">
        <img id='img-home-mobile'
          src="https://res.cloudinary.com/juliajforesti/image/upload/v1589995572/nosso-predio/NOSSO_2_cdmf2u.png"
          alt="Nosso Prédio"
        />
        <img id='img-home-desktop'
          src="https://res.cloudinary.com/juliajforesti/image/upload/v1590020788/nosso-predio/NOSSO_3_p0ddar.png"
          alt="Nosso Prédio"
        />
      </div>
      {props.user ? (
        <div className="home-link-container">
          <div className="home-link-box">
            <Link className="home-link" to="/pagina-principal">
              Ir para Pagina principal
            </Link>
          </div>
        </div>
      ) : (
        <div className="home-link-container">
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
        <div className="home-section-2-container">
          <div className="home-about-box">
            <h2>Sobre</h2>
            <hr />
            <p className="home-about-text">
              Nosso Prédio é uma plataforma para disponibilização e compra de
              serviços e produtos entre vizinhos. Ela foi criada com o intuito de
              estimular pequenos negócios e o senso de comunidade entre os moradores
              de condomínios. Você pode cadastrar seu condomínio, convidar seus
              vizinhos para participarem do grupo, disponibilizar e comprar serviços
              e/ou produtos.
            </p>

            <ul className="home-about-list">
              <li>
                Você tem tempo livre e gostaria de se disponibilizar para passear
                com os pets de seus vizinhos?
              </li>
              <li>
                Você faz uma feijoada deliciosa e gostaria de oferecer como produto?
              </li>
              <li>Você sabe montar móveis e gostaria de oferecer esse serviço?</li>
            </ul>
            <h4>Junte-se ao Nosso Prédio!</h4>
          </div>
          <div className="home-about-box new-backgroud">
            <h2>Quem somos</h2>
            <hr />
            <div className="home-about-text-container">
              <div className="home-about-text">
                <img
                  src="https://res.cloudinary.com/juliajforesti/image/upload/v1589924085/nosso-predio/bf542bbc-bdbe-46a2-a6bc-e8d39c4f2d5f_2_zc0fhb.jpg"
                  alt=""
                />
                <h3>Gabriel Bohn</h3>
                <img src="" alt="" />
                <p>
                  Estudante de engenharia, entusiasta do mundo dos games e de tecnologia, sendo esse o motivo de fazer curso de desenvolvimento web da Ironhack.
                </p>
              </div>
              <div className="home-about-text">
                <img
                  src="https://res.cloudinary.com/juliajforesti/image/upload/v1589924069/nosso-predio/IMG_2847_r8kbbo.jpg"
                  alt=""
                />
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
    </div>
  );
};

export default Home;
