import React from "react";
import { Link } from "react-router-dom";

const ServicesList = (props) => {
  return (
    <div>
      {props.services.map((service, idx) => {
        return (
          <div key={idx}>
          <Link to={`/condominio/${service.building}/serviço/${service._id}`}>
            <div className="card-box">
              <img className="card-img" src={service.image} alt="" />
              <h3>{service.name}</h3>
            </div>
          </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesList;
