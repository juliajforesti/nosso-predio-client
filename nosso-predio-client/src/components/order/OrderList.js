import React from "react";
import { Link } from "react-router-dom";

const OrderList = (props) => {
  const { orders } = props;
  return (
    <div>
      {orders.map((item, idx) => {
        return (
          <div key={idx} className="building-box">
            <Link to={`/condominio/${item._id}/serviço/${item.service}`}>
              Acessar produto
            </Link>
            <h3>{item.origin}</h3>
            <h3>{item.quantity}</h3>
            {props.user._id === item.origin ? (
              <form>
                <label>Status: </label>
              </form>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
