import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
  return (  
    <div>
    <div>
      <h1>Nosso Prédio</h1>
    </div>
    <div>
      <Link to='/signup'>Cadastre-se agora</Link>
    </div>
    <div>
      <h2>Sobre</h2>
      <p>blablabla</p>
    </div>

      
    </div>
  );
}
 
export default Home;