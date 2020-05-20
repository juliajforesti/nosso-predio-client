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
                  <img
                    className="card-img"
                    src={service.image}
                    alt={service.name}
                  />
                  <div className='service-card-right-side'>
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
      <div>
        {props.services.map((service, idx) => {
          return (
            <div key={idx}>
              <Link
                to={`/condominio/${service.building}/serviço/${service._id}`}
              >
                <div className="card-box">
                  <img
                    className="card-img"
                    src={service.image}
                    alt={service.name}
                  />
                  <h3>{service.name}</h3> <br />
                  <h3>R${service.price}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ServicesList;
