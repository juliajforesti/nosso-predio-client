import React from "react";
import { Link } from "react-router-dom";

const ServicesList = (props) => {
    return (
        <div>
          {props.services.map((service, idx)=> {
            return (
              <div key={idx} className="building-box">
                <h2 >{service.name}</h2>
                <Link to={`/condominio/${service.building}/serviço/${service._id}`}>Acessar</Link>
              </div>
            )
          })}
        </div>
    )
}

export default ServicesList;