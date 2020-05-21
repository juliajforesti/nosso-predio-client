import React from "react";
import { Link } from "react-router-dom";

const ServicesList = (props) => {
  if (props.servicePage) {
    return (
      <div>
        {props.services.map((service, idx) => {
          return (
            <div key={idx}>
              <Link
                to={`/condominio/${service.building}/serviço/${service._id}`}
              >
                <div className="card-box">
                  <img className="card-img" src={service.image} alt="img" />
                  <div className="service-card-right-side">
                    <h3>{service.name.toUpperCase()}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="card-container">
        {props.services.map((service, idx) => {
          return (
            <div key={idx} className="card-box">
              <Link
                className="card-box-link"
                to={`/condominio/${service.building}/serviço/${service._id}`}
              >
                <img className="card-img" src={service.image} alt="img" />
                <h3 className="card-title">{service.name}</h3>
                {service.price === 0 ? (
                  <h3 className="card-text">Grátis</h3>
                ) : (
                  <h3 className="card-text">R${service.price.toFixed(2)}</h3>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ServicesList;
